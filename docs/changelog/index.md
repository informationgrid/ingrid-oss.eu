---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Deprecation Warnung InGrid 7.5.x ⚠️

Die Komponenten der InGrid Software in der Version 7.5.x werden offiziell nicht mehr unterstützt. Es werden keine
Sicherheitsupdates für diese Versionen bereitgestellt. Es wird dringend empfohlen auf die neusten Versionen der
Komponenten zu aktualisieren.

## Deprecation Warnung iBus ⚠️

Der iBus wird nicht mehr weiterentwickelt und wird funktional durch die InGrid-API ersetzt, worüber die Indizes verwaltet werden können. Alle iPlugs die derzeit ihre Datensätze noch über den iBus einliefern, sollten so umgestellt werden, dass direkt nach Elasticsearch eingeliefert wird. Die betrifft folgende Komponenten:

* InGrid Editor
  * unter "Verbindungen" Elasticsearch hinzufügen und konfigurieren und diese in den Katalogen verwenden. Konfiguration in den Katalogen muss nur dann erfolgen, wenn explizit eine Verbindung unter "Indizierung" eingestellt wurde.
* iPlug-BLP und iPlug-SE
  * in der config.override.properties folgenden Eintrag hinzufügen
    ```properties
    communications.disableIBus=true
    elastic.remoteHosts=<IP_ELASTIC_SEARCH>\:9200
    ```
* Interface-CSW
  * wird durch pyCSW ersetzt
* Interface-Search
  * Funktionalität wird in 8.6.0 in InGrid-API integriert
<hr>

### Hinweise für die Aktualisierung&nbsp;⚠️


