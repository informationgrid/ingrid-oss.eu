---
title: Editor API OGC Records
description: Der InGrid Editor ermöglicht die Erfassung von beliebiger Formulare und bietet einen umfangreichen Workflow, der den Import sowie Export von bliebigen Formaten erlaubt.
---
# Editor API: OGC Records

Der [InGrid Editor](/components/ige) verfügt über eine leistungsfähige API, die dem [Standard OGC API - Records](https://ogcapi.ogc.org/records/) entspricht. Diese Schnittstelle ermöglicht einen standardkonformen Zugriff auf Metadaten, indem sie moderne Webtechnologien nutzt und eine effiziente Suche, Abfrage und Bereitstellung von Geoinformationen unterstützt. Durch die Implementierung des OGC-Standards wird eine einfache Integration mit anderen Systemen gewährleistet und die Interoperabilität innerhalb geodatenbezogener Infrastrukturen deutlich verbessert.


Folgende Formate werden unterstützt:

- JSON (internes InGrid Format)
- XML [ISO 19139](https://www.iso.org/standard/32557.html)
- GEOJSON
- HTML


<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Konfiguration der Editor Schnittstelle__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie haben den **Editor** installiert und wollen die **Editor Schnittstelle** konfigurieren? 
    
    Informationen zur Konfiguration der Editor Schnittstelle können Sie der Dokumentation entnehmen.

    [Editor Schnittstelle](../../components/interface_ige/){ .md-button }

</div>

## Beispiel Request
Beispiel für eine cURL-Anfrage für die OGC-Landing Page:
```
curl --location 'https://ige-ng.informationgrid.eu/api/ogc'
     --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInZGMZvcm1hdGlvbmdyaWQuZXUvcmVhbG1zL3JpZCIs...'
```

Beispiel für eine OGC API Antwort:
```
{
    "title": "OGC API Records",
    "description": "Access to InGrid via OGC API for Records."
}
```

### Authentifizierung

Details bzgl. Bearer-Token-Abfrage finden Sie unter [Editor API Authentifizierung](/components/interface_ige/#authentifizierung).


## Endpunkte

Eine ausführliche Dokumentation der Endpunkte ist über das **Swagger-UI** zu erreichen:

https://ige-ng.informationgrid.eu/swagger-ui/index.html

Im Kontext von InGrid gilt:

- Collection ist gleichzusetzen mit InGrid-Katalog. 
- Record ist gleichzusetzen mit Dokument (dataset, address).

| Method | Type         | Description                                                                                                                                                                                 |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | Landing Page | Get general information about OGC API Records <br>Endpoint: ```/api/ogc```                                                                                                                  |
| GET    | Conformance  | Get conformance class of OGC API Records <br>Endpoint: ```/api/ogc/conformance```                                                                                                           |
| GET    | Collections  | Get multiple collections <br>Endpoint: ```/api/ogc/collections```                                                                                                                           |
| GET    | Collection   | Get collection by collection-ID <br>Endpoint: ```/api/ogc/collections/{collectionId}```                                                                                                     |
| GET    | Records      | Get multiple records of a collection <br>Endpoint: ```/api/ogc/collections/{collectionId}/items```                                                                                          |
| GET    | Record       | Get record by record-ID <br>Endpoint: ```/api/ogc/collections/{collectionId}/items/{recordId}```                                                                                            |
| POST   | Records      | Insert multiple records into a collection <br>Endpoint: ```/api/ogc/collections/{collectionId}/items```                                                                                     |
| PUT    | Record       | Replace/update an existing resource in a collection with a replacement resource with the same resource identifier. <br>Endpoint: ```/api/ogc/collections/{collectionId}/items/{recordId}``` |
| DELETE | Record       | Delete a record by record-ID <br>Endpoint: ```/api/ogc/collections/{collectionId}/items/{recordId}```                                                                                       |
| GET | JSON Schema       | Get JSON Schema of record by record-type <br>Endpoint: ```/api/ogc/collections/{collectionId}/schema```                                                                                       |
