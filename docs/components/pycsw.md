---
title: CSW Schnittstelle
description: "Leitfaden zur Installation und Konfiguration von pyCSW im InGrid-Kontext"
---

## Allgemeines

!!! info inline end "Offizielle Dokumentation"
    Weiterführende Informationen zu Installation und Konfiguration finden sich in der [offiziellen pyCSW-Dokumentation](https://docs.pycsw.org/en/latest/).

[pyCSW](https://pycsw.org/) ist ein quelloffener, OGC-konformer CSW-Server auf Python-Basis. Er implementiert den [OGC CSW 2.0.2 AP ISO 1.0](http://www.opengeospatial.org/standards/cat)-Standard und eignet sich als eigenständiger Metadatenkatalog innerhalb einer InGrid-Infrastruktur.

In der InGrid-Umgebung dient pyCSW als zentrales Katalog-Ziel für einliefernde Komponenten (Editor, Harvester) und stellt Metadaten via CSW-Schnittstelle für abfragende Komponenten wie das Portal bereit.

![](../assets/drawio/ingrid-pycsw.drawio)

<hr>

## Systemvoraussetzungen

|              | **Systembestandteil** | **Anforderung**       |
| ------------ | --------------------- | --------------------- |
| **Software** | PostgreSQL            | 15 oder höher (via Docker) |

<hr>

## Installation

### :material-docker: Docker

<div class="grid cards" markdown>

-   :material-file-edit-outline:{ .lg .middle } __Docker-Image__

    ---

    Das offizielle Docker-Image von pyCSW:

    [:octicons-arrow-right-24: hub.docker.com/r/geopython/pycsw](https://hub.docker.com/r/geopython/pycsw)

</div>

Für den Betrieb wird eine **PostgreSQL-Datenbank** empfohlen.

``` yaml title="Beispiel docker-compose.yml"
services:

    pycsw:
    image: geopython/pycsw
    restart: unless-stopped
    environment:
        - PYCSW_CONFIG=/etc/pycsw/pycsw.yml
    volumes:
        - ./pycsw/pycsw.yml:/etc/pycsw/pycsw.yml
    ports:
        - "8000:8000"
    depends_on:
        pycsw-db:
        condition: service_healthy
    networks:
        - ingrid-network

    pycsw-db:
    image: postgres:15
    restart: unless-stopped
    environment:
        - POSTGRES_DB=pycsw
        - POSTGRES_USER=pycsw
        - POSTGRES_PASSWORD=pycsw
    volumes:
        - pycsw-data:/var/lib/postgresql/data
    networks:
        - ingrid-network

volumes:
    pycsw-data:

networks:
    ingrid-network:
```

<hr>

## Konfiguration

pyCSW wird über eine YAML-Konfigurationsdatei (`pycsw.yml`) konfiguriert. Eine vollständige Referenz aller Parameter ist in der [offiziellen Konfigurationsdokumentation](https://docs.pycsw.org/en/latest/configuration.html) verfügbar.

???+ example "Beispiel pycsw.yml"

    ``` yaml
    server:
      url: http://<host>:8000
      mimetype: application/xml; charset=UTF-8
      encoding: UTF-8
      language: de
      maxrecords: 10
      pretty_print: true

    manager:
      transactions: "true"
      allowed_ips: 127.0.0.1,<IP-Adresse-Editor>,<IP-Adresse-Harvester>

    metadata:
      identification:
        title: Mein Metadatenkatalog
        description: OGC CSW-Katalog auf Basis von pyCSW
        keywords:
          - pycsw
          - Metadaten
          - CSW
        keywords_type: theme
        fees: None
        accessconstraints: None
      provider:
        name: Meine Organisation
        url: https://www.meine-organisation.de
      contact:
        name: Kontaktname
        position: Datenmanagement
        email: kontakt@meine-organisation.de
        role: pointOfContact

    repository:
      database: postgresql://pycsw:pycsw@pycsw-db/pycsw
      table: records
    ```

Die wichtigsten Einstellungen im Überblick:

| Einstellung | Beschreibung | Dokumentation |
|---|---|---|
| `server.url` | Öffentliche URL des CSW-Endpunkts | [server](https://docs.pycsw.org/en/latest/configuration.html#server) |
| `server.maxrecords` | Maximale Anzahl zurückgegebener Datensätze pro Anfrage | [server](https://docs.pycsw.org/en/latest/configuration.html#server) |
| `manager.transactions` | CSW-T aktivieren (`true`/`false`) | [manager](https://docs.pycsw.org/en/latest/configuration.html#manager) |
| `manager.allowed_ips` | IP-Adressen mit Schreibzugriff (CSW-T) | [manager](https://docs.pycsw.org/en/latest/configuration.html#manager) |
| `repository.database` | Datenbankverbindung (PostgreSQL oder SQLite) | [repository](https://docs.pycsw.org/en/latest/configuration.html#repository) |
| `repository.table` | Tabellenname im Datenbankschema | [repository](https://docs.pycsw.org/en/latest/configuration.html#repository) |

!!! warning "CSW-T Sicherheit"
    CSW-T ermöglicht das Schreiben, Aktualisieren und Löschen von Metadatensätzen. Stellen Sie sicher, dass unter `manager.allowed_ips` ausschließlich autorisierte IP-Adressen eingetragen sind.

### Authentifizierung

pyCSW bietet **keine eingebaute Benutzerauthentifizierung**. Die Absicherung erfolgt auf zwei Ebenen:

- **CSW-T (Schreibzugriff):** Über `manager.allowed_ips` werden nur explizit erlaubte IP-Adressen zum Schreiben zugelassen.
- **CSW (Lesezugriff):** Für einen komplett nicht-öffentlichen Katalog empfiehlt sich ein vorgeschalteter **Reverse Proxy** mit HTTP Basic Auth.

!!! info
    Basic Auth schützt alle Anfragen – GET und POST gleichermaßen. Eine Einschränkung auf nur schreibende Methoden ist nicht möglich, da CSW-Lese- und Schreiboperationen beide per POST übertragen werden und sich auf HTTP-Ebene nicht unterscheiden lassen.

#### Reverse Proxy mit HTTP Basic Auth (Apache)

Eine Passwortdatei kann mit `htpasswd` erstellt werden:

``` bash
htpasswd -c /etc/apache2/.htpasswd <benutzername>
```

Beispielkonfiguration für Apache:

``` apache
<VirtualHost *:80>
    ServerName <pycsw-host>

    ProxyPass        / http://pycsw:8000/
    ProxyPassReverse / http://pycsw:8000/

    <Location />
        AuthType Basic
        AuthName "CSW Katalog"
        AuthUserFile /etc/apache2/.htpasswd
        Require valid-user
    </Location>
</VirtualHost>
```

Erforderliche Apache-Module:

``` bash
a2enmod proxy proxy_http auth_basic authn_file
```

!!! info
    Einliefernde Komponenten (Editor, Harvester) müssen bei aktivierter Basic Auth die Credentials in ihrer Verbindungskonfiguration hinterlegen.

### Response Transformation

**TODO**

### InGrid Editor

Der InGrid Editor kann Metadatensätze via **CSW-T** direkt in pyCSW einliefern. Damit der Editor gegen pyCSW publizieren kann, müssen folgende Voraussetzungen erfüllt sein:

1. In pyCSW ist die CSW-T-Transaktion aktiviert (`manager.transactions: "true"`)
2. Die IP-Adresse des Editors ist unter `manager.allowed_ips` eingetragen
3. Im Editor ist die Export-Konfiguration auf den pyCSW-Endpunkt gesetzt

Der CSW-T-Endpunkt von pyCSW ist erreichbar unter:

```
http://<pycsw-host>:<port>
```

Ein Beispiel-Request für das Einfügen eines Datensatzes:

``` bash
curl --location 'http://<pycsw-host>' \
  --header 'Content-Type: application/xml' \
  --data-raw '<?xml version="1.0" encoding="UTF-8"?>
<csw:Transaction service="CSW" version="2.0.2"
    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:gmd="http://www.isotc211.org/2005/gmd"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-publication.xsd">
    <csw:Insert>
        <!-- vollständiges ISO 19139 Metadatendokument -->
    </csw:Insert>
</csw:Transaction>'
```

### InGrid Harvester

Der InGrid Harvester kann pyCSW als **CSW-Katalogziel** verwenden. Dabei werden geerntete Metadaten per CSW-T an pyCSW übertragen.

Einrichtung in der Harvester-Konfiguration:

1. In der Harvester-Oberfläche eine neue Katalog-Verbindung vom Typ **CSW** anlegen
2. Als Endpunkt den pyCSW-Endpunkt eintragen: `http://<pycsw-host>:<port>`
3. Sicherstellen, dass die IP-Adresse des Harvesters in `manager.allowed_ips` von pyCSW eingetragen ist

!!! info
    Weitere Informationen zur Einrichtung von Katalogzielen finden sich im [Leitfaden Harvester-Katalog]({{ fix_url('guides/harvester-catalog.md') }}).

### InGrid Portal

Das InGrid Portal kann Metadaten über die CSW-Schnittstelle von pyCSW abfragen und zur Darstellung aufbereiten.

Die CSW-Abfrage-URL lautet:

```
http://<pycsw-host>:<port>
```

Diese URL wird in der Portal-Konfiguration als CSW-Endpunkt hinterlegt. Über die Umgebungsvariable `INGRID_API` verweist das Portal auf die InGrid API, die als Vermittler zwischen Portal und den angebundenen Datenquellen agiert.

Eine vollständige Übersicht aller Portal-Konfigurationsoptionen ist in der [Portal-Dokumentation]({{ fix_url('components/portal.md') }}) beschrieben.

<hr>

## FAQ

!!! info "Ausgabeformat"
    Alle GetRecords- und GetRecordById-Beispiele verwenden **ISO 19139** (`http://www.isotc211.org/2005/gmd`) als `outputSchema`. Dieses Format wird für den Austausch von Geodaten-Metadaten im InGrid-Kontext vorausgesetzt.

### Grundlegende Abfragen

??? question "GetCapabilities: Wie kann die CSW-Schnittstelle getestet werden?"

    Der einfachste Smoke-Test ist ein **GetCapabilities**-Request. Er gibt die Fähigkeiten des Servers zurück und zeigt an, ob pyCSW erreichbar ist.

    Zum Testen eignen sich Tools wie [Postman](https://www.getpostman.com/) oder vergleichbare REST-Clients. Bei POST-Anfragen muss der Content-Type `application/xml` gesetzt werden.

    **GET**

    ```
    http://<pycsw-host>/csw?SERVICE=CSW&REQUEST=GetCapabilities&VERSION=2.0.2
    ```

    **POST XML**

    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <GetCapabilities xmlns="http://www.opengis.net/cat/csw/2.0.2"
        service="CSW" version="2.0.2"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2" />
    ```

??? question "GetRecords: Wie werden alle Datensätze paginiert abgerufen?"

    Mit `startPosition` wird der Cursor verschoben, mit `maxRecords` die Seitengröße festgelegt. Der Antwortparameter `numberOfRecordsMatched` liefert die Gesamttrefferanzahl und dient als Abbruchbedingung.

    **GET**

    ```
    http://<pycsw-host>/csw?service=CSW&version=2.0.2&request=GetRecords&elementSetName=full&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&startPosition=1&maxRecords=10&typeNames=csw:Record
    ```

    **POST XML**

    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2"
        service="CSW" version="2.0.2"
        resultType="results"
        outputFormat="application/xml"
        outputSchema="http://www.isotc211.org/2005/gmd"
        startPosition="1" maxRecords="10">
        <csw:Query typeNames="csw:Record">
            <csw:ElementSetName>full</csw:ElementSetName>
        </csw:Query>
    </csw:GetRecords>
    ```

??? question "GetRecordById: Wie wird ein einzelner Datensatz per ID abgerufen?"

    **GET**

    ```
    http://<pycsw-host>/csw?service=CSW&version=2.0.2&request=GetRecordById&outputSchema=http://www.isotc211.org/2005/gmd&elementSetName=full&id=<UUID>
    ```

    **POST XML**

    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <csw:GetRecordById xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        service="CSW" version="2.0.2"
        outputSchema="http://www.isotc211.org/2005/gmd"
        elementSetName="full">
        <csw:Id><UUID></csw:Id>
    </csw:GetRecordById>
    ```


### Filterabfragen

??? question "GetRecords: Wie wird nach Partner gefiltert?"

    !!! note "InGrid-spezifisch"
        Die Filterung nach Partner und Anbieter basiert auf einer InGrid-Konvention: Einliefernde Komponenten (Editor, Harvester) schreiben die Zugehörigkeit als strukturiertes Schlagwort in das Feld `apiso:Subject`. Diese Keywords sind kein Bestandteil des CSW- oder ISO-Standards.

    In InGrid werden Partner als Schlagwort im Feld `apiso:Subject` mit dem Präfix `organisation:` gespeichert. Da das Feld die gesamte kommagetrennte Schlagwortliste enthält, muss `PropertyIsLike` für die Teilsuche verwendet werden – `PropertyIsEqualTo` würde den vollständigen Spalteninhalt auf exakte Übereinstimmung prüfen und damit keine Treffer liefern.

    **GET (CQL_TEXT)**

    ```
    http://<pycsw-host>/csw?service=CSW&version=2.0.2&request=GetRecords&elementSetName=full&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&startPosition=1&maxRecords=100&typeNames=csw:Record&constraint=apiso:Subject like '%organisation:bund%'&constraintLanguage=CQL_TEXT
    ```

    **POST XML (OGC Filter)**

    ``` xml
    <csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:ogc="http://www.opengis.net/ogc"
        service="CSW" version="2.0.2"
        resultType="results"
        outputSchema="http://www.isotc211.org/2005/gmd">
        <csw:Query typeNames="csw:Record">
            <csw:ElementSetName>full</csw:ElementSetName>
            <csw:Constraint version="1.1.0">
                <ogc:Filter>
                    <ogc:PropertyIsLike wildCard="%" singleChar="_" escapeChar="\">
                        <ogc:PropertyName>apiso:Subject</ogc:PropertyName>
                        <ogc:Literal>%organisation:bund%</ogc:Literal>
                    </ogc:PropertyIsLike>
                </ogc:Filter>
            </csw:Constraint>
        </csw:Query>
    </csw:GetRecords>
    ```

??? question "GetRecords: Wie wird nach Anbieter gefiltert?"

    Anbieter werden mit dem Präfix `sub_organisation:` als Schlagwort abgelegt. Das Abfragemuster ist identisch mit der Partnerabfrage:

    **GET (CQL_TEXT)**

    ```
    http://<pycsw-host>/csw?service=CSW&version=2.0.2&request=GetRecords&elementSetName=full&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&startPosition=1&maxRecords=100&typeNames=csw:Record&constraint=apiso:Subject like '%sub_organisation:ni%'&constraintLanguage=CQL_TEXT
    ```

    **POST XML (OGC Filter)**

    ``` xml
    <csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:ogc="http://www.opengis.net/ogc"
        service="CSW" version="2.0.2"
        resultType="results"
        outputSchema="http://www.isotc211.org/2005/gmd">
        <csw:Query typeNames="csw:Record">
            <csw:ElementSetName>full</csw:ElementSetName>
            <csw:Constraint version="1.1.0">
                <ogc:Filter>
                    <ogc:PropertyIsLike wildCard="%" singleChar="_" escapeChar="\">
                        <ogc:PropertyName>apiso:Subject</ogc:PropertyName>
                        <ogc:Literal>%sub_organisation:ni%</ogc:Literal>
                    </ogc:PropertyIsLike>
                </ogc:Filter>
            </csw:Constraint>
        </csw:Query>
    </csw:GetRecords>
    ```

??? question "GetRecords: Wie wird nach ResourceIdentifier gefiltert?"

    Um Datensätze einer bestimmten Datenquelle über ihren eindeutigen Ressourcenbezeichner abzufragen:

    **GET (CQL_TEXT)**

    ```
    http://<pycsw-host>/csw?service=CSW&version=2.0.2&request=GetRecords&elementSetName=full&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&startPosition=1&maxRecords=10&typeNames=csw:Record&constraint=apiso:ResourceIdentifier='7988c147-7523-45bb-8f18-7f39d0d20541'&constraintLanguage=CQL_TEXT
    ```

    **POST XML (OGC Filter)**

    ``` xml
    <csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:ogc="http://www.opengis.net/ogc"
        service="CSW" version="2.0.2"
        resultType="results"
        outputSchema="http://www.isotc211.org/2005/gmd"
        startPosition="1" maxRecords="10">
        <csw:Query typeNames="csw:Record">
            <csw:ElementSetName>full</csw:ElementSetName>
            <csw:Constraint version="1.1.0">
                <ogc:Filter>
                    <ogc:PropertyIsEqualTo>
                        <ogc:PropertyName>apiso:ResourceIdentifier</ogc:PropertyName>
                        <ogc:Literal>7988c147-7523-45bb-8f18-7f39d0d20541</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                </ogc:Filter>
            </csw:Constraint>
        </csw:Query>
    </csw:GetRecords>
    ```