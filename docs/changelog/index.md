---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Version 8.2.0 <small>12.01.2026</small> { id="8.2.0" data-toc-label="8.2.0"}

### Hinweise für die Aktualisierung ⚠️

#### Editor

Mit der Aktualisuerung auf 8.2.0 hat sich im InGrid-Profil nicht nur die Eingabe der Zeitbezüge verbessert, sondern auch das zugrundeliegende interne Format. Bei der Aktualität des Datensatzes sind Mehrfacheingaben nicht mehr möglich. Wenn es vorher mehrere Datumsangaben gab, wird nur eine verwendet und die anderen verworfen. Dies sollte bei der Aktualisierung beachtet werden!

Für die "Erstellung", "Erstmalige Veröffentlichung" und "Letzte Änderung" sind Mehrfachangaben auch nicht sinnvoll. Wenn die Daten nicht verloren gehen sollen, so setzen Sie sich mit uns in Verbindung um eine Lösung zu finden.

### Wichtige Änderungen&nbsp;⚠️

#### Editor

#### Herausforderung Codeliste 100

Die Codeliste 100 für Raumbezugssysteme stößt an ihre Grenzen. Die aktuelle Struktur im Codeliste-Repo erlaubt nur begrenzte Werteaufnahme ohne Übersichtlichkeit zu verlieren. Daher können nun externe Raumbezugssysteme aufgerufen werden.

![InGrid Editor: "Externe Koordinaterefenzsysteme"](../assets/changelog/820_editor_coord-reference.png "InGrid Editor: "Externe Koordinaterefenzsysteme"")
<figcaption class="figcaption">InGrid Editor: "Externe Koordinaterefenzsysteme"</figcaption>

[:octicons-link-external-16: REDMINE-7705](https://redmine.informationgrid.eu/issues/7705)


#### Einstellungsoptionen für Veröffentlichungsrechte

Die neue Funktionalität ermöglicht die Anpassung der Standard-Veröffentlichungsrechte für neue Datensätze. Anstelle des bisherigen Defaults "Internet" können nun die Optionen "amtsintern" oder "Intranet" ausgewählt werden. Diese Änderung bietet mehr Flexibilität bei der Verwaltung von Datensatz-Zugriffsrechten.

![InGrid Editor: "Defaulteinstellungen"](../assets/changelog/820_editor_document_publication-rights.png "InGrid Editor: "Defaulteinstellungen"")
<figcaption class="figcaption">InGrid Editor: "Defaulteinstellungen"</figcaption>

[:octicons-link-external-16: REDMINE-6352](https://redmine.informationgrid.eu/issues/6352)

#### Erweiterung Aktivitätsbericht

Die Archivierung ist nun Teil des Aktivitätsbericht im UVP-Editor. Dies ermöglicht eine umfassendere Dokumentation der Tätigkeiten. Die Erweiterung schafft mehr Transparenz und Nachvollziehbarkeit der Prozesse.

![InGrid Editor: "Erweiterung Aktivitätsbericht"](../assets/changelog/820_editor_report_archive.png "InGrid Editor: "Erweiterung Aktivitätsbericht"")
<figcaption class="figcaption">InGrid Editor: "Erweiterung Aktivitätsbericht"</figcaption>

[:octicons-link-external-16: REDMINE-7525](https://redmine.informationgrid.eu/issues/7525)

#### UX Verbesserung des Zeitbezugs

Die Eingabe der Zeitbezüge wurde überarbeitet. Der Umgang mit Zeitbezügen wurde umgfangreich beleuchtet und konzeptionell überarbeitet. Die Verständlichkeit der unterschiedlichen Zeitbezüge für Redakteure und Betrachter von Metadaten wurde verbessert.

![InGrid Editor: "Editor Zeitbezüge"](../assets/changelog/820_editor_time-reference.png "InGrid Editor: "Editor Zeitbezüge"")
<figcaption class="figcaption">InGrid Editor: "Editor Zeitbezüge"</figcaption>

[:octicons-link-external-16: REDMINE-7527](https://redmine.informationgrid.eu/issues/7527)

### Allgemein { id="8.2.0_changes_allgemein" }

* :material-star:{ title="Feature" } Anzeige WKTs im Editor verbessern <br>[:octicons-link-external-16: REDMINE-5731](https://redmine.informationgrid.eu/issues/5731)
* :material-star:{ title="Feature" } IGE: neue Dienstart "OGC API-Feature" <br>[:octicons-link-external-16: REDMINE-6189](https://redmine.informationgrid.eu/issues/6189)
* :material-star:{ title="Feature" } "Amtsintern" als default Einstellung für neue Datensätze <br>[:octicons-link-external-16: REDMINE-6352](https://redmine.informationgrid.eu/issues/6352)
* :material-star:{ title="Feature" } Zoneless Angular <br>[:octicons-link-external-16: REDMINE-6408](https://redmine.informationgrid.eu/issues/6408)
* :material-star:{ title="Feature" } "Übernahme freie Einträge" Funktionalität aus IGE Classic <br>[:octicons-link-external-16: REDMINE-7063](https://redmine.informationgrid.eu/issues/7063)
* :material-star:{ title="Feature" } ISO-XML von Dienst-Metadaten bereinigen: Abschnitt srv:coupledResource entfernen <br>[:octicons-link-external-16: REDMINE-7233](https://redmine.informationgrid.eu/issues/7233)
* :material-star:{ title="Feature" } Umsetzungsticket: Verbesserung der Eingabe und Darstellung von Zeitbezügen <br>[:octicons-link-external-16: REDMINE-7527](https://redmine.informationgrid.eu/issues/7527)
* :material-star:{ title="Feature" } Umsetzungsticket, Raumbezugssystem-Codeliste durch Anbindung externe Registry erweitern <br>[:octicons-link-external-16: REDMINE-7705](https://redmine.informationgrid.eu/issues/7705)
* :material-star:{ title="Feature" } Editor: Validierung Datenformat in Katalogeinstellungen abschalten können <br>[:octicons-link-external-16: REDMINE-8115](https://redmine.informationgrid.eu/issues/8115)
* :material-star:{ title="Feature" } Nur Ordner mit veröffentlichten MD ans Portal liefern <br>[:octicons-link-external-16: REDMINE-8418](https://redmine.informationgrid.eu/issues/8418)
* :material-star:{ title="Feature" } Portaldarstellung Zeitbezüge <br>[:octicons-link-external-16: REDMINE-8503](https://redmine.informationgrid.eu/issues/8503)
* :material-star:{ title="Feature" } Ersetzen der until-destroy Bibliothek <br>[:octicons-link-external-16: REDMINE-8541](https://redmine.informationgrid.eu/issues/8541)
* :material-star:{ title="Feature" } Druckansicht im Portal verschlechtert <br>[:octicons-link-external-16: REDMINE-8582](https://redmine.informationgrid.eu/issues/8582)
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

* :material-star:{ title="Feature" } Anzeige von Projektnummer und Projekttitel im Portal <br>[:octicons-link-external-16: REDMINE-6713](https://redmine.informationgrid.eu/issues/6713)
* :material-star:{ title="Feature" } Portal-NG: weitere Anpassungen, externes Portal <br>[:octicons-link-external-16: REDMINE-8409](https://redmine.informationgrid.eu/issues/8409)
* :octicons-bug-16:{ title="Bug Fix" } Portal-NG: Korrekturen internes Portal <br>[:octicons-link-external-16: REDMINE-8320](https://redmine.informationgrid.eu/issues/8320)
* :octicons-bug-16:{ title="Bug Fix" } Unerwünschte Anzeige Identifikator im Portal auf TEST <br>[:octicons-link-external-16: REDMINE-8488](https://redmine.informationgrid.eu/issues/8488)
* :octicons-bug-16:{ title="Bug Fix" } Inhalte der englischen Portalseiten im Repo ablegen <br>[:octicons-link-external-16: REDMINE-8586](https://redmine.informationgrid.eu/issues/8586)

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
