---
title: Editor API CSW-T
description: Der InGrid Editor ermöglicht die Erfassung von beliebiger Formulare und bietet einen umfangreichen Workflow, der den Import sowie Export von bliebigen Formaten erlaubt.
---
# Editor API: CSW-T

Der [InGrid Editor]({{ fix_url('components/editor.md') }}) verfügt über eine **CSW-T-Schnittstelle** (Catalogue Service for the Web – transactional profile), die es ermöglicht, mehrere Dokumentanfragen **transaktional** zu verarbeiten. Dabei werden die Operationen **Insert**, **Update** und **Delete** unterstützt, sodass neue Metadatensätze eingefügt, bestehende aktualisiert oder entfernt werden können – und das alles innerhalb eines konsistenten Transaktionsvorgangs. Dies erlaubt eine effiziente und gebündelte Bearbeitung von Metadaten über standardisierte OGC-konforme Mechanismen.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Konfiguration der Editor Schnittstelle__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie haben den **Editor** installiert und wollen die **Editor Schnittstelle** konfigurieren? 
    
    Informationen zur Konfiguration der Editor Schnittstelle können Sie der Dokumentation entnehmen.

    [Editor Schnittstelle]({{ fix_url('components/interface_editor.md') }}){ .md-button }

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
        <csw:Constraint version="2.0.0">
            <ogc:Filter>
                <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>apiso:identifier</ogc:PropertyName>
                    <ogc:Literal>E6D08246-2B08-4551-8B99-8F75CCBBAD45</ogc:Literal>
                </ogc:PropertyIsEqualTo>
            </ogc:Filter>
        </csw:Constraint>
    </csw:Update>
    
    <csw:Delete>
        <csw:Constraint version="2.0.0">
            <ogc:Filter>
                <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>apiso:identifier</ogc:PropertyName>
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

Details bzgl. Bearer-Token-Abfrage finden Sie unter [Editor API Authentifizierung]({{ fix_url('components/interface_editor.md/#authentifizierung') }}).


## Validierungen

Beim Einliefern über die CSW-T-Schnittstelle werden die Anfrage und die enthaltenen Dokumente in mehreren Stufen geprüft. Alle Operationen einer `<csw:Transaction>` werden in einer gemeinsamen Transaktion ausgeführt: Schlägt eine Prüfung fehl, wird die Verarbeitung abgebrochen und die Transaktion zurückgerollt.

### Request-Parameter

| Prüfung                                                                                                                                  | Fehlermeldung                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `SERVICE` muss den Wert `CSW` haben.                                                                                                     | `Request parameter 'SERVICE' must be 'CSW'. Value '…' not supported.`  |
| `REQUEST` muss den Wert `Transaction` haben.                                                                                             | `Request parameter 'REQUEST' only accepts value 'Transaction'. …`      |
| Es sind nur die Parameter `SERVICE`, `REQUEST`, `catalog`, `datasetFolderId`, `addressFolderId`, `overwriteAddresses` und `overwriteDatasets` erlaubt. | `Request parameter '…' not supported`                          |
| Der Katalog `catalog` muss existieren.                                                                                                   | Katalog nicht gefunden                                                 |
| Die bei `datasetFolderId` bzw. `addressFolderId` angegebenen Ordner (UUID) müssen im Katalog existieren.                                 | Dokument nicht gefunden                                                |

### Format der Dokumente

* Der Request-Body muss wohlgeformtes XML sein.
* Insert und Update erwarten ein Dokument im Format **ISO 19139** mit `gmd:MD_Metadata` als Element. Eine CSW-Antwort (`csw:GetRecordByIdResponse`) wird nicht akzeptiert.
* Für das Dokument muss im Katalogprofil genau ein passender Importer existieren (`No importer found …` bzw. `More than one importer found …`).
* Der `gmd:hierarchyLevel` muss einer der Werte `dataset`, `series`, `service` oder `application` sein (`Not supported hierarchy level for import: …`).
* Codelistenwerte müssen abbildbar sein, z. B. die Metadaten- bzw. Datensatzsprache (`Could not map document language key: …`).

### Operationen

**Insert**

* Ein Datensatz mit dem `gmd:fileIdentifier` darf im Katalog noch nicht existieren (`Import Failed: Record with ID '…' already exists.`).

**Update**

* Ein `ogc:PropertyIsEqualTo` mit `ogc:PropertyName` und `ogc:Literal` muss angegeben sein.
* Als `ogc:PropertyName` werden nur `uuid` oder `identifier` (mit beliebigem Namespace-Präfix, z. B. `apiso:identifier`) unterstützt (`Constraint not supported with PropertyName: …`).
* Der Datensatz muss im Katalog existieren (Fehler *Not found*).
* Der Wert von `ogc:Literal` muss mit dem `gmd:fileIdentifier` des mitgelieferten Dokuments übereinstimmen (`Update Failed: Target ID '…' does not match dataset ID '…'.`).

**Delete**

* Ein `ogc:PropertyIsEqualTo` mit `ogc:PropertyName` und `ogc:Literal` muss angegeben sein. Leerzeichen im `ogc:Literal` werden entfernt.
* Der Datensatz muss im Katalog existieren.
* Ein Datensatz, der noch von anderen Datensätzen referenziert wird, kann nicht gelöscht werden.
* Als `ogc:PropertyName` werden nur `uuid` oder `identifier` (mit beliebigem Namespace-Präfix, z. B. `apiso:identifier`) unterstützt (`Constraint not supported with PropertyName: …`).

### Veröffentlichung

Eingelieferte Datensätze und Adressen werden direkt **veröffentlicht**. Dabei laufen dieselben Prüfungen wie bei einer Veröffentlichung im Editor:

* **Berechtigung:** Der Benutzer benötigt Schreibrechte auf den Zielordner bzw. – ohne Ordnerangabe – auf die oberste Ebene des Katalogs.
* **Dokumentgröße:** Ein Dokument darf maximal 32 MB groß sein (`Document too big! Max content is 32MB`).
* **JSON-Schema:** Das aus dem ISO-Dokument erzeugte Dokument wird gegen das JSON-Schema des jeweiligen Dokumenttyps im Katalogprofil validiert. Damit werden u. a. Pflichtfelder und Wertebereiche geprüft. Die Fehlermeldung enthält die einzelnen Schemafehler mit der betroffenen Stelle im Dokument (`location`).
* **Referenzierte Dokumente:** Alle referenzierten Adressen und Datensätze müssen veröffentlicht sein (`Latest referenced dataset not published: …`).
* **Veröffentlichungsrecht:** Das Veröffentlichungsrecht (Internet, Intranet, amtsintern) referenzierter Dokumente muss zu dem des Datensatzes passen (`Reference has wrong publication type condition: …`).
* **Profilspezifische Prüfungen** (InGrid-Profile):
    * Geodatendienste: Gekoppelte Ressourcen aus dem Katalog müssen veröffentlicht sein (`COUPLED_RESOURCES_MUST_BE_PUBLISHED`).
    * Geodatensätze: Interne Referenzen in der Herkunft (`dataQualityInfo.lineage`) müssen veröffentlicht sein (`INTERNAL_REFERENCES_MUST_BE_PUBLISHED`).

Ob bereits vorhandene Adressen bzw. Datensätze, die vom eingelieferten Dokument referenziert werden, überschrieben werden, steuern die Parameter `overwriteAddresses` (Standard: `false`) und `overwriteDatasets` (Standard: `true`).

### Fehlerantwort

Schlägt eine Validierung fehl, antwortet die Schnittstelle mit einem HTTP-Fehlerstatus (z. B. `400` oder `404`) und einem `ows:ExceptionReport`:

```xml
<ows:ExceptionReport xmlns:ows="http://www.opengis.net/cat/csw/2.0.2">
    <ows:Exception exceptionCode="NoApplicableCode">
        <ows:ExceptionText>Cannot process transaction: …</ows:ExceptionText>
    </ows:Exception>
</ows:ExceptionReport>
```


## Endpunkt

Eine ausführliche Dokumentation der Endpunkte ist über das **Swagger-UI** zu erreichen:

https://ige-ng.informationgrid.eu/swagger-ui/index.html

| Method | Type  | Description                                                                                                                                            |
| ------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | CSW-t | INSERT, UPDATE & DELETE transaction <br> Endpoint:  ```/api/cswt``` <br> Example: ```../api/cswt?SERVICE=CSW&REQUEST=Transaction&catalog=CATALOG_ID``` |
