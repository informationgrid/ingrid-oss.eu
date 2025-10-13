---
title: API
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Allgemeines

Die InGrid-API dient als zentrale Schnittstelle für die InGrid-Datensätze. Sie befindet sich noch in der Entwicklung und
wird derzeit nur vom InGrid Portal verwendet.

Die InGrid-API liefert die Ergebnisse aus verschiedenen Datenquellen aufgearbeitet zurück, so dass diese vom Portal dargestellt werden können.
Den kompletten Funktionsumfang erfahren Sie weiter unten.

![](../assets/drawio/ingrid-api.drawio "InGrid Komponente iBus")

## Systemvoraussetzungen

|              | **Systembestandteil** | **Anforderung** |
|--------------|-----------------------|-----------------|
| **Hardware** | Arbeitsspeicher       | 128 MB RAM      |
|              | Festplattenspeicher   | 80 MB frei      |
|              | Prozessor             | Dual Core CPU   |
| **Software** | Java                  | Java 17         |
|              | Elasticsearch         | Version 8.x     |

<hr>

## Installation

!!! example inline end "Info"
    Neben der InGrid-API muss zusätzlich **Elasticsearch** eingerichtet werden.

Die Installation der InGrid-API kann mit Docker oder direkt aus dem GitHub-Repository erfolgen. Im Folgenden sind
Beispiele
und Anleitungen dazu aufgelistet.

### :material-docker: Docker

<div class="grid cards" markdown>

  - :material-docker:{ .lg .middle } __Docker-Image__
  
    ---
  
    Zur Installation kann das folgende Docker-Image verwendet werden:
  
    [:octicons-arrow-right-24: docker-registry.wemove.com/ingrid-api](https://docker-registry.wemove.com/ingrid-ibus)

</div>

``` yaml title="Beispiel docker-compose.yml"
  ingrid-api:
    image: docker-registry.wemove.com/ingrid-api
    restart: unless-stopped
    environment:
      - ES_HOST=elastic
      - ES_USERNAME=elastic
      - ES_PASSWORD=admin
```

### :material-github: From Source

Um die InGrid-API direkt auf einem System zu installieren, müssen folgende Vorbedingungen erfüllt sein:

* Elasticsearch 8.x
* Gradle 8.x
* Java 17

Die Installation der InGrid-API (z.B. nach `/opt/ingrid/ingrid-api`) erfolgt dann mit diesen Schritten:

#### InGrid-API klonen und bauen

```shell
git clone https://github.com/informationgrid/ingrid-api
cd ingrid-api
./gradlew clean buildFatJar -x test
```

#### InGrid-API installieren

```shell
mv build/libs/ingrid-api-all.jar /opt/ingrid/ingrid-api
cd /opt/ingrid/ingrid-api
```

#### InGrid-API starten

```shell
java -jar ingrid-api-all.jar
```

## Konfiguration

### Umgebungsvariablen

???+ example "Alle Umgebungsvariablen im Überblick"
    
    | **Variable**  | **Hinweis**                                                                          | **Defaultwert** |
    |---------------|--------------------------------------------------------------------------------------|-----------------|
    | CONTEXT_PATH | Der Kontextpfad unter dem die API laufen soll                                        | /               |
    | ES_HOST      | Die IP/URL zur Elasticsearch Instanz                                                 | localhost       |
    | ES_PORT      | Der Port, unter dem Elasticsearch erreichbar ist                                     | 9200            |
    | ES_HTTPS     | Wenn Elasticsearch unter HTTPS erreichbar ist, dann muss diese Option gesetzt werden | false           |
    | ES_USERNAME  | Wenn abgesichert, dann kann hier der Benutzername definiert werden                   |                 |
    | ES_PASSWORD  | Wenn abgesichert, dann kann hier das Passwort definiert werden                       |                 |

## REST-API

Es folgt eine Auflistung mit den möglichen REST-Anfragen für das Codelist-Repository. Über die Swagger-UI kann die aktuelle API ebenfalls abgerufen werden. Diese ist erreichbar unter `http(s)://<ingrid-api>/portal` 

| Typ  | Anfrage                         | Beschreibung                                                                                                                               |
|------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| GET  | /portal/catalogs                | Alle Katalog, die mindestens einen Datensatz beinhalten                                                                                    |
| GET  | /portal/catalogs/{id}/hierarchy | Hierarchische Struktur der Datensatzes eines Katalogs mit der angegebenen *id*                                                             |
| POST | /portal/search                  | Enthält eine Elasticsearch-Suchanfrage im *Body* und gibt dessen Ergebnis zurück. Es wird automatisch auf den aktivierten Indizes gesucht. |

[//]: # (## FAQ)
