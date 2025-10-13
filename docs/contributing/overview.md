---
title: Jetzt starten
description: "Indexieren, Recherchieren, Visualisieren, Teilen"
---


Die Entwicklung der Software erfolgt partnerschaftlich durch eine Anzahl **[beteiligter Institutionen](../start/partner.md)**. Sie können gerne zu dem Projekt beitragen. Jeder Beitrag, ob groß oder klein, ist uns sehr willkommen. Bevor Sie beginnen, nehmen Sie sich bitte einen Moment Zeit, um dieses Dokument zu lesen. Es enthält wichtige Informationen, die den Beitragsprozess für alle Beteiligten reibungsloser gestalten.

## Releasezyklus

Der Releasezyklus des InGrid Projektes besteht aus Quartalsreleases.

Zwischen den Quartalsreleases werden bei Bedarf zusätzliche Versionen veröffentlichen. Dies geschieht, 

- um kritische Bug-Fixes schnell an die Nutzer auszuliefern oder 
- besonders wichtige, zeitkritische Features zu integrieren. 

Dieser flexible Ansatz stellt sicher, dass wir auf dringende Probleme umgehend reagieren können, während wir gleichzeitig einen vorhersehbaren Entwicklungsplan beibehalten.

## Versionierung

Die InGrid-Software ist eine komplexe Software mit vielen gleichberechtigten Komponenten. Für die Versionierung der einzelnen Komponenten stellen sich folgende **Herausforderungen**:

- Bei **einheitliche Versionierung** aller Komponenten müssten bei jedem Release alle Komponenten veröffentlicht werden. Beim Update einer Installation ist nicht klar, welche Komponenten wirklich verändert wurde.

- Eine **komponentenspezifische Versionierung** hat den Nachteil, dass die Versionen der einzelnen Komponenten auseinander driften, da manche Komponenten sehr viel häufiger veröffentlicht werden als andere.

- Es sollte **eine eindeutige Version** in der InGrid Software geben, die für alle Änderungen der Software zu dem Zeitpunkt steht.

- Der **Aufwand** bzgl. Releaseerstellung und Projektmanagement soll möglichst klein gehalten werden.

- Es soll, auch aus Marketing Gründen, eine **Zusammengehörigkeit von Komponenten** über die Version signalisiert werden.

### Versionierungsschema

Das Projekt verwendet eine [Sematische Versionierung](https://semver.org/lang/de/)

Auf Grundlage einer Versionsnummer von MAJOR.MINOR.PATCH werden die einzelnen Elemente folgendermaßen erhöht:

- MAJOR wird erhöht, wenn gravierende Änderungen an der Architektur vorgenommen werden,
- MINOR wird zum Quatralsrelease erhöht und
- PATCH wird erhöht, wenn die Änderungen Bugfixes oder wichtige, zeitkritische Features umfassen.
- Alle Komponenten, die gleichzeitig released werden, bekommen die gleiche Version.
- Sprünge in der Komponentenversionierung werden in Kauf genommen (4.1 -> 5.2).


## Issue-Erstellung

Bevor Sie mit der Arbeit beginnen, erstellen Sie bitte ein Issue. Suchen Sie dazu das Projekt an dem Sie arbeiten unter  [InGrid GitHub Projekt](https://github.com/informationgrid) aus und erstellen Sie ein Ticket.

* **Fehler melden:** Beschreiben Sie den Fehler so detailliert wie möglich. Fügen Sie Schritte zur Reproduktion, die erwartete und die tatsächliche Ausgabe sowie die von Ihnen verwendete InGrid-Version und die Version des Browsers bei.
* **Feature vorschlagen:** Erklären Sie, warum das neue Feature nützlich wäre und wie es sich in die bestehende Architektur von InGrid einfügen könnte.
* **Verbesserung vorschlagen:** Beschreiben Sie, was Sie verbessern möchten und welche Vorteile dies für das Projekt hat.

## Beitragsprozess (Pull Requests)

Wir verwenden den "Fork-and-Pull-Request"-Workflow, der auf GitHub-Projekten Standard ist.

- **Forken** Sie das entsprechende Projekt unter [InGrid GitHub Projekt](https://github.com/informationgrid).
- **Klonen** Sie Ihr geforktes Repository auf Ihren lokalen Rechner.
- Erstellen Sie einen neuen Branch für Ihre Änderungen: `git checkout -b feature/mein-neues-feature` oder `bugfix/mein-bugfix`.
- Führen Sie Ihre Änderungen durch.
- Schreiben Sie aussagekräftige **Commit-Nachrichten**. 
    -   `fix(portal): Behebe Fehler in der Nutzeranmeldung`
    -   `feat(editor): Füge Exportfunktion für Metadaten hinzu`
- Pushen Sie Ihren Branch auf Ihren Fork: `git push origin mein-neuer-branch`.
- Öffnen Sie einen **Pull Request** (PR) auf der GitHub-Seite Ihres Forks.
- Verknüpfen Sie Ihren PR mit dem relevanten Issue.
- Ein **Core-Entwickler** wird Ihren PR prüfen und Feedback geben.


## Code-Review-Prozess

Jeder Pull Request muss von einem oder mehreren Core-Entwicklern geprüft werden, bevor er in den `main`-Branch gemergt wird. Dieser Prozess sichert die Qualität und Stabilität des Projekts.

## Kontakt und Community

Wenn Sie Fragen haben, können Sie uns über folgende Kanäle erreichen:

* **E-Mail:** [vkoopuis@informationgrid.eu](mailto:vkoopuis@informationgrid.eu)