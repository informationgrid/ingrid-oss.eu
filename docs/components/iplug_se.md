---
title: iPlug SE (Search Engine, Web Crawler)
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Allgemeines

Das iPlug dient dem Indexieren von Webseiten. Die zu indexierenden Webseiten werden über eine komfortable Administration gepflegt. Die Webseiten werden zeitgesteuert über einen Crawler heruntergeladen, analysiert und indexiert. Dabei kommt für den Web Crawler die OpenSource Software [Apache Nutch](https://nutch.apache.org/) zum Einsatz.

![](../assets/drawio/ingrid-iplug-se.drawio)

Es können mehrere Instanzen mit jeweils unterschiedlicher Konfiguration und unterschiedlichen URL Räumen, die durch Start- Limit und Exclude-URL Muster definiert werden, konfiguriert werden. Jede Instanz kann unabhängig gestartet und indexiert werden.

Über eine mächtige Metadaten Funktionalität können für URL Räume Metadaten mitgegeben werden. Diese werden mit indexiert und können in der Suche verwendet werden. Die Metadaten werden dabei auf alle weiteren URLs übertragen, die mit der Start-URL beginnen.


Ein Indexierungsdurchlauf besteht aus mehreren Phasen:


| Phase        | Beschreibung |
|-------------|---------------|
| Inject URLs | Start-, Limit- und Exclude URLs werden exportiert und in Nutch-Datenbanken importiert. |
| Filter CrawlDB | Die vorhandene Nutch CrawlDB wird gegen die Limit- und Exclude URLs gefiltert. |
| Generate URLs | Aus der Nutch CrawlDB werden URLs für den Crawl ausgewählt. |
| Fetch | Die URLs werden heruntergeladen. |
| Update CrawlDB | Die Nutch CrawlDB wird mit den neu ermittelten Outlinks der heruntergeladenen Seiten aktualisiert. |
| Update Metadata | Die neuen URLs werden mit den Metadaten der Start-URLs aktualisiert. |
| Create Host Statistics | Eine Host Statistik wird erzeugt (Anzahl URLs pro Host). |
| Create Url Error Statistics | Eine Statistik über fehlerhafte URLs wird erzeugt. |
| Create Url Report | Ein Statusreport für Start-URLs wird erzeugt. |
| Merge Segments | Vorhandene Segmente werden zu einem Segment konsolidiert. |
| Filter Segments | Vorhandene Segmente werden gegen die CrawlDB gefiltert. Daten von gelöschten URL Räumen werden entfernt. |
| Webgraph | Ein Webgraph wird anhand der Verlinkung der einzelnen URLs erstellt. Der Webgraph gibt Auskunft, wie stark URLs miteinander vernetzt sind. Diese Information geht in die Ermittlung eines Webseiten-Scores bei der Indexierung ein. |
| Update LinkDB | Die Nutch LinkDB wird aktualisiert. |
| Deduplication | Anhand von einem Fingerprint werden Duplikate von Webseiten identifiziert und markiert. |
| Index | Der Index wird aktualisiert. |
| Cleanup Index | Duplikate werden aus dem Index entfernt. |
| Cleanup Crawl | Temp. Dateien werden gelöscht. |

## Systemvoraussetzungen

|              | **Systembestandteil** | **Anforderung**    |
|--------------|-----------------------|--------------------|
| **Hardware** | Arbeitsspeicher       | 512 MB RAM         |
|              | Festplattenspeicher   | 10 GB frei         |
|              | Prozessor             | Dual Core CPU      |
| **Software** | Java                  | Java 21            |


## Installation


### :material-docker: Docker

!!! info inline end
    Zugang zum Docker Repository<br><br>
    login: readonly<br>password: readonly

<div class="grid cards" markdown>

-   :material-file-edit-outline:{ .lg .middle } __Docker-Image__

    ---

    Zur Installation kann das folgende Docker-Image verwendet werden:

    [:octicons-arrow-right-24: docker-registry.wemove.com/ingrid-iplug-se](https://docker-registry.wemove.com/ingrid-iplug-se)

</div>

``` yaml title="Beispiel docker-compose.yml"
services:

  crawler:
    image: docker-registry.wemove.com/ingrid-iplug-se
    restart: unless-stopped
    depends_on:
      - "ibus"
    environment:
      - TZ=Europe/Berlin
      - JAVA_OPTS=-Dfile.encoding=UTF8 
      - NETWORK_HOST=elastic  
    volumes:
      - ./crawler/conf/config.override.properties:/opt/ingrid/ingrid-iplug-se/conf/config.override.properties
      - ./crawler/conf/web.xml:/opt/ingrid/ingrid-iplug-se/webapp/WEB-INF/web.xml
      - ./crawler/instances:/opt/ingrid/ingrid-iplug-se/instances
      - ./crawler/database:/opt/ingrid/ingrid-iplug-se/database
      - ./crawler/logs/ingrid-iplug-se:/opt/ingrid/ingrid-iplug-se/logs
    deploy:
    resources:
        limits:
        memory: 512M
    networks:
      - informationgrid-network

```

### :material-github: From Installer

Um den InGrid Web Crawler direkt auf einem System zu installieren, müssen folgende Vorbedingungen erfüllt sein:

* Java (>= v21)

Die Installation des InGrid Web Crawler (z.B. nach `/opt/ingrid/crawler`) erfolgt dann mit diesen Schritten:


#### Download

Download: [https://distributions.informationgrid.eu/ingrid-iplug-se/](https://distributions.informationgrid.eu/ingrid-iplug-se/)

Um die Installationsroutine zu starten, doppel-klicken Sie auf das Installationsprogramm oder geben Sie folgenden Befehl auf der Kommandozeile ein:

#### Install

```sh
java -jar ingrid-iplug-se-VERSION-installer.jar
```

Der Installer ist sowohl per graphischer Oberfläche als auch Kommandozeileneingabe ausführbar. Bitte folgen Sie den Anweisungen des Installationsprogrammes. Das Installationsprogramm installiert die Komponente im gewünschten Verzeichnis und passt die Konfigurationsdateien an.

Sie können nun das iPlug mit

```sh
sh start.sh start
```

starten.

#### Konfiguration

Das iPlug besitzt eine Administrationsoberfläche über die die angeschlossenen iPlugs eingesehen und verwaltet werden können.

```
http://localhost:PORT
```

Anstelle von `localhost` können Sie auch die IP-Adresse des Computers eingeben. Authentifizieren Sie sich als 'admin' mit dem von Ihnen vergebenen Passwort.


#### Aktualisierung

Neues Release von [https://distributions.informationgrid.eu/ingrid-iplug-se/](https://distributions.informationgrid.eu/ingrid-iplug-se/) herunterladen.

iPlug stoppen.

```sh
sh start.sh stop
```

Aktuelles Installationsverzeichnis sichern:

```sh
cp -r /opt/ingrid/ingrid-iplug-se BACKUP_DIRECTORY
```


Die Aktualisierung erfolgt über den Installer.

```sh
java -jar ingrid-iplug-se-NEW-VERSION-installer.jar
```

Während der Installation bitte "Upgrade" auswählen und das Installationsverzeichnis Verzeichnis angeben.

iPlug starten.

```sh
sh start.sh start
```

#### Betrieb

```sh
start.sh [start|stop|restart|status]
```

Die LOG Ausgaben finden sich in der Datei `log.log` und `console.log`.


## Konfiguration

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Konfiguration über die GUI"){ class="grid-pictogram" }
    
    Informationen zur Konfguration über die GUI können Sie der Dokumentation entnehmen.

    [Web Crawler Konfguration](../guides/iplug-se-setup.md){ .md-button }

</div>


### Elasticsearch Konfigurationen

`./conf/default-mapping.json` - Definition der Felder im Elasticsearch Index. Mit diesem Field Mapping werden neue Index erstellt. Bitte berücksichtigen, dass diese Einstellungen mit der Suche zusammenpassen müssen.

`./conf/default-settings.json` - Definition grundlegende Einstellungen für den Elasticsearch Index. Mit dieser Konfiguration werden neue Index erstellt.



### Logging

Die Konfiguration des LOG Levels befindet sich hier: `./conf/log4j2.xml`.

Die LOGs des iPlug-SE Prozesses werden unter `./logs/log.log` geschrieben.

Die LOGs für die Instanzen liegen unter `./instances/<INSTANZ_NAME>/logs/hadoop.log`.


## FAQ

??? question "Wie kann ich ein Überschreiben der Datei `env.sh` bei einer Aktualisierung verhindern."

    !!! info
        Diese FAQ Bezieht sich nur auf die direkte Installation über den Installer.
    
    In der Datei env.sh können Systemvariablen komponenten-spezifisch angepasst werden (z.B. Proxy oder Heap Einstellungen). Um die Einstellungen nach einer Aktualisierung nicht zu verlieren, muss die Datei `env.sh` nach `user.env.sh` kopiert werden. Die Änderungen in `user.env.sh` werden nicht überschrieben.

??? question "Ein URL Raum wird nicht indexiert, die Start URL hat einen Redirect Status."

    Es kann sein, dass die URL zu der weitergeleitet wird, nicht mehr Teil des definierten URL Raumes ist. Bitte die URL im Browser aufrufen und den URL Raum auf Basis der Weiterleitungs-URL neu erstellen.

??? question "Wie wird der Score der Suchergebnisse ermittelt?"

    Die Ermittlung des Scores hängt von vielen Faktoren ab. ElasticSearch bietet die Möglichkeit, die [Scorebildung zu erläutern](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-explain.html). Für den Crawler fließt die Vernetzung der Seiten innerhalb des URL Raumes mit ein.

??? question "Duplikate erkennen"

    Bei manchen Websites kann der Inhalt einer Seite durch mehrere URLs erreicht werden. Die Suchmaschine versucht schon Zeitstempel und andere dynamische Angaben aus den URLs zu entfernen, kann aber nicht alle Eventualitäten berücksichtigen. Es kann somit vorkommen, dass URL-Duplikate zu einem Inhalt existieren.

    Anhand der Suchergebnisse können z.T. Duplikate erkannt werden und durch Anpassung der Exclude-URLs gefiltert werden. Die Filterung erfolgt immer während eines Crawls, dabei reicht es nur eine URL zu crawlen.

    Die Suchmaschien berechnet zu jeder Seite einen Hash, anhand dem Duplikate erkannt werden können. Über diese Befehle auf der Kommandozeile können die Duplikate ermittelt werden:

    ``` bash
    mkdir analyse_<DATE>
    cd analyse_<DATE>
    # export aller URLs aus der CrawlDB
    bash ../apache-nutch-runtime/runtime/local/bin/nutch readdb ../instances/websites/crawldb -dump dump -format csv
    # alle gefetchten URLs filtern
    grep db_fetched dump/part-00000 > fetched_urls.txt
    # alle URLs nach der Signatur sortieren
    sort -t\; -k10 fetched_urls.txt > fetched_urls_sorted.txt
    # alle Zeilen mit gleicher Signatur ausgeben (inkl.  der ersten)
    cat fetched_urls_sorted.txt | awk '{if (x[$10]) { x_count[$10]++; print $0; if (x_count[$10] == 1) { print x[$10] } } x[$10] = $0}' FS=";" > result.txt
    ```

    Durch eine Analyse und Anpassung der Exclude-URLs, können Duplikate reduziert/verhindert werden.

    Der URL Export kann auch verwendet werden um andere Analysen durchzuführen.

??? question "Die Reports sollen ohne Authentifizierung erreichbar sein."

    Um die Reports in das Admin GUI von der Authentifizierung auszuschließen muss die Datei

    ```
    webapp/WEB-INF/web.xml
    ```

    wie folgt angepasst werden:

    ```xml
    <security-constraint>
        <web-resource-collection>
            <web-resource-name>Free</web-resource-name>
            ...
            <url-pattern>/rest/urlerrors/*</url-pattern>
            <url-pattern>/rest/status/*</url-pattern>
            <url-pattern>/iplug-pages/instanceReports.html</url-pattern>
        </web-resource-collection>
    </security-constraint>
    ```



??? question "Die iPlug Administration funktioniert nicht, es können keine Partner/Anbieter ausgewählt werden."


    Mögliche Ursachen:

    * Falsche Datenbank Verbindungsparameter
    * Keine Verbindung zum iBus

    Bitte analysieren Sie das log file des iPlugs.
    Löschen Sie gegebenenfalls den Cache Ihres Browsers und starten sowohl das Portal als auch das iPlug neu.

    Sie müssen nach einer Änderung der Konfiguration das iPlug immer neu starten


??? question "Wie kann ein Robots Denied Fehler verhindert werden?"

    In der robots.txt muss der InGrid Crawler freigschaltet werden. Der nachstehende Eintrag bedeutet, dass der InGrid Crawler alle 3 Sekunden eine Seite analysieren darf.

    <pre>
    User-agent: ingrid
    Crawl-delay: 3
    </pre>


??? question "Kann der Crawler mit HTTPS URLs umgehen, die durch Self Signed Certificates gesichert sind oder deren Zertifikat abgelaufen ist?"

    Es existiert in der Konfiguration einer Crawl-Instanz eine Option die dies ermöglicht.

    | Konfigurationsparameter | Erläuterung | Standardwert |
    | :--- | :--- | :--- |
    | ingrid.accept.invalid.ssl.certificates | If true all SSL certificates are accepted. Use this if the resources use self signed certificates or certificates that are not in the java certstore.| Default:true

    Die Option ist bei neu erstellten Instanzen vorhanden und per Default auf "true" gesetzt.


