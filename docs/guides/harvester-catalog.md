---
title: Ausfüllhilfe für einen CSW Katalog 
description: Der InGrid Harvester erfasst Daten aus verschiedenen Quellen, speichert sie in Postgres und stellt sie strukturiert für diverse Kataloge (Elasticsearch, pyCSW) bereit.
---

In diesem Leitfaden finden Sie Ausfüllhilfen und Beschreibungen, um einen CSW Katalog anzuschließen. Eine abgeschlossene Installation des Harvesters wird vorausgesetzt.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }
    
    Sie wollen den **Harvester installieren**? 
    
    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Harvester Dokumentation]({{ fix_url('components/harvester.md') }}){ .md-button }

</div>

## Ausfüllhilfe

Der Anschluss an einen Katalog erfolgt unter dem Menupunkt "Kataloge".

1. Klicken Sie zunächst auf `HINZUFÜGEN`. 
2. Wählen Sie unter dem Feld `Typ` den Wert `CSW` aus und füllen Sie alle Pflichtfelder aus.

Im Folgenden finden Sie Hilfestellenungen zu den einzelnen Eingabefeldern, um einen **CSW Katalog** zu konfigurieren. 

???+ success "Allgemeine Einstellungen"

    | Feldname | Beschreibung                                                                   |
    | -------- | ------------------------------------------------------------------------------ |
    | Typ      | Typ vom Katalog (verfügbare Typen sind profilabhängig) <br>Beispielwert: `CSW` |
    | Name     | Name vom Katalog                                                               |
    | URL      | URL vom Katalog                                                                |

??? success "CSW Einstellungen"

    | Feldname      | Beschreibung                                                                                                                                |
    | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
    | Output-Schema | Definiert das Metadatenformat der Antwort (z. B. csw:Record, gmd:MD_Metadata für ISO 19115). Beispielwert: http://www.isotc211.org/2005/gmd |
    | Version       | Definiert die CSW-Protokollversion (z. B. 2.0.2), die bestimmt welche Operationen und Parameter unterstützt werden.                         |
