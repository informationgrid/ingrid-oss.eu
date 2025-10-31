---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Version 8.1.1 <small>31.10.2025</small> { id="8.1.1" data-toc-label="8.1.1"}

### Allgemein { id="8.1.1_changes_allgemein" }

* :octicons-bug-16:{ title="Bug Fix" } OPENSEARCH Links zum Portal stimmen nicht <br>[:octicons-link-external-16: REDMINE-8295](https://redmine.informationgrid.eu/issues/8295)
* :octicons-bug-16:{ title="Bug Fix" } Formular kann nicht seitlich gescrollt werden <br>[:octicons-link-external-16: REDMINE-8348](https://redmine.informationgrid.eu/issues/8348)

### Profil BASt { id="8.1.1_changes_profil_bast" }

* :octicons-bug-16:{ title="Bug Fix" } Portal-NG: Korrekturen internes Portal <br>[:octicons-link-external-16: REDMINE-8320](https://redmine.informationgrid.eu/issues/8320)

### Profil BAW MIS { id="8.1.1_changes_profil_baw_mis" }

* :material-star:{ title="Feature" } Benutzerhandbuch Editor erstellen <br>[:octicons-link-external-16: REDMINE-8253](https://redmine.informationgrid.eu/issues/8253)
* :octicons-bug-16:{ title="Bug Fix" } Automatisierte Rollenzuweisung im Keycloak funktioniert nicht <br>[:octicons-link-external-16: REDMINE-8300](https://redmine.informationgrid.eu/issues/8300)
* :octicons-bug-16:{ title="Bug Fix" } Probleme mit dem CSW-T Import <br>[:octicons-link-external-16: REDMINE-8353](https://redmine.informationgrid.eu/issues/8353)

### Profil BKG { id="8.1.1_changes_profil_bkg" }

* :material-star:{ title="Feature" } Portal-NG: Weitere Anpassungen und Korrekturen für AdV-MIS <br>[:octicons-link-external-16: REDMINE-8325](https://redmine.informationgrid.eu/issues/8325)
* :material-star:{ title="Feature" } Portal-NG: Weitere Anpassungen und Korrekturen für BKG-MIS <br>[:octicons-link-external-16: REDMINE-8326](https://redmine.informationgrid.eu/issues/8326)

### Profil HMDK { id="8.1.1_changes_profil_hmdk" }

* :octicons-bug-16:{ title="Bug Fix" } INSPIRE Datensätze markiert mit "nicht konform" in JSON Schema Validierung aufnehmen <br>[:octicons-link-external-16: REDMINE-8407](https://redmine.informationgrid.eu/issues/8407)

### Profil LUBW { id="8.1.1_changes_profil_lubw" }

* :material-star:{ title="Feature" } Beschreibungsfeld bei Sachattributen und Geometrien bitte dynamisch skalierbar machen <br>[:octicons-link-external-16: REDMINE-8310](https://redmine.informationgrid.eu/issues/8310)

### Profil LfU Bayern { id="8.1.1_changes_profil_lfu_bayern" }

* :octicons-bug-16:{ title="Bug Fix" } Editor: dateStamp in der ISO-Ansicht korrigieren <br>[:octicons-link-external-16: REDMINE-8405](https://redmine.informationgrid.eu/issues/8405)

### Profil UVP { id="8.1.1_changes_profil_uvp" }

* :material-star:{ title="Feature" } Verbesserung der Fehlerbehandlung bei der Synchronisation mit UVP Monitoring <br>[:octicons-link-external-16: REDMINE-6709](https://redmine.informationgrid.eu/issues/6709)
* :octicons-bug-16:{ title="Bug Fix" } Download von Dokumenten als ZIP unvollständig <br>[:octicons-link-external-16: REDMINE-8351](https://redmine.informationgrid.eu/issues/8351)
* :octicons-bug-16:{ title="Bug Fix" } Zabbix-Aufräumjob erzeugt Fehler bei ungültiger Email <br>[:octicons-link-external-16: REDMINE-8412](https://redmine.informationgrid.eu/issues/8412)

### Komponenten

<div class="ingrid-component-list" markdown>

- INTERFACE-SEARCH [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-search/8.1.1/)

</div>

<hr>


## Version 8.1.0 <small>10.10.2025</small> { id="8.1.0" data-toc-label="8.1.0"}


### Hinweise für die Aktualisierung&nbsp;⚠️

#### Interface-Search

Durch die Aktualisierung der Interface-Search Komponenten muss die Konfiguration angepasst werden.
Aus der Datei `interface-search.properties`  muss das Zeichen '/' vor dem `?` aus den folgenden Einträgen entfernt werden:

* atom.download.opensearch.describe.spatial.dataset.template
* atom.download.opensearch.get.spatial.dataset.template

Ein korrekter Eintrag sieht bspw. so aus:

```
atom.download.opensearch.describe.spatial.dataset.template=/dataset/{servicefeed-uuid}?spatial_dataset_identifier_code=...
```

### Wichtige Änderungen&nbsp;⚠️

#### Das Neue Portal

Sowohl Rheinland-Pfalz als auch der Hamburger Metadatenkatalog profitieren ab Version 8.1.0 vom neuen Portal. Hinweise und Informationen zum neuen Portal können in den Release Notes zu Version 8.0.0 eingesehen oder in der Dokumentation nachgelesen werden.

[:octicons-link-external-16: REDMINE-7968](https://redmine.informationgrid.eu/issues/7968)
[:octicons-link-external-16: REDMINE-7971](https://redmine.informationgrid.eu/issues/7971)


#### Kontexthilfen für Harvester Formulare

Mit dieser Version kommen Kontexthilfen hinzu. Zwar existiert bereits eine allgemeine Ausfüllhilfe für den CSW-Harvester in der InGrid-Dokumentation, jedoch muss diese vom Benutzer aktiv aufgerufen werden und keinen direkten Bezug zum konkreten Kontext bietet. Damit wird die Usabillity des Harvesters deutlisch verbessert.

![InGrid Harvester: "Harvester bearbeiten"](../assets/changelog/810_harvester_edit-harvester_context-helpers_1.png "InGrid Harvester: "Harvester bearbeiten"")
<figcaption class="figcaption">InGrid Harvester: "Harvester bearbeiten"</figcaption>

![InGrid Harvester: "Harvester Kontexthilfen"](../assets/changelog/810_harvester_edit-harvester_context-helpers_2.png "InGrid Harvester: "Harvester Kontexthilfen"")
<figcaption class="figcaption">InGrid Harvester: "Harvester Kontexthilfen"</figcaption>

[:octicons-link-external-16: REDMINE-5686](https://redmine.informationgrid.eu/issues/5686)


#### Ablöse WFS iPlug durch InGrid Harvester

Die Integration der Harvester-IPlugs geht voran. Im Zuge der Vereinheitlichung der Harvesting Komponenten ist mit dieser Version auch das WFS-IPlug im Harvester integriert.

![InGrid Harvester: "Ablöse WFS iPlug durch InGrid Harvester"](../assets/changelog/810_harvester_configure-harvester_integration-of-wfs.png "InGrid Harvester: "Ablöse WFS iPlug durch InGrid Harvester"")
<figcaption class="figcaption">InGrid Harvester: "Ablöse WFS iPlug durch InGrid Harvester"</figcaption>

[:octicons-link-external-16: REDMINE-7456](https://redmine.informationgrid.eu/issues/7456)

#### Passwortgeschützte Dienste über Capabilites-Assistent anlegen

Zur Prüfung der Capabilities einer CSW-Schnittstelle kann der GetCapabilities-Assistent des InGrid-Editors verwendet werden. Bisher war es nicht möglich, passwortgeschützte Capabilities zu analysieren. Mit InGrid Update 8.1.0 öffnet sich bei Betätigung des Analyse-Buttons eine Anmeldemaske, falls Anmeldedaten erforderlich sind.

![InGrid Editor: "GetCapabilities Assistent"](../assets/changelog/810_ingrid_editor_getcapabilities-assistent_ask-for-credentials_1.png "InGrid Editor: "GetCapabilities Assistent"")
<figcaption class="figcaption">InGrid Editor: "GetCapabilities Assistent"</figcaption>

![InGrid Editor: "GetCapabilities Anmeldedaten"](../assets/changelog/810_ingrid_editor_getcapabilities-assistent_ask-for-credentials_2.png "InGrid Editor: "GetCapabilities Anmeldedaten"")
<figcaption class="figcaption">InGrid Editor: "GetCapabilities Anmeldedaten"</figcaption>

[:octicons-link-external-16: REDMINE-7750](https://redmine.informationgrid.eu/issues/7750)

#### Sortierung der Verweise im Portal: Reihenfolge aus Editor übernehmen

Bisher wurden die Verweise im Portal alphabetisch sortiert, auch wenn eine andere, frei gewählte Sortierung im Editor gespeichert wurde. Um den Nutzer*innen die Möglichkeit zur Visuellen-Schwerpunktsetzung zu geben, wurde hier die Kontinuität zwischen Editor und Portal umgesetzt.

![InGrid Editor: "Sortierung Verweise"](../assets/changelog/810_ingrid-editor_catalogue_edit_sort-links.png "InGrid Editor: "Sortierung Verweise"")
<figcaption class="figcaption">InGrid Editor: "Sortierung Verweise"</figcaption>

[:octicons-link-external-16: REDMINE-7194](https://redmine.informationgrid.eu/issues/7194)

#### Person, die Import durchführt als "Verantwortlich" setzen

Diese neue Funktion erleichtert den Importprozess, da Autoren nicht mehr auf die Unterstützung von Metadaten- oder Katalogadministratoren angewiesen sind.

Bisher war es so, dass bei einem XML-Import keine verantwortliche Person gesetzt wurde, was zu fehlenden Benachrichtigungen führte. Die Verantwortlichkeit konnte nur manuell von einem Metadaten- oder Katalogadministrator für jeden Datensatz geändert werden, was besonders bei Massenimports umständlich war. Die Datenbankebene bot zwar eine einfache Lösung, erfordert jedoch ein separates Support-Ticket.

Mit der neuen Funktion wird die Verantwortlichkeit direkt der erstellenden Person zugewiesen, was den Prozess erheblich vereinfacht.

[:octicons-link-external-16: REDMINE-6265](https://redmine.informationgrid.eu/issues/6265)


### Allgemein { id="8.1.0_changes_allgemein" }

* :material-star:{ title="Feature" } Fehlerbehebung der ATOM Download Service Schnittstelle <br>[:octicons-link-external-16: REDMINE-4771](https://redmine.informationgrid.eu/issues/4771)
* :material-star:{ title="Feature" } Stacktraces aus Fehlerresponses entfernen <br>[:octicons-link-external-16: REDMINE-5773](https://redmine.informationgrid.eu/issues/5773)
* :material-star:{ title="Feature" } Person, die Import durchführt als "Verantwortlich" setzen <br>[:octicons-link-external-16: REDMINE-6265](https://redmine.informationgrid.eu/issues/6265)
* :material-star:{ title="Feature" } Liste der Datenformate erweitern <br>[:octicons-link-external-16: REDMINE-7045](https://redmine.informationgrid.eu/issues/7045)
* :material-star:{ title="Feature" } Editor: Datenformat - Pflichtangabe bei INSPIRE-relevanten Diensten <br>[:octicons-link-external-16: REDMINE-7048](https://redmine.informationgrid.eu/issues/7048)
* :material-star:{ title="Feature" } "Merkmale" - Dialoge und Hilfetexte überarbeiten <br>[:octicons-link-external-16: REDMINE-7151](https://redmine.informationgrid.eu/issues/7151)
* :material-star:{ title="Feature" } Refactoring der IGE-NG Dashboard Statistik <br>[:octicons-link-external-16: REDMINE-7440](https://redmine.informationgrid.eu/issues/7440)
* :material-star:{ title="Feature" } Ablöse WFS iPlug durch InGrid Harvester <br>[:octicons-link-external-16: REDMINE-7456](https://redmine.informationgrid.eu/issues/7456)
* :material-star:{ title="Feature" } Kontexthilfen für Harvester Formulare <br>[:octicons-link-external-16: REDMINE-7563](https://redmine.informationgrid.eu/issues/7563)
* :material-star:{ title="Feature" } Bessere Index-Namen für den Katalognamen <br>[:octicons-link-external-16: REDMINE-7711](https://redmine.informationgrid.eu/issues/7711)
* :material-star:{ title="Feature" } Passwortgeschützte Dienste über Capabilites-Assistent anlegen <br>[:octicons-link-external-16: REDMINE-7750](https://redmine.informationgrid.eu/issues/7750)
* :material-star:{ title="Feature" } Bold-Fonts entfernen <br>[:octicons-link-external-16: REDMINE-7805](https://redmine.informationgrid.eu/issues/7805)
* :material-star:{ title="Feature" } Elasticsearch 9 Unterstützung im Harvester <br>[:octicons-link-external-16: REDMINE-7925](https://redmine.informationgrid.eu/issues/7925)
* :material-star:{ title="Feature" } Kryptische Fehlermeldung sollte leicht verständlicher Text werden <br>[:octicons-link-external-16: REDMINE-8027](https://redmine.informationgrid.eu/issues/8027)
* :material-star:{ title="Feature" } Statistik Anzeige ändern <br>[:octicons-link-external-16: REDMINE-8076](https://redmine.informationgrid.eu/issues/8076)
* :material-star:{ title="Feature" } ISO-Import mit Codelist-IDs und Values <br>[:octicons-link-external-16: REDMINE-8119](https://redmine.informationgrid.eu/issues/8119)
* :material-star:{ title="Feature" } Anzeige von Datensätzen mit Schreibrechten <br>[:octicons-link-external-16: REDMINE-8163](https://redmine.informationgrid.eu/issues/8163)
* :material-star:{ title="Feature" } Mapclient: Parametrisierter Aufruf der Streckensuche <br>[:octicons-link-external-16: REDMINE-8216](https://redmine.informationgrid.eu/issues/8216)
* :material-star:{ title="Feature" } MAPCLIENT: Erweiterung Streckenlocator um Betriebsstellensuche <br>[:octicons-link-external-16: REDMINE-8262](https://redmine.informationgrid.eu/issues/8262)
* :octicons-bug-16:{ title="Bug Fix" } serviceType bei INSPIRE-relevanten Diensten <br>[:octicons-link-external-16: REDMINE-5806](https://redmine.informationgrid.eu/issues/5806)
* :octicons-bug-16:{ title="Bug Fix" } Anzeige von leeren Ordnern im Portal trotz Löschung der enthaltenen veröffentlichten Daten  <br>[:octicons-link-external-16: REDMINE-6230](https://redmine.informationgrid.eu/issues/6230)
* :octicons-bug-16:{ title="Bug Fix" } Thesauri laden sehr langsam <br>[:octicons-link-external-16: REDMINE-7247](https://redmine.informationgrid.eu/issues/7247)
* :octicons-bug-16:{ title="Bug Fix" } IGE-NG - Vergleichsansicht: OpenData / HVD wird nicht hervorgehoben <br>[:octicons-link-external-16: REDMINE-7699](https://redmine.informationgrid.eu/issues/7699)
* :octicons-bug-16:{ title="Bug Fix" } JSON-Validierungsfehler Raster-/Gridformat <br>[:octicons-link-external-16: REDMINE-7800](https://redmine.informationgrid.eu/issues/7800)
* :octicons-bug-16:{ title="Bug Fix" } Aktualität der Metadaten bei Export/Import <br>[:octicons-link-external-16: REDMINE-7872](https://redmine.informationgrid.eu/issues/7872)
* :octicons-bug-16:{ title="Bug Fix" } Importer liest aus den Adressen kein Telefon/Fax? <br>[:octicons-link-external-16: REDMINE-7991](https://redmine.informationgrid.eu/issues/7991)
* :octicons-bug-16:{ title="Bug Fix" } Open Search rdf Paging Links enhalten keine Page Aufrufe <br>[:octicons-link-external-16: REDMINE-8007](https://redmine.informationgrid.eu/issues/8007)
* :octicons-bug-16:{ title="Bug Fix" } Schlagworte konsolidieren funktioniert nicht für Autoren <br>[:octicons-link-external-16: REDMINE-8016](https://redmine.informationgrid.eu/issues/8016)
* :octicons-bug-16:{ title="Bug Fix" } Langsames Drag'n'Drop Verhalten bei Vorschaugrafiken <br>[:octicons-link-external-16: REDMINE-8025](https://redmine.informationgrid.eu/issues/8025)
* :octicons-bug-16:{ title="Bug Fix" } JSON-Schema-Validierung Fehler bei Literatur- MD mit Dateiupload <br>[:octicons-link-external-16: REDMINE-8030](https://redmine.informationgrid.eu/issues/8030)
* :octicons-bug-16:{ title="Bug Fix" } Fehler beim Erstellen eines Benutzer <br>[:octicons-link-external-16: REDMINE-8041](https://redmine.informationgrid.eu/issues/8041)
* :octicons-bug-16:{ title="Bug Fix" } Migration kann zu falschen Datensatzänderungen führen <br>[:octicons-link-external-16: REDMINE-8050](https://redmine.informationgrid.eu/issues/8050)
* :octicons-bug-16:{ title="Bug Fix" } ISO Import enthält unnötige Leerzeichen und Zeilenumbrüche - URI von Dateien können nicht gematch werden <br>[:octicons-link-external-16: REDMINE-8063](https://redmine.informationgrid.eu/issues/8063)
* :octicons-bug-16:{ title="Bug Fix" } IGE: Geodatendienste: Systemumgebung und Historie erscheinen nicht unter "Weitere Informationen" wie bei der Anwendung <br>[:octicons-link-external-16: REDMINE-8066](https://redmine.informationgrid.eu/issues/8066)
* :octicons-bug-16:{ title="Bug Fix" } Wiedervorlage E-Mail muss aus Profil genommen werden <br>[:octicons-link-external-16: REDMINE-8072](https://redmine.informationgrid.eu/issues/8072)
* :octicons-bug-16:{ title="Bug Fix" } Report - Abgelaufene Metadaten - Veröffentlicht mit Bearbeitungsversion wird nicht berücksichtigt <br>[:octicons-link-external-16: REDMINE-8081](https://redmine.informationgrid.eu/issues/8081)
* :octicons-bug-16:{ title="Bug Fix" } Fehler beim erstellen von Addressen wenn Template für Titel vorhanden ist <br>[:octicons-link-external-16: REDMINE-8105](https://redmine.informationgrid.eu/issues/8105)
* :octicons-bug-16:{ title="Bug Fix" } 'Zugang geschützt' Label fehlt in der Detailansicht <br>[:octicons-link-external-16: REDMINE-8142](https://redmine.informationgrid.eu/issues/8142)
* :octicons-bug-16:{ title="Bug Fix" } Benutzerverwaltung - Änderung Gruppe wird nicht gegen Verantwortlichkeit gecheckt <br>[:octicons-link-external-16: REDMINE-8149](https://redmine.informationgrid.eu/issues/8149)
* :octicons-bug-16:{ title="Bug Fix" } Aktualisierung der Bibliotheken <br>[:octicons-link-external-16: REDMINE-8151](https://redmine.informationgrid.eu/issues/8151)
* :octicons-bug-16:{ title="Bug Fix" } DOI Codelistenwerte nicht auswählbar <br>[:octicons-link-external-16: REDMINE-8175](https://redmine.informationgrid.eu/issues/8175)
* :octicons-bug-16:{ title="Bug Fix" } Amtsinterne Adressen nicht als untergeordnete Adressen anzeigen <br>[:octicons-link-external-16: REDMINE-8196](https://redmine.informationgrid.eu/issues/8196)
* :octicons-bug-16:{ title="Bug Fix" } Editor: URL in Willkommens-E-Mail richtig zusammensetzen <br>[:octicons-link-external-16: REDMINE-8211](https://redmine.informationgrid.eu/issues/8211)
* :octicons-bug-16:{ title="Bug Fix" }  IGE-NG - Vergleichsansicht: Zuviele Felder werden als geändert markiert <br>[:octicons-link-external-16: REDMINE-8249](https://redmine.informationgrid.eu/issues/8249)
* :octicons-bug-16:{ title="Bug Fix" } JSON-Schema Fehler bei fehlender Service-URL Erklärung <br>[:octicons-link-external-16: REDMINE-8267](https://redmine.informationgrid.eu/issues/8267)
* :octicons-bug-16:{ title="Bug Fix" } Portal kann nicht alle Anfragen beantworten <br>[:octicons-link-external-16: REDMINE-8274](https://redmine.informationgrid.eu/issues/8274)
* :octicons-bug-16:{ title="Bug Fix" } Falscher Style im Hierarchiebaum für einen Baumknoten <br>[:octicons-link-external-16: REDMINE-8283](https://redmine.informationgrid.eu/issues/8283)
* :octicons-bug-16:{ title="Bug Fix" } Kopieren mit Teilbaum führt zur Fehlfunktion bei hochgeladenen Dateien <br>[:octicons-link-external-16: REDMINE-8293](https://redmine.informationgrid.eu/issues/8293)
* :octicons-bug-16:{ title="Bug Fix" } Detailansicht zeigt "0"-Werte nicht an <br>[:octicons-link-external-16: REDMINE-8303](https://redmine.informationgrid.eu/issues/8303)
* :octicons-bug-16:{ title="Bug Fix" } Portal-NG: Inkonsistenz bei Aktualität der Daten <br>[:octicons-link-external-16: REDMINE-8306](https://redmine.informationgrid.eu/issues/8306)
* :octicons-bug-16:{ title="Bug Fix" } CSW-T Insert verursacht NullPointerException <br>[:octicons-link-external-16: REDMINE-8308](https://redmine.informationgrid.eu/issues/8308)
* :octicons-bug-16:{ title="Bug Fix" } Falsche Berechtigungsprüfung beim Import <br>[:octicons-link-external-16: REDMINE-8318](https://redmine.informationgrid.eu/issues/8318)

### OGC-API für InGrid { id="8.1.0_changes_ogc-api_für_ingrid" }

* :material-star:{ title="Feature" } OGC API für EIA Format ertüchtigen <br>[:octicons-link-external-16: REDMINE-7832](https://redmine.informationgrid.eu/issues/7832)

### Profil BASt { id="8.1.0_changes_profil_bast" }

* :material-star:{ title="Feature" } BASt: Umstellung Portale auf neue Portal-Technologie (Erste Umsetzung) <br>[:octicons-link-external-16: REDMINE-7767](https://redmine.informationgrid.eu/issues/7767)

### Profil BAW MIS { id="8.1.0_changes_profil_baw_mis" }

* :octicons-bug-16:{ title="Bug Fix" } Ressourcen Typ, falsche Fehlermeldung bei Validierung <br>[:octicons-link-external-16: REDMINE-8135](https://redmine.informationgrid.eu/issues/8135)

### Profil BKG { id="8.1.0_changes_profil_bkg" }

* :material-star:{ title="Feature" } BKG-MIS + AdV-MIS: Umstellung Portal auf Neue Portal Technologie <br>[:octicons-link-external-16: REDMINE-6500](https://redmine.informationgrid.eu/issues/6500)
* :octicons-bug-16:{ title="Bug Fix" } Harvester kann sich nicht über Proxy mit CSW-Quelle verbinden <br>[:octicons-link-external-16: REDMINE-8103](https://redmine.informationgrid.eu/issues/8103)

### Profil HMDK { id="8.1.0_changes_profil_hmdk" }

* :material-star:{ title="Feature" } Serverseitige Validierung beim Einliefern über die OGC-API Records Schnittstelle <br>[:octicons-link-external-16: REDMINE-7211](https://redmine.informationgrid.eu/issues/7211)
* :material-star:{ title="Feature" } HMDK: Umstellung Portal auf neue Portal-Technologie <br>[:octicons-link-external-16: REDMINE-7971](https://redmine.informationgrid.eu/issues/7971)

### Profil KRZN { id="8.1.0_changes_profil_krzn" }

* :material-star:{ title="Feature" } KRZN: Umstellung Portal auf neue Portal-Technologie (erste Umsetzung) <br>[:octicons-link-external-16: REDMINE-8022](https://redmine.informationgrid.eu/issues/8022)
* :material-star:{ title="Feature" } Anpassung Hilfe aufgrund von Änderungen in der Suchergebnisseite mit 7.5.0 <br>[:octicons-link-external-16: REDMINE-8228](https://redmine.informationgrid.eu/issues/8228)
* :material-star:{ title="Feature" } Update Text auf Portal-Startseite für Erkrath <br>[:octicons-link-external-16: REDMINE-8229](https://redmine.informationgrid.eu/issues/8229)
* :octicons-bug-16:{ title="Bug Fix" } Zeilenumbrüche in der Beschreibung im Portal anzeigen <br>[:octicons-link-external-16: REDMINE-8126](https://redmine.informationgrid.eu/issues/8126)

### Profil LfU Bayern { id="8.1.0_changes_profil_lfu_bayern" }

* :material-star:{ title="Feature" } Filterung/Kennzeichnung von WWA-AB-Daten im LfU-Bayern Portal <br>[:octicons-link-external-16: REDMINE-7548](https://redmine.informationgrid.eu/issues/7548)
* :material-star:{ title="Feature" } E-Mail über abgelaufene Metadaten anpassen <br>[:octicons-link-external-16: REDMINE-7785](https://redmine.informationgrid.eu/issues/7785)
* :material-star:{ title="Feature" } LFU_MIS: Umstellung Portal auf neue Portal-Technologie <br>[:octicons-link-external-16: REDMINE-7891](https://redmine.informationgrid.eu/issues/7891)
* :octicons-bug-16:{ title="Bug Fix" } Eintrag "WMS-URL"  bzw. "Dienste-URL" im Anwendungsprofil ist verloren gegangen <br>[:octicons-link-external-16: REDMINE-8082](https://redmine.informationgrid.eu/issues/8082)

### Profil MetaVer { id="8.1.0_changes_profil_metaver" }

* :material-star:{ title="Feature" } Sortierung der Verweise im Portal: Reihenfolge aus Editor übernehmen <br>[:octicons-link-external-16: REDMINE-7194](https://redmine.informationgrid.eu/issues/7194)
* :material-star:{ title="Feature" } BB: NSG, LSG - Link zur Verordnung prominent darstellen <br>[:octicons-link-external-16: REDMINE-7756](https://redmine.informationgrid.eu/issues/7756)
* :octicons-bug-16:{ title="Bug Fix" } Suche nach "Seveso" liefert kein Ergebnis <br>[:octicons-link-external-16: REDMINE-7942](https://redmine.informationgrid.eu/issues/7942)
* :octicons-bug-16:{ title="Bug Fix" } webmap client: "Erstelle pdf für Druck" funktioniert nicht <br>[:octicons-link-external-16: REDMINE-8238](https://redmine.informationgrid.eu/issues/8238)

### Profil RLP { id="8.1.0_changes_profil_rlp" }

* :material-star:{ title="Feature" } RLP_PortalU: Umstellung Portal auf neue Portal-Technologie <br>[:octicons-link-external-16: REDMINE-7968](https://redmine.informationgrid.eu/issues/7968)

### Profil UVP { id="8.1.0_changes_profil_uvp" }

* :material-star:{ title="Feature" } Verbesserung der Robustheit der Synchronisation mit UVP Monitoring <br>[:octicons-link-external-16: REDMINE-6710](https://redmine.informationgrid.eu/issues/6710)
* :material-star:{ title="Feature" } Aufräum-Job für Zabbix für Verfahren <br>[:octicons-link-external-16: REDMINE-7824](https://redmine.informationgrid.eu/issues/7824)
* :octicons-bug-16:{ title="Bug Fix" } Default Codeliste für UVP-Nummer führt zu Fehler <br>[:octicons-link-external-16: REDMINE-7952](https://redmine.informationgrid.eu/issues/7952)
* :octicons-bug-16:{ title="Bug Fix" } Sortierung Suchergebnisliste anpassen <br>[:octicons-link-external-16: REDMINE-8090](https://redmine.informationgrid.eu/issues/8090)
* :octicons-bug-16:{ title="Bug Fix" } UVP: Sortierung auf der Startseite fehlerhaft <br>[:octicons-link-external-16: REDMINE-8102](https://redmine.informationgrid.eu/issues/8102)
* :octicons-bug-16:{ title="Bug Fix" } Download von gezippten Verfahrensdokumenten schlägt fehl <br>[:octicons-link-external-16: REDMINE-8177](https://redmine.informationgrid.eu/issues/8177)

### Komponenten


!!! info 
    Das [Portal](../components/portal.md) und der [InGrid Editor](../components/ige.md) werden nicht mehr als Download angeboten. Für diese Komponenten wird kein Installer mehr gebaut. Für Installationsoptionen siehe die Dokumentationen der Komponenten.

<div class="ingrid-component-list" markdown>

- CODELIST-REPOSITORY [:material-download: Download](https://distributions.informationgrid.eu/ingrid-codelist-repository/8.1.0/)
- IBUS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-ibus/8.1.0/)
- INTERFACE-CSW [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-csw/8.1.0/)
- INTERFACE-SEARCH [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-search/8.1.0/)
- IPLUG-BLP [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-blp/8.1.0/)
- IPLUG-CSW-DSC [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-csw-dsc/8.1.0/)
- IPLUG-SE [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-se/8.1.0/)
- IPLUG-SNS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-sns/8.1.0/)
- IPLUG-WFS-DSC [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-wfs-dsc/8.1.0/)

</div>

<hr>