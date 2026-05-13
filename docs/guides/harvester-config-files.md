---
title: Harvester Konfigurationsdateien
description: Der InGrid Harvester erfasst Daten aus verschiedenen Quellen, speichert sie in Postgres und stellt sie strukturiert für diverse Kataloge (Elasticsearch, pyCSW) bereit.
---

In diesem Leitfaden finden Sie Hilfestellungen, um Kataloge direkt über Konfigurationsdateien anzuschließen (nicht über GUI). Eine abgeschlossene Installation des Harvesters wird vorausgesetzt.

Für die Einrichtung sind folgende Konfigurationsdateien relevant:

- `harvester/config/config-catalogs.json` – definiert die Zielkataloge (z. B. Elasticsearch-Indizes)
- `harvester/config/config.json` – verbindet jede Datenquelle mit einem oder mehreren Katalogen
- `docker-compose.yml` – bindet Konfigurationsdateien als Volume in den Container ein

## Docker Compose

Alle drei Konfigurationsdateien müssen als Volumes in der `docker-compose.yml` in den Container eingebunden werden:

```yaml
harvester:
  image: docker-registry.wemove.com/ingrid-harvester:8.3.0
  # ...
  volumes:
    # ...
    - ./harvester/config/config-catalogs.json:/opt/ingrid/harvester/config-catalogs.json
    - ./harvester/config/config.json:/opt/ingrid/harvester/config.json
```

Der Host-seitige Pfadpräfix (z. B. `./harvester/config/`) richtet sich nach dem jeweiligen Deployment-Aufbau und kann abweichen.

## Kataloge bearbeiten in `config-catalogs.json`

Die Datei `config-catalogs.json` definiert die Zielkataloge des Harvesters z. B. Elasticsearch-Indizes. Jeder Eintrag beschreibt einen Katalog mit einer eindeutigen ID, einem Typ, einem Namen und verbindungsspezifischen Einstellungen.

Erstellen oder bearbeiten Sie die Datei unter `harvester/config/config-catalogs.json`:

```json
[
  {
    "id": 1,
    "type": "elasticsearch",
    "name": "Elasticsearch (harvester-gdi-sl)",
    "url": "http://elastic:9200",
    "settings": {
      "version": "9",
      "index": "harvester-gdi-sl-index",
      "alias": "harvester-gdi-sl",
      "user": "",
      "password": "",
      "mappingFile": "default-mapping"
    }
  },
  {
    "id": 2,
    "type": "elasticsearch",
    "name": "Elasticsearch (harvester-sn-geomis-lfulg)",
    "url": "http://elastic:9200",
    "settings": {
      "version": "9",
      "index": "harvester-sn-geomis-lfulg-index",
      "alias": "harvester-sn-geomis-lfulg",
      "user": "",
      "password": "",
      "mappingFile": "default-mapping"
    }
  }
]
```

### Überprüfen im GUI

Die konfigurierten Kataloge erscheinen auf der Seite `Kataloge`.

![](../assets/components/harvester/harvester-highlight-catalogs.png "Harvester Benutzeroberfläche hinzugefügte Kataloge")


## Datenquelle mit Katalog verbinden in `config.json`

In der `config.json` wird jeder Datenquelle eine Liste von Katalog-IDs zugewiesen. Verwenden Sie dafür das Feld `catalogIds` als Array. Tragen Sie die IDs aus der `config-catalogs.json` ein:

Datenquelle 1 → Katalog 1 (`gdi-sl`):

```json
"catalogIds": [
  1
]
```

Datenquelle 2 → Katalog 2 (`sn-geomis-lfulg`):

```json
"catalogIds": [
  2
]
```

### Überprüfen im GUI

Die zugewiesenen Katalog-IDs sind auf der Seite `Datenquellen` sichtbar. Kappen Sie die entsprechende Datenquelle auf, um verlinkte `Kataloge` zu sehen.

![](../assets/components/harvester/harvester-highlight-datasource-catalogs.png "Harvester Benutzeroberfläche verlinkte Kataloge unter Datenquellen")


## iBus

Nach der Konfiguration erscheint der Elasticsearch-Index im iBus. Zunächst wird der Index als inaktiv angezeigt. Nach dem ersten erfolgreichen Harvester-Lauf wechselt er in den aktiven Zustand.

![](../assets/components/harvester/harvester-highlight-ibus-inactive-index.png "iBus inaktiver Index")

![](../assets/components/harvester/harvester-highlight-ibus-active-index.png "iBus aktiver Index")
