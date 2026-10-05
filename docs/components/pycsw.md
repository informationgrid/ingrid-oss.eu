---
title: CSW Schnittstelle
description: "Leitfaden zur Installation und Konfiguration von pycsw im InGrid-Kontext"
---

# CSW Schnittstelle

## Allgemeines

!!! info inline end "Offizielle Dokumentation"
    Weiterführende Informationen zu Installation und Konfiguration finden sich in der [offiziellen pycsw-Dokumentation](https://docs.pycsw.org/en/latest/).

Die **CSW-Schnittstelle** stellt Metadaten im InGrid-System über den [OGC CSW 2.0.2 AP ISO 1.0](http://www.opengeospatial.org/standards/cat)-Standard bereit und eignet sich als eigenständiger Metadatenkatalog innerhalb einer InGrid-Infrastruktur. Umgesetzt wird sie mit [pycsw](https://pycsw.org/), einem quelloffenen CSW-Server auf Python-Basis.

In der InGrid-Umgebung dient pycsw als zentrales Katalog-Ziel für einliefernde Komponenten (Editor, Harvester) und stellt Metadaten via CSW-Schnittstelle für abfragende Komponenten wie das Portal bereit.

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

    Das offizielle Docker-Image von pycsw:

    [:octicons-arrow-right-24: hub.docker.com/r/geopython/pycsw](https://hub.docker.com/r/geopython/pycsw)

</div>

Für den Betrieb wird eine **PostgreSQL-Datenbank** empfohlen.

``` yaml title="Beispiel docker-compose.yml"
services:

    pycsw:
        image: geopython/pycsw
        restart: unless-stopped
        environment:
            - TZ=Europe/Berlin
            - PYCSW_CONFIG=/etc/pycsw/pycsw.yml
            - PYCSW_SERVER_URL=${SERVICE_URL_APACHE}/pycsw
            - DB_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db/pycsw
        volumes:
            - ./pycsw/pycsw.yml:/etc/pycsw/pycsw.yml
            - ./pycsw/traceability-filter.xsl:/etc/pycsw/traceability-filter.xsl
        ports:
            - "8000:8000"
        depends_on:
            db:
                condition: service_healthy
        networks:
            - ingrid-network

    db:
        image: postgres:15
        restart: unless-stopped
        environment:
            - POSTGRES_DB=pycsw
            - POSTGRES_PASSWORD=${DB_PASSWORD}
            - POSTGRES_USER=${DB_USER}
        healthcheck:
            test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d pycsw"]
            interval: 10s
            timeout: 5s
            retries: 5
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

pycsw wird über eine YAML-Konfigurationsdatei (`pycsw.yml`) konfiguriert. Eine vollständige Referenz aller Parameter ist in der [offiziellen Konfigurationsdokumentation](https://docs.pycsw.org/en/latest/configuration.html) verfügbar.

???+ example "Beispiel pycsw.yml"

    Die Werte unter `metadata` und `inspire` sind Platzhalter und müssen an den eigenen Katalog angepasst werden.

    ``` yaml
    server:
      url: ${PYCSW_SERVER_URL}
      mimetype: application/xml; charset=UTF-8
      encoding: UTF-8
      language: de-DE
      maxrecords: 10
      timeout: 30
      #ogc_schemas_location: http://foo
      #pretty_print: true
      gzip_compresslevel: 9
      #domainquerytype: range
      #domaincounts: true
      #spatial_ranking: true
      #workers=2
      templates:
        path: /etc/pycsw/templates



    logging:
      level: WARNING  # zur Fehlersuche: DEBUG
      # logfile: /tmp/pycsw.log

    profiles:
      - apiso

    manager:
      transactions: true
      allowed_ips:
        - 127.0.0.1
      # csw_harvest_pagesize: 10

    metadata:
      identification:
        title: pycsw Geospatial Catalogue
        description: pycsw is an OARec and OGC CSW server implementation written in Python
        keywords:
          - catalogue
          - discovery
          - metadata
        keywords_type: theme
        fees: None
        accessconstraints: None
        terms_of_service: https://creativecommons.org/licenses/by/4.0
        url: https://example.org
      license:
        name: CC-BY 4.0 license
        url: https://creativecommons.org/licenses/by/4.0
      provider:
        name: Organization Name
        url: https://pycsw.org
      contact:
        name: Lastname, Firstname
        position: Position Title
        address: Mailing Address
        city: City
        stateorprovince: Administrative Area
        postalcode: Zip or Postal Code
        country: Country
        phone: +xx-xxx-xxx-xxxx
        fax: +xx-xxx-xxx-xxxx
        email: you@example.org
        url: Contact URL
        hours: Mo-Fr 08:00-17:00
        instructions: During hours of service. Off on weekends.
        role: pointOfContact

    inspire:
      enabled: true
      languages_supported:
        - ger
        - eng
      default_language: ger
      date: YYYY-MM-DD
      gemet_keywords:
        - Utility and governmental services
      conformity_service: notEvaluated
      contact_name: Organization Name
      contact_email: Email Address
      temp_extent:
        begin: YYYY-MM-DD
        end: YYYY-MM-DD

    repository:
      database: ${DB_URL}
      table: records
      facets:
        - type
        - title

    xslt:
      - input_os: http://www.isotc211.org/2005/gmd
        output_os: http://www.isotc211.org/2005/gmd
        transform: /etc/pycsw/traceability-filter.xsl
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

pycsw bietet **keine eingebaute Benutzerauthentifizierung**. Die Absicherung erfolgt auf zwei Ebenen:

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

### XSLT-Transformation

pycsw kann CSW-Antworten vor der Auslieferung per **XSLT** transformieren. Dies wird über den Konfigurationsblock `xslt` gesteuert (siehe [Beispiel pycsw.yml](#konfiguration)):

``` yaml
xslt:
  - input_os: http://www.isotc211.org/2005/gmd
    output_os: http://www.isotc211.org/2005/gmd
    transform: /etc/pycsw/traceability-filter.xsl
```

- `input_os` / `output_os` legen fest, für welches `outputSchema` die Transformation angewendet wird (hier: ISO 19139).
- `transform` verweist auf die XSLT-Datei im Container, die auf jede passende Antwort angewendet wird.

#### Traceability-Filter

Einliefernde InGrid-Komponenten (Editor, Harvester) hinterlegen Herkunfts- und Zuordnungsinformationen als strukturierte Schlagwörter im Feld `apiso:Subject` (z. B. `organisation:`, `sub_organisation:`, `source:`, `transaction:`, `catalog:`). Diese Traceability-Keywords werden benötigt, um Datensätze intern nach Partner, Anbieter oder Quelle filtern zu können (siehe [FAQ Filterabfragen](#filtern-nach-partner)), sollen jedoch nicht in den nach außen ausgelieferten Metadatensätzen sichtbar sein. Diese Keywords sind kein Bestandteil des CSW- oder ISO-Standards, sondern eine InGrid-Konvention.

Die Datei `traceability-filter.xsl` entfernt diese internen Schlagwörter aus der CSW-Antwort, bevor sie an abfragende Komponenten (z. B. das Portal) ausgeliefert wird. Sie muss unter dem in `xslt.transform` angegebenen Pfad im pycsw-Container bereitgestellt werden (z. B. per Volume-Mount siehe [Docker Compose Beispiel](#docker)).

??? example "Beispiel traceability-filter.xsl"

    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <xsl:stylesheet version="1.0"
                    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                    xmlns:gmd="http://www.isotc211.org/2005/gmd"
                    xmlns:gco="http://www.isotc211.org/2005/gco">

        <!-- Identity: copy everything by default -->
        <xsl:template match="@*|node()">
            <xsl:copy>
                <xsl:apply-templates select="@*|node()"/>
            </xsl:copy>
        </xsl:template>

        <!-- Suppress individual traceability keywords -->
        <xsl:template match="gmd:keyword[gco:CharacterString[
            starts-with(., 'source:')          or
            starts-with(., 'transaction:')     or
            starts-with(., 'catalog:')         or
            starts-with(., 'organisation:')    or
            starts-with(., 'sub_organisation:')
        ]]"/>

        <!-- Suppress the whole descriptiveKeywords block if only traceability keywords remain -->
        <xsl:template match="gmd:descriptiveKeywords[not(
            gmd:MD_Keywords/gmd:keyword[not(gco:CharacterString[
                starts-with(., 'source:')          or
                starts-with(., 'transaction:')     or
                starts-with(., 'catalog:')         or
                starts-with(., 'organisation:')    or
                starts-with(., 'sub_organisation:')
            ])]
        )]"/>

    </xsl:stylesheet>
    ```

### Anbindung von Komponenten

pycsw stellt einen **einzigen CSW-Endpunkt** bereit, über den sowohl lesende (CSW) als auch schreibende (CSW-T) Zugriffe erfolgen:

```
http://<pycsw-host>:<port>/csw
```

Ist ein Reverse Proxy vorgeschaltet, entspricht die Basis-URL dem Wert von `server.url`. Diese URL wird in der jeweiligen Komponente als CSW-Endpunkt hinterlegt.

Welche Voraussetzungen in pycsw erfüllt sein müssen, hängt von der Rolle der angebundenen Komponente ab:

| Rolle | Zugriff | Beispiele | Voraussetzungen in pycsw |
|---|---|---|---|
| **Einliefernd** | CSW-T (`Transaction`: Insert, Update, Delete) | Editor, Harvester, weitere Systeme mit CSW-T-Client | `manager.transactions: true` und IP-Adresse der Komponente in `manager.allowed_ips` |
| **Abfragend** | CSW (`GetCapabilities`, `GetRecords`, `GetRecordById`) | Portal, externe Geoportale und CSW-Clients | Netzwerkzugriff auf den Endpunkt |

Für alle Komponenten gilt:

- **Netzwerk:** Die Komponente muss den pycsw-Endpunkt erreichen können, z. B. über ein gemeinsames Docker-Netzwerk (siehe [Docker Compose Beispiel](#docker)) oder über die öffentliche URL.
- **Ausgabeformat:** Im InGrid-Kontext wird ISO 19139 (`http://www.isotc211.org/2005/gmd`) als `outputSchema` verwendet.
- **Authentifizierung:** Ist ein Reverse Proxy mit Basic Auth vorgeschaltet (siehe [Authentifizierung](#authentifizierung)), müssen die Credentials in der Verbindungskonfiguration der Komponente hinterlegt werden.

Die Einrichtung des Endpunkts auf Seite der jeweiligen Komponente ist in deren Dokumentation beschrieben, z. B. im [Leitfaden Harvester-Katalog]({{ fix_url('guides/harvester-catalog.md') }}). Beispielanfragen für Lese- und Schreibzugriffe finden sich in den [FAQ](#faq).

<hr>

## FAQ

!!! info "Ausgabeformat"
    Alle GetRecords- und GetRecordById-Beispiele verwenden **ISO 19139** (`http://www.isotc211.org/2005/gmd`) als `outputSchema`. Dieses Format wird für den Austausch von Geodaten-Metadaten im InGrid-Kontext vorausgesetzt.

### Grundlegende Abfragen

??? question "GetCapabilities: Wie kann die CSW-Schnittstelle getestet werden?"

    Der einfachste Smoke-Test ist ein **GetCapabilities**-Request. Er gibt die Fähigkeiten des Servers zurück und zeigt an, ob pycsw erreichbar ist.

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

    #### Filtern nach Partner

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

    #### Filtern nach Anbieter

    Anbieter werden mit dem Präfix `sub_organisation:` als Schlagwort abgelegt. Das Abfragemuster ist identisch mit der [Filterung nach Partnern](#filtern-nach-partner):

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

    #### Filtern nach ResourceIdentifier

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

### Schreibzugriffe (CSW-T)

??? question "Transaction: Wie wird ein Datensatz per CSW-T eingefügt?"

    Schreibzugriffe erfolgen per POST mit einem `csw:Transaction`-Dokument. Voraussetzung ist, dass in pycsw `manager.transactions: true` gesetzt und die IP-Adresse des aufrufenden Systems unter `manager.allowed_ips` eingetragen ist (siehe [Konfiguration](#konfiguration)).

    ``` bash
    curl --request POST \
      --url 'http://<pycsw-host>/csw' \
      --header 'content-type: application/xml' \
      --data '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <csw:Transaction service="CSW" version="2.0.2"
        xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:gmd="http://www.isotc211.org/2005/gmd"
        xmlns:gco="http://www.isotc211.org/2005/gco"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:apiso="http://www.opengis.net/cat/csw/apiso/1.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-publication.xsd">
        <csw:Insert>
            <!-- ein vollständiges Dokument im Format ISO 19139 (2007)-->
        </csw:Insert>
    </csw:Transaction>'
    ```

    Die Antwort enthält in `csw:TransactionSummary` unter `csw:totalInserted` die Anzahl der eingefügten Datensätze.

??? question "Transaction: Wie wird ein Datensatz per CSW-T aktualisiert?"

    Bei einem `csw:Update` wird der bestehende Datensatz vollständig durch das übertragene Dokument ersetzt. Welcher Datensatz ersetzt wird, ergibt sich aus dem Identifier (`gmd:fileIdentifier`) im übertragenen Dokument. Es gelten dieselben Voraussetzungen wie beim Einfügen.

    ``` bash
    curl --request POST \
      --url 'http://<pycsw-host>/csw' \
      --header 'content-type: application/xml' \
      --data '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <csw:Transaction service="CSW" version="2.0.2"
        xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:gmd="http://www.isotc211.org/2005/gmd"
        xmlns:gco="http://www.isotc211.org/2005/gco"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-publication.xsd">
        <csw:Update>
            <!-- ein vollständiges Dokument im Format ISO 19139 (2007)-->
        </csw:Update>
    </csw:Transaction>'
    ```

    Die Antwort enthält in `csw:TransactionSummary` unter `csw:totalUpdated` die Anzahl der aktualisierten Datensätze.

??? question "Transaction: Wie wird ein Datensatz per CSW-T gelöscht?"

    Zum Löschen wird ein `csw:Delete` mit einem Filter übertragen, der die zu löschenden Datensätze auswählt. Es werden **alle** Datensätze gelöscht, auf die der Filter zutrifft – daher sollte immer über einen eindeutigen Identifier gefiltert werden. Es gelten dieselben Voraussetzungen wie beim Einfügen.

    ``` bash
    curl --request POST \
      --url 'http://<pycsw-host>/csw' \
      --header 'content-type: application/xml' \
      --data '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <csw:Transaction service="CSW" version="2.0.2"
        xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
        xmlns:ogc="http://www.opengis.net/ogc"
        xmlns:dc="http://purl.org/dc/elements/1.1/">
        <csw:Delete>
            <csw:Constraint version="2.0.0">
                <ogc:Filter>
                    <ogc:PropertyIsEqualTo>
                        <ogc:PropertyName>dc:identifier</ogc:PropertyName>
                        <ogc:Literal>8ab590a216f7f05f01185fd222071e45</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                </ogc:Filter>
            </csw:Constraint>
        </csw:Delete>
    </csw:Transaction>'
    ```

    Die Antwort enthält in `csw:TransactionSummary` unter `csw:totalDeleted` die Anzahl der gelöschten Datensätze.

### Migration

??? question "Was ändert sich beim Umstieg von der alten CSW-Schnittstelle auf pycsw?"

    Die [alte CSW-Schnittstelle]({{ fix_url('components/interface_csw.md') }}) (`ingrid-interface-csw`) wird nicht mehr weiterentwickelt und durch pycsw abgelöst. Die wesentlichen Unterschiede:

    | | Alte CSW-Schnittstelle | pycsw |
    |---|---|---|
    | **Datenfluss** | Pull: Daten werden zeitgesteuert aus Datenquellen (iBus/iPlugs) indexiert | Push: Einliefernde Komponenten übertragen Datensätze per CSW-T |
    | **Aktualität** | Änderungen erst nach dem nächsten Indexierungslauf sichtbar | Änderungen sofort nach der Einlieferung verfügbar |
    | **Datenhaltung** | Lokaler Index | PostgreSQL-Datenbank |
    | **Konfiguration** | Admin-GUI und `config.override.properties` | `pycsw.yml` |
    | **Filterung nach Partner/Anbieter** | Eigene Properties (`partner`, `provider`, `iplug`) bzw. URL-Parameter | Traceability-Keywords in `apiso:Subject` (siehe [Filterabfragen](#filterabfragen)) |

??? question "Welche Schritte sind für die Migration notwendig?"

    1. **pycsw bereitstellen:** pycsw mit eigener PostgreSQL-Datenbank installieren (siehe [Installation](#installation)) und `pycsw.yml` anpassen, insbesondere `server.url`, `metadata` sowie `manager.transactions` und `manager.allowed_ips`.
    2. **Einliefernde Komponenten anbinden:** Editor, Harvester und ggf. weitere Systeme auf den pycsw-Endpunkt als Ziel konfigurieren (siehe [Anbindung von Komponenten](#anbindung-von-komponenten)).
    3. **Bestand übertragen:** Da pycsw keine Daten selbst abruft, muss der vorhandene Datenbestand einmalig von den einliefernden Komponenten an pycsw übertragen werden.
    4. **Ergebnis prüfen:** Die Trefferanzahl (`numberOfRecordsMatched`) einer ungefilterten GetRecords-Anfrage sowie stichprobenartig einzelne Datensätze mit der alten Schnittstelle vergleichen (siehe [Grundlegende Abfragen](#grundlegende-abfragen)).
    5. **Abfragende Komponenten umstellen:** Portal, externe Clients und die Reverse-Proxy-Konfiguration auf den pycsw-Endpunkt umstellen.
    6. **Alte Schnittstelle abschalten:** Nach erfolgreicher Umstellung kann `ingrid-interface-csw` außer Betrieb genommen werden.
