---
title: Webmap Client Frontend
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---
# Webmap Client Frontend

Der Webmap Client hat zahlreiche Funktionen mit dem Umgang von Geodaten, von Darstellung von WMS Layern und KML bis zum Drucken und Zeichnen von Kartenmaterial. Die einzelnen Funktionen werden auf dieser Seite aufgelistet.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }
    
    Sie wollen den **Webmap Client installieren**? 
    
    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Webmap Client Dokumentation]({{ fix_url('components/webmap-client.md') }}){ .md-button }

</div>

## Karten teilen

Über das Menü des WebMap Clients besteht die Möglichkeit Ihren Kartenzustand zu verbreiten:

- E-Mail
- QR-Code
- Soziales Netzwerk
- Link
- Integration per iFrame-Template

Ihr Kartenzustand bedeutet hierbei auch die von Ihnen hinzugefügten Layern (z.B. WMS, KML) oder auch Ihre Zeichnungen auf der Karte.

![Webmap Client - Teilen](../assets/components/mapclient/frontend/mapclient_share.png "Webmap Client Teilen")

### E-Mail

Um Ihren Kartenzustand per E-Mail zu teilen, können Sie den E-Mail-Button verwenden.
Bei Betätigung des Buttons öffnet sich Ihr E-Mail-Programm oder Sie werden nach Ihrem E-Mail-Programm gefragt. Es wird Ihnen eine E-Mail mit dem Link des Kartenzustandes im Nachrichtenbereich breit gestellt. Geben Sie Empfänger und Betreff an und schon kann die E-Mail versendet werden.

### QR-Code

In der heutigen Zeit ist auch der QR-Code gang und gäbe um Informationen zu verbreiten, vor allem durch die Zunahme von Smartphones und Tablets. Um z.B. Ihren Kartenzustand auf Ihr mobiles Gerät zu übertragen, erstellen Sie über den QR-Code-Button ein QR-Code und lesen Sie den QR-Code mit Ihrem Gerät/App aus.

### Soziale Netzwerke

Gang und gäbe ist auch die Verbreitung von Informationen über das Soziale Netzwerk. Im Mapclient besteht die Möglichkeiten drei soziale Kanäle zu bedienen:

- Facebook
- Twitter
- Google+
- WhatsApp (nur unter Android und iOS)

Bei allen drei Netzwerken wird hierbei ein Link der Karte geteilt.

### Link

Natürlich können Sie auch Ihre Karte per Copy-Paste kopieren. Hierfür existiert ein Bereich **Link Teilen** mit einem Textfeld in dem die URL der aktuellen Karte hinterlegt ist.

### Einbetten

Haben Sie eine eigene Webseite und möchten Sie Ihre Karte dort integrieren? So verwenden Sie den aufklappbaren Bereich 'Einbetten'. Auch hier wird Ihnen ein Textfeld angeboten mit einem iFrame-Template, welchen Sie kopieren können und in dem Source-Code Ihrer eigene Webseite hinzufügen können. Der Webmap Client bietet Ihnen auch an das generierte Template per Vorschau anzeigen zu lassen. Klicken Sie hierfür einfach den Button 'Vorschau' im Bereich 'Einbetten' und führen weitere Änderungen (z.B. Größe des iFrames) durch.

![Webmap Client - Einbetten](../assets/components/mapclient/frontend/mapclient_share_preview.png "Webmap Client Einbetten")

Die URL Ihres Kartenzustandes wird dabei immer durch ein URL-Shortener verkürzt. Mehr Informationen finden Sie [hier]({{ fix_url('components/webmap-client.md/#url-shortener') }}).

## Karten drucken

Sie wollen Ihre Karte auf Papier bringen? Öffnen Sie hierfür im Menü den Bereich 'Drucken'. Hier können Sie ein PDF generieren lassen, welches dann ausgedruckt werden kann.

Wird das Drucken aktiviert, so wird in der Karte ein Ausschnitt hervorgehoben, der z.Zt. auf ein PDF hinterlegt werden würde. Diesen Ausschnitt können Sie anpassen, indem Sie z.B. die Karte verschieben, hinein- oder hinauszoomen oder auch im Druck-Menü den 'Massstab' anpassen.

Zusätzlich können Sie dem PDF neben dem Kartenausschnitt einen Titel, eine Beschreibung/Kommentar, die Legende der Layer oder auch ein Koordinatennetz hinzufügen und die Orientierung (Hoch-/Querformat) in den DIN A3 bzw. DIN A4 Größe ändern.

![Webmap Client - Drucken](../assets/components/mapclient/frontend/mapclient_print.png "Webmap Client Drucken")

In dem generierten PDF wird neben Ihrem Kartenausschnitt anhand eines [URL-Shorteners]({{ fix_url('components/webmap-client.md/#url-shortener') }}) die URL Ihres Kartenzustandes sowie ein [QR-Code](#qr-code) hinterlegt.

## Zeichnen & Messen

Unter dem Menüpunkt **Zeichnen & Messen** können Sie Ihre Kreativität freien laufen lassen, Anmerkungen setzen oder auch Strecken zu Ihrer Karte messen. Ihre Zeichnung können Sie anschließend auch als KML-Datei herunterladen, per Funktion Teilen verbreiten oder auch ausdrucken.

![Webmap Client - Zeichnen & Messen](../assets/components/mapclient/frontend/mapclient_draw.png "Webmap Client Zeichnen & Messen")

### Symbol

Sie möchten (vordefinierte) Symbole auf die Karte legen, so wählen Sie die Funktion **Symbol** und markieren auf der Karte die Stelle, wo Ihr Symbol platziert werden soll.

Anschließend erscheint das folgende Pop-Up:

![Webmap Client - Zeichnen & Messen - Symbol](../assets/components/mapclient/frontend/mapclient_draw_sym.png "Webmap Client Zeichnen & Messen - Symbol")

Hier können Sie die Größe des Symbols, sowie das Symbol selbst ändern und auch dem Symbol eine Beschreibung vergeben.

### Text

Sie möchten Ihre Karte mit Texten belegen, so wählen Sie die Funktion **Text** und markieren auf der Karte die Stelle, wo Ihr Text platziert werden soll.

Anschließend erscheint das folgende Pop-Up:

![Webmap Client - Zeichnen & Messen - Text](../assets/components/mapclient/frontend/mapclient_draw_txt.png "Webmap Client Zeichnen & Messen - Text")

Hier können Sie Ihren Text eingeben, aber auch die Textfarbe anpassen.

### Linie

Sie möchten eine Linie oder eine Fläche auf Ihre Karte zeichnen, so wählen Sie die Funktion **Linie**.

- Um eine Linie zu zeichnen, klicken Sie auf der Karte per Einfach-Mausklick an den Stellen, wie Ihre Linie verlaufen soll und beenden Ihre Linie mit Doppel-Mausklick.
- Um eine Fläche zu zeichnen, gehen Sie wie bei der Linie per Einfach-Mausklick vor und beenden Ihre Fläche, indem Sie Ihre Linien mit dem Startpunkt verbinden.

Anschließend erscheint das folgende Pop-Up:

![Webmap Client - Zeichnen & Messen - Linie](../assets/components/mapclient/frontend/mapclient_draw_line.png "Webmap Client Zeichnen & Messen - Linie")

Im Tab **Linie / Fläche** können Sie eine Beschreibung zu Ihrer Linie bzw. Fläche hinterlegen, aber auch die Farbe ändern. Im anderen Tab **Distanz / Fläche** sehen zu Informationen zu Ihrer gezeichneten Linie bzw. Fläche.

### Messen

Sie möchten eine Strecke oder eine Fläche auf Ihre Karte messen, so wählen Sie die Funktion **Messen**. Sie können hier wie bei der Funktion Linie vorgehen um eine Strecke oder eine Fläche zu messen.

Anschließend erscheint das folgende Pop-Up:

![Webmap Client - Zeichnen & Messen - Messen](../assets/components/mapclient/frontend/mapclient_draw_measure.png "Webmap Client Zeichnen & Messen - Messen")

Hier werden Ihnen Informationen zu Ihrer gezeichneten Strecke oder Fläche dargestellt.

## Erweiterte Werkzeuge

Das Menü 'Erweitere Werkzeuge' beinhaltet Funktionen mit (externen) Layern.

Hier können WMS- oder KML-Layer hinzugefügt werden oder auch der Karte hinzugefügten Layer verglichen werden.

![Webmap Client - Erweiterte Werkzeuge](../assets/components/mapclient/frontend/mapclient_additional.png "Webmap Client Erweiterte Werkzeuge")

### Importieren

Wird die Funktion 'Importieren' aktiviert, so erscheint ein Dialog in dem Sie (vordefinierte) Dienste (WMS/WMTS), KML, URL oder auch lokale Dateien laden können.

![Webmap Client - Erweiterte Werkzeuge "Importieren"](../assets/components/mapclient/frontend/mapclient_additional_wms.png "Webmap Client Erweiterte Werkzeuge - Importieren")

Tragen Sie unter 'URL' eine URL zum WMS-Dienst ein (z.B. [https://via.bund.de/wsv/bwastr/wms](https://via.bund.de/wsv/bwastr/wms) ) ein oder wählen Sie einen vordefinierten Dienst über die Drop-Down-Liste aus und bestätitgen Ihren Eintrag bzw. Auswahl mit dem Button 'Verbinden'.

> Hinweis:
> Hat die URL keine Parameter 'REQUEST', 'SERVICE' oder 'VERSION, so werden Defaultwerte verwendet:
> - REQUEST = GetCapabilities
> - SERVICE = WMS
> - VERSION = 1.3.0

Wird der Dienst erfolgreich geladen, so erscheinen alle Layer des Dienstes in einer Tabelle. Hier stehen verschiedene Funktionen auf einem Layer zur Verfügung:

- Mit einer Auswahl eines Layers per Mausklick wird die Beschreibung (wenn vorhanden) des ausgewählten Layer im Bereich 'Beschreibung' angezeigt.
- Fährt man mit der Maus (Mouse-Over) über ein Layer aus der Liste, so wird der Layer geladen und auf der Karte dargestellt und verschwindet wieder, wenn der Mauszeiger nicht mehr über dem Layer liegt.
- Verwenden Sie die Lupe vor dem Layer-Titel um zum Layer-Bereich (Extent) zu springen.

Um einen Layer der Karte hinzuzufügen wählen Sie einen Layer per Mausklick aus und verwenden den Button 'Layer hinzufügen'. Anschließend werden Sie informiert, ob der ausgewählte Layer hinzugefügt wurde, in der Karte dargestellt und auch im Menü in der Liste unter dem Akkordeon 'Dargestellte Karten' hinzugefügt.

### Vergleichen

Eine weitere Funktion unter dem Menü 'Erweiterte Werkzeuge' ist die Funktion 'Vergleichen'. Durch die Funktion lassen sich Layer, die unter Akkordeon 'Dargestellte Karten' aufgelistet werden, grafisch vergleichen.

Wird unter 'Dargestellte Karten' ein Layer aufgelistet und diese Funktion aktiviert, so erscheint auf der Karte eine rote Linie.

![Webmap Client - Erweiterte Werkzeuge "Vergleichen"](../assets/components/mapclient/frontend/mapclient_additional_compare.png "Webmap Client Erweiterte Werkzeuge - Vergleichen")

Dabei wird der erste aktive Layer unter 'Dargestellte Karten' im linken Bereich angezeigt und im rechten Bereich ab der roten Linie "abgeschnitten". Dieses Verhalten bleibt auch bei, wenn Sie die Karte verschieben oder die rote Linie per gedrückt gehaltenem Mausklick verschieben.

Um die Funktion wieder zu deaktivieren, drücken Sie wieder auf die Funktion 'Vergleichen' und die rote Linie verschwindet wieder.

## Rubriken

In diesem Bereich werden Ihnen vordefinierte Rubriken in einer Baumstruktur angezeigt. Alle Einträge mit einer Checkbox sind hierbei Layer, die auf der Karte dargestellt werden können.

![Webmap Client - Rubriken](../assets/components/mapclient/frontend/mapclient_catalog.png "Webmap Client Rubriken")

Folgende Funktionen sind auf darstellbare Layer vorzufinden:

- Darstellung und Hinzufügen des Layers zur Karte über die Checkbox.
- Zoom auf Layer-Bereich (Extent) über die Lupe.
- Darstellung von Informationen (z.B. Legende) über den Info-Button.
- Vorschau des Layers auf der Karte über Mouse-Over.

Wird ein Layer der Karte hinzugefügt, so wird der Layer in der Baumstruktur rot markiert und unter 'Dargestellte Karten' aufgelistet.

Eine Anleitung zur Definition von Rubriken finden Sie unter [Definition von Rubriken](#rubriken).

## Dargestellte Karten

Alle Layer, die Sie der Karte hinzugefügt haben, werden unter 'Dargestellte Karten' aufgelistet.

![Webmap Client - Dargestellte Karten](../assets/components/mapclient/frontend/mapclient_selection.png "Webmap Client Dargestellte Karten")

Auch hier hat jeder Layer mehrere Funktionen die ausgeführt werden können:

- Vorschau per Mouse-Over in der Karte
- Löschen des Layers aus der Karte über das 'x'.
- Ausblenden des Layers in der Karte per Checkbox.
- Sowie erweitere Funktionen über das Zahnrad:
  - Einstellbarkeit der Transparenz eines Layers
  - Zoom auf den Layer-Bereich (Extent)
  - Darstellung von Informationen (z.B. Legende) über den Info-Button.
  - Anordungen des Layers in der Kartenhierachie.
- Optional: Zeitabhängige Darstellung der Karte
- Optional: Karte kopieren bei zeitabhängige Karten
  Sind mehrere Layer in der Liste der 'Dargestellten Karten', so ist der oberste Layer in der Liste auch der oberste Layer auf der Karte.

## Objekt-Informationen

Sie haben einen Layer aus den 'Dargestellten Karten' aktiviert und dieser wird in der Karte anzeigt. Nun möchten Sie die Objekt-Informationen angezeigt bekommen. So verwenden Sie die linke Maustaste um eine GetFeatureInfo-Abfrage auszulösen und bei erfolgreicher Anfrage wird Ihnen ein Dialog mit der Antwort der Abfrage angezeigt.

![Webmap Client - GetFeatureInfo](../assets/components/mapclient/frontend/mapclient_getfeatureinfo.png "Webmap Client GetFeatureInfo")

## Suchen

Auch eine Suche steht Ihnen im Webmap Client zur Verfügung. Dies Suche dient hilft Ihnen dabei Orte, Layer, Dienste und Bundeswasserstraßen zu finden und auf der Karte darzustellen.

![Webmap Client - Suchen](../assets/components/mapclient/frontend/mapclient_search.png "Webmap Client Suchen")

Unter der Suche werden verschiedene Dienste angefragt:

### Gehe nach

Hier wird eine Ortssuche auf dem Dienst 'Nominatim' durchgeführt und alle Orte in Abhängigkeit mit Ihrem Suchbegriff aufgelistet.

Per Mouse-Over über die Ergebnisliste werden Ihnen die Orte in der Karte markiert und bei Auswahl gelangen Sie zum Ort hin.

### Karte hinzufügen

Im Webmap Client definierte Layer (z.B. für die Rubriken) werden hier gefunden. Auch hier in der Ergebnisliste stehen Ihnen die gleichen Funktionen wie bei allen Layer zur Verfügung:

- Vorschau bei Mouse-Over
- Zoom zum Layer-Bereich (Extent)
- Informationen eines Layers

Wählen Sie einen Layer aus, so wird dieser in der Karte dargestellt und unter 'Dargestellte Karten' aufgelistet.

### Dienste hinzufügen

Treffer aus dieser Kategorie kommen aus der Opensearch-Schnittstelle. Hier werden Ihnen WMS Dienste zum Suchbegriff angezeigt.

Wählen Sie hier einen Treffer aus, so werden alle Layer des Dienstes auf die Karte gelegt und können über 'Dargestellte Karten' angezeigt werden.

### BWaStr Locator

Falls Sie nach Bundeswasserstraßen, wie z.B. Elbe, suchen, werden Sie hier fündig. Hier wird ein Dienst des ITZBund angefragt.

Wählen aus dieser Liste eine Bundeswasserstraße aus, so wird die gesamte Strecke der ausgewählten Wasserstraße in der Karte (rot) dargestellt. Sie können auch nur eine Teilstrecke anzeigen lassen. Tragen Sie hierbei unter 'Von' und 'Bis' gültige Werte eine, bestätigen Sie Ihre Angabe mit dem ">" und die Strecke wird in der Karte (blau) dargestellt.

Klicken Sie mit der Maus auf die markierte Strecke, so werden Ihnen weitere Informationen zu Bundeswasserstraße per Dialog angezeigt. Neben den Informationen besteht für Sie auch die Möglichkeit die angeklickte Strecke als CSV zu exportieren.

![Webmap Client - Suchen](../assets/components/mapclient/frontend/mapclient_search_list.png "Webmap Client Suchen")

## Karteninteraktionen

Natürlich finden Sie auch Funktionen mit dem man Interaktionen mit der Karte ausführen kann:

### Standortbestimmung

Wählen Sie die Button mit dem schwarzen Punkt und eine Abfrage Ihres Standortes wird durchgeführt. Falls Sie die Standortfreigabe bestätigen, wird Ihr Standort in der Karte angezeigt.

### Hineinzoomen

Nicht nur über das Zahnrad der Maus können Sie hineinzoomen, sondern auch über den Button '+' ist das Hineinzoomen möglich.

### Hinauszoomen

Das gleich wie beim Hineinzoomen gilt auch für das Hinauszoomen.

### Zoom auf Ausgangsposition

Falls Sie sich mal in der Karte verirrt haben, können Sie über den untersten Button (mit den gekreuzten Pfeilen) zur Ausgangsposition der Karte zurück wechseln und von vorne starten.

### Zeitregler

Mit diesem Button kann der Zeitregler aktiviert werden. Dieser Button erscheint nur, wenn eine Karte unter "Dargestellte Karten" dies ermöglicht.

Mit dem Zeitregler können die Zeitstemplen der zeitabhängigen Karten verändert oder über einen "Play"-Button durchlaufen werden.

![Webmap Client - Karteninteraktionen](../assets/components/mapclient/frontend/mapclient_mapinteraction.png "Webmap Client Karteninteraktionen")

## Hintergrundkarten

Der Webmap Client stellt verschiedene Hintergrundkarten zur Verfügung.

![Webmap Client - Hintergrundkarten](../assets/components/mapclient/frontend/mapclient_background.png "Webmap Client Hintergrundkarten")

Folgende Hintergrundkarten stehen Ihnen zur Auswahl:

- Kein Hintergrund
- Openstreetmap (OSM)
- BKG
- BKG Grau

Über diese Auswahlbox kann zwischen verschiedenen Hintergrundkarten gewechselt bzw. auch gar keine Hintergrundkarte angezeigt werden.

## Koordinatenanzeige

Darstellung der Koordinaten zur Mausposition.

### Drop-Down-Liste

![Webmap Client - Koordinatenanzeige](../assets/components/mapclient/frontend/mapclient_coordinates.png "Webmap Client Koordinatenanzeige")

Fähren Sie mit der Maus über die Karte, so werden Ihnen im dargestellten Bereich, neben der Drop-Down-Liste der Projektionen, die zur Mausposition gehörenden Koordinaten in der Projektion Mercator angezeigt.

Falls Sie die Koordinaten in einer anderen Projektion angezeigt bekommen haben möchten, so wählen Sie aus der Drop-Downliste die gewünschte Projektion aus und Ihre Koordinaten werden nun in dieser Projektion angezeigt.

### Dialog

Um Ihnen Koordinaten einer bestimmten Mausposition in allen Projektionen der Drop-Down-Liste (siehe oben) darstellen zu lassen, verwenden Sie die rechte Maustaste und Ihnen werden im Tab **Koordinaten** alle Koordinaten in verschiedenen Projektionen dargestellt.

Im anderen Tab **BwaStr Locator** finden Sie ggfs. eine Station einer Bundeswasserstraße.

![Webmap Client - Koordinatenanzeige](../assets/components/mapclient/frontend/mapclient_coordinates_mouse.png "Webmap Client Koordinatenanzeige")

Zusätzlich erhalten Sie einen QR-Code mit dem Sie den Webmap Client mit den ausgewählten Koordinaten auf mobilen Geräte laden können.

## Weitere Funktion

![Webmap Client - Kartenfunktionen](../assets/components/mapclient/frontend/mapclient_service_option.png "Webmap Client Kartenfunktionen")

### Vollbild

Sie möchten den Webmap Client in Vollbild-Modus sehen, dann können Sie dies über die Funktion 'Vollbild' aktivieren.

Um den Vollbild-Modus zu beenden, betätigen Sie die 'ESC'-Taste auf der Tastatur.

### Problem melden

Sie haben Probleme mit dem Webmap Client. Informieren Sie uns über die Funktion 'Problem melden'. Wird diese Funktion betätigt, so erscheint ein Dialog, indem Sie folgendes Eintragen können:

- Ihre E-Mailadresse (freiwillig), z.B. für Rückfragen an Sie.
- Ihr Kommentar zum Problem.
- Dateien zum Problem hinzufügen, wie z.B. KML.

Falls Sie ein Problem senden, wird der Webmap Client-Verantwortlich per E-Mail informiert.

### Hilfe

Detailierte Hilfe zum Webmap Client.

### Mobile Version (nicht im Portal vorhanden)

Um den Webmap Client in der mobilen Version anzeigen zu lassen, verwenden Sie die Funktion 'Mobile Version'. Das Layout des Webmap Clients ändert sich anschließend zur mobilen Version und die Darstellung von z.b. Menü und Hintergrundkarte ändert sich zur Desktop Version.

### Sprachumschalter (nicht im Portal vorhanden)

Sie wollen den Webmap Client z.B. in Englischer-Version sehen. Verwenden Sie einfach den Sprachumschalter und die Sprache des Webmap Clients wird geändert.
