---
title: Query Syntax
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Hintergrund

Die Query Syntax wird verwendet, um in der InGrid-Datenbasis zu recherchieren. Die Syntax gilt sowohl für die Suche im Portal, als auch für die Suche über die OpenSearch Schnittstelle.

## Syntax der InGrid Query

### Allgemeines

|Feldname | Wert| Erläuterung | Anmerkung |
|--| --| -- | -- |
|datatype| |  | Spezifiziert den Suchbereich und die Typen von Daten(quellen), die ein iPlug beinhaltet. |
|| default | Suche in "Umweltinformationen" |  |
|| address | Suche in "Adressen" |  |
|| service | Suche in "Service" |  |
|| measure | Suche in "Messwerte" |  |
|| topics | Suche in "Umweltthemen" |  |
|| www | Suche in "Webseiten" |  |
|| metadata | Suche in "Metadaten" |  |
|| csw | Suche in angeschlossenen CSW Datenquellen |  |
|| opensearch | Suche in angeschlossenen OpenSearch Datenquellen |  |
|partner| | Eingrenzung auf Partner. Wenn nicht gesetzt, dann alle Partner.  |  |
|| bund, bw, by, ...  | Partnerkürzel, wie in Portal Administration gepflegt. |  |
|provider| | Eingrenzung auf Anbieter. Wenn nicht gesetzt, dann alle Anbieter.   |  |
|| bb_mluv, bu_bast, ...  | Anbieterkürzel, wie in Portal Administration gepflegt. |  |
|lang| | Eingrenzung auf Sprache   |  |
| topic |  | Eingrenzung der Themenseiten auf Thema/Messwerte/Service | |
| | Abfall, Altlasten, Bauen, Boden, Chemikalien, Energie, Forstwirtschaft, Gentechnik, Geologie, Gesundheit, LaermErschuetterung, Landwirtschaft, LuftKlima, NachhaltigeEntwicklung, NaturLandschaft, Strahlung, Tierschutz, Umweltinformation, Umweltwirtschaft, Verkehr, Wasser| Eingrenzung der Themenseiten auf Thema | Für Umweltthemen ( datatype:topics ) |
|  | press, publication, event | Eingrenzung der Servicerubrik | Für Services ( datatype:service ) |
|  | radiation, air, water,  misc  | Eingrenzung der Messwerterubrik | Für Messwerte ( datatype:measure ) |
|areaid | | Raumeinschränkung durch Kreisgemeindeschlüssel | GUI: Raumeinschränkung Karte -> Auf Karte Festlegen |


### Adressen

Für den Bereich "Adressen" - Query-Term: datatype:address - gilte die hier angegebene Query Syntax.

|Feldname | Wert| Erläuterung | Anmerkung |
| -- | -- | -- | -- |
|street | &lt;string&gt; | Straße | |
|zip | &lt;number&gt; | Postleitzahl | |
|city | &lt;string&gt; | Ort | |



### Operatoren

Zusätzlich können die verschiedenen Felder und Begriffe durch Boolsche Operatoren und Modifikatoren, wie in folgender Tabelle beschrieben, verknüpft werden.

|Operator | Beschreibung | Beispiel |
|--| --| -- |
|'&&' oder '' | UND Verknüpfung (Beide Suchbegriffe müssen vorhanden sein) | wasser regen (default)|
|' \|\| ' oder 'OR' | ODER Verknüpfung (Einer von beiden Suchbegriffen muss vorhanden sein) | wasser \|\| boden|
|'-' oder 'NOT' | UND NICHT Verknüpfung (Der Suchbegriff darf nicht vorhanden sein) | wasser -boden|
|"" | Es wird genau nach der Phrase gesucht | "Wasserverschmutzung im Rhein"|
|'\*' | Wildcard Query (Steht für eine beliebige Zeichenkette) | Wasser* (Findet z.B. auch Wasserspeicher)|
|'?' | Wildcard Query (Steht für ein beliebiges einzelnes Zeichen) | Te?t (Findet sowohl Test als auch Text)|
|'~' | Fuzzy Suche (Ein ungefährer Suchbegriff muss vorhanden sein) | Wasser~ (Vorsicht die Ergebnisse sind sehr 'Fuzzy')|

