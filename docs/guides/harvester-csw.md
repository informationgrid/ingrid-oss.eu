---
title: Ausfüllhilfe für eine CSW Datenquelle 
description: Der InGrid Harvester erfasst Daten aus verschiedenen Quellen, speichert sie in Elasticsearch und stellt sie strukturiert für die weitere Verarbeitung bereit.
---

In diesem Leitfaden finden Sie Ausfüllhilfen und Beschreibungen, um eine CSW Datenquelle aufzusetzen. Eine abgeschlossene Installation des Harvesters wird vorausgesetzt.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }
    
    Sie wollen den **Harvester installieren**? 
    
    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Harvester Dokumentation]({{ fix_url('components/harvester.md') }}){ .md-button }

</div>

## Ausfüllhilfe

Bei der Konfiguration der Datenquellen gibt es zwei Arten von Einstellungen:
einerseits allgemeine Einstellungen, die bei allen Datenquellen zur Verfügung stehen, aber auch Datenquellen-spezifische Einstellungen. Letztere werden erst angezeigt, wenn der Typ der Datenquelle ausgewählt wurde. Die verfügbaren Datenquellen-Typen sind profilabhängig.

Im Folgenden wird die Konfiguration einer **CSW Datenquelle** beschrieben. Klicken Sie zunächst auf Datenquellen `HINZUFÜGEN`.


???+ success "Allgemeine Einstellungen"

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | Name                        | Name der Datenquelle               |
    | Typ                         | Typ der Datenquelle (verfügbare Typen sind profilabhängig) <br>Beispielwert: `CSW` |
    | Priorität                   | Bestimmt die Priorität der Datensätze bei der Deduplizierung (profilabhängig). Bei Duplikaten werden die Datensätze der am höchsten priorisierten Datenquelle beibehalten.<br>Beispielwert: `5` |
    | Kataloge                    | Hier müssen Kataloge ausgewählt werden, in die die CSW Metadatensätze geschrieben werden sollen. Kataloge müssen zuvor in der Menüleiste unter "Kataloge" erstellt werden.                                  |

??? success "InGrid Einstellungen"

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | iPlugId | Identifiziert die Datenquelle im InGrid Datenraum |
    | Partner | Eine übergeordnete Organisation, z.B. ein Bundsland (siehe https://ingrid-oss.eu/8.3.0/guides/querySyntax/?h=partner#allgemeines) |
    | Provider | Eine untergeordnete Organisation, z.B. eine Behörde (siehe https://ingrid-oss.eu/8.3.0/guides/querySyntax/?h=provider#allgemeines) |
    | Datasource Name | Beschreibender Name der Datenquelle, z.B. CSW Schnittstelle des Nds. Ministerium für Umwelt |
    | Datatype | Klassifizierende Merkmale des Datensatzes, z.B. metadata, opendata, etc. (siehe https://ingrid-oss.eu/8.3.0/guides/querySyntax/?h=datatype#allgemeines) |

??? success "CSW Einstellungen"

    | Feldname                    | Beschreibung                                                      |
    |-----------------------------|-------------------------------------------------------------------|
    | HTTP Methode                | Anfragemethode an den CSW Dienst <br>Beispielwert: `POST`         |
    | GetCapabilities URL              | URL des GetCapabilities Endpoints der CSW-Schnittstelle <br>Beispielwert: `https://gdk.gdi-de.org/gdi-de/srv/ger/csw` |
    | Harvesting Modus            | Es kann zwischen folgenden Modi gewählt werden: <br>- `Standard`: Eine naive Abfrage, die zusätzlich Dienste nicht auflöst. <br>- `Separat (langsam)`: Metadaten werden in einem zweistufigen Prozess geharvestet; zuerst werden alle Datensätze, dann alle zugehörigen Dienste abgeholt. Für die letztere Funktion muss die maximale Anzahl von Diensten pro Anfrage definiert werden. Dieser Prozess ist deutlich zeitintensiver. |
    | Max. Dienste pro Anfrage    | Nur verfügbar wenn der Harvesting-Modus `Separat` ausgewählt ist. Wird verwendet, um die maximale Anzahl an Diensten pro Anfrage zu definieren <br>Beispielwert: `30`                                             |
    | Max. Datensätze pro Anfrage | Um den Harvesting-Prozess zu optimieren können die Dokumente gebündelt abgefragt werden. Legen Sie dafür die maximale Anzahl an Datensätzen pro Anfrage fest. <br>Beispielwert: `200` |
    | Start Datensatz             | Definieren Sie mit welchen Datensatz gestartet werden soll.  <br>Beispielwert: `1` |
    | Anzahl paralleler Abfragen  | Um den Harvesting-Prozess zu beschleunigen kann eine Anzahl von parallelen Abfragen definiert werden. <br>Beispielwert: `6` |

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
    <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
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

    Für eine Datenquelle kann ein zusätzlicher `Mapping-Code` hinterlegt werden, um die Elasticsearch-Einträge vor dem Speichern anzupassen. Dafür werden Vorkenntnisse über das Elasticsearch-Mapping benötigt.

    > **Beispielszenario**: Der Wert "Mitte" soll eine räumliche Einordnung ermöglichen. Das Wort ist jedoch nicht eindeutig genug. Der Wert könnte entsprechend nach "Berlin Mitte" gemappt werden, um die Verständlichkeit zu erhöhen.  

    Beispielwert für `Mapping-Code`:

    ```
    doc.spatial_text = `Berlin ${doc.spatial_text}`;
    ```
