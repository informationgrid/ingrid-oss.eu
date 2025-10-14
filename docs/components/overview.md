---
title: Überblick
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

# Willkommen zur InGrid Dokumentation

InGrid ist eine **modulare Softwareplattform**, die sich flexibel an Ihre Anforderungen anpassen lässt. 


![](../assets/drawio/ingrid-overview.drawio)


Kernkomponenten sind: 

- **Editor** für die Erfassung von Metadaten
- **Harvester** für externe Datenquellen
- **Portal** zur Recherche und Darstellung von Datensätzen
- Visualisierungskomponente für OGC Web Map Services - **Kartenclient** auf Basis des Masterportals
- **Zeitreihendatenbank** Sensorthings-API
- Client zur **Visualisierung von Zeitreihen** auf Basis des Masterportals
- diverse **Schnittstelle** zum automatischen Im- und Export, z.B. OGC-API, CSW, SensorThings-API

**INSPIRE und GDI-DE konform**

InGrid wurde u.a. entlang der Vorgaben und Empfehlungen der [Geodateninfrastruktur Deutschland](http://www.geoportal.de/) (GDI-DE) entwickelt und eignet sich daher auch zum Aufbau INSPIRE- und GDI-DE-konformer Geodateninfrastrukturen. Die Entwicklung der Software erfolgt partnerschaftlich durch eine große Anzahl **[beteiligter Institutionen]({{ fix_url('contributing/partner.md') }})**.

**Standard­basierte Softwareplattform**

Die Softwareplattform ist vielseiten anwendbar und weiste durch die Einteilung in Kompontenten hohe Flexiblität auf. 
Informieren Sie sich über technischen Aufbau & Modularität unter **[Architektur]({{ fix_url('components/architecture.md') }})** und die vielseitigen **[Einsatzmöglichkeiten]({{ fix_url('start/applications.md') }})**.

### Über diese Dokumentation

Diese Dokumentation ist in **Komponenten** unterteilt, sodass Sie gezielt die Bausteine finden, die für Ihre individuelle Konfiguration relevant sind. 



Je nachdem, ob Sie **direkt mit der Installation starten** oder sich zunächst über den **technischen Aufbau** informieren möchten – wählen Sie den passenden Einstiegspunkt:  

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation__

    ---

    Sie wollen sich über **Setup & Installation** von **InGrid** informieren? Dann starten Sie jetzt mit einem schnellen Einstieg.

    [Installation]({{ fix_url('components/installation.md') }}){ .md-button }

-   :material-book-open-variant-outline: __Architektur__

    ---

    Möchten Sie mehr über die **Architektur** von **InGrid** erfahren? Dann lesen Sie unseren Artikel zum technischen Aufbau.

    [Architektur]({{ fix_url('components/architecture.md') }}){ .md-button }


</div>

<hr>

## Komponenten im Überblick

Jede Komponente wird in einem eigenen Kapitel beschrieben und enthält eine detaillierte Anleitung zur **Einrichtung, Nutzung und Anpassung**. Zusätzlich verfügt jede Komponente über einen eigenen **FAQ-Bereich**, in dem häufig gestellte Fragen und Lösungen zu spezifischen Herausforderungen behandelt werden.


### Portal

<div class="grid cards" markdown>

-   :material-clipboard-text-search-outline:{ .lg .middle } __InGrid Portal__

    ---

    Komfortables Interface zur Suche über den InGrid Datenraum für Benutzerinnen

    [:octicons-arrow-right-24: InGrid Portal]({{ fix_url('components/portal.md') }})

-   :material-map-outline:{ .lg .middle } __Karten__

    ---

    Darstellung von Karten im InGrid Portal

    [:octicons-arrow-right-24: Karten]({{ fix_url('components/webmap-client.md') }})

<!-- -   :material-chart-line:{ .lg .middle } __Messdaten__

    ---

    Darstellung von Messdaten im InGrid Portal

    [:octicons-arrow-right-24: Messdaten]({{ fix_url('components/time_series_client.md') }}) -->

</div>

### Editor

<div class="grid cards" markdown>

-   :material-file-edit-outline:{ .lg .middle } __InGrid Editor__

    ---

    Erfassung, Verwalten und Publizierung von Metadaten mit dem **InGrid Editor**

    [:octicons-arrow-right-24: InGrid Editor]({{ fix_url('components/ige.md') }})
</div>


### Schnittstellen

<div class="grid cards" markdown>

-   :material-lan:{ .lg .middle } __OGC-API Records Schnittstelle__
    
    ---
    
    Lesen und Schreiben von Metadaten über die OGC-API Records Schnittstelle.
    
    [:octicons-arrow-right-24: OGC-API Records]({{ fix_url('components/interface_ige.md') }})

-   :material-lan:{ .lg .middle } __CSW-Schnittstelle__

    ---

    Direkter Zugang zur InGrid-Suche über die [OGC CSW 2.0.2 AP ISO 1.0](http://www.opengeospatial.org/standards/cat) Schnittstellenspezifikation

    [:octicons-arrow-right-24: CSW-Schnittstelle]({{ fix_url('components/interface_csw.md') }})

-   :material-lan:{ .lg .middle } __Opensearch Schnittstelle__

    ---

    Die Opensearch-Schnittstelle bietet lesenden Zugriff auf den InGrid Datenraum.

    [:octicons-arrow-right-24: Such-Schnittstelle]({{ fix_url('components/interface_search.md') }})


-   :material-lan:{ .lg .middle } __Atom Download Service__

    ---

    Die Atom Download Schnittstelle bietet einen INSPIRE-kompatiblen Zugriff auf Datensätze.

    [:octicons-arrow-right-24: Opensearch Server]({{ fix_url('components/interface_search.md') }})

</div>


### Datenanbindung 

<div class="grid cards" markdown>

-   :material-hub-outline:{ .lg .middle } __InGrid Harvester__

    ---

    Sammeln von Transformation von Daten aus unterschiedlichen Schnittstellen (CSW, WFS, CKAN, REST, OAI-MPH).

    [:octicons-arrow-right-24: InGrid Harvester]({{ fix_url('components/harvester.md') }})

-   :material-power-plug:{ .lg .middle } __iPlug SE (Search Engine)__

    ---

    Indexieren von Webseiten über eine komfortable Administrationsoberfläche.

    [:octicons-arrow-right-24: iPlug SE (Search Engine)]({{ fix_url('components/iplug_se.md') }})

</div>




### Infrastruktur 

<div class="grid cards" markdown>

-   :fontawesome-solid-down-left-and-up-right-to-center:{ .lg .middle } __iBus__

    ---

    Zentrale Verteilungsstation zwischen Datenquellen und Suchanfragen

    [:octicons-arrow-right-24: iBus]({{ fix_url('components/ibus.md') }})

-   :material-format-list-bulleted:{ .lg .middle } __Codelist Repository__

    ---

    Verwalten von Codelisten für die Konsistenz der Daten

    [:octicons-arrow-right-24: Codelist Repository]({{ fix_url('components/codelist_repository.md') }})

-   :simple-keycloak:{ .lg .middle } __Keycloak__

    ---

    Authentifizierung zur Absicherung der Anwendungen

    [:octicons-arrow-right-24: Keycloak]({{ fix_url('components/keycloak.md') }})

</div>