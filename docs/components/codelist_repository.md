---
title: Codelist Repository
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Allgemeines

Das Codelist-Repository verwaltet diverse Codelisten, die in den InGrid-spezifischen Datensätzen verwendet werden. Da
diese Daten an verschiedenen Stellen (Portale, Schnittstellen, DSCs, ...) ausgegeben oder verarbeitet werden, empfiehlt
es sich, die Codelisten zentral zu verwalten, um einen konsistenten Zustand gewährleisten zu können.

Jede Komponente, die mit den Codelisten arbeitet, synchronisiert sich periodisch mit dem Repository und ist somit immer
auf einem aktuellen Stand, sollte sich eine Codeliste verändern. Dabei wird das Repository in einem definierten
Intervall mit dem Zeitstempel der letzten veränderten Codeliste angefragt und erhält somit nur die Veränderungen, die
seit dem Zeitstempel geschehen sind.

Eine direkte Kommunikation zum Codelist-Repository geschieht von allen Komponenten, die nicht mit dem iBus verbunden
sind, wie zum Beispiel der InGrid-Editor. Da der iBus auch an das Codelist-Repository angeschlossenen ist, können
Komponenten auch über den iBus zu aktuellen Codelisten gelangen.

![](../assets/drawio/ingrid-codelist-repository.drawio)

Beim Verändern einer Codeliste, werden die Daten in XML-Dateien abgespeichert. Diese Dateien haben das folgende
Namensschema: "data/codelist_<codelist-id>.xml"

## Systemvoraussetzungen

|              | **Systembestandteil** | **Anforderung** |
|--------------|-----------------------|-----------------|
| **Hardware** | Arbeitsspeicher       | 256 MB RAM      |
|              | Festplattenspeicher   | 500 MB frei     |
|              | Prozessor             | Dual Core CPU   |
| **Software** | Java                  | Java 17         |

<hr>

## Installation

Die Installation des Codelist-Repositories kann mit Docker oder direkt aus dem GitHub-Repository erfolgen. Im Folgenden
sind Beispiele
und Anleitungen dazu aufgelistet.

### :material-docker: Docker

<div class="grid cards" markdown>

- :material-docker:{ .lg .middle } __Docker-Image__

  ---

  Zur Installation kann das folgende Docker-Image verwendet werden:

  [:octicons-arrow-right-24: docker-registry.wemove.com/ingrid-codelist-repository](https://docker-registry.wemove.com/ingrid-ibus)

</div>

``` yaml title="Beispiel docker-compose.yml"
  ingrid-codelist-repo:
    image: docker-registry.wemove.com/ingrid-codelist-repository
    restart: unless-stopped
    environment:
      - TZ=Europe/Berlin
      - CREDENTIALS_ADMIN=admin=>${CODELIST_PASSWORD}
    volumes:
      - ./logs/codelist-repo:/opt/ingrid/ingrid-codelist-repository/logs
      - ./codelist-repository:/opt/ingrid/ingrid-codelist-repository/data
```

### :material-github: From Source

Um das Codelist-Repository direkt auf einem System zu installieren, müssen folgende Vorbedingungen erfüllt sein:

* Maven 3.5.0+
* Java 17

Die Installation des iBus (z.B. nach `/opt/ingrid/codelist-repository`) erfolgt dann mit diesen Schritten:

#### Codelist-Repository klonen und bauen

```shell
git clone https://github.com/informationgrid/ingrid-codelist-repository
cd ingrid-codelist-repository
mvn clean package -DskipTests
```

#### Codelist-Repository installieren

```shell
unzip target/ingrid-codelist-repository-8.1.0-SNAPSHOT-installer.jar "ingrid-*"
cd ingrid-codelist-repository-8.1.0-SNAPSHOT
```

#### Codelist-Repository starten

```shell
export INGRID_USER=$USER
./start.sh start
```

## Konfiguration

### Nutzer für den Zugriff auf das Codelist-Repository

Die Nutzer des Codelist-Repositories können über eine Umgebungsvariable gesteuert werden. Hierbei wird zwischen
Administratoren und einfachen Nutzern unterschieden. Dazu stehen die beiden Umgebungsvariablen zur Verfügung:

* CREDENTIALS_ADMIN
* CREDENTIALS_USER

Die Benutzer können in dem folgenden Format angegeben werden:

```
admin1=>password1,admin2=>md5-hash,admin3=>brypt
```

Dies legt drei Administratoren `admin1`, `admin2` und `admin3`. Das Passwort kann in drei Formaten angegeben werden:

* Klartext
* MD5-Hash
* BCrypt

Alternativ können die Nutzer auch über die Datei `config.override.properties` gesetzt werden. Hierzu müssen die
folgenden Eigenschaften überschrieben werden:

```properties
credentials.admin=...
credentials.user=...
```

### Umgebungsvariablen

???+ example "Alle Umgebungsvariablen im Überblick"

    | **Variable**      | **Hinweis**                                                             | **Defaultwert** |
    |-------------------|-------------------------------------------------------------------------|---------------|
    | CREDENTIALS_ADMIN | Die Administratoren des Codelist-Repositories (Zugriff auf API und GUI) |               |
    | CREDENTIALS_USER  | Die Nutzer des Codelist-Repositories (nur Zugriff auf API)              |               |
    | CODELISTS_IGNORE  | Angabe der Codelisten-IDs, die bei einem Update ignoriert werden sollen |               |

## REST-API

Es folgt eine Auflistung mit den möglichen REST-Anfragen für das Codelist-Repository.

| Typ    | Anfrage                                          | Beschreibung                                                                                                                                                                                                                                                                     |
|--------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /rest/getCodelists?lastModifiedDate=&name=       | Gib alle Codelisten zurück. Wenn der Parameter *lastModifiedDate* angegeben wurde, dann werden alle Codlisten zurückgegeben, die seit diesem Zeitstempel verändert worden sind. Mit dem Parameter *name* kann eine spezielle Codeliste anhand ihren Namens zurückgegeben werden. |
| GET    | /rest/getCodelists/{id}                          | Gib eine Codeliste mit der ID *id* zurück.                                                                                                                                                                                                                                       |
| PUT    | /rest/getCodelists/{id}                          | Füge eine neue Codeliste hinzu oder aktualisiere eine bestehende Codeliste.                                                                                                                                                                                                      |
| DELETE | /rest/getCodelists/{id}                          | Lösche die Codeliste mit der ID *id*                                                                                                                                                                                                                                             |
| GET    | /rest/getCodelists/short?lastModifiedDate=&name= | Zeige die Kurzversion der Codelisten an, bestehend aus *ID* und *Namen*. Die Parameter verhalten sich genauso wie bei der *rest/getCodelists*-Anfrage.                                                                                                                           |
| GET    | /rest/getCodelists/short/{id}                    | Das derzeitige Verhalten entspricht demselben wie */rest/getCodelists/{id}*                                                                                                                                                                                                      |
| GET    | /rest/findEntry/{name}                           | Suche in allen Einträge von allen Codelisten nach Einträgen, die *name* enthalten. Dies wird von der Suche im Codelist-Repository verwendet.                                                                                                                                     |
| GET    | /rest/checkChanges                               | Prüfe, ob das Repository Codelisten gelöscht hat, die im initialen Zustand noch vorhanden sind.                                                                                                                                                                                  |
| PUT    | /rest/addInitialCodelist/{id}                    | Ersetze die Codeliste mit der ID *id* mit der initialen Version.                                                                                                                                                                                                                 |

## FAQ

??? question "Welche Komponenten verwenden das Codelist-Repository?"

    Der InGrid-Editor und der iBus verwenden das Codelist-Repository direkt, d.h. dass diese Komponenten eine HTTP-Verbindung zum Repository aufnehmen und die Codelisten anfragen. Die Komponenten Portal, CSW-Schnittstelle und iPlug CSW-DSC fragen den iBus an, um die Codelisten zu synchronisieren.

??? question "Welche Codelisten werden weiterhin in den einzelnen InGrid-Katalogen gepflegt?"

    Folgende Codelisten stellen Ausnahmen dar und können in jedem Einzelkatalog weiterhin durch den Katalogadministrator im Bereich Katalogverwaltung geändert bzw. ergänzt werden:

    - Freier Raumbezug
    - Zusatzinformation - Rechtliche Grundlagen
    - XML Export Kriterium
    - Geo-Information/Karte - Fachbezug - Schlüsselkatalog
    - Geo-Information/Karte - Fachbezug - Symbolkatalog
    - Verfügbarkeit - Zugangsbeschränkungen
    - Verfügbarkeit - Nutzungsbedingungen

      Je nach InGrid-Editor-Profil, können auch weitere Codelisten eingestellt sein.

??? question "Wann werden Änderungen in einer Codeliste in den Komponenten wirksam?"

    Jede Komponente, die mit den Codelisten arbeitet, synchronisiert sich periodisch mit dem Repository und ist somit immer auf einen aktuellen Stand, sollte sich eine Codeliste verändern. Dabei wird das Repository in einem definierten Intervall mit dem Zeitstempel der letzten veränderten Codeliste angefragt und erhält nur die Veränderungen, die seit dem Zeitstempel geschehen sind.

??? question "Wie erzwingt man eine komplette Aktualisierung?"

    Typischerweise wird das Codelist-Repository mit einem Zeitstempel angefragt, um nur die Änderungen zu empfangen. Ist die eigene Codeliste, aus welchen Gründen auch immer, kaputt, kann man eine Komplettsynchronisation erzwingen, indem das data-Verzeichnis, wo die Codelisten synchronisiert werden, gelöscht wird. Bei einer erneuten Synchronisation werden die gesamten Codelisten übertragen.
    
    Beim InGrid-Editor kann dies über die GUI direkt angestoßen werden.
    
    Bei jeder Installation wird der Zeitstempel von allen Codelisten auf das Installationsdatum gesetzt. Somit werden alle verbundene Clients mit dem aktuellen Stand der Codelisten versorgt. Wird die Update-Funktion des Installers verwendet, so werden nur die neu hinzu gekommenden bzw. veränderten Codelisten mit einem Updatezeitstempel versehen.

??? question "Datenfelder für spezielle Codelisten"

    | Codeliste | Definition                                                                                             | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
    |-----------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | 6300      | Version und Spezifikation in Hochkommata getrennt von einem Komma<br><br>z.B.: "Version 1.1","Spez. 4" | Die zusätzlichen Angaben für einen Eintrag aus dem INSPIRE-Datenformat werden im InGrid-Editor verwendet, um das IDF-Dokument zu generieren. Sind Version und Spezifikation mit angegeben, so werden diese unter MD_Format mit ausgegeben.                                                                                                                                                                                                                                  
    | 1100      | Leerzeichen separierte Liste von Koordinaten<br><br>z.B.: "9,605 52,304 9,918 52,454"                  | Diese Liste wird nicht im Codelist-Repository sondern im InGrid-Editor selbst gepflegt. Zu jedem freien Raumbezug können die BoundingBox-Koordinaten mit angegeben werden, die bei der Auswahl des Eintrags in der Objektbearbeitung, automatisch in die dazugehörigen Feldern eingetragen werden.                                                                                                                                                                                   
    | 2000      | Kommata separierte Liste von Objektklassen<br><br>z.B.: "1,3,6"                                        | Im Verweisdialog eines Objekts kann ein Verweistyp ausgewählt werden. Diese werden über die Codeliste 2000 definiert. Durch die Angabe der Objektklassen im Data-Feld, wird bestimmt, in welcher Klasse des Objekts dieser Typ angezeigt werden soll. Ist das Data-Feld leer, so wird der Verweistyp niemals in diesem Dialog angezeigt. Jedoch kann dieser für die interne Verarbeitung genutzt werden, wie es bspw. mit dem Eintrag "Gekoppelte Daten" (3600) geschieht. 

??? question "Wie können Codelisten erweitert werden?"

    * Die existierenden Codelisteneinträge sollten nicht angepasst werden, da diese zentral gepflegt werden und bei einer Aktualisierung überschrieben werden könnten. Offensichtliche Fehler sollten natürlich behoben werden.
    * Bestehende Codelisteneinträge können entfernt werden, allerdings können Datensätze mit einem gelöschten Codelisteneintrag kaputt gemacht werden
    * Neue Einträge in bestehende Codelisten können aufgenommen werden. Dazu bitte einen eigenen Nummernkreis mit ausreichend Abstand zu den existierenden Default-Einträgen erzeugen und diesen am besten in der InGrid Community abstimmen. Es empfiehlt sich auch einen eigenen Präfix zu verwenden, um Konflikte zu vermeiden. 
    * Neue Codelisten können erstellt werden. Die Codelist-IDs bitte außerhalb der ISO-Nummerierung (>1000) wählen.

