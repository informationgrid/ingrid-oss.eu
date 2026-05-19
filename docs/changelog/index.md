---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Deprecation Warnung InGrid 7.5.x ⚠️

Die Komponenten der InGrid Software in der Version 7.5.x werden offiziell nicht mehr unterstützt. Es werden keine Sicherheitsupdates für diese Versionen bereitgestellt. Es wird dringend empfohlen auf die neusten Versionen der Komponenten zu aktualisieren.


## Version 8.3.0 <small>17.04.2026</small> { id="8.3.0" data-toc-label="8.3.0"}

### Hinweise für die Aktualisierung ⚠️

#### Elasticsearch

Die InGrid Software wurde auf die Kompatibilität mit Elasticsearch 9.3.0 geprüft. Es wird empfohlen auf diese Version zu aktualisieren, um weitere Security-Fixes zu erhalten. Bevor auf Elasticsearch 9.3.0 aktualisiert werden kann, muss zuvor auf die Version 8.19.0 aktualisiert werden. Eine Migration zur 9er Version ist nur von hier aus möglich.

#### Harvester

Der Harvester unterstützt nun die Authentifizierung mit Keycloak, welche standardmäßig aktiviert ist. Soll die lokale Anmeldung verwendet werden, so muss folgende Konfiguration vorgenommen werden:

- Umgebungsvariable `PASSPORT_ENABLED` auf `true` setzen
- Umgebungsvariable `KEYCLOAK_ENABLED` auf `false` setzen

Soll die Keycloak-Authentifizierung verwendet werden, so folgen Sie den Anweisungen in der [Harvester-Dokumentation](../components/harvester.md#keycloak-konfiguration).

### Wichtige Änderungen&nbsp;⚠️

#### Opendata Integration

Das frei zugängliche, maschinenlesbare Opendata‑Format gewinnt zunehmend an Bedeutung. Behörden, Forschungseinrichtungen und Unternehmen erhalten dadurch schnelleren, standardisierten Zugriff auf strukturierte Daten. InGrid bildet das Opendata‑Format in Kombination mit Editor, Harvester und Portal ab: Der Editor erstellt und validiert die Datensätze, der Harvester sammelt und harmonisiert sie aus verschiedenen Quellen und das Portal stellt die Daten nutzerfreundlich bereit. Die verbesserte Datenqualität ermöglicht Wiederverwendung und fördert interoperable Analysen. Es entstehen neue Möglichkeiten für Transparenz und datengetriebene Entscheidungen.

##### Opendata im Editor

![InGrid Editor: "Opendata"](../assets/changelog/830_ingrid_editor_opendata.png "InGrid Editor: "Opendata"")
<figcaption class="figcaption">InGrid Editor: "Opendata"</figcaption>

##### Opendata im Portal 

###### Detailseite

![InGrid Portal: "Opendata Detailseite"](../assets/changelog/830_ingrid_portal_opendata_detail.png "InGrid Portal: "Opendata Detailseite"")
<figcaption class="figcaption">InGrid Portal: "Opendata Detailseite"</figcaption>

###### Opensearch query

![InGrid Portal: "Opendata Opensearch"](../assets/changelog/830_ingrid_portal_opendata_opensearch.png "InGrid Portal: "Opendata Opensearch"")
<figcaption class="figcaption">InGrid Portal: "Opendata Opensearch"</figcaption>

##### Opendata im Harvester

![InGrid Harvester: "Opendata"](../assets/changelog/830_ingrid_harvester_opendata.png "InGrid Harvester: "Opendata"")
<figcaption class="figcaption">InGrid Harvester: "Opendata"</figcaption>


[:octicons-link-external-16: REDMINE-8313](https://redmine.informationgrid.eu/issues/8313)
[:octicons-link-external-16: REDMINE-8314](https://redmine.informationgrid.eu/issues/8314)
[:octicons-link-external-16: REDMINE-8315](https://redmine.informationgrid.eu/issues/8315)
[:octicons-link-external-16: REDMINE-8868](https://redmine.informationgrid.eu/issues/8868)
[:octicons-link-external-16: REDMINE-8572](https://redmine.informationgrid.eu/issues/8572)


#### Harvester

Der Harvester hat einige Neuerungen erhalten. Neben der Integration der Web Service Features für das Zentrale Datenmanagemnt und der Erweiterung des Harvesting für OpenData Quellen sowie der Transformation nach RDF/XML wurde die User-Experience verbessert und moderne Techniken der Nutzer\*innenverwaltung ermöglicht. 


##### UX/UI

Verschiedene Bereiche des UI wurden überarbeitet. Unter dem Navigationspunkt "Datenquellen" werden alle Datenquellen aufgeführt. Auf den ersten Blick erhält man so eine Übersicht der konfigurierten Harvester und der Datenquellen die geharvestet werden sollen. Eine schlichte Infobox infomiert über geplante und durchgeführte Harvestingprozesse.

![InGrid Harvester: "UI Überarbeitung"](../assets/changelog/830_ingrid_harvester_ui_data_sources_05.png "InGrid harvester: "UI Überarbeitung"")
<figcaption class="figcaption">InGrid Harvester: "UI Überarbeitung"</figcaption>

Wird eine Datenquelle ausgewählt erhält man eine kleine Übersicht bzgl. des letzten Harvestings wie z.B. dem Status

![InGrid Harvester: "UI Überarbeitung - wird importiert"](../assets/changelog/830_ingrid_harvester_ui_data_sources_01.png "InGrid Harvester: "UI Überarbeitung wird importiert"")
<figcaption class="figcaption">InGrid Harvester: "UI Überarbeitung wird importiert"</figcaption>

![InGrid Harvester: "UI Überarbeitung - Erfolgreich"](../assets/changelog/830_ingrid_harvester_ui_data_sources_04.png "InGrid Harvester: "UI Überarbeitung - Erfolgreich"")
<figcaption class="figcaption">InGrid Harvester: "UI Überarbeitung - Erfolgreich"</figcaption>

Meldet das Harvesting Warnungen und Fehler, kann der Verlauf bei der Analyse behilflich sein.

![InGrid Harvester: "UI Überarbeitung - Verlauf aufrufen"](../assets/changelog/830_ingrid_harvester_ui_data_sources_02.png "InGrid Harvester: "UI Überarbeitung - Verlauf aufrufen"")
<figcaption class="figcaption">InGrid Harvester: "UI Überarbeitung - Verlauf aufrufen"</figcaption>

![InGrid Harvester: "UI Überarbeitung - Verlauf Ansicht"](../assets/changelog/830_ingrid_harvester_ui_data_sources_03.png "InGrid Harvester: "UI Überarbeitung - Verlauf Ansicht"")
<figcaption class="figcaption">InGrid Harvester: "UI Überarbeitung - Verlauf Ansicht"</figcaption>



##### WFS Integration

Für die Erstellung einer neuen Datenquelle, stehen ab sofort sowohl GENESIS als auch WFS als Datentyp zur Verfügung.

![InGrid Harvester: "WFS Harvester InGrid Profil umsetzen"](../assets/changelog/830_ingrid_harvester_data_sources_wfs_genesis.png "InGrid harvester: "WFS Harvester InGrid Profil umsetzen"")
<figcaption class="figcaption">InGrid Harvester: "WFS Harvester InGrid Profil umsetzen"</figcaption>

[:octicons-link-external-16: REDMINE-8322](https://redmine.informationgrid.eu/issues/8322)

##### Nutzer*innenverwaltung

Der Harvester als eigenständige Komponente ermöglicht eine eigene Nutzer\*innenverwaltung und kann damit auch in Umgebungen eingesetzt werden die wenig Resourcen zur Verfügung haben. Für Umgebungen die eine erhöhte Sicherheit benötigen und die zentrale Nutzer\*innenverwaltung Keycloak zur Verfügung haben, besteht nun die Möglichkeit die Harvester-User mittels Keycloak zu verwalten. Details zur Einrichtung: https://ingrid-oss.eu/8.3.0/components/harvester/#keycloak-konfiguration

![InGrid Harvester: "Dezentrale Nutzer\*innenverwaltung"](../assets/changelog/830_ingrid_harvester_login_keycloak.png "InGrid harvester: "Dezentrale Nutzer\*innenverwaltung"")
<figcaption class="figcaption">InGrid Harvester: "Dezentrale Nutzer\*innenverwaltung"</figcaption>

[:octicons-link-external-16: REDMINE-8438](https://redmine.informationgrid.eu/issues/8438)

### Allgemein { id="8.3.0_changes_allgemein" }

* :material-star:{ title="Feature" } DOI Registrierung/Aktualisierung über die DataCite REST-API implementieren <br>[:octicons-link-external-16: REDMINE-6695](https://redmine.informationgrid.eu/issues/6695)
* :material-star:{ title="Feature" } Harvester - Deduplizierung gegen einen InGrid Datenraum <br>[:octicons-link-external-16: REDMINE-7071](https://redmine.informationgrid.eu/issues/7071)
* :material-star:{ title="Feature" } Verbesserung des URL-Routings im Harvester <br>[:octicons-link-external-16: REDMINE-7566](https://redmine.informationgrid.eu/issues/7566)
* :material-star:{ title="Feature" } Verbesserung vom Logging im Harvester <br>[:octicons-link-external-16: REDMINE-7572](https://redmine.informationgrid.eu/issues/7572)
* :material-star:{ title="Feature" } Editor - Objektklasse für OpenData in Geometadaten-Katalog integrieren können <br>[:octicons-link-external-16: REDMINE-8313](https://redmine.informationgrid.eu/issues/8313)
* :material-star:{ title="Feature" } opensearch Schnittstelle erweitern um Abgabe der neuen OpenData-Metadaten <br>[:octicons-link-external-16: REDMINE-8314](https://redmine.informationgrid.eu/issues/8314)
* :material-star:{ title="Feature" } Portal: Erweiterung um Darstellung für OpenData-Metadaten <br>[:octicons-link-external-16: REDMINE-8315](https://redmine.informationgrid.eu/issues/8315)
* :material-star:{ title="Feature" } WFS Harvester InGrid Profil umsetzen <br>[:octicons-link-external-16: REDMINE-8322](https://redmine.informationgrid.eu/issues/8322)
* :material-star:{ title="Feature" } Umsetzung OGC-API Records Schnittstelle <br>[:octicons-link-external-16: REDMINE-8382](https://redmine.informationgrid.eu/issues/8382)
* :material-star:{ title="Feature" } ES Indexmapping für Ortssuche anpassen, Felder befüllen <br>[:octicons-link-external-16: REDMINE-8425](https://redmine.informationgrid.eu/issues/8425)
* :material-star:{ title="Feature" } Harvester: Einführung von Nutzermanagement mit keycloak <br>[:octicons-link-external-16: REDMINE-8438](https://redmine.informationgrid.eu/issues/8438)
* :material-star:{ title="Feature" } Harvester: Erweiterung bzgl. dem Harvesting von OpenData Quellen und Transformation nach RDF/XML <br>[:octicons-link-external-16: REDMINE-8572](https://redmine.informationgrid.eu/issues/8572)
* :material-star:{ title="Feature" } "Übernahme freie Einträge" Funktionalität aus IGE Classic Teil 2 <br>[:octicons-link-external-16: REDMINE-8580](https://redmine.informationgrid.eu/issues/8580)
* :material-star:{ title="Feature" } Upgrade Elasticsearch auf aktuelle Version <br>[:octicons-link-external-16: REDMINE-8592](https://redmine.informationgrid.eu/issues/8592)
* :material-star:{ title="Feature" } Suche im Portal sollte auch die Erläuterungstexte von Verweisen, insb. Download und Basisdaten, mitnehmen <br>[:octicons-link-external-16: REDMINE-8625](https://redmine.informationgrid.eu/issues/8625)
* :material-star:{ title="Feature" } Open Data - Raumbezug setzen Geo-Thesaurus <br>[:octicons-link-external-16: REDMINE-8636](https://redmine.informationgrid.eu/issues/8636)
* :material-star:{ title="Feature" } Open Data - Ressourcen - Angaben im Portal ergänzen <br>[:octicons-link-external-16: REDMINE-8639](https://redmine.informationgrid.eu/issues/8639)
* :material-star:{ title="Feature" } Open Data - Zeitbezüge <br>[:octicons-link-external-16: REDMINE-8640](https://redmine.informationgrid.eu/issues/8640)
* :material-star:{ title="Feature" } ingrid-with-opendata - Einbindung in anderen Profilen/Katalogen <br>[:octicons-link-external-16: REDMINE-8650](https://redmine.informationgrid.eu/issues/8650)
* :material-star:{ title="Feature" } Indizierung abschalten für einen Katalog <br>[:octicons-link-external-16: REDMINE-8686](https://redmine.informationgrid.eu/issues/8686)
* :material-star:{ title="Feature" } CSW-T Import, Anpassung/Optimierung <br>[:octicons-link-external-16: REDMINE-8692](https://redmine.informationgrid.eu/issues/8692)
* :material-star:{ title="Feature" } Builds, die auf gradle basieren, sollen automatisch die Erzeugung dependency LOCK files prüfen <br>[:octicons-link-external-16: REDMINE-8693](https://redmine.informationgrid.eu/issues/8693)
* :material-star:{ title="Feature" } Harvester: Ausschluss von internen Dateireferenzen von der URL Prüfung <br>[:octicons-link-external-16: REDMINE-8696](https://redmine.informationgrid.eu/issues/8696)
* :material-star:{ title="Feature" } Codelist-Repo: Zugriff auf externe Codelisten robuster gestalten <br>[:octicons-link-external-16: REDMINE-8711](https://redmine.informationgrid.eu/issues/8711)
* :material-star:{ title="Feature" } Harvester: Datenquellen sollen parallel ausgeführt werden können <br>[:octicons-link-external-16: REDMINE-8740](https://redmine.informationgrid.eu/issues/8740)
* :material-star:{ title="Feature" } Editor: OpenData-Objektklasse ("Datensatz) flexibilisieren <br>[:octicons-link-external-16: REDMINE-8753](https://redmine.informationgrid.eu/issues/8753)
* :material-star:{ title="Feature" } Portal: Umsortierung Zeitbezüge <br>[:octicons-link-external-16: REDMINE-8770](https://redmine.informationgrid.eu/issues/8770)
* :material-star:{ title="Feature" } Verbesserung des Index-Mappings für die Suche <br>[:octicons-link-external-16: REDMINE-8788](https://redmine.informationgrid.eu/issues/8788)
* :material-star:{ title="Feature" } Adresstyp "Herausgeber" erklären für "Datensätze" <br>[:octicons-link-external-16: REDMINE-8799](https://redmine.informationgrid.eu/issues/8799)
* :material-star:{ title="Feature" } Minimallösung JSON MERGE PATCHes in der OGC-API Records Schnittstelle <br>[:octicons-link-external-16: REDMINE-8868](https://redmine.informationgrid.eu/issues/8868)
* :material-star:{ title="Feature" } Keycloak-Logout aus Harvester soll auf Harvester-Login-Seite leiten <br>[:octicons-link-external-16: REDMINE-8900](https://redmine.informationgrid.eu/issues/8900)
* :octicons-bug-16:{ title="Bug Fix" } Doppelte IDs im Formular <br>[:octicons-link-external-16: REDMINE-6251](https://redmine.informationgrid.eu/issues/6251)
* :octicons-bug-16:{ title="Bug Fix" } Portal kann nicht alle Anfragen beantworten (getMimeType-Requests) <br>[:octicons-link-external-16: REDMINE-8274](https://redmine.informationgrid.eu/issues/8274)
* :octicons-bug-16:{ title="Bug Fix" } Open Data Metadatensatz Indexierungsfehler <br>[:octicons-link-external-16: REDMINE-8627](https://redmine.informationgrid.eu/issues/8627)
* :octicons-bug-16:{ title="Bug Fix" } Open Data - Angabe Link in Ressource <br>[:octicons-link-external-16: REDMINE-8635](https://redmine.informationgrid.eu/issues/8635)
* :octicons-bug-16:{ title="Bug Fix" } Open Data - Angabe Link Ressource einfügen <br>[:octicons-link-external-16: REDMINE-8637](https://redmine.informationgrid.eu/issues/8637)
* :octicons-bug-16:{ title="Bug Fix" } "mit Schreibzugriff"-Schieberegler resettet nach "Auswahl"-Checkbox Aktivierung <br>[:octicons-link-external-16: REDMINE-8638](https://redmine.informationgrid.eu/issues/8638)
* :octicons-bug-16:{ title="Bug Fix" } Fehlertext korrigieren <br>[:octicons-link-external-16: REDMINE-8664](https://redmine.informationgrid.eu/issues/8664)
* :octicons-bug-16:{ title="Bug Fix" } IDF Erzeugung mit Leerzeilen/-zeichen führt zu MessageSizeTooBigException <br>[:octicons-link-external-16: REDMINE-8681](https://redmine.informationgrid.eu/issues/8681)
* :octicons-bug-16:{ title="Bug Fix" } Harvester muss HTML Tags bei der Erstellung von IDF Dokumenten escapen <br>[:octicons-link-external-16: REDMINE-8690](https://redmine.informationgrid.eu/issues/8690)
* :octicons-bug-16:{ title="Bug Fix" } PORTAL: Doppelte Quellenvermerk-Einträge in der Detaildarstellung <br>[:octicons-link-external-16: REDMINE-8725](https://redmine.informationgrid.eu/issues/8725)
* :octicons-bug-16:{ title="Bug Fix" } Druckvorschau - Es wird nur die erste Seite gedruckt <br>[:octicons-link-external-16: REDMINE-8752](https://redmine.informationgrid.eu/issues/8752)
* :octicons-bug-16:{ title="Bug Fix" } Seite Titel wird nicht immer angezeigt <br>[:octicons-link-external-16: REDMINE-8769](https://redmine.informationgrid.eu/issues/8769)
* :octicons-bug-16:{ title="Bug Fix" } Code-Liste 2000 - Mapping für deutsche Verweis-Typen korrigieren <br>[:octicons-link-external-16: REDMINE-8783](https://redmine.informationgrid.eu/issues/8783)
* :octicons-bug-16:{ title="Bug Fix" } Zeitbezug: Diskrepanz Hinweistexte im Portal und im Editor <br>[:octicons-link-external-16: REDMINE-8813](https://redmine.informationgrid.eu/issues/8813)
* :octicons-bug-16:{ title="Bug Fix" } PORTAL: Uploads werden nach Neustart des Docker-Containers entfernt <br>[:octicons-link-external-16: REDMINE-8819](https://redmine.informationgrid.eu/issues/8819)
* :octicons-bug-16:{ title="Bug Fix" } PORTAL: Messwerte-Client kann durch die GravCMS-Administration gelöscht werden <br>[:octicons-link-external-16: REDMINE-8820](https://redmine.informationgrid.eu/issues/8820)
* :octicons-bug-16:{ title="Bug Fix" } JSON Merge / Patch im Importer schlägt fehl bei updates <br>[:octicons-link-external-16: REDMINE-8831](https://redmine.informationgrid.eu/issues/8831)
* :octicons-bug-16:{ title="Bug Fix" } Refactoring des Harvesters <br>[:octicons-link-external-16: REDMINE-8910](https://redmine.informationgrid.eu/issues/8910)

### Profil BAW MIS { id="8.3.0_changes_profil_baw_mis" }

* :material-star:{ title="Feature" } Vorschaubilder sollen im Archiv/Langfristspeicher der BAW abgelegt werden <br>[:octicons-link-external-16: REDMINE-6706](https://redmine.informationgrid.eu/issues/6706)
* :material-star:{ title="Feature" } Auftragsnr./-titel Felder durch Selectbox ersetzen <br>[:octicons-link-external-16: REDMINE-8227](https://redmine.informationgrid.eu/issues/8227)
* :material-star:{ title="Feature" } IGE: Bild hochladen Button entfernen oder Funktion anpassen <br>[:octicons-link-external-16: REDMINE-8594](https://redmine.informationgrid.eu/issues/8594)
* :material-star:{ title="Feature" } IGE: Abgedeckte Zeitspanne und Zielparameter in der Objektklasse zu Pflichtfelder machen <br>[:octicons-link-external-16: REDMINE-8602](https://redmine.informationgrid.eu/issues/8602)
* :material-star:{ title="Feature" } IGE: Adresstypen-Auswahlliste für Objektklasse "Software" ergänzen <br>[:octicons-link-external-16: REDMINE-8644](https://redmine.informationgrid.eu/issues/8644)
* :material-star:{ title="Feature" } IGE: Vorschaugrafik aus LFS-Dateien Wählen <br>[:octicons-link-external-16: REDMINE-8663](https://redmine.informationgrid.eu/issues/8663)
* :material-star:{ title="Feature" } Bautechnik Formular: Toggle Switch für Berechnungskonzepte <br>[:octicons-link-external-16: REDMINE-8708](https://redmine.informationgrid.eu/issues/8708)
* :material-star:{ title="Feature" } Editor: Felder für Grundlegende Werkstoffparameter umgestalten <br>[:octicons-link-external-16: REDMINE-8714](https://redmine.informationgrid.eu/issues/8714)
* :material-star:{ title="Feature" } Integration der Bauchtechnik Codelisten <br>[:octicons-link-external-16: REDMINE-8718](https://redmine.informationgrid.eu/issues/8718)
* :material-star:{ title="Feature" } Editor: Simulationsdatenfelder Bautechnik <br>[:octicons-link-external-16: REDMINE-8758](https://redmine.informationgrid.eu/issues/8758)
* :material-star:{ title="Feature" } IGE: Messdaten (Allgmein) Selectboxen in Comboboxen ändern <br>[:octicons-link-external-16: REDMINE-8796](https://redmine.informationgrid.eu/issues/8796)
* :material-star:{ title="Feature" } Portal-NG: Nacharbeiten  <br>[:octicons-link-external-16: REDMINE-8825](https://redmine.informationgrid.eu/issues/8825)
* :octicons-bug-16:{ title="Bug Fix" } IGE: Raumbezüge von BWaStr.-Strecken Löschen fehlerhaft <br>[:octicons-link-external-16: REDMINE-8600](https://redmine.informationgrid.eu/issues/8600)
* :octicons-bug-16:{ title="Bug Fix" } IGE: Untergeordnete Objekte werden nicht im Portal angezeigt <br>[:octicons-link-external-16: REDMINE-8878](https://redmine.informationgrid.eu/issues/8878)

### Profil BKG { id="8.3.0_changes_profil_bkg" }

* :material-star:{ title="Feature" } AdV-MIS: Facette "Verwaltet Von" in Zusammenhang mit Harvester anpassen <br>[:octicons-link-external-16: REDMINE-8604](https://redmine.informationgrid.eu/issues/8604)
* :material-star:{ title="Feature" } Anpassungen Portal-NG, Teil 2 <br>[:octicons-link-external-16: REDMINE-8612](https://redmine.informationgrid.eu/issues/8612)
* :octicons-bug-16:{ title="Bug Fix" } AdV-MIS: Angezeigte Einträge in Facetten angleichen im Portal NG <br>[:octicons-link-external-16: REDMINE-8606](https://redmine.informationgrid.eu/issues/8606)
* :octicons-bug-16:{ title="Bug Fix" } Editor: Migration für die "Operationen" korrigieren <br>[:octicons-link-external-16: REDMINE-8607](https://redmine.informationgrid.eu/issues/8607)
* :octicons-bug-16:{ title="Bug Fix" } BKG-MIS: Portal: Auffälligkeit - Nutzungsbedingungen in Suchergebnis-Ausgabe <br>[:octicons-link-external-16: REDMINE-8849](https://redmine.informationgrid.eu/issues/8849)
* :octicons-bug-16:{ title="Bug Fix" } AdV-MIS: PROD und TEST: bei Wahl einer Kachel auf Startseite > Filterung fehlt tlw. <br>[:octicons-link-external-16: REDMINE-8911](https://redmine.informationgrid.eu/issues/8911)

### Profil KRZN { id="8.3.0_changes_profil_krzn" }

* :octicons-bug-16:{ title="Bug Fix" } GravCMS: Kann Logos nicht löschen <br>[:octicons-link-external-16: REDMINE-8563](https://redmine.informationgrid.eu/issues/8563)

### Profil LUBW { id="8.3.0_changes_profil_lubw" }

* :material-star:{ title="Feature" } CSV Export: Erweiterung und Umbenennung der Ebenen <br>[:octicons-link-external-16: REDMINE-8483](https://redmine.informationgrid.eu/issues/8483)
* :material-star:{ title="Feature" } Kontexthilfe um Informationen für Fachredaktionen ergänzen <br>[:octicons-link-external-16: REDMINE-8562](https://redmine.informationgrid.eu/issues/8562)
* :material-star:{ title="Feature" } Ergänzende Informationen "Für die Fachredaktion zuständige Dienststelle" als neues Feld <br>[:octicons-link-external-16: REDMINE-8614](https://redmine.informationgrid.eu/issues/8614)
* :material-star:{ title="Feature" } Beschreibungselement "Herstellungsprozess" sollte in ein normales editierbares Textfeld geändert werden <br>[:octicons-link-external-16: REDMINE-8632](https://redmine.informationgrid.eu/issues/8632)
* :material-star:{ title="Feature" } X aus der Funktion "Teilen" im neuen Portal entfernen; weitere Anpassungen Portal-NG <br>[:octicons-link-external-16: REDMINE-8666](https://redmine.informationgrid.eu/issues/8666)
* :material-star:{ title="Feature" } Einrichtung eines JSON Merge Patch Prozesses zum Überschreiben des Datums "Letzte Änderung" <br>[:octicons-link-external-16: REDMINE-8815](https://redmine.informationgrid.eu/issues/8815)
* :octicons-bug-16:{ title="Bug Fix" } CSV-Export aus Portal-NG beinhaltet Informationen die falsch gedeutet werden können. <br>[:octicons-link-external-16: REDMINE-8710](https://redmine.informationgrid.eu/issues/8710)
* :octicons-bug-16:{ title="Bug Fix" } Aufruf der Metadaten mit Stamm-URL "https://rips-metadaten.lubw.de/trefferanzeige?oac=" ergibt Fehlermeldung <br>[:octicons-link-external-16: REDMINE-8888](https://redmine.informationgrid.eu/issues/8888)

### Profil MetaVer { id="8.3.0_changes_profil_metaver" }

* :octicons-bug-16:{ title="Bug Fix" } PORTAL: Link zur Verordnung Änderungen führt zu Fehler bei Objektklasse Anwendung <br>[:octicons-link-external-16: REDMINE-8724](https://redmine.informationgrid.eu/issues/8724)
* :octicons-bug-16:{ title="Bug Fix" } METAVER Startet nicht <br>[:octicons-link-external-16: REDMINE-8927](https://redmine.informationgrid.eu/issues/8927)

### Profil UPSH { id="8.3.0_changes_profil_upsh" }

* :material-star:{ title="Feature" } Portal: Verlinkung zu "Interner Bereich: Metadaten" aus Menü entfernen <br>[:octicons-link-external-16: REDMINE-8702](https://redmine.informationgrid.eu/issues/8702)

### Profil UVP { id="8.3.0_changes_profil_uvp" }

* :material-star:{ title="Feature" } IGE-NG: Umstrukturierung uvp-upload-check <br>[:octicons-link-external-16: REDMINE-5011](https://redmine.informationgrid.eu/issues/5011)
* :material-star:{ title="Feature" } Umgang mit hochgeladenen Dateien beim Kopieren von Datensätzen <br>[:octicons-link-external-16: REDMINE-6555](https://redmine.informationgrid.eu/issues/6555)
* :material-star:{ title="Feature" } Verbesserung der Fehlerbehandlung bei der Synchronisation mit UVP Monitoring <br>[:octicons-link-external-16: REDMINE-6709](https://redmine.informationgrid.eu/issues/6709)
* :material-star:{ title="Feature" } Monitoring: Verbesserung der Synchronisation gelöschter UVP Dokumente  <br>[:octicons-link-external-16: REDMINE-7017](https://redmine.informationgrid.eu/issues/7017)
* :octicons-bug-16:{ title="Bug Fix" } Veröffentlichungssteuerung bei Negative Vorprüfungen lässt sich nicht mehr auf ' Veröffentlichen' setzen <br>[:octicons-link-external-16: REDMINE-8305](https://redmine.informationgrid.eu/issues/8305)
* :octicons-bug-16:{ title="Bug Fix" } Kartenansicht: Verlinkungen haben falschen Titel <br>[:octicons-link-external-16: REDMINE-8688](https://redmine.informationgrid.eu/issues/8688)
* :octicons-bug-16:{ title="Bug Fix" } UVP: Fehlermeldung Datensatz inkonsistent <br>[:octicons-link-external-16: REDMINE-8743](https://redmine.informationgrid.eu/issues/8743)
* :octicons-bug-16:{ title="Bug Fix" } Bezeichnung von nicht zu veröffentlichenden neg. Vorprüfungen unglücklich <br>[:octicons-link-external-16: REDMINE-8851](https://redmine.informationgrid.eu/issues/8851)

### Komponenten

<div class="ingrid-component-list" markdown>

- CODELIST-REPOSITORY [:material-download: Download](https://distributions.informationgrid.eu/ingrid-codelist-repository/8.3.0/)
- IBUS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-ibus/8.3.0/)
- INTERFACE-CSW [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-csw/8.3.0/)
- INTERFACE-SEARCH [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-search/8.3.0/)
- IPLUG-BLP [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-blp/8.3.0/)
- IPLUG-SE [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-se/8.3.0/)

</div>

<hr>

