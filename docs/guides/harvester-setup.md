---
title: Harvester einrichten
description: Der InGrid Harvester erfasst Daten aus verschiedenen Quellen, speichert sie in Elasticsearch und stellt sie strukturiert für die weitere Verarbeitung bereit.
---
# Harvester einrichten

Dieser Abschnitt begleitet Sie beim Einrichten vom Harvester. Eine abgeschlossene Installation vom Harvester wird vorausgesetzt.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }
    
    Sie wollen den **Harvester installieren**? 
    
    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Harvester Dokumentation]({{ fix_url('components/harvester.md') }}){ .md-button }

</div>

## Einrichten

!!! tip inline end "Hinweis"

    Um die Konfiguration zu vereinfachen stehen in der GUI praktische **Kontexthilfen** zur Verfügung. Klicken Sie dafür auf die Überschift des Abschnitts (z. B. "Datenbank").

Nach der Installation können Sie über die Benutzeroberfläche unter dem Menupunkt **Konfiguration** der Harvester eingerichten.

Achten Sie darauf, nach der Konfiguration auf **`SPEICHERN`** zu klicken, um die Änderungen zu übernehmen.


### Datenbank

!!! info inline end
    Um die Verbindung zur Datenbank zu prüfen, klicken Sie auf den Button `VERBINDUNG TESTEN`.

Für den zuverlässigen Betrieb des InGrid Harvesters ist eine angebundene relationale Datenbank erforderlich. Diese dient vor allem der Deduplizierung von Dokumenten, also der Erkennung und Vermeidung doppelter Einträge innerhalb der erfassten Daten.


### Elasticsearch

!!! info inline end
    Um die Verbindung zu Elasticsearch zu prüfen, klicken Sie auf den Button `VERBINDUNG TESTEN`.

Elasticsearch bildet das zentrale Zielsystem für die von InGrid Harvester verarbeiteten Daten. Jeder Harvester-Prozess schreibt seine Ergebnisse in einen eigenen Index, der auf der angebundenen Elasticsearch-Instanz verwaltet wird. Diese Struktur ermöglicht eine klare Trennung und gezielte Verarbeitung der Daten je nach Quelle oder Konfiguration.



### Zusätzliche Einstellungen
In diesem Abschnitt werden erweiterte Parameter zur Steuerung und Integration des Harvesters konfiguriert:

- Zeitversetzte Ausführung von Cron-Jobs (Offset in Minuten)
- Log-Level für fehlende Format-Mappings
- Proxy-Einstellungen inklusive optionaler SSL-Ausnahmen
- Portal-URL für den Zugriff auf vereinheitlichte Daten


### Checks
In diesem Abschnitt werden automatisierte Prüfungen zur Qualitätssicherung konfiguriert:

- URL-Check aktivieren und zeitlich steuern (per Cron-Expression)
- Index-Check aktivieren und zeitlich steuern (per Cron-Expression)


### Index-Backup
Dieser Bereich ermöglicht die zeitgesteuerte Sicherung von Elasticsearch-Indizes:

* **Backup aktivieren** (regelmäßige Sicherungen einschalten)
* **Zeitplanung per Cron-Expression** definieren
* **Indizes per regulärem Ausdruck** auswählen
* **Zielverzeichnis** für Backup-Dateien festlegen


### Harvesting Differenzen
Wenn bereits bestehende Datensätze im laufenden Harvesting nicht vorhanden sind, dann kann eine Differenz (in Prozent) definiert werden, um eine Benachrichtigung per E-Mail zu verschicken bzw. das Harvesting abzubrechen. Aktivieren/deaktivieren Sie dafür die entsprechende Option und definieren Sie einen Prozentwert wann die Aktion ausgeführt werden soll.


### E-Mail-Einstellungen
Im Abschnit **E-Mail-Einstellungen** kann eine E-Mail-Benachrichtigung eingerichtet werden. Wenn Sie die **E-Mail-Einstellungen** aktivieren, dann wird eine Mail versendet, wenn die Ergebnismenge unter der eingestellten Schwelle gegenüber dem letzten Import liegt oder gar keine Ergebnisse importiert wurden.

**Folgende Informationen werden geliefert:**

- **Number of records**: Anzahl der Datensätze, die von der Schnittstelle geliefert werden.
- **Skipped records**: Anzahl Datensätze, die Aufgrund von Filtereinstellungen nicht übernommen wurden.
- **Record-Errors**: Anzahl Datensätze, bei deren Konvertierung ein Fehler aufgetreten ist (beispielsweise durch Format-Fehler, fehlende Details etc.), diese Datensätze werden nicht übernommen.
- **Warnings**: Anzahl Warnungen die beim konvertieren der Datensätze aufgetreten sind (insbesondere fehlende Lizenzen und unbekanntes Format der Resource), die betroffenen Datensätze werden übernommen.
- **App-Errors**: Allgemeine Fehler beim Abfragen des Datenanbieters die sich nicht auf einen einzelnen Datensatz beziehen (beispielsweise Probleme in der Kommunikation).
- **Elasticsearch-Errors**: Fehler bei der Kommunikation mit dem Elasticsearch-Server.

Sofern vorhanden werden zusätzlich die Daten aus dem vorherigen Lauf mit angegeben.
Wenn beim Import *App-Errors* oder *Elasticseach-Errors* auftreten, so wird der neue Index verworfen und ein gegebenenfalls vorhandener, alter Index bleibt erhalten.
Bei 0 Ergebnissen wird der neue Index verworfen und der alte Index beibehalten (bei CSW und CKAN).

**Beispiel Betreff:**

- *[mCloud] Importer "mCLOUD Excel Datei" mit weniger Ergebnissen!*
- *[mCloud] Importer "Open-Data-Portal des Rhein-Neckar-Verkehrs (RNV)" ohne Ergebnisse!*

**Beispiel Inhalt:**

```
Current Run:
---------------------------------------------------------
mCLOUD Excel Datei (EXCEL)
---------------------------------------------------------
Number of records: 382
Skipped records: 0
Record-Errors: 0
Warnings: 0
App-Errors: 0
Elasticsearch-Errors: 0

Last Run (Thu Jun 04 2020 14:34:29 GMT+0200 (Central European Summer Time)):
---------------------------------------------------------
mCLOUD Excel Datei (EXCEL)
---------------------------------------------------------
Number of records: 536
Skipped records: 0
Record-Errors: 0
Warnings: 0
App-Errors: 0
Elasticsearch-Errors: 0
```