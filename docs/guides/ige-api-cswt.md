---
title: Editor API CSW-T
description: Der InGrid Editor ermöglicht die Erfassung von beliebiger Formulare und bietet einen umfangreichen Workflow, der den Import sowie Export von bliebigen Formaten erlaubt.
---
# Editor API: CSW-T

Der [InGrid Editor](/components/ige) verfügt über eine **CSW-T-Schnittstelle** (Catalogue Service for the Web – transactional profile), die es ermöglicht, mehrere Dokumentanfragen **transaktional** zu verarbeiten. Dabei werden die Operationen **Insert**, **Update** und **Delete** unterstützt, sodass neue Metadatensätze eingefügt, bestehende aktualisiert oder entfernt werden können – und das alles innerhalb eines konsistenten Transaktionsvorgangs. Dies erlaubt eine effiziente und gebündelte Bearbeitung von Metadaten über standardisierte OGC-konforme Mechanismen.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Konfiguration der Editor Schnittstelle__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie haben den **Editor** installiert und wollen die **Editor Schnittstelle** konfigurieren? 
    
    Informationen zur Konfiguration der Editor Schnittstelle können Sie der Dokumentation entnehmen.

    [Editor Schnittstelle](../../components/interface_ige/){ .md-button }

</div>


## Beispiel Request
Im Folgenden sehen Sie ein Beispiel für eine cURL POST Request:

```
curl --location 'https://ige-ng.informationgrid.eu/api/cswt?SERVICE=CSW&REQUEST=Transaction&catalog=my-ingrid' 
--header 'Content-Type: application/xml' 
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInZGMZvcm1hdGlvbmdyaWQuZXUvcmVhbG1zL3JpZCIs...' 
--data-raw '<?xml version="1.0" encoding="UTF-8"?>
<csw:Transaction service="CSW" version="2.0.2"
    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:gmd="http://www.isotc211.org/2005/gmd"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-publication.xsd">

    <csw:Insert>
        <!-- ein vollständiges Dokument im Format ISO 19139 (2007)-->
    </csw:Insert>
    
    <csw:Update>
        <!-- ein vollständiges Dokument im Format ISO 19139 (2007) -->
    </csw:Update>
    
    <csw:Delete>
        <csw:Constraint version="2.0.0">
            <ogc:Filter>
                <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>apsio:identifier</ogc:PropertyName>
                    <ogc:Literal>E6D08246-2B08-4551-8B99-8F75CCBBAD45</ogc:Literal>
                </ogc:PropertyIsEqualTo>
            </ogc:Filter>
        </csw:Constraint>
    </csw:Delete>

</csw:Transaction>'
```

In dem Tag `<csw:Transaction>` können mehrere Dokument-Anfragen gesammelt werden.

* Klammern Sie ein Dokument mit `<csw:Insert>`, um es als neues Dokument hinzuzufügen.
* Klammern Sie ein Dokument mit `<csw:Update>`, um ein bestehendes Dokument zu aktualisieren. 
* Klammern Sie eine Dokument-Id mit `<csw:Delete>` (siehe nachfolgendes Beispiel), um ein bestehendes Dokument zu löschen.

### Authentifizierung

Details bzgl. Bearer-Token-Abfrage finden Sie unter [Editor API Authentifizierung](/components/interface_ige/#authentifizierung).


## Endpunkt

Eine ausführliche Dokumentation der Endpunkte ist über das **Swagger-UI** zu erreichen:

https://ige-ng.informationgrid.eu/swagger-ui/index.html

| Method | Type  | Description                                                                                                                                            |
| ------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | CSW-t | INSERT, UPDATE & DELETE transaction <br> Endpoint:  ```/api/cswt``` <br> Example: ```../api/cswt?SERVICE=CSW&REQUEST=Transaction&catalog=CATALOG_ID``` |
