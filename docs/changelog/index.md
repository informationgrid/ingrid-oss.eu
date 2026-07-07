---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Deprecation Warnung InGrid 7.5.x ⚠️

Die Komponenten der InGrid Software in der Version 7.5.x werden offiziell nicht mehr unterstützt. Es werden keine
Sicherheitsupdates für diese Versionen bereitgestellt. Es wird dringend empfohlen auf die neusten Versionen der
Komponenten zu aktualisieren.




<hr>

### Hinweise für die Aktualisierung&nbsp;⚠️

#### InGrid Editor

Die Konfiguration des InGrid Editors hat sich für die Anbindung an Keycloak geändert. Die Authentisierung sowie
Autorisierung erfolgen nun vollständig im Backend.
Folgende Anpassungen müssen getätigt werden:

- Keycloak-Image `docker-registry.wemove.com/keycloak:26.5.6-2` sollte mindestens verwendet werden
    - dieses erzeugt einen neuen Client `editor`
    - über Umgebungsvariable `EDITOR_SECRET` wird das Secret für den Client definiert
    - die Umgebungsvariable `IGE_FRONTEND_URL` muss durch `EDITOR_URL` ersetzt werden
    - bei eigenem Keycloak bitte die Dokumentation beachten: [Keycloak](../components/keycloak.md)
- Anpassung der Editor-Konfiguration:
    - die Umgebungsvariable `KEYCLOAK_CLIENT_SECRET` muss das definierte Secret aus dem Keycloak-Client haben
    - die folgenden Umgebungsvariablen können entfernt werden:
        - `KEYCLOAK_BACKEND_USER`
        - `KEYCLOAK_BACKEND_USER_PASSWORD`
        - `KEYCLOAK_URL_FRONTEND`
    - prüfen, dass `KEYCLOAK_URL` die externe URL zu Keycloak enthält
    - `KEYCLOAK_URL_INTERNAL` setzen, mit der internen URL zu Keycloak (optional)


## Version 8.4.0 <small>06.07.2026</small> { id="8.4.0" data-toc-label="8.4.0"}

### Allgemein { id="8.4.0_changes_allgemein" }

* :material-star:{ title="Support" } BKG-MIS: Portal und ISO-XML: Dienst-MD - Ausgabe der räumlichen Auflösung (Maßstab,...) korrigieren <br>[:octicons-link-external-16: REDMINE-8897](https://redmine.informationgrid.eu/issues/8897)
* :material-star:{ title="Support" } Aktualisierung der Informationsanbieter (Codeliste 111) in MetaVer für HB <br>[:octicons-link-external-16: REDMINE-8973](https://redmine.informationgrid.eu/issues/8973)
* :material-star:{ title="Feature" } Barrierefreiheit Portal verbessern <br>[:octicons-link-external-16: REDMINE-6280](https://redmine.informationgrid.eu/issues/6280)
* :material-star:{ title="Feature" } "Ansprechpartner Metadaten" - Text in Editor und Portal vereinheitlichen <br>[:octicons-link-external-16: REDMINE-6707](https://redmine.informationgrid.eu/issues/6707)
* :material-star:{ title="Feature" } Transformation/Filterung der Ergebnisse der CSW Schnittstelle <br>[:octicons-link-external-16: REDMINE-7533](https://redmine.informationgrid.eu/issues/7533)
* :material-star:{ title="Feature" } Keycloak-Behandlung aus dem Frontend entfernen (Security) <br>[:octicons-link-external-16: REDMINE-8538](https://redmine.informationgrid.eu/issues/8538)
* :material-star:{ title="Feature" } Zeitbezug: Markierung der Pflichtfelder und Hilfetexte <br>[:octicons-link-external-16: REDMINE-8660](https://redmine.informationgrid.eu/issues/8660)
* :material-star:{ title="Feature" } Portal: auf Schlagwort klicken führt zu Suche mit diesem Begriff <br>[:octicons-link-external-16: REDMINE-8887](https://redmine.informationgrid.eu/issues/8887)
* :material-star:{ title="Feature" } OGC-API for Records - Abgabeformate <br>[:octicons-link-external-16: REDMINE-8978](https://redmine.informationgrid.eu/issues/8978)
* :material-star:{ title="Feature" } Einführung der Filtering nach Partner, Anbieter und Datenquelle <br>[:octicons-link-external-16: REDMINE-9155](https://redmine.informationgrid.eu/issues/9155)
* :material-star:{ title="Feature" } Erstellung einer Dokumentation für die neue CSW Komponente auf Basis von pyCSW <br>[:octicons-link-external-16: REDMINE-9156](https://redmine.informationgrid.eu/issues/9156)
* :material-star:{ title="Feature" } Portal: Kennzeichnung OpenData-Datensätze mit "offenes Schloss" Symbol <br>[:octicons-link-external-16: REDMINE-9219](https://redmine.informationgrid.eu/issues/9219)
* :octicons-bug-16:{ title="Bug Fix" } Baumupdates beim Anlegen mehrerer Dokumente gelichzeitig durch Assistent <br>[:octicons-link-external-16: REDMINE-8952](https://redmine.informationgrid.eu/issues/8952)
* :octicons-bug-16:{ title="Bug Fix" } Query in OpenSearch Schnittstelle funktioniert nicht auf dem OpenData DEMO System <br>[:octicons-link-external-16: REDMINE-9002](https://redmine.informationgrid.eu/issues/9002)
* :octicons-bug-16:{ title="Bug Fix" } Anpassung Lucene Mapping für "Aktualität des Datensatzes" <br>[:octicons-link-external-16: REDMINE-9055](https://redmine.informationgrid.eu/issues/9055)
* :octicons-bug-16:{ title="Bug Fix" } [WFS] Informationen werden vermischt, wenn Anzahl paralleler Abfragen > 1 <br>[:octicons-link-external-16: REDMINE-9056](https://redmine.informationgrid.eu/issues/9056)
* :octicons-bug-16:{ title="Bug Fix" } Zurücksetzen einer einzelnen Codeliste im Profil InGrid mit OpenData schlägt fehl <br>[:octicons-link-external-16: REDMINE-9071](https://redmine.informationgrid.eu/issues/9071)
* :octicons-bug-16:{ title="Bug Fix" } Unvollständiges Mapping für "Datensätze" führt zu fehlenden Ergebnissen im Portal <br>[:octicons-link-external-16: REDMINE-9135](https://redmine.informationgrid.eu/issues/9135)
* :octicons-bug-16:{ title="Bug Fix" } Löschen Button Ausrichtung bei Select-Boxen Suche ist falsch <br>[:octicons-link-external-16: REDMINE-9161](https://redmine.informationgrid.eu/issues/9161)
* :octicons-bug-16:{ title="Bug Fix" } Portal: Icon für "Datensätze" ändern <br>[:octicons-link-external-16: REDMINE-9180](https://redmine.informationgrid.eu/issues/9180)
* :octicons-bug-16:{ title="Bug Fix" } Editor: "Eintrag bearbeiten" bei Tabelle <br>[:octicons-link-external-16: REDMINE-9204](https://redmine.informationgrid.eu/issues/9204)
* :octicons-bug-16:{ title="Bug Fix" } ingrid_meta wird fehlerhafterweise nicht vollständig aktualisiert <br>[:octicons-link-external-16: REDMINE-9223](https://redmine.informationgrid.eu/issues/9223)
* :octicons-bug-16:{ title="Bug Fix" } Timeouts beim Harvesten einer CSW-Datenquelle werden nicht geloggt/führen nicht zum Abbruch <br>[:octicons-link-external-16: REDMINE-9225](https://redmine.informationgrid.eu/issues/9225)
* :octicons-bug-16:{ title="Bug Fix" } ingrid-with-opendata: Export: 2x "Open-Data Index" als Export Format in drop-down, nur einer Funktioniert <br>[:octicons-link-external-16: REDMINE-9233](https://redmine.informationgrid.eu/issues/9233)
* :octicons-bug-16:{ title="Bug Fix" } RaceCondition beim Schreiben des Audit-Logs in die Datenbank <br>[:octicons-link-external-16: REDMINE-9251](https://redmine.informationgrid.eu/issues/9251)

### Profil BAW { id="8.4.0_changes_profil_baw" }

* :octicons-bug-16:{ title="Bug Fix" } Raumbezugssystem Tag hat den falschen data-cy- Tag <br>[:octicons-link-external-16: REDMINE-8866](https://redmine.informationgrid.eu/issues/8866)

### Profil BASt { id="8.4.0_changes_profil_bast" }

* :material-star:{ title="Feature" } Link in Hilfetext aktualisieren <br>[:octicons-link-external-16: REDMINE-8898](https://redmine.informationgrid.eu/issues/8898)

### Profil BAW MIS { id="8.4.0_changes_profil_baw_mis" }

* :material-star:{ title="Feature" } Rollenspezifische Bearbeitbarkeit von Feldern definieren <br>[:octicons-link-external-16: REDMINE-8136](https://redmine.informationgrid.eu/issues/8136)
* :material-star:{ title="Feature" } Konzeption Kategorisierte Combobox <br>[:octicons-link-external-16: REDMINE-8709](https://redmine.informationgrid.eu/issues/8709)
* :material-star:{ title="Feature" } Editor: Kategorisierte Darstellung der BAW-Schlagworte <br>[:octicons-link-external-16: REDMINE-8716](https://redmine.informationgrid.eu/issues/8716)
* :material-star:{ title="Feature" } Editor: Einführen von optionalen Sektionen und Erweiterung der optionalen Felder <br>[:octicons-link-external-16: REDMINE-8939](https://redmine.informationgrid.eu/issues/8939)
* :material-star:{ title="Feature" } Anzeige der Kontexthilfe Buttons auch ohne Hover <br>[:octicons-link-external-16: REDMINE-8948](https://redmine.informationgrid.eu/issues/8948)
* :material-star:{ title="Feature" } Editor: Neue Felder in der Objektklasse Simulation <br>[:octicons-link-external-16: REDMINE-8964](https://redmine.informationgrid.eu/issues/8964)
* :material-star:{ title="Feature" } Editor: zu CFD-Simulationen "Weitere Simulationsdaten" eingeben können <br>[:octicons-link-external-16: REDMINE-8975](https://redmine.informationgrid.eu/issues/8975)
* :octicons-bug-16:{ title="Bug Fix" } Indexierungsfehler in Archiv- bzw. LFS-Links <br>[:octicons-link-external-16: REDMINE-8960](https://redmine.informationgrid.eu/issues/8960)
* :octicons-bug-16:{ title="Bug Fix" } Einige Felder werden bei der Freitextsuche nicht berücksichtigt <br>[:octicons-link-external-16: REDMINE-8995](https://redmine.informationgrid.eu/issues/8995)
* :octicons-bug-16:{ title="Bug Fix" } Automatisch zugewiesene Realm-Rolle "ige-user" wird vom IGE nicht erkannt <br>[:octicons-link-external-16: REDMINE-9029](https://redmine.informationgrid.eu/issues/9029)

### Profil BKG { id="8.4.0_changes_profil_bkg" }

* :octicons-bug-16:{ title="Bug Fix" } Portal AdV-MIS und BKG-MIS: Kontaktformular - Layout der Zusammenfassung <br>[:octicons-link-external-16: REDMINE-8844](https://redmine.informationgrid.eu/issues/8844)
* :octicons-bug-16:{ title="Bug Fix" } Portal: AdV-MIS und evtl. BKG-MIS: Kontaktformular - in versendeter Mail fehlt eine Angabe <br>[:octicons-link-external-16: REDMINE-9092](https://redmine.informationgrid.eu/issues/9092)
* :octicons-bug-16:{ title="Bug Fix" } AdV-MIS: Portal: Klick im Navigationspanel (Detailanzeige) führt auf falsche Seiten-Ansicht <br>[:octicons-link-external-16: REDMINE-9124](https://redmine.informationgrid.eu/issues/9124)

### Profil KRZN { id="8.4.0_changes_profil_krzn" }

* :octicons-bug-16:{ title="Bug Fix" } rsync hängt sich bei Portal-Container Startup auf <br>[:octicons-link-external-16: REDMINE-8919](https://redmine.informationgrid.eu/issues/8919)

### Profil LfU Bayern { id="8.4.0_changes_profil_lfu_bayern" }

* :octicons-bug-16:{ title="Bug Fix" } Portal-Administration ermöglichen <br>[:octicons-link-external-16: REDMINE-9015](https://redmine.informationgrid.eu/issues/9015)

### Profil LUBW { id="8.4.0_changes_profil_lubw" }

* :material-star:{ title="Feature" } Defaulteinstellung für Beschreibungselement "Identifikator der Datenquelle*"  <br>[:octicons-link-external-16: REDMINE-8633](https://redmine.informationgrid.eu/issues/8633)
* :octicons-bug-16:{ title="Bug Fix" } Anfragen über das Kontaktformular ergeben eine Fehlermeldung und erreichen uns nicht <br>[:octicons-link-external-16: REDMINE-9076](https://redmine.informationgrid.eu/issues/9076)

### Profil MetaVer { id="8.4.0_changes_profil_metaver" }

* :material-star:{ title="Feature" } OpenData-Facetten im Portal (TEST) einblenden <br>[:octicons-link-external-16: REDMINE-9024](https://redmine.informationgrid.eu/issues/9024)
* :material-star:{ title="Feature" } Kommunaler MDK ST, Anpassung ingrid-with-opendata Profil <br>[:octicons-link-external-16: REDMINE-9025](https://redmine.informationgrid.eu/issues/9025)

### Profil NUMIS { id="8.4.0_changes_profil_numis" }

* :material-star:{ title="Feature" } Umstellung Portal auf neue Portal-Technologie <br>[:octicons-link-external-16: REDMINE-8023](https://redmine.informationgrid.eu/issues/8023)

### Profil RLP { id="8.4.0_changes_profil_rlp" }

* :material-star:{ title="Support" } Aktualisierung der Ministerien (Codeliste 111) für Rheinland Pfalz <br>[:octicons-link-external-16: REDMINE-9133](https://redmine.informationgrid.eu/issues/9133)

### Profil UVP { id="8.4.0_changes_profil_uvp" }

* :octicons-bug-16:{ title="Bug Fix" } Refactoring des Zabbix-Aufräumjobs und Dokumentation <br>[:octicons-link-external-16: REDMINE-8319](https://redmine.informationgrid.eu/issues/8319)
* :octicons-bug-16:{ title="Bug Fix" } Fehler bei Zabbix-Service während der Indizierung <br>[:octicons-link-external-16: REDMINE-9083](https://redmine.informationgrid.eu/issues/9083)
* :octicons-bug-16:{ title="Bug Fix" } Raumbezugssuche im Portal funktioniert nicht mehr <br>[:octicons-link-external-16: REDMINE-9086](https://redmine.informationgrid.eu/issues/9086)
* :octicons-bug-16:{ title="Bug Fix" } Zabbix Jobs werden nicht abgebaut <br>[:octicons-link-external-16: REDMINE-9097](https://redmine.informationgrid.eu/issues/9097)

### Komponenten

<div class="ingrid-component-list" markdown>

- CODELIST-REPOSITORY [:material-download: Download](https://distributions.informationgrid.eu/ingrid-codelist-repository/8.4.0/)
- IBUS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-ibus/8.4.0/)
- INTERFACE-CSW [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-csw/8.4.0/)
- INTERFACE-SEARCH [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-search/8.4.0/)
- IPLUG-BLP [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-blp/8.4.0/)
- IPLUG-SE [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-se/8.4.0/)

</div>

<hr>
