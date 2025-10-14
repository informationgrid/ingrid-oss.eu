---
title: CSW Harvester Ausfüllhilfe
description: Der InGrid Harvester erfasst Daten aus verschiedenen Quellen, speichert sie in Elasticsearch und stellt sie strukturiert für die weitere Verarbeitung bereit.
---

In diesem Leitfaden finden Sie Ausfüllhilfen und Beschreibungen, um einen CSW Harvester aufzusetzen. Eine abgeschlossene Installation vom Harvester wird vorausgesetzt.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }
    
    Sie wollen den **Harvester installieren**? 
    
    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Harvester Dokumentation]({{ fix_url('components/harvester.md') }}){ .md-button }

</div>

## Ausfüllhilfe

Bei der Konfiguration der Harvester gibt es allgemeine Einstellungen die bei allen Harvestern zur Verfügung stehen, und spezifische Einstellungen für die verschiedenen Typen von Importern, diese werden erst angezeigt, wenn der Typ des Importers ausgewählt wurde. Die verfügbaren Harvester-Typen sind profilabhängig.

Im folgenden wird die Konfiguration eines **CSW Harvesters** beschrieben. Klicken Sie zunächst auf Harvester `HINZUFÜGEN`.


???+ success "Basis Angaben"

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | Typ                         | Typ der Datenquelle (verfügbaren Typen sind profilabhängig) <br>Beispielwert: `CSW` |
    | Indexname                   | Der Name von dem Index, in den Daten abgespeichert werden sollen. <br>Beispielwert: `csw_data_server_de` |
    | Beschreibung                | Beschreibung von dem Harvester <br>Beispielwert: `data-server.de`  |
    | Priorität                   | Bestimmt die Priorität der Datensätze bei der Deduplizierung (profilabhängig). Gelöscht wird der Datensatz mit der niedrigeren Priorität. Über die Priorisierung von Harvestern können Harvester ab- oder aufgewertet werden, bei Duplikaten werden die Datensätze des am höchsten priorisierten Harvesters beibehalten.<br>Beispielwert: `5` |

??? success "Allgemeine Einstellungen"

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | Max. Datensätze pro Anfrage | Um den Harvester-Prozess zu optimieren können die Dokumente gebündelt abgefragt werden. Legen Sie dafür die maximale Anzahl an Datensätzen pro Anfrage fest. <br>Beispielwert: `200` |
    | Start Datensatz             | Definieren Sie mit welchen Datensatz gestartet werden soll.  <br>Beispielwert: `1` |
    | Katalog-Identifier          | TODO |

??? success "CSW Einstellungen"

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | HTTP Methode                | Anfragemethode an den CSW Dienst <br>Beispielwert: `POST`         |
    | GetRecords URL              | URL von der GetRecords Schnittstelle <br>Beispielwert: `https://gdk.gdi-de.org/gdi-de/srv/ger/csw` |
    | Anzahl paralleler Abfragen  | Um den Harvest-Prozess zu beschleunigen kann eine Anzahl von parallelen Abfragen definiert werden <br>Beispielwert: `6` |
    | Harvesting Modus            | Bei Harvesting kann zwischen folgenden Modi gewählt werden: <br>- `Standard`: Eine vereinfachte Abfrage, die zusätzlich Dienst nicht auflöst. <br>- `Separat (langsam)`: Enthaltene Dienste (WFS und WMS Distributionen) werden zusätzlich aufgelöst. Dieser Prozess ist zeitintensiver. Zusätzlich kann die max. Dienste pro Anfrage definiert werden. |
    | Max. Dienste pro Anfrage    | Relevant für den Modus `Separat`, um maximale Anzahl an Dienste pro Anfrage zu definieren <br>Beispielwert: `30`                                             |
    | WFS/WMS auflösen            | Enthaltene WFS/WMS Dienste auflösen <br>Beispielwert: `ja (langsam)` |
    | Toleranz: Polygon vereinfachen | Optional können sehr detaillierte Polygone vereinfacht werden, um die Speichergröße zu reduzieren. <br>Beispielwert: `0,0001`                                            |
    | Planstatus                  | Ermöglicht das Filtern von Datensätze nach Planstatus (relevant in Profile `diplanung`) <br>Beispielwert: `festgestellt` |


??? success "Filter und Regeln"

    Die folgende Felder sind **CSW** spezifisch.

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | Ausgeschlossene IDs         | Liste von IDs, die ausgeschlossen werden <br>Beispielwert: `e2ed7da0-007a-11e0-be74-0000779eba3a` |
    | Nicht ausgeschlossene IDs   | Liste von IDs, die nicht ausgeschlossen werden <br>Beispielwert: `e2ed7da0-007a-11e0-be74-0000779eba3a` |
    | Muss Daten-Download enthalten | Checkbox um ausschließlich Datensätze mit Daten-Download zu indexieren  |
    | Datenformat ausschließen | Wenn Daten-Download enthalten sein müssen, kann in diesem Feld eine Liste an Datenformaten ausgeschlossen werden. <br>Beispielwert: `rss, doc` |
    | Record Filter               | Der Record Filter ermöglicht die präzise Filterung von CSW-Datensätzen im Rahmen einer CSW GetRecords-Abfrage. Mit diesem Filter können gezielte Anfragen erstellt werden, die ausschließlich die relevanten Datensätze zurückgeben, indem verschiedene Bedingungen kombiniert und Attribute spezifisch abgeglichen werden. <br>Beispielwert: Siehe Ende der Tabelle |
    | Either keywords             | Liste von Schlagwörtern, die es ermöglicht eine nachträgliche Filterung vorzunehmen (nach der getRecords Abfrage) <br>Beispielwert: `keyword-A, keyword-B` |

    Beispiel für einen Record Filter:

    ```
    <ogc:Filter>
        <ogc:And>
            <ogc:Or>
                <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>Subject</ogc:PropertyName>
                    <ogc:Literal>Bauleitplanung</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>Subject</ogc:PropertyName>
                    <ogc:Literal>Bauleitpläne</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>Subject</ogc:PropertyName>
                    <ogc:Literal>Bebauungsplan</ogc:Literal>
                </ogc:PropertyIsEqualTo>
            </ogc:Or>
            <ogc:PropertyIsLike escapeChar="\" singleChar="?" wildCard="*">
                <ogc:PropertyName>AnyText</ogc:PropertyName>
                <ogc:Literal>*Hamburg*</ogc:Literal>
            </ogc:PropertyIsLike>
        </ogc:And>
    </ogc:Filter>
    ``` 

??? success "Weitere Einstellungen"

    Für einen Harvester kann ein zusätzlicher `Mapping-Code` hinterlegt werden, um die Elasticsearch Einträge vor dem Speicher anzupassen. Dafür werden Vorkenntnisse über das Elasticsearch Mapping benötigt.

    > **Beispielszenario**: Der Wert "Mitte" soll eine räumliche Einordnung ermöglichen. Das Wort ist jedoch nicht eindeutig genug. Der Wert könnte entsprechend nach "Berlin Mitte" gemappt werden, um die Verständlichkeit zu erhöhen.  

    Beispielwert für `Mapping-Code`:

    ```
    doc.spatial_text = `Berlin ${doc.spatial_text}`;
    ```
