---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Deprecation Warnung InGrid 7.5.x ⚠️

Die Komponenten der InGrid Sofware in der Version 7.5.x werden offiziell nicht mehr unterstützt. Es werden keine Sicherheitsupdates für diese Versionen bereitgestellt. Es wird dringend empfohlen auf die neusten Versionen der Komponenten zu aktualisieren.


## Version 8.2.0 <small>12.01.2026</small> { id="8.2.0" data-toc-label="8.2.0"}

### Allgemein { id="8.2.0_changes_allgemein" }

* :material-star:{ title="Feature" } Anzeige WKTs im Editor verbessern <br>[:octicons-link-external-16: REDMINE-5731](https://redmine.informationgrid.eu/issues/5731)
* :material-star:{ title="Feature" } IGE: neue Dienstart "OGC API-Feature" <br>[:octicons-link-external-16: REDMINE-6189](https://redmine.informationgrid.eu/issues/6189)
* :material-star:{ title="Feature" } Zoneless Angular <br>[:octicons-link-external-16: REDMINE-6408](https://redmine.informationgrid.eu/issues/6408)
* :material-star:{ title="Feature" } "Übernahme freie Einträge" Funktionalität aus IGE Classic <br>[:octicons-link-external-16: REDMINE-7063](https://redmine.informationgrid.eu/issues/7063)
* :material-star:{ title="Feature" } ISO-XML von Dienst-Metadaten bereinigen: Abschnitt srv:coupledResource entfernen <br>[:octicons-link-external-16: REDMINE-7233](https://redmine.informationgrid.eu/issues/7233)
* :material-star:{ title="Feature" } Umsetzungsticket: Verbesserung der Eingabe und Darstellung von Zeitbezügen <br>[:octicons-link-external-16: REDMINE-7527](https://redmine.informationgrid.eu/issues/7527)
* :material-star:{ title="Feature" } Umsetzungsticket, Raumbezugssystem-Codeliste durch Anbindung externe Registry erweitern <br>[:octicons-link-external-16: REDMINE-7705](https://redmine.informationgrid.eu/issues/7705)
* :material-star:{ title="Feature" } Editor: Validierung Datenformat in Katalogeinstellungen abschalten können <br>[:octicons-link-external-16: REDMINE-8115](https://redmine.informationgrid.eu/issues/8115)
* :material-star:{ title="Feature" } Nur Ordner mit veröffentlichten MD ans Portal liefern <br>[:octicons-link-external-16: REDMINE-8418](https://redmine.informationgrid.eu/issues/8418)
* :material-star:{ title="Feature" } Portaldarstellung Zeitbezüge <br>[:octicons-link-external-16: REDMINE-8503](https://redmine.informationgrid.eu/issues/8503)
* :material-star:{ title="Feature" } Ersetzen der until-destroy Bibliothek <br>[:octicons-link-external-16: REDMINE-8541](https://redmine.informationgrid.eu/issues/8541)
* :octicons-bug-16:{ title="Bug Fix" } Scrollen der Facetten schwierig <br>[:octicons-link-external-16: REDMINE-6043](https://redmine.informationgrid.eu/issues/6043)
* :octicons-bug-16:{ title="Bug Fix" } ISO Import übernimmt gco:Date nicht im erwarteten ISO-Zeitformat <br>[:octicons-link-external-16: REDMINE-7776](https://redmine.informationgrid.eu/issues/7776)
* :octicons-bug-16:{ title="Bug Fix" } Planung (Cron-Job), Differenz der angezeigten Zeiten (UTC) <br>[:octicons-link-external-16: REDMINE-7791](https://redmine.informationgrid.eu/issues/7791)
* :octicons-bug-16:{ title="Bug Fix" } Kontexthilfe bei "Dateien" fehlt in manchen Objektklassen <br>[:octicons-link-external-16: REDMINE-8031](https://redmine.informationgrid.eu/issues/8031)
* :octicons-bug-16:{ title="Bug Fix" } Dashboard - "Zuletzt Veröffentlicht im Katalog" fehlerhaft, schließt Daten mit Bearbeitungsversion aus <br>[:octicons-link-external-16: REDMINE-8116](https://redmine.informationgrid.eu/issues/8116)
* :octicons-bug-16:{ title="Bug Fix" } OPENSEARCH Links zum Portal stimmen nicht <br>[:octicons-link-external-16: REDMINE-8295](https://redmine.informationgrid.eu/issues/8295)
* :octicons-bug-16:{ title="Bug Fix" } Formular kann nicht seitlich gescrollt werden <br>[:octicons-link-external-16: REDMINE-8348](https://redmine.informationgrid.eu/issues/8348)
* :octicons-bug-16:{ title="Bug Fix" } Weitere Anpassungen neues Portal (allgemeingültig) <br>[:octicons-link-external-16: REDMINE-8383](https://redmine.informationgrid.eu/issues/8383)
* :octicons-bug-16:{ title="Bug Fix" } IGE: Umbenennung eines Ordners wird beim Erstellen einer Adresse nicht berücksichtigt <br>[:octicons-link-external-16: REDMINE-8385](https://redmine.informationgrid.eu/issues/8385)
* :octicons-bug-16:{ title="Bug Fix" } Support für Adressen im ISO-Format von der CSW-Schnittstelle <br>[:octicons-link-external-16: REDMINE-8451](https://redmine.informationgrid.eu/issues/8451)
* :octicons-bug-16:{ title="Bug Fix" } Portal zeigt englische Codelistenwerte an <br>[:octicons-link-external-16: REDMINE-8471](https://redmine.informationgrid.eu/issues/8471)
* :octicons-bug-16:{ title="Bug Fix" } Vorschau stimmt nicht mit dem Datensatz  Inhalt <br>[:octicons-link-external-16: REDMINE-8474](https://redmine.informationgrid.eu/issues/8474)
* :octicons-bug-16:{ title="Bug Fix" } Editor: Anzeige langer Namen von hochgeladenen Dateien anpassen <br>[:octicons-link-external-16: REDMINE-8480](https://redmine.informationgrid.eu/issues/8480)
* :octicons-bug-16:{ title="Bug Fix" } PORTAL: Fehler bei der Darstellung von Querverweise in der Detaildarstellung <br>[:octicons-link-external-16: REDMINE-8489](https://redmine.informationgrid.eu/issues/8489)
* :octicons-bug-16:{ title="Bug Fix" } PORTAL: Fehlende Lokalisierung bei "URL des Zugangs" <br>[:octicons-link-external-16: REDMINE-8494](https://redmine.informationgrid.eu/issues/8494)
* :octicons-bug-16:{ title="Bug Fix" } Fehlende Informationen zum Raster-/Gridformat <br>[:octicons-link-external-16: REDMINE-8509](https://redmine.informationgrid.eu/issues/8509)
* :octicons-bug-16:{ title="Bug Fix" } Favoriten in kataloginternen Codelisten werden überschrieben/zurückgesetzt <br>[:octicons-link-external-16: REDMINE-8531](https://redmine.informationgrid.eu/issues/8531)
* :octicons-bug-16:{ title="Bug Fix" } Fehler beim Entfernen einer Operation <br>[:octicons-link-external-16: REDMINE-8539](https://redmine.informationgrid.eu/issues/8539)
* :octicons-bug-16:{ title="Bug Fix" } Direkte Elasticsearch-Indizierung verliert Aktivierungsstatus <br>[:octicons-link-external-16: REDMINE-8547](https://redmine.informationgrid.eu/issues/8547)
* :octicons-bug-16:{ title="Bug Fix" } HTML-Ausgabe der OGC-API verbessern <br>[:octicons-link-external-16: REDMINE-8553](https://redmine.informationgrid.eu/issues/8553)
* :octicons-bug-16:{ title="Bug Fix" } Kritische Sicherheitslücke im Interface-Search <br>[:octicons-link-external-16: REDMINE-8560](https://redmine.informationgrid.eu/issues/8560)
* :octicons-bug-16:{ title="Bug Fix" } Fehler beim Wechseln eines Datensatzes <br>[:octicons-link-external-16: REDMINE-8573](https://redmine.informationgrid.eu/issues/8573)
* :octicons-bug-16:{ title="Bug Fix" } INSPIRE nicht konform Verhalten mit nicht evaluierten Konformität <br>[:octicons-link-external-16: REDMINE-8589](https://redmine.informationgrid.eu/issues/8589)

### Nationalparkverwaltung Nds. Wattenmeer { id="8.2.0_changes_nationalparkverwaltung_nds._wattenmeer" }

* :material-star:{ title="Feature" } Import Literatur-Datensätze <br>[:octicons-link-external-16: REDMINE-8461](https://redmine.informationgrid.eu/issues/8461)

### Profil BASt { id="8.2.0_changes_profil_bast" }

* :material-star:{ title="Support" } Inhalte der englischen Portalseiten im Repo ablegen <br>[:octicons-link-external-16: REDMINE-8586](https://redmine.informationgrid.eu/issues/8586)
* :material-star:{ title="Feature" } "Amtsintern" als default Einstellung für neue Datensätze <br>[:octicons-link-external-16: REDMINE-6352](https://redmine.informationgrid.eu/issues/6352)
* :material-star:{ title="Feature" } Anzeige von Projektnummer und Projekttitel im Portal <br>[:octicons-link-external-16: REDMINE-6713](https://redmine.informationgrid.eu/issues/6713)
* :material-star:{ title="Feature" } Portal-NG: weitere Anpassungen, externes Portal <br>[:octicons-link-external-16: REDMINE-8409](https://redmine.informationgrid.eu/issues/8409)
* :octicons-bug-16:{ title="Bug Fix" } Portal-NG: Korrekturen internes Portal <br>[:octicons-link-external-16: REDMINE-8320](https://redmine.informationgrid.eu/issues/8320)
* :octicons-bug-16:{ title="Bug Fix" } Unerwünschte Anzeige Identifikator im Portal auf TEST <br>[:octicons-link-external-16: REDMINE-8488](https://redmine.informationgrid.eu/issues/8488)

### Profil BAW MIS { id="8.2.0_changes_profil_baw_mis" }

* :material-star:{ title="Feature" } Portal: BAW-Profile nach GravCMS portieren <br>[:octicons-link-external-16: REDMINE-7670](https://redmine.informationgrid.eu/issues/7670)
* :material-star:{ title="Feature" } IGE: Whitelist für URLs ohne Codeänderungen konifigurierbar machen <br>[:octicons-link-external-16: REDMINE-8366](https://redmine.informationgrid.eu/issues/8366)
* :material-star:{ title="Feature" } Validierungsregel aus dem BAW-Profil vom IGE-Classic löschen <br>[:octicons-link-external-16: REDMINE-8448](https://redmine.informationgrid.eu/issues/8448)
* :material-star:{ title="Feature" } Portal-NG: Darstellung der Vertikalen Ausdehnung  <br>[:octicons-link-external-16: REDMINE-8464](https://redmine.informationgrid.eu/issues/8464)
* :material-star:{ title="Feature" } IGE: BWaStr.-Strecke zusätzlich als BBOX hinzufügen <br>[:octicons-link-external-16: REDMINE-8473](https://redmine.informationgrid.eu/issues/8473)
* :material-star:{ title="Feature" } Import auch unterhalb von Metadatensätzen ermöglichen <br>[:octicons-link-external-16: REDMINE-8475](https://redmine.informationgrid.eu/issues/8475)
* :material-star:{ title="Feature" } Portal-NG: Nacharbeiten zum Ticket #7670 <br>[:octicons-link-external-16: REDMINE-8605](https://redmine.informationgrid.eu/issues/8605)
* :octicons-bug-16:{ title="Bug Fix" } Automatisierte Rollenzuweisung im Keycloak funktioniert nicht <br>[:octicons-link-external-16: REDMINE-8300](https://redmine.informationgrid.eu/issues/8300)
* :octicons-bug-16:{ title="Bug Fix" } Probleme mit dem CSW-T Import <br>[:octicons-link-external-16: REDMINE-8353](https://redmine.informationgrid.eu/issues/8353)
* :octicons-bug-16:{ title="Bug Fix" } Bug bei der Indizierung von LFS Links  <br>[:octicons-link-external-16: REDMINE-8557](https://redmine.informationgrid.eu/issues/8557)

### Profil BKG { id="8.2.0_changes_profil_bkg" }

* :material-star:{ title="Feature" } Portal-NG: Weitere Anpassungen und Korrekturen für AdV-MIS <br>[:octicons-link-external-16: REDMINE-8325](https://redmine.informationgrid.eu/issues/8325)
* :material-star:{ title="Feature" } Portal-NG: Weitere Anpassungen und Korrekturen für BKG-MIS <br>[:octicons-link-external-16: REDMINE-8326](https://redmine.informationgrid.eu/issues/8326)
* :material-star:{ title="Feature" } Rückmeldung zum Ticket ##8503 <br>[:octicons-link-external-16: REDMINE-8601](https://redmine.informationgrid.eu/issues/8601)

### Profil HMDK { id="8.2.0_changes_profil_hmdk" }

* :octicons-bug-16:{ title="Bug Fix" } INSPIRE Datensätze markiert mit "nicht konform" in JSON Schema Validierung aufnehmen <br>[:octicons-link-external-16: REDMINE-8407](https://redmine.informationgrid.eu/issues/8407)

### Profil KRZN { id="8.2.0_changes_profil_krzn" }

* :material-star:{ title="Support" } Druckansicht im Portal verschlechtert <br>[:octicons-link-external-16: REDMINE-8582](https://redmine.informationgrid.eu/issues/8582)
* :material-star:{ title="Feature" } Portal-NG: weitere Anpassungen <br>[:octicons-link-external-16: REDMINE-8321](https://redmine.informationgrid.eu/issues/8321)

### Profil LUBW { id="8.2.0_changes_profil_lubw" }

* :material-star:{ title="Feature" } Umstellung Portal auf neue Portal-Technologie <br>[:octicons-link-external-16: REDMINE-7806](https://redmine.informationgrid.eu/issues/7806)
* :material-star:{ title="Feature" } Beschreibungsfeld bei Sachattributen und Geometrien bitte dynamisch skalierbar machen <br>[:octicons-link-external-16: REDMINE-8310](https://redmine.informationgrid.eu/issues/8310)
* :material-star:{ title="Feature" } Einschränkung für Fachredakteure: Verschieben von Elementen im Themenbaum unterbinden <br>[:octicons-link-external-16: REDMINE-8422](https://redmine.informationgrid.eu/issues/8422)
* :material-star:{ title="Feature" } Ergänzender Hinweis im Dialog bei Auswahl Merkmale "INSPIRE konform" bzw. "INSPIRE nicht konform" <br>[:octicons-link-external-16: REDMINE-8565](https://redmine.informationgrid.eu/issues/8565)
* :octicons-bug-16:{ title="Bug Fix" } Portal-NG, notwendige Korrekturen/Anpassungen <br>[:octicons-link-external-16: REDMINE-8551](https://redmine.informationgrid.eu/issues/8551)

### Profil LfU Bayern { id="8.2.0_changes_profil_lfu_bayern" }

* :octicons-bug-16:{ title="Bug Fix" } Weitere Anpassungen neues Portal, LfU spezifisch <br>[:octicons-link-external-16: REDMINE-8384](https://redmine.informationgrid.eu/issues/8384)
* :octicons-bug-16:{ title="Bug Fix" } Editor: dateStamp in der ISO-Ansicht korrigieren <br>[:octicons-link-external-16: REDMINE-8405](https://redmine.informationgrid.eu/issues/8405)

### Profil RLP { id="8.2.0_changes_profil_rlp" }

* :material-star:{ title="Feature" } Portal-NG: Abnahme <br>[:octicons-link-external-16: REDMINE-8327](https://redmine.informationgrid.eu/issues/8327)

### Profil UPSH { id="8.2.0_changes_profil_upsh" }

* :material-star:{ title="Feature" } UP-SH: Umstellung Portal auf neue Portal-Technologie <br>[:octicons-link-external-16: REDMINE-7967](https://redmine.informationgrid.eu/issues/7967)
* :octicons-bug-16:{ title="Bug Fix" } Portal-NG, notwendige Korrekturen/Anpassungen <br>[:octicons-link-external-16: REDMINE-8542](https://redmine.informationgrid.eu/issues/8542)
* :octicons-bug-16:{ title="Bug Fix" } Attribute der Geometrie-Kontexten werden im Portal nicht angezeigt.  <br>[:octicons-link-external-16: REDMINE-8590](https://redmine.informationgrid.eu/issues/8590)

### Profil UVP { id="8.2.0_changes_profil_uvp" }

* :material-star:{ title="Feature" } UVP-Editor - Aktivitätsbericht um Archivierung erweitern <br>[:octicons-link-external-16: REDMINE-7525](https://redmine.informationgrid.eu/issues/7525)
* :octicons-bug-16:{ title="Bug Fix" } UVP Nummer optionen werden weiter angezeigt nach verhalten deaktivieren <br>[:octicons-link-external-16: REDMINE-8304](https://redmine.informationgrid.eu/issues/8304)
* :octicons-bug-16:{ title="Bug Fix" } Download von Dokumenten als ZIP unvollständig <br>[:octicons-link-external-16: REDMINE-8351](https://redmine.informationgrid.eu/issues/8351)
* :octicons-bug-16:{ title="Bug Fix" } Zabbix-Aufräumjob erzeugt Fehler bei ungültiger Email <br>[:octicons-link-external-16: REDMINE-8412](https://redmine.informationgrid.eu/issues/8412)

### Komponenten

<div class="ingrid-component-list" markdown>

- CODELIST-REPOSITORY [:material-download: Download](https://distributions.informationgrid.eu/ingrid-codelist-repository/8.2.0/)
- IBUS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-ibus/8.2.0/)
- INTERFACE-CSW [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-csw/8.2.0/)
- INTERFACE-SEARCH [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-search/8.2.0/)
- IPLUG-BLP [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-blp/8.2.0/)
- IPLUG-CSW-DSC [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-csw-dsc/8.2.0/)
- IPLUG-DSC [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-dsc/8.2.0/)
- IPLUG-SE [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-se/8.2.0/)
- IPLUG-SNS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-sns/8.2.0/)
- IPLUG-WFS-DSC [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-wfs-dsc/8.2.0/)

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