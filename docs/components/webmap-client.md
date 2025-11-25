---
title: Webmap Client
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Allgemeines

Der Webmap Client basiert auf den Schweizer-Client "geo.admin.ch" ([https://map.geo.admin.ch/](https://map.geo.admin.ch/)) und dient zur Darstellung von Kartenmaterial (z.B. WMS, KML, etc.) im Portal. Neben der Darstellung auf dem Desktop ist der Webmap Client, wie das Portal, auch für mobile Geräte geeignet.

Der Client wird über das Portal mit installiert und ist im Portal unter dem Menü-Eintrag "Karte" integriert. Der Webmap Client kann aber auch ohne das Portal aufgerufen werden:

- http://HOSTNAME/ingrid-webmap-client/frontend/prd/ (komprimierte Version)
- http://HOSTNAME/ingrid-webmap-client/frontend/src/ (unkomprimierte Version)

Im Webmap Client sind mehrere Frameworks/Technologien in einem vereint. So wird OpenLayers 3 verwendet um Interaktionen mit dem Kartenmaterial, wie z.B. diverse WMS oder KML Layer anzuzeigen, zu ermöglichen. Das User-Interface besteht aus den Java-Script Frameworks AngularJS und jQuery, aus den CSS-Tools Font-Awesome und Bootstrap und vieles mehr.

Zu den möglichen Interaktionen oder auch Funktionen des Webmap Clients können Sie in den nächsten Abschnitten mehr erfahren.

![](../assets/drawio/ingrid-webmap-client.drawio)

<hr>

## Leitfaden

Sie haben die Installation bereits abgeschlossen? Diese Leitfäden könnten Sie interessieren.

<div class="grid cards float-right" markdown>

-   :material-book-open-variant-outline: __Frontend vom Webmap Client__

    ---

    Interesse am **Frontend**?

    Dieser Leitfaden bietet Einblicke in die **Benutzeroberfläche**.

    [Benutzeroberfläche]({{ fix_url('guides/webmap-client-frontend.md') }}){ .md-button }

-   :material-book-open-variant-outline: __Admin GUI vom Webmap Client__

    ---

    Interesse am **Admin GUI**?

    Dieser Leitfaden bietet Einblicke in das **Admin GUI**.

    [Admin GUI]({{ fix_url('guides/webmap-client-admin-gui.md') }}){ .md-button }

</div>

<hr>

## Systemvoraussetzungen

|              | **Systembestandteil** | **Anforderung**         |
|--------------|-----------------------|-------------------------|
| **Hardware** | Arbeitsspeicher       | 2 GB RAM                |
|              | Festplattenspeicher   | 10 GB frei              |
|              | Prozessor             | Dual Core CPU           |
| **Software** | Java                  | Java 21                 |
|              | Apache-Tomcat         | Version 9.x             |

<hr>

## Installation

### :material-docker: Docker

``` yaml title="Beispiel docker-compose.yml"
services:
  mapclient:
    image: docker-registry.wemove.com/ingrid-webmap-client
    restart: unless-stopped
    environment:
      - SERVER_CONNECTOR_ATTR=proxyPort="443" scheme="https" secure="true"
    volumes:
      - ./portal/application.override.properties:/usr/local/tomcat/webapps/ingrid-webmap-client/WEB-INF/classes/application.override.properties
      - ./portal/WebmapClientData:/opt/ingrid/WebmapClientData
    networks:
      - ingrid-network

```

Apache-Konfiguration:

``` xml
  ###################
  # mapclient

  <Location "/ingrid-webmap-client">

    ProxyPass  http://mapclient:8080/ingrid-webmap-client
    ProxyPassReverse http://mapclient:8080/ingrid-webmap-client
    ProxyAddHeaders On
    ProxyPreserveHost On

    Header set Access-Control-Allow-Origin '*'
  </Location>
```


### Umgebungsvariablen

Einige allgemeine Einstellungen können auch über Umgebungsvariablen konfiguriert werden.

??? example "Alle Umgebungsvariablen im Überblick"

    | Variable                    | Hinweis                                                                                      |
    | --------------------------- | -------------------------------------------------------------------------------------------- |
    | SERVER_CONNECTOR_ATTR       | Umstellung auf HTTPS.                                                                        |
    | MAPCLIENT_ADMIN_PW          | Passwort in SHA-256  (./apache-tomcat/bin/digest.sh -a sha-256 -s 0 PASSWORT_KLARTEXT)       |
    | THEME                       | Vorhandenes Theme einstellen                                                                             |


<hr>

## Konfiguration

Zentrale Backend-Einstellungen werden innerhalb der Portal Installation in folgendem Verzeichnis definiert:

```
/PORTAL-INSTALLATIONS-PFAD/apache-tomcat/webapps/ingrid-webmap-client/WEB-INF/classes
```

Folgende Dateien sind relevant:

* *application.properties*

    Alle vorhandenen Einstellungen mit Ihren default Werten.
    **Achtung: Diese Datei nicht verändern.**

* *application.override.properties*

    Enthält alle geänderten Einstellungen!
    Alle Änderungen in dieser Datei vornehmen, default aus application.properties übernehmen und hier ändern.
    Damit bleiben die veränderten Einstellungen auch nach einem Update des Portals erhalten !


??? example "Alle Konfigurationsvariablen im Überblick"

    | Einstellung  | Beschreibung                                                              | Wert-Typ       | Defaul-Wert                          |
    |-----------------------------------|---------------------------------------------------------------------------|----------------|--------------------------------------|
    | config.dir                        | Verzeichnis zum Laden der JS Konfiguration für's Frontend | String         | *./webapps/ingrid-webmap-client/frontend/* |
    | **Feedback aus dem Map Client (mail server settings):** | | |
    | feedback.from                     | Absender E-Mail                                                           | String         |  |
    | feedback.to                       | Empfänger E-Mail                                                          | String         |  |
    | feedback.host                     | Mailserver Host                                                           | String         | |
    | feedback.port                     | Mailserver Port                                                           | Integer         | |
    | feedback.user                     | Mailserver User                                                           | String         | |
    | feedback.password                 | Mailserver Passwort                                                       | String         | |
    | feedback.protocol                 | Mailserver Protokoll                                                      | String         | |
    | feedback.ssl                      | E-Mail verschlüsselt ?                                                    | Boolean        | false |
    | **KML-Dateien (Redlining etc.):** | Die erstellten Dateien werden in einem Verzeichnis auf dem Server abgelegt.<br>Ein Cleanup Job entfernt Dateien, wenn eine Gesamtanzahl von Dateien überschritten ist und die Datei älter als eine zu konfigurierende Anzahl von Tagen ist. Wird im Kartenclient eine Datei erneut aufgerufen, so wird das Datum der Datei aktualisiert. So bleiben ständig aufgerufene Dateien länger erhalten.<br>Nachfolgend die Konfigurationsparameter, Startzeit des Cleanup Jobs s.u. | |
    | kml.directory                     | Verzeichnis in dem die KML Daten abgelegt werden                          | String         | *./webapps/ingrid-webmap-client/frontend/kml/* |
    | kml.days_of_exist                 | Wie lange sollen KML Dateien vorgehalten werden (in Tagen), wenn die Maximalanzahl der Dateien im Verzeichnis überschritten ist ?                 | Integer        | 365 |
    | kml.max_directory_files           | Maximalanzahl der Dateien im Verzeichnis. Wenn diese Anzahl überschritten ist, dann wird geprüft, ob Dateien gelöscht werden können.<br><br>Bsp. mit den Default Werten:<br>Sind im KML Verzeichnis mehr als 1000 Dateien, so werden alle Dateien gelöscht, deren letzte Änderung mehr als 365 Tage zurück liegt. Es können also mehr als 1000 Dateien vorhanden sein. | Integer        | 1000 |
    | **Dateien von komprimierten Parametern (z.B. layers) :** | Die erstellten Dateien werden im Konfigurationsverzeichnis des Mapclients im Verzeichnis _shorten_ hinterlegt.<br>Verhalten wie bei **KML-Dateien** s.o. | |
    | shorten.days_of_exist             | Wie lange sollen Dateien vorgehalten werden (in Tagen), wenn die Maximalanzahl der Dateien im Verzeichnis überschritten ist ?                 | Integer        | 365 |
    | shorten.max_directory_files       | Maximalanzahl der Dateien im Verzeichnis. Wenn diese Anzahl überschritten ist, dann wird geprüft, ob Dateien gelöscht werden können.<br><br>Bsp. mit den Default Werten:<br>Sind im _shorten/layers_ Verzeichnis mehr als 1000 Dateien, so werden alle Dateien gelöscht, deren letzte Änderung mehr als 365 Tage zurück liegt. Es können also mehr als 1000 Dateien vorhanden sein. | Integer        | 1000 |
    | **Update Job Settings (Job zur Aktualisierung der Layer Daten aus den GetCapabilities):** | | |
    | scheduler.layer.update            | Wann soll der Job ausgeführt werden ?                                     | String | "0 3 * * *" (jede Nacht 3 Uhr) |
    | scheduler.layer.update.mail       | Soll bei der Aktualisierung eine Mail verschickt werden ?                 | Boolean        | false |
    | **Cleanup Job Settings (Job zur Löschung von veralteten Dateien im Konfigurationsverzeichnis):** | | |
    | scheduler.cleanup.data            | Wann soll der Job ausgeführt werden ?                                     | String         | 0 4 * * * |
    | **Lock Verhalten (Sperre zeitgleiche Benutzung):** | | |
    | admin.lock | Verhindert, das sich mehrere Benutzer gleichzeitig in der Admin-GUI anmelden können. | Boolean | false |
    | admin.lock.file | Ist die Eigenschaft "admin.lock" aktiv, so wird beim Anmelden eines Benutzer die Datei unter dem definierten Pfad von "config.dir" hinterlegt. Ist diese Datei vorhanden, kann sich kein anderer Benutzer auf die Admin-GUI anmelden. Die Datei wird gelöscht, so bald sich der eingeloggte Benutzer ausloggt bzw. die Session des eingeloggten Benutzers (10 min) beendet ist. | String | admin.lock |


!!! example "Beispiel"
    Mit Hinzufügen der nachfolgenden Einstellungen in die Datei *application.override.properties* werden die JS Konfigurationsdateien für's Frontend und die KML Dateien für's Zeichnen aus dem zentralen *WebmapClientData* Verzeichnis geladen/abgelegt.

    ```
    ...
    config.dir=/opt/ingrid/WebmapClientData/
    kml.directory=/opt/ingrid/WebmapClientData/kml
    ...
    ```

## Schnittstellen

### URL-Shortener

Da der Zustand der Karte in der URL abgebildet wird, kann die URL sehr lang werden. Der URL-Shortener verkürzt hierfür die URL der Karte und wird bei den Funktionen [Teilen]({{ fix_url('guides/webmap-client-frontend.md/#karten-teilen') }}) und [Drucken]({{ fix_url('guides/webmap-client-frontend.md/#karten-drucken') }}) verwendet.

Per Default wird im Mapclient der öffentlich Dienst [https://is.gd/](https://is.gd/) verwendet. Über diesen Dienst kann eine URL folgendermaßen verkürzt werden:

```
https://is.gd/create.php?format=json&url=<URL>
```

Als Antwort des Dienstes wird ein JSON-Objekt mit einem Schlüssel 'shorturl' geliefert, z.B.:

```json
{ "shorturl": "https://is.gd/pvfPuU" }
```

Den per Default eingestellten URL-Shortener kann man im Webmap Client austauschen. (siehe [Konfiguration](#konfiguration)).
Hierbei ist es notwendig, dass der ausgetauschte URL-Shortener die gleiche JSON-Anwort, auch von der Struktur mit dem gleichen Schlüssel, liefert.

Eine alternative hierbei ist [YOURLS](https://yourls.org/).

Es gibt zwei Möglichkeiten YOURLS zu installieren.

- **YOURLS-Installationspaket**: Hierbei laden Sie das YOURLS-Installationspaket herunter, entzippen es in Ihr gewünschtes Verzeichnis und folgenden den Anweisungen unter [https://yourls.org/#Install](https://yourls.org/#Install).
- **YOURLS-GitHub-Repository**: Klonen Sie sich das YOURLS-Github-Repository unter https://yourls.org/#Install [https://github.com/YOURLS/YOURLS](https://github.com/YOURLS/YOURLS) in Ihr gewünschtes Verzeichnis. Dafür benötigen Sie natürlich die Git-Software auf Ihrer Systemumgebung.

Passen Sie bei beiden Möglichkeiten die Datei **config.php** im Verzeichnis **/YOURLS/user** an. Falls diese Datei **config.php** nicht existiert, so machen Sie eine Kopie der Datei **config-sample.php** und nennen Ihre Kopie in **config.php** um.

Tragen Sie folgende Eigenschaften-Werte ein:

```
**Datenbank**
- MySQL Datenbank Benutzer: define( 'YOURLS_DB_USER', 'DB_BENUTZERNAME' );
- MySQL Datenbank Passwort: define( 'YOURLS_DB_PASS', 'DB_BENUTZERNAME-PASSWORT' );
- MySQL Datenbank Name: define( 'YOURLS_DB_NAME', 'yourls' );
- MySQL Host: define( 'YOURLS_DB_HOST', 'localhost' );
- MySQL Tabellen Prefix: define( 'YOURLS_DB_PREFIX', 'yourls_' );

**YOURLS URL**
- YOURLS URL: define( 'YOURLS_SITE', 'YOURL-URL' );

**BENUTZER**
- YOURLS Benutzer-Login: $yourls_user_passwords = array('BENUTZERNAME' => 'BENUTZER-PASSWORT');
```

Weitere Einstellungsmöglichkeiten von YOURLS finden Sie [hier](https://yourls.org/#Config).

Rufen Sie anschließend die YOURLS-Adminoberfläche mit **YOURL-URL/admin/** auf und loggen sich mit **BENUTZERNAME** und **BENUTZER-PASSWORT** ein.

<a name="qr-code"></a>
### QR-Code

Für die Funktionen [QR-Code Teilen]({{ fix_url('guides/webmap-client-frontend.md/#karten-teilen') }}), [Koordinatenanzeige]({{ fix_url('guides/webmap-client-frontend.md/#koordinatenanzeige') }}) (Maus-Rechts-Klick auf der Karte) und [QR-Code Drucken]({{ fix_url('guides/webmap-client-frontend.md/#karten-drucken') }}) wird ein QR-Code dargestellt.
Für die Generierung des QR-Codes bietet der Webmap Client eine eigene Rest-Schnittstelle:

```
http://<HOSTNAME>/ingrid-webmap-client/rest/data/qrcodegenerator?url=<URL>
```

Über diese Schnittstelle wird für eine beliebige URL eine QR-Code generiert.

Für die QR-Code Generierung wird die JAVA-Bibliothek com.google.zxing.core in der Version 3.2.1 verwendet.

### Mapfish

Für die Funktion [Drucken]({{ fix_url('guides/webmap-client-frontend.md/#karten-drucken') }}) wird im Webmap Client die `JAVA-Bibliothek org.mapfish.print.print-lib` in der Version 2.1.2 verwendet.

## FAQ

??? question "Kann man die Projektion des Webmap Clients anpassen?"

    Die Projektion und weitere Einstellungen können über die Admin-GUI unter Akkordeon [Einstellungen]({{ fix_url('guides/webmap-client-admin-gui.md/#einstellungen') }}) auf Ihre Bedürfnisse angepasst werden.

    !!! info "Hinweis"
        Möglicherweise funktioniert das Drucken des Hintergrund-Layers OSM (OpenStreetMap) nicht korrekt bzw. es wird eine Karte an falscher Position ausgedruckt, da der OSM-Layer die Projektion nicht korrekt unterstützt.

??? question "Kann man die Themen-Bilder unter "Thema wechseln" anpassen?"

    #### Kann man die Themen-Bilder unter "Thema wechseln" anpassen?

    !!! info inline end "Hinweis"
        Per Default ist in der Admin-GUI unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) ein Beispiel mit der Kategorie "Themen" vorhanden.

    Ja, die Bilder sind als CSS definiert und liegen als PNG Dateien in den Maßen 140 x 60 vor.

    Fügen Sie in der Admin-GUI hierzu unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) ein CSS-Eintrag mit folgender Syntax:

    ```
    [ga-topic] .ga-topics-sprite-<KATEGORIE-ID> {
        background: url("<URL-KATEGORIE-IMAGE>");
        width: 140px;
    }
    ```

??? question "Kann man die Reihenfolge der Hintergrundkarten-Auswahl anpassen?"

    #### Kann man die Reihenfolge der Hintergrundkarten-Auswahl anpassen?

    Ja, die Reihenfolge der Hintergrundkarte kann man auch per CSS beeinflussen.

    !!! info "Hinweis"
        - Per Default wird die Reihenfolge von der Kategorie vorgegeben, d.h. die festgelegte Reihenfolge in der Kategorie wird im Webmap Client von Rechts nach Links bzw. in der mobilen Ansicht von Unten nach Oben dargestellt.
        - Die ersten sechs Hintergrundkarten werden in der Auswahlbox vom Webmap Client in der Reihenfolge korrekt dargestellt. Bei jedem weiterem muss unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) jeweils CSS-Einträge ( für Desktop und Mobil) hinzugefügen werden.

    Fügen Sie in der Admin-GUI hierzu unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) CSS-Eintäge mit folgender Syntax:

    ```
    ...
    @media (max-width: 768px) {
        ...
        [ga-background-selector].ga-open .ga-<KARTEN-ID> {
            -webkit-transform: translate3d(0, <KARTEN-POSITION>, 0);
            transform: translate3d(0, <KARTEN-POSITION>, 0);
            -ms-transform: translateY(<KARTEN-POSITION>);
        }
    }
    ...
    @media (min-width: 769px) {
        ...
        [ga-background-selector].ga-open .ga-<KARTEN-ID> {
            -webkit-transform: translate3d(<KARTEN-POSITION>, 0, 0);
            transform: translate3d(<KARTEN-POSITION>, 0, 0);
            -ms-transform: translateX(<KARTEN-POSITION>);
        }
    }
    ...
    ```

    !!! info "Hinweis"
        Per Default ist in der Admin-GUI unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) ein Beispiel mit der Kategorie "Themen" vorhanden.

??? question "Kann man die Bilder für die Hintergrundkarten-Auswahl anpassen?"

    #### Kann man die Bilder für die Hintergrundkarten-Auswahl anpassen?

    Ja, die Bilder für die Hintergrundkarten werden per CSS definiert.

    Die Bilder sollten folgende Formate haben:
    - Mobile in 38px x 38px
    - Desktop in 90px x 58px

    Fügen Sie in der Admin-GUI hierzu unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) CSS-Eintäge mit folgender Syntax:

    ```
    ...
    @media (max-width: 768px) {
        ...
        [ga-background-selector] .ga-<KARTEN-ID> {
            background-image: url("<URL-KARTEN-IMAGE>");
            background-size: 38px 38px;
        }
        ...
    }
    ...
    @media (min-width: 769px) {
        ...
        [ga-background-selector] .ga-<KARTEN-ID> {
            background-image: url("<URL-KARTEN-IMAGE>");
            background-size: 90px 58px;
        }
        ...
    }
    ...
    ```

??? question "Kann man das Bild zum Hintergrundkarten-Wechsel anpassen?"

    Für diesen Zweck gibt es keine Funktion in der Admin-GUI und es müssen auch Operationen auf dem Server ausgeführt werden.

    Sie können unter `WebmapClientData/img/category/` entweder per Git, wenn eingerichtet, oder per Hochladen direkt auf den Server ein PNG hinterlegen.
    Dieses PNG sollten Sie dann per `https://<IHRE-DOMAIN>/ingrid-webmap-client/rest/admin/image/category/<DATEINAME-OHNE-DATEIENDUNG>` aufrufen können.

    Per Admin-GUI können Sie dann unter Akkordeon [Style]({{ fix_url('guides/webmap-client-admin-gui.md/#style') }}) einen neuen CSS-Eintrag hinzufügen, z.B.:

    ```
    [ga-background-selector] .ga-bg-layer, [ga-background-selector] .ga-bg-layer-bt, [ga-background-selector] .ga-bg-layer-bt-close {
        background: #fff url(https://<IHRE-DOMAIN>/ingrid-webmap-client/rest/admin/image/category/<DATEINAME-OHNE-DATEIENDUNG>) no-repeat 0 center;
    }
    ```

??? question "URL-Shortener funktioniert nicht korrekt?"

    !!! info inline end "Hinweis"
        Der URL-Shortener **YOURLS** verkürzt auch URL's mit IP-Adressen. Mehr Informationen zu YOURLS finden Sie unter [URL-Shortener](#url-shortener).

    Der per Default eingestellte URL-Shortner (https://is.gd/create.php?format=json) verkürzt nur URL's mit einer Domain und keine mit einer IP-Adresse. Hier liefert der URL-Shortener einen Fehler und vom Webmap Client wird die ungekürzte URL zurückgeliefert.

??? question "Können passwortgeschützte Karten/Dienste verwenden werden?" 

    #### Passwortgeschützte Karten/Dienste
    Über die Admin-GUI können auch Karten von passwortgeschützten Diensten eingepflegt werden.

    Laden Sie hierbei über den Reiter "Karten" und den Button "Dienst laden" die Dienst-URL indem Sie zusätzlich über die Checkbox "Login verwenden" den Benutzername und das Passwort angeben.

    Wurde der Dienst erfolgreich geladen, so wird Ihnen der passwortgeschützte Dienst wie gewohnt in einer Baumstruktur dargestellt. Sobald Sie nun eine odere mehrere Karten/Layern zu Ihrem MapClient hinzufügen, wird das Login (Benutzername, Passwort) zu dem Hostname Ihres Dienstes zugeordnet und intern in einer JSON-Datei gespeichert.

    Warum das Login gespeichert werden muss? Für die Kartendarstellung werden die Kacheln/Tiles (GetMap-Anfrage) Ihrer passwortgeschützten Karten nun nicht mehr direkt aufgerufen, sondern über den Server, wo der Webmap Client installiert ist, mit Authentifizierung (anhand der internen JSON-Datei) geladen.

    Neben der GetMap-Anfrage wird die interne JSON-Datei auch für den Druck, GetCapabilities- und GetFeatureInfo-Abfrage verwendet.

    Passwortgeschützte Dienste/Karten können nur über die Pflege per Admin-GUI verwendet werden. Ein Laden/Importieren direkt über den Webmap Client ist nicht möglich.

??? question "Fehlerhafte Karten"

    #### Fehlerhafte Karten

    Je nach Einstellung läuft (per Default: täglich um 3:00 Uhr) ein Job, welches diverse Einstellungen (Extent, Legend-URL, Scales, etc.) zur Ihren eingepflegten Karten (nicht bei kombinierten Karten) automatisch aktualisiert.

    Hierbei wird auch geprüft, ob der Dienst noch erreichbar und die Karte in der GetCapabilities des Dienstes noch vorhanden ist. Ist der Dienst nicht mehr erreichbar, z.B. durch https-Umstellung, wird der eingepflegten Karten ein Status "Dienst existiert nicht mehr" und bei nicht vorhandsein der Karte in der GetCapabilities der Status "Karte existiert nicht mehr" hinzugefügt.

    In der Liste der eingepflegten Karten unter dem Akkordeon "Karten" der Admin-GUI kann über die Checkbox "Nur fehlerhafte Karten" nach allen fehlerhaften Karten gefiltert werden.

    Um den Fehler bei den fehlerhaften Karten zu beheben, muss manuell in der Admin-GUI, je nach dem was der Status ist, entweder die Dienst-URL oder der Layer-Name geändert werden.

    Ist bei einer fehlerhaften Karte der Dienst noch erreichbar, aber die Karte (Layer-Name) existiert nicht mehr, so werden unterhalb des existierenden Layer-Name einer Karte eine Liste (in rot markiert) zur Verfügung gestellt, welches alle Layer-Namen eines Dienstes auflistet. Meistens ändert sich nur der Layer-Name für eine Karte und somit kann einfach der Layer-Name aktualisiert werden. Wählen Sie den passend Layer-Name aus der Liste aus und bestätigen Sie Ihre Änderung mit dem "Speichern"-Button.

    Zudem werden bei dem Job die eingepflegte Karten, die keine Zuordnung zu einer Kategorie haben, entfernt.

    Möchten Sie eine E-Mail-Benachrichtigung, falls eingepflegte Karten nicht mehr erreichbar sind und einen Fehler aufweisen, so setzen Sie die Einstellung `scheduler.layer.update.mail` auf `true`. Gehen Sie hier wie unter [Konfiguration]({{ fix_url('#konfiguration') }}) beschrieben vor. Bei Änderung muss das Portal neugestartet werden.
    Ein SMTP-Server (Einstellung "feedback.host") muss eingestellt sein und die E-Mail geht an die Adresse unter Einstellung "feedback.to".


??? question "Welche Art von Dimension-Time-Karten können eingepflegt werden?"

    Der MapClient ist für Dimension-Time-Karten mit einer jährlichen Zeitperiode abgestimmt, d.h Karten mit einer Zeitperiode von z.b. 2010, 2011, 2013, etc..

    Theoretisch können auch andere Zeitperioden eingepflegt werden, aber die Funktionen im Mapclient werden nicht korrekt dargestellt oder funktionieren nicht richtig, z.B. bei einer monatlichen Zeitperiode eines Jahres:

    !!! info inline end "Hinweis"
        Die Zeitstempeln der eingepflegten Karten werden nicht automatisch aktualisiert.

    * [Zeitregler]({{ fix_url('guides/webmap-client-frontend.md/#zeitregler') }}): Der Regler bleibt immer auf dem Jahr und lässt sich nicht verschieben. Ein Abspielen der Zeitperioden ist nicht möglich.
    * [Zeitabhängige Darstellung der Karte]({{ fix_url('guides/webmap-client-frontend.md/#dargestellte-karten') }}): Bei Klick auf die Jahreszahl würden alle Zeitperioden nur mit dem Jahr angezeigt werden. Hier kann man zwar die einzelnen Zeitstempeln auswählen und die Karte ändert sich auch, aber man weiß nicht wirklich, welcher Zeitstempel z.Zt. aktiv ist.

??? question "Warum ist der Wert des "layers"-Parameters in der URL so kryptisch?"

    Im Mapclient wird der "layers"-Parameter in der URL komprimiert dargestellt. Hierbei werden die hinzugefügten Layern in der Karte nicht mehr per Komma getrennt in der URL aufgelistet, sondern die Liste der Layern werden in eine Datei geschrieben und im "layers"-Parameter wird der Dateiname referenziert.

    Dadurch wird vermieden, dass die URL des Mapclients zu lange wird und im Browser Probleme verursacht.

??? question "Wo kann ich die Login-Daten für die Admin-GUI festlegen?"

    Der Mapclient läuft in einem Tomcat und über die Login-Konfiguration vom Tomcat kann man die Login-Daten für die Admin-GUI des Mapclients festlegen. Die Datei für die Login-Konfiguration findet Sie unter

    ```
    /PORTAL-INSTALLATIONS-PFAD/apache-tomcat/conf/tomcat-users.xml
    ```

    Dort können Sie Benutzer und Passwort ändern bzw. hinzufügen. Der Benutzer muss nur die Rolle "admin-gui" haben.

    ```
    ...
    <user username="BENUTZER" password="PASSWORT_IN_SHA-256" roles="admin-gui"/>
    ...
    ```

    Das Passwort muss mit SHA-256 verschlüsselt eingetragen werden. Hierbei können Sie folgenden Befehl aus dem Tomcat verwenden, um sich ein Passwort verschlüsselt zu generieren:

    ```
    /PORTAL-INSTALLATIONS-PFAD/apache-tomcat/bin/digest.sh -a sha-256 -s 0 PASSWORT
    ```


??? question "Wie kann die Sessiondauer eines Benutzers für die Admin-GUI geändert werden?"

    Die Sessiondauer eines Benutzers wird in der Datei "opt/ingrid/ingrid-portal/apache-tomcat/webapps/ingrid-webmap-client/WEB-INF/web.xml" festgelegt:

    ```
    <session-config>
        <session-timeout>10</session-timeout>
    </session-config>
    ```

    Per Default beträgt die Sessiondauer 10 min.
