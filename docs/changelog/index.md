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

#### Neue Registry für Docker Images
Mit Version 8.5.0 wechseln die Docker Images aller InGrid-Komponenten ihren Ort von vorher 
`docker-registry.wemove.com` auf `registry.opencode.de/informationgrid`

Bei folgenden Images hat sich auch der Name geändert:

| vorher (bis 8.4.0)                               | nachher (ab 8.4.1 / 8.5.0)                                 |
|:-------------------------------------------------|:-----------------------------------------------------------|
| `docker-registry.wemove.com/ingrid-ige-ng:8.4.0` | `registry.opencode.de/informationgrid/ingrid-editor:8.5.0` |

#### Umstellung auf die neue CSW-Schnittstelle

Das Interface-CSW wird nicht mehr weiterentwickelt und wird durch pyCSW abgelöst. Der größte Unterschied bei der Umstellung betrifft die Indizierung der Daten. Während das Interface-CSW eine Quelle benötigt hat und die Daten zusammenhängend indiziert hat, werden die Daten über pyCSW direkt eingeliefert. Dies hat den Vorteil, dass die Daten sofort verfügbar sind. Dafür müssen Anpassungen im Portal, Harvester und Editor erfolgen. Nähere Informationen gibt es hier: [Migration zu pyCSW]({{ fix_url('components/pycsw.md#migration') }})

<hr>

## Version 8.5.0 <small>09.10.2026</small> { id="8.5.0" data-toc-label="8.5.0"}

### Allgemein { id="8.5.0_changes_allgemein" }

* :material-star:{ title="Test" } Stabilität der Daten im Harvester-Index gewährleisten <br>[:octicons-link-external-16: REDMINE-7683](https://redmine.informationgrid.eu/issues/7683)
* :material-star:{ title="Test" } Unit Tests für CSW-T im Editor <br>[:octicons-link-external-16: REDMINE-9268](https://redmine.informationgrid.eu/issues/9268)
* :material-star:{ title="Support" } Angaben der Geokoordinaten vereinheitlichen <br>[:octicons-link-external-16: REDMINE-7223](https://redmine.informationgrid.eu/issues/7223)
* :material-star:{ title="Support" } Erstellung von RPM Paketen für RHEL 10 für InGrid Komponenten <br>[:octicons-link-external-16: REDMINE-9371](https://redmine.informationgrid.eu/issues/9371)
* :material-star:{ title="Support" } Fehlermeldung keycloak-Server bei Anmeldung im Editor <br>[:octicons-link-external-16: REDMINE-9444](https://redmine.informationgrid.eu/issues/9444)
* :material-star:{ title="Feature" } Anbindung keycloak an Active Directory - Anpassungen Editor (MVP) <br>[:octicons-link-external-16: REDMINE-6545](https://redmine.informationgrid.eu/issues/6545)
* :material-star:{ title="Feature" } Update Java 17 LTS auf Java 25 LTS <br>[:octicons-link-external-16: REDMINE-8697](https://redmine.informationgrid.eu/issues/8697)
* :material-star:{ title="Feature" } Beschreibungselement "Herstellungsprozess" sollte in ein normales editierbares Textfeld geändert werden <br>[:octicons-link-external-16: REDMINE-8890](https://redmine.informationgrid.eu/issues/8890)
* :material-star:{ title="Feature" } Schlagwörter für die Abgabe von MD an die Mobilithek angeben können <br>[:octicons-link-external-16: REDMINE-8906](https://redmine.informationgrid.eu/issues/8906)
* :material-star:{ title="Feature" } Editor: Schlagwörter Mobilithek bei Schlagwortanalyse berücksichtigen <br>[:octicons-link-external-16: REDMINE-8907](https://redmine.informationgrid.eu/issues/8907)
* :material-star:{ title="Feature" } Codelist: Feld "AdV-Produktgruppe" - Codelist-Wert "INSPIRE Boden" entfernen <br>[:octicons-link-external-16: REDMINE-8935](https://redmine.informationgrid.eu/issues/8935)
* :material-star:{ title="Feature" } Harvesting soll während der Downloadphase abgebrochen werden können & Records löschen wenn Katalog von Datenquelle entkoppelt wurde  <br>[:octicons-link-external-16: REDMINE-9022](https://redmine.informationgrid.eu/issues/9022)
* :material-star:{ title="Feature" } JSON-Schema Validierung für das Indexformat im InGrid Editor <br>[:octicons-link-external-16: REDMINE-9119](https://redmine.informationgrid.eu/issues/9119)
* :material-star:{ title="Feature" } Datenformate ergänzen in opensearch Schnittstelle für RDF Abgabe von OpenData Datensätze <br>[:octicons-link-external-16: REDMINE-9130](https://redmine.informationgrid.eu/issues/9130)
* :material-star:{ title="Feature" } ingrid-with-opendata - Telefonnummer wird nicht im Portal angezeigt <br>[:octicons-link-external-16: REDMINE-9228](https://redmine.informationgrid.eu/issues/9228)
* :material-star:{ title="Feature" } Datei-Upload: Überprüfung erfolgreicher Upload durch Checksummen-Prüfung erweitern <br>[:octicons-link-external-16: REDMINE-9255](https://redmine.informationgrid.eu/issues/9255)
* :material-star:{ title="Feature" } Update des Harvesters auf NodeJS 24 <br>[:octicons-link-external-16: REDMINE-9267](https://redmine.informationgrid.eu/issues/9267)
* :material-star:{ title="Feature" } Löschen einer Verbindung vorher prüfen <br>[:octicons-link-external-16: REDMINE-9299](https://redmine.informationgrid.eu/issues/9299)
* :material-star:{ title="Feature" } Weitere Anpassungen für "Datensätze": geopolitische Abdeckung <br>[:octicons-link-external-16: REDMINE-9449](https://redmine.informationgrid.eu/issues/9449)
* :octicons-bug-16:{ title="Bug Fix" } Validierung Verweise für Pflichtfelder <br>[:octicons-link-external-16: REDMINE-8648](https://redmine.informationgrid.eu/issues/8648)
* :octicons-bug-16:{ title="Bug Fix" } ISO-XML-Ausgabe extentTypeCode fehlt bei Regionalschlüssel <br>[:octicons-link-external-16: REDMINE-8691](https://redmine.informationgrid.eu/issues/8691)
* :octicons-bug-16:{ title="Bug Fix" } Code-Liste 2000 - Mapping für deutsche Verweis-Typen korrigieren <br>[:octicons-link-external-16: REDMINE-8783](https://redmine.informationgrid.eu/issues/8783)
* :octicons-bug-16:{ title="Bug Fix" } Ausgabe des Identifikators des CRS84 in ISO-XML korrigieren <br>[:octicons-link-external-16: REDMINE-9004](https://redmine.informationgrid.eu/issues/9004)
* :octicons-bug-16:{ title="Bug Fix" } Keycloak: ige-user Rolle als Client-Rolle statt Realm-Rolle implementieren <br>[:octicons-link-external-16: REDMINE-9030](https://redmine.informationgrid.eu/issues/9030)
* :octicons-bug-16:{ title="Bug Fix" } Portal: Formatierung "Maßstab 1:x" korrigieren <br>[:octicons-link-external-16: REDMINE-9031](https://redmine.informationgrid.eu/issues/9031)
* :octicons-bug-16:{ title="Bug Fix" } Harvester: Zeitangaben in Log-Files und GUI weichen voneinander ab <br>[:octicons-link-external-16: REDMINE-9106](https://redmine.informationgrid.eu/issues/9106)
* :octicons-bug-16:{ title="Bug Fix" } Anzahl Dokumente in Harvester Anzeige stimmt nicht <br>[:octicons-link-external-16: REDMINE-9115](https://redmine.informationgrid.eu/issues/9115)
* :octicons-bug-16:{ title="Bug Fix" } Details-Header von Objekten und Adressen schließt sich beim Wechsel zwischen unterschiedlichen Objektklassen <br>[:octicons-link-external-16: REDMINE-9151](https://redmine.informationgrid.eu/issues/9151)
* :octicons-bug-16:{ title="Bug Fix" } Harvester: UX/UI, Meldung über erlaubte Anzahl an Zeichen <br>[:octicons-link-external-16: REDMINE-9173](https://redmine.informationgrid.eu/issues/9173)
* :octicons-bug-16:{ title="Bug Fix" } Layout von Versionshistorie verbessern <br>[:octicons-link-external-16: REDMINE-9281](https://redmine.informationgrid.eu/issues/9281)
* :octicons-bug-16:{ title="Bug Fix" } Geodatensatz: Verweis zu Dienst wird nicht in das Portal übertragen <br>[:octicons-link-external-16: REDMINE-9341](https://redmine.informationgrid.eu/issues/9341)
* :octicons-bug-16:{ title="Bug Fix" } ISO-Schemenvalidierungsfehler in der GDI-DE Testsuite schlägt bei Datengrundlage/Herkunft fehl <br>[:octicons-link-external-16: REDMINE-9351](https://redmine.informationgrid.eu/issues/9351)
* :octicons-bug-16:{ title="Bug Fix" } Gelöschte MD können über CSW-T nicht erneut eingeliefert werden (Rechte-Problem) <br>[:octicons-link-external-16: REDMINE-9396](https://redmine.informationgrid.eu/issues/9396)
* :octicons-bug-16:{ title="Bug Fix" } Log wird nach Fehlerfall nicht erneut geladen <br>[:octicons-link-external-16: REDMINE-9397](https://redmine.informationgrid.eu/issues/9397)
* :octicons-bug-16:{ title="Bug Fix" } Opensearch Schnittstelle: Umlaute nicht korrekt in DCAT-AP.DE Dokument <br>[:octicons-link-external-16: REDMINE-9421](https://redmine.informationgrid.eu/issues/9421)
* :octicons-bug-16:{ title="Bug Fix" } Index ingrid_meta automatisch anlegen <br>[:octicons-link-external-16: REDMINE-9425](https://redmine.informationgrid.eu/issues/9425)
* :octicons-bug-16:{ title="Bug Fix" } CSW-T Validierung: Fehlermeldung wird unhilfreich getrimmt <br>[:octicons-link-external-16: REDMINE-9429](https://redmine.informationgrid.eu/issues/9429)
* :octicons-bug-16:{ title="Bug Fix" } CSW-T Update leakt interne SQL Query <br>[:octicons-link-external-16: REDMINE-9430](https://redmine.informationgrid.eu/issues/9430)
* :octicons-bug-16:{ title="Bug Fix" } IGE: automatisches Ausloggen funktioniert nicht <br>[:octicons-link-external-16: REDMINE-9448](https://redmine.informationgrid.eu/issues/9448)
* :octicons-bug-16:{ title="Bug Fix" } Einlieferung von Datensätzen via CSW-T erlaubt keine DateTime-Angaben ohne Zeitzone <br>[:octicons-link-external-16: REDMINE-9452](https://redmine.informationgrid.eu/issues/9452)
* :octicons-bug-16:{ title="Bug Fix" } Neu angelegter Benutzer hat nicht alle vorgesehenen Rechte <br>[:octicons-link-external-16: REDMINE-9463](https://redmine.informationgrid.eu/issues/9463)
* :octicons-bug-16:{ title="Bug Fix" } Export "Datensatz" nach IGE enthält Periodicity obwohl nicht definiert <br>[:octicons-link-external-16: REDMINE-9465](https://redmine.informationgrid.eu/issues/9465)
* :octicons-bug-16:{ title="Bug Fix" } Passwort ändern leitet falsch weiter <br>[:octicons-link-external-16: REDMINE-9467](https://redmine.informationgrid.eu/issues/9467)
* :octicons-bug-16:{ title="Bug Fix" } Löschen von Nutzern die Gruppen angelegt haben führt zur Löschung dieser Gruppen <br>[:octicons-link-external-16: REDMINE-9489](https://redmine.informationgrid.eu/issues/9489)
* :octicons-bug-16:{ title="Bug Fix" } Editor leitet nicht korrekt weiter, wenn nicht eingeloggt <br>[:octicons-link-external-16: REDMINE-9494](https://redmine.informationgrid.eu/issues/9494)
* :octicons-bug-16:{ title="Bug Fix" } ingrid-with-opendata: Bezeichnung des Editors korrigieren <br>[:octicons-link-external-16: REDMINE-9517](https://redmine.informationgrid.eu/issues/9517)
* :octicons-bug-16:{ title="Bug Fix" } Hochgeladene Dateien werden gelöscht durch automatische Speicherung (Regression) <br>[:octicons-link-external-16: REDMINE-9540](https://redmine.informationgrid.eu/issues/9540)
* :octicons-bug-16:{ title="Bug Fix" } SSRF Lücke im Portal <br>[:octicons-link-external-16: REDMINE-9549](https://redmine.informationgrid.eu/issues/9549)
* :octicons-bug-16:{ title="Bug Fix" } Verbesserung der Sicherheit beim Verarbeiten von XML <br>[:octicons-link-external-16: REDMINE-9564](https://redmine.informationgrid.eu/issues/9564)
* :octicons-bug-16:{ title="Bug Fix" } Mögliche Sicherheitslücke beim ZIP-Download <br>[:octicons-link-external-16: REDMINE-9576](https://redmine.informationgrid.eu/issues/9576)
* :octicons-bug-16:{ title="Bug Fix" } Mögliche Sicherheitslücke beim ZIP-Download <br>[:octicons-link-external-16: REDMINE-9576](https://redmine.informationgrid.eu/issues/9576)

### Profil BAW Datenrepository { id="8.5.0_changes_baw_datenrepository" }

* :octicons-bug-16:{ title="Bug Fix" } Falsche Verknüpfung der Kategorien auf der Startseite <br>[:octicons-link-external-16: REDMINE-9136](https://redmine.informationgrid.eu/issues/9136)

### Profil BAW MIS { id="8.5.0_changes_profil_baw_mis" }

* :material-star:{ title="Feature" } ISO Erweiterung für BAW-spezifische Felder <br>[:octicons-link-external-16: REDMINE-8814](https://redmine.informationgrid.eu/issues/8814)
* :material-star:{ title="Feature" } Portal-NG: Nacharbeiten  <br>[:octicons-link-external-16: REDMINE-8825](https://redmine.informationgrid.eu/issues/8825)
* :material-star:{ title="Feature" } Editor: BAW Schlagworte bei der Schlagwortanalyse integrieren <br>[:octicons-link-external-16: REDMINE-8931](https://redmine.informationgrid.eu/issues/8931)
* :material-star:{ title="Feature" } Mapping und Portal-Anzeige für BWaStr.-Strecken Raumbezüge <br>[:octicons-link-external-16: REDMINE-8949](https://redmine.informationgrid.eu/issues/8949)
* :octicons-bug-16:{ title="Bug Fix" } IGE: Veröffentlichungsdatum von Literaturverweise fehlen im ISO und Portal <br>[:octicons-link-external-16: REDMINE-9269](https://redmine.informationgrid.eu/issues/9269)
* :octicons-bug-16:{ title="Bug Fix" } Korrekturen Simulationsdatenfelder Bautechnik <br>[:octicons-link-external-16: REDMINE-9527](https://redmine.informationgrid.eu/issues/9527)
* :octicons-bug-16:{ title="Bug Fix" } Darstellungsdefizite von "Messdaten" im Portal <br>[:octicons-link-external-16: REDMINE-9557](https://redmine.informationgrid.eu/issues/9557)

### Profil BKG { id="8.5.0_changes_profil_bkg" }

* :material-star:{ title="Feature" } AdV-MIS: Facette "Produktgruppe" - Wert "INSPIRE Boden" entfernen <br>[:octicons-link-external-16: REDMINE-8918](https://redmine.informationgrid.eu/issues/8918)
* :material-star:{ title="Feature" } Portal: Suchergebnis- und Detail-Anzeige - Kachel-MD mit "Kachel" labeln <br>[:octicons-link-external-16: REDMINE-9070](https://redmine.informationgrid.eu/issues/9070)
* :octicons-bug-16:{ title="Bug Fix" } AdV-MIS: Portal: Verhalten der Filterung "Art der Ressource" fehlerhaft <br>[:octicons-link-external-16: REDMINE-9283](https://redmine.informationgrid.eu/issues/9283)

### Profil Informationsregister Sachsen-Anhalt { id="8.5.0_changes_informationsregister_sachsen-anhalt" }

* :material-star:{ title="Feature" } Erstellung einer Harvester Datenquelle für die Anbindung der GENESIS Daten <br>[:octicons-link-external-16: REDMINE-8515](https://redmine.informationgrid.eu/issues/8515)
* :material-star:{ title="Feature" } Raumbezug bei GENESIS Datensätzen <br>[:octicons-link-external-16: REDMINE-9149](https://redmine.informationgrid.eu/issues/9149)
* :material-star:{ title="Feature" } Filterung nach "Datensätzen" in "Metadaten"-Facette ermöglichen <br>[:octicons-link-external-16: REDMINE-9413](https://redmine.informationgrid.eu/issues/9413)

### Profil KRZN { id="8.5.0_changes_profil_krzn" }

* :octicons-bug-16:{ title="Bug Fix" } OpenData "Datensatz" erscheint nicht in der Übersicht, wenn ich nach Open Data filtere <br>[:octicons-link-external-16: REDMINE-9462](https://redmine.informationgrid.eu/issues/9462)

### Profil LUBW { id="8.5.0_changes_profil_lubw" }

* :material-star:{ title="Feature" } Portal LUBW: Sachattribute mit Übermittlungsstufen 0 und 1 sollen im Portal angezeigt werden. <br>[:octicons-link-external-16: REDMINE-9003](https://redmine.informationgrid.eu/issues/9003)
* :material-star:{ title="Feature" } Merkmal "AdV" und Schlagwort "AdV-Produktgruppe" (Auswahlliste) aus Objektklasse Geodatendienst entfernen <br>[:octicons-link-external-16: REDMINE-9265](https://redmine.informationgrid.eu/issues/9265)
* :material-star:{ title="Feature" } Case-sensitivity für Aufruf mit oac entfernen <br>[:octicons-link-external-16: REDMINE-9505](https://redmine.informationgrid.eu/issues/9505)
* :octicons-bug-16:{ title="Bug Fix" } Fehlende CodelistId Info in LUBW-spezifischen Feldern <br>[:octicons-link-external-16: REDMINE-9503](https://redmine.informationgrid.eu/issues/9503)

### Profil LfU Bayern { id="8.5.0_changes_profil_lfu_bayern" }

* :material-star:{ title="Feature" } applicationProfile - Anzeige im Editor <br>[:octicons-link-external-16: REDMINE-6393](https://redmine.informationgrid.eu/issues/6393)
* :material-star:{ title="Feature" } Anzahl (Summe) der ausgewählten Datensätze beim Export anzeigen <br>[:octicons-link-external-16: REDMINE-9220](https://redmine.informationgrid.eu/issues/9220)
* :octicons-bug-16:{ title="Bug Fix" } Fragen und Korrekturwünsche zu Export- und CSW-Varianten <br>[:octicons-link-external-16: REDMINE-9490](https://redmine.informationgrid.eu/issues/9490)

### Profil UVP { id="8.5.0_changes_profil_uvp" }

* :material-star:{ title="Feature" } Automatisierte Archivierung <br>[:octicons-link-external-16: REDMINE-7712](https://redmine.informationgrid.eu/issues/7712)
* :material-star:{ title="Feature" }  Checkbox "Erst mit Beginn des Auslegungszeitraumes veröffentlichen" überarbeiten <br>[:octicons-link-external-16: REDMINE-7890](https://redmine.informationgrid.eu/issues/7890)
* :material-star:{ title="Feature" } Neuer Verfahrensschritt: „Unterrichtung über den Untersuchungsrahmen“ <br>[:octicons-link-external-16: REDMINE-8934](https://redmine.informationgrid.eu/issues/8934)
* :octicons-bug-16:{ title="Bug Fix" } Refactoring des Zabbix-Aufräumjobs und Dokumentation <br>[:octicons-link-external-16: REDMINE-8319](https://redmine.informationgrid.eu/issues/8319)
* :octicons-bug-16:{ title="Bug Fix" } Fehler bei der Kommunikation mit Zabbix <br>[:octicons-link-external-16: REDMINE-9273](https://redmine.informationgrid.eu/issues/9273)
* :octicons-bug-16:{ title="Bug Fix" } RDF-Dateien werden im Zip-Download zu bin-Dateien <br>[:octicons-link-external-16: REDMINE-9280](https://redmine.informationgrid.eu/issues/9280)
* :octicons-bug-16:{ title="Bug Fix" } Portal gibt ZIP-Datei mit veralteten Dateien zurück <br>[:octicons-link-external-16: REDMINE-9412](https://redmine.informationgrid.eu/issues/9412)
* :octicons-bug-16:{ title="Bug Fix" } Aktions-Button in UVP Monitoring hat falschen Stil <br>[:octicons-link-external-16: REDMINE-9535](https://redmine.informationgrid.eu/issues/9535)
* :octicons-bug-16:{ title="Bug Fix" } Zabbix Trigger feuern zu früh <br>[:octicons-link-external-16: REDMINE-9541](https://redmine.informationgrid.eu/issues/9541)
* :octicons-bug-16:{ title="Bug Fix" } UVP: Fehler beim Download von erstellten ZIPs in der Detaildarstellung <br>[:octicons-link-external-16: REDMINE-9569](https://redmine.informationgrid.eu/issues/9569)

### Komponenten

<div class="ingrid-component-list" markdown>

- CODELIST-REPOSITORY [:material-download: Download](https://distributions.informationgrid.eu/ingrid-codelist-repository/8.5.0/)
- IBUS [:material-download: Download](https://distributions.informationgrid.eu/ingrid-ibus/8.5.0/)
- INTERFACE-CSW [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-csw/8.5.0/)
- INTERFACE-SEARCH [:material-download: Download](https://distributions.informationgrid.eu/ingrid-interface-search/8.5.0/)
- IPLUG-BLP [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-blp/8.5.0/)
- IPLUG-SE [:material-download: Download](https://distributions.informationgrid.eu/ingrid-iplug-se/8.5.0/)

</div>

<hr>