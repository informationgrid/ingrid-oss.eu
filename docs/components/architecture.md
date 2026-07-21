---
title: Technischer Aufbau
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

# Architektur und Zusammenspiel der Komponenten

Dieser Artikel baut auf dem **[Überblick über die InGrid-Komponenten]({{ fix_url('components/overview.md') }})** auf und beschreibt vertiefend, wie die einzelnen Komponenten technisch zusammenspielen: welche Protokolle sie nutzen, welche Datenspeicher sie teilen und wie ein produktives InGrid-System daraus zusammengesetzt wird.

Die grundlegende Software-Architektur besteht aus Komponenten, die über eine Kommunikationsschicht gekoppelt sind. Zwischen den einzelnen Komponenten können Nachrichten ausgetauscht werden, und jede Komponente kann auf einem unterschiedlichen System installiert werden. Dadurch ergeben sich hochflexible Anwendungsszenarien, die auch hohen Sicherheitsanforderungen genügen.

![](../assets/drawio/ingrid-system.drawio)
<figcaption class="figcaption">Schematische Darstellung eines verteilten InGrid-Systems</figcaption>

## Architekturüberblick

InGrid befindet sich in einem laufenden Umbau: Ein Teil der Komponenten kommuniziert noch über die **klassische, Socket-basierte iBus/iPlug-Architektur**, während neuere Komponenten wie die **InGrid-API**, die **OGC-API Records/CSW-T-Schnittstelle** des Editors und die **pycsw**-basierte CSW-Schnittstelle bereits auf **HTTP/REST** setzen. Beide Modelle sind aktuell parallel im Einsatz — die von [Installation]({{ fix_url('components/installation.md') }}) empfohlene Basisinstallation setzt weiterhin auf den iBus.

<!-- ![](../assets/drawio/ingrid-components.drawio)
<figcaption class="figcaption">Komponentenübersicht: klassische und moderne Schnittstellen im InGrid-System</figcaption> -->

## Portal und Kartenclient

### InGrid Portal
Das InGrid-Portal bietet einen komfortablen Zugang zu den in InGrid verwalteten Daten, u. a. über eine konfigurierbare, facettierte Suche.

- Sucht und durchsucht Metadaten über die **[InGrid-API](#apis-und-schnittstellen)** (REST), die ihrerseits direkt auf **Elasticsearch** zugreift.
- Ruft Codelisten direkt per REST vom **[Codelist Repository](#infrastruktur)** ab, um Auswahllisten korrekt zu befüllen.
- Bindet den **Webmap Client** über den Menüpunkt „Karte“ ein.
- Ist als PHP-Anwendung (Basis: CMS GRAV) zustandslos und benötigt selbst keine eigene Datenbank.

Weitere Details: **[InGrid Portal]({{ fix_url('components/portal.md') }})**

<hr>

### Webmap Client

![](../assets/drawio/ingrid-webmap-client.drawio)

Der Kartenclient stellt OGC-konforme Kartendienste aus den Suchergebnissen dar (Basis: geo.admin.ch-Client, OpenLayers).

- Läuft als eigene Java/Tomcat-Anwendung, ist aber in das Tomcat-Verzeichnis des Portals eingebettet.
- Fragt für die Kartendienst-Suche die **[Such-Schnittstelle](#apis-und-schnittstellen)** (OpenSearch, REST) ab.
- Bindet bei Bedarf einen URL-Shortener (öffentlich `is.gd` oder selbstgehostet **YOURLS** mit eigener Datenbank) sowie beliebige externe WMS-/WFS-/KML-Dienste ein.

Weitere Details: **[Webmap Client]({{ fix_url('components/webmap-client.md') }})**

<hr>

## Editor

![](../assets/drawio/ingrid-editor.drawio)

Der InGrid Editor ist das zentrale Werkzeug zur Erfassung und Pflege von Metadaten (ISO 19115/19119, INSPIRE, DCAT-AP.DE).

- Persistiert Metadaten in einer eigenen **PostgreSQL**-Datenbank und einem eigenen **Elasticsearch**-Index.
- Authentifiziert Benutzer über **[Keycloak](#infrastruktur)** (OIDC, Realm `InGrid`).
- Synchronisiert Codelisten direkt per REST mit dem **[Codelist Repository](#infrastruktur)**.
- Liefert erfasste Metadaten an die **[pycsw-CSW-Schnittstelle](#apis-und-schnittstellen)** und ggf. weitere Kataloge.
- Stellt selbst maschinenlesbare Schnittstellen bereit (siehe **OGC-API Records / CSW-T** unten) — dafür ist kein separates Deployment nötig, sondern nur die Aktivierung zusätzlicher Spring-Profile.

Weitere Details: **[InGrid Editor]({{ fix_url('components/editor.md') }})**

<hr>

## APIs und Schnittstellen
Für die Kommunikation mit externen Systemen stehen mehrere Schnittstellen zur Verfügung. Ein Teil davon ist bereits als HTTP/REST-API modern umgesetzt, ein Teil folgt noch dem klassischen, Socket-basierten Muster über den iBus.

### InGrid-API

![](../assets/drawio/ingrid-api.drawio)

Die InGrid-API ist eine neue, schlanke REST-Schnittstelle für InGrid-Datensätze.

!!! note "In Entwicklung"
    Die InGrid-API befindet sich noch in der Entwicklung und wird aktuell ausschließlich vom InGrid Portal genutzt. Sie soll perspektivisch Teile der iBus-Anbindung des Portals ablösen.

- Greift direkt auf **Elasticsearch** zu, ohne den iBus einzubeziehen.

Weitere Details: **[InGrid-API]({{ fix_url('components/api.md') }})**

<hr>

### Such-Schnittstelle (OpenSearch / ATOM / GOVDATA)

![](../assets/drawio/ingrid-interface-search.drawio)

Bündelt drei REST-Schnittstellen: die als veraltet markierte OpenSearch-Schnittstelle (Nachfolger: OGC-API Records), den INSPIRE-konformen ATOM Download Service und einen GOVDATA/DCAT-AP.de-Export.

- Führt Suchanfragen klassisch über den **[iBus](#infrastruktur)** aus (Socket-Protokoll) und übersetzt Anfrage/Antwort in das jeweilige Zielformat (RSS 2.0, ATOM, RDF).
- Wird auch vom **Webmap Client** für die Kartendienst-Suche genutzt.

Weitere Details: **[Such-Schnittstelle]({{ fix_url('components/interface_search.md') }})**

<hr>

### InGrid Editor-Schnittstelle (OGC-API Records / CSW-T)

![](../assets/drawio/ingrid-editor-api.drawio)

Kein eigenständiges Deployment, sondern über Spring-Profile aktivierte Endpunkte des **Editors** — bietet maschinenlesbaren Zugriff auf Metadaten (OGC API Records) sowie transaktionale Schreibzugriffe (CSW-T, ISO 19139).

- Absicherung ausschließlich über OAuth2-Bearer-Token von **[Keycloak](#infrastruktur)**.
- Nimmt auch die CSW-T-Schreibzugriffe der veralteten CSW-Schnittstelle entgegen (siehe unten).

Weitere Details: **[InGrid Editor-Schnittstelle]({{ fix_url('components/interface_editor.md') }})**

<hr>

### CSW-Schnittstelle (pycsw)

![](../assets/drawio/ingrid-pycsw.drawio)

Die aktuelle CSW-Schnittstelle basiert auf dem Open-Source-Projekt **pycsw** und besitzt eine eigene **PostgreSQL**-Datenbank.

- Dient als zentrales Katalog-Ziel für einliefernde Komponenten wie **Editor** und **Harvester**.
- Wird von suchenden Komponenten wie dem **Portal** für CSW-Zugriffe angefragt.

Weitere Details: **[CSW-Schnittstelle (pycsw)]({{ fix_url('components/pycsw.md') }})**

<hr>

### CSW-Schnittstelle (veraltet)

![](../assets/drawio/ingrid-interface-csw.drawio)

!!! warning "Veraltet"
    Diese Komponente wird schrittweise durch die pycsw-basierte CSW-Schnittstelle ersetzt. Für Neuinstallationen wird pycsw empfohlen.

- Pflegt einen eigenen, aus dem **iBus** geharvesteten Suchindex (Socket-Protokoll, „InGrid iBus harvester“).
- Schreibzugriffe (CSW-T) werden bereits an die **InGrid Editor-Schnittstelle** delegiert.

Weitere Details: **[CSW-Schnittstelle (veraltet)]({{ fix_url('components/interface_csw.md') }})**

<hr>

## Datenanbindung

### Harvester

![](../assets/drawio/ingrid-harvester.drawio)

Der Harvester sammelt und transformiert Daten aus unterschiedlichen externen Quellen (CSW, WFS, CKAN, REST, OAI-PMH) und veröffentlicht sie in konfigurierten Katalogen (Elasticsearch-Indizes, CSW-Server, Piveau-Hubs).

- Eigene **PostgreSQL**-Datenbank, eigener bzw. gemeinsam genutzter **Elasticsearch**-Index.
- Authentifizierung optional über **[Keycloak](#infrastruktur)** oder lokale Zugangsdaten.

Weitere Details: **[Harvester]({{ fix_url('components/harvester.md') }})**

<hr>

### iPlug SE (Search Engine)

![](../assets/drawio/ingrid-iplug-se.drawio)

Der iPlug SE crawlt externe Webseiten (Basis: Apache Nutch) und ist das lebendige Beispiel des klassischen iPlug-Musters.

- Hält Daten in einem eigenen **Elasticsearch**-Index statt im zentralen Index.
- Meldet sich beim **[iBus](#infrastruktur)** an (Socket-Protokoll); Daten bleiben dezentral, der iBus fragt sie bei Bedarf live ab.

Weitere Details: **[iPlug SE]({{ fix_url('components/iplug_se.md') }})**

<hr>

## Infrastruktur

### iBus

![](../assets/drawio/ingrid-ibus.drawio)

Der iBus (“Information Bus”) ist die zentrale Verteilstation der klassischen InGrid-Architektur.

- Nimmt Suchanfragen von Portal/Frontends entgegen, durchsucht den zentralen **Elasticsearch**-Index und/oder leitet die Anfrage über eine eigene TCP-Socket-Verbindung (Standardport 9900) an angeschlossene iPlugs weiter.
- Synchronisiert Codelisten per REST mit dem **Codelist Repository** und reicht sie an angeschlossene Clients weiter.
- Ist firewall-freundlich: angeschlossene iPlugs/Schnittstellen benötigen nur eine ausgehende Verbindung zum iBus, keine von außen erreichbare Gegenstelle (siehe [Kommunikation](#kommunikation)).

!!! note "Ausblick"
    Die **InGrid-API** wird perspektivisch Teile der iBus-Funktionalität ablösen. Stand heute ersetzt sie den iBus jedoch noch nicht vollständig — er bleibt fester Bestandteil der empfohlenen Basisinstallation.

Weitere Details: **[iBus]({{ fix_url('components/ibus.md') }})**

<hr>

### Codelist Repository

![](../assets/drawio/ingrid-codelist-repository.drawio)

Verwaltet zentral gepflegte Codelisten (Werte-Listen für Metadaten) als XML-Dateien auf der Festplatte — es wird keine eigene Datenbank benötigt.

- **Editor** und **iBus** synchronisieren direkt per REST.
- **Portal**, CSW-Schnittstelle und iPlug SE beziehen Codelisten stattdessen indirekt über den **iBus**.

Weitere Details: **[Codelist Repository]({{ fix_url('components/codelist_repository.md') }})**

<hr>

### Keycloak
Zentrales Identitäts- und Zugriffsmanagement (OIDC/OAuth2/SAML) mit eigener **PostgreSQL**-Datenbank.

- Wird aktuell vom **Editor** (inkl. der davon bereitgestellten OGC-API Records/CSW-T-Schnittstelle) sowie optional vom **Harvester** genutzt; weitere Komponenten sollen folgen.

Weitere Details: **[Keycloak]({{ fix_url('components/keycloak.md') }})**

<hr>

### Gemeinsam genutzte Datenspeicher
- **Elasticsearch** dient als Suchindex, wird aber sowohl zentral (über den iBus) als auch dezentral je Komponente (Editor, Harvester, iPlug SE, InGrid-API) mit eigenen Indizes genutzt.
- **PostgreSQL** wird von mehreren Komponenten (Editor, Harvester, Keycloak, pycsw) verwendet — jede Komponente betreibt dabei eine eigene, isolierte Datenbank. Es gibt keine gemeinsam genutzte Datenbank.

<hr>

## Kommunikation

Je nach Komponente kommt eines von zwei Kommunikationsmodellen zum Einsatz:

- **Klassisch (Socket):** Der iBus sowie die daran angeschlossenen iPlugs (z. B. iPlug SE) und Schnittstellen (Such-Schnittstelle, veraltete CSW-Schnittstelle) kommunizieren über ein proprietäres TCP-Socket-Protokoll. Der iBus startet einen Kommunikations-Socket (Standardport 9900), mit dem sich die anderen Komponenten verbinden; über die etablierte Verbindung erfolgt die weitere Kommunikation.
- **Modern (HTTP/REST):** Portal↔InGrid-API, Editor↔Keycloak/Codelist Repository/pycsw, Harvester sowie die OGC-API Records/CSW-T-Schnittstelle kommunizieren über HTTP/REST, größtenteils zusätzlich über OAuth2/OIDC-Token von Keycloak abgesichert.

Für das klassische Socket-Modell ergibt sich ein sicherheitsrelevanter Vorteil: iPlugs und Schnittstellen können hinter Firewalls versteckt werden, da keine von außen erreichbare Verbindung existieren muss. Die einzige von außen erreichbare Komponente ist der iBus. Firewalls zwischen iPlugs/Schnittstellen und dem iBus müssen dafür nur eine ausgehende TCP-Verbindung zum iBus erlauben — das ermöglicht den Einsatz in Bereichen mit hohen IT-Sicherheitsanforderungen.

![](../assets/drawio/ingrid-communication.drawio)
<figcaption class="figcaption">Socket-basierte Kommunikation zwischen iBus und angeschlossenen Komponenten</figcaption>

<hr>

## Deployment und Referenzarchitektur

Die von **[Installation]({{ fix_url('components/installation.md') }})** empfohlene Basisinstallation umfasst **Elasticsearch, iBus, Portal, Editor und Codelist Repository**. Alle weiteren Komponenten (Harvester, iPlug SE, Keycloak, pycsw, InGrid-API, Webmap Client, Such-Schnittstelle) sind optional und werden je nach Anforderung ergänzt.

Eine vollständige Referenzinstallation aller Komponenten über Docker Compose steht als [ingrid-docker](https://github.com/informationgrid/ingrid-docker)-Repository zur Verfügung:

![](../assets/drawio/ingrid-docker.drawio)
<figcaption class="figcaption">Referenz-Deployment aller InGrid-Komponenten via Docker Compose</figcaption>

Informationen zur Inbetriebnahme finden Sie unter **[Jetzt starten]({{ fix_url('start/index.md') }})** sowie den Systemvoraussetzungen unter **[Installation]({{ fix_url('components/installation.md') }})**.
