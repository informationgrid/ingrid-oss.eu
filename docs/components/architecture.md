Die grundlegende Software-Architektur besteht aus Komponenten, die über eine Kommunikationsschicht gekoppelt sind. Zwischen den einzelnen Komponenten können Nachrichten ausgetauscht werden. Jede Komponente kann auf einem unterschiedlichen System installiert werden. Dadurch ergeben sich hochflexible Anwendungsszenarien, die auch hohen Sicherheitsanforderungen genügen.

![](../assets/drawio/ingrid-system.drawio)
<figcaption class="figcaption">Schematische Darstellung eines InGrid-Systems</figcaption>

InGrid basiert auf dem Komponenten-Konzept, das im Bereich der Software-Entwicklung bereits seit längerem erfolgreich eingesetzt wird. Bei diesem Konzept werden Arbeitsaufgaben in Teilaufgaben unterteilt und parallel bearbeitet. Dadurch ergibt sich ein erweiterbares, flexibles und damit auch skalierbares System, mit dem hohe Flexibilität und Performanz gewährleistet werden können. InGrid besteht aus unterschiedlichen Modulen. Die wichtigsten sind der Informationsbroker (iBus), die Schnittstellen zu den Datenquellen (iPlugs), standardisierte Schnittstellen zur Portaloberfläche, offene Schnittstellen zur Weitergabe von Informationen an andere Systeme (CSW und OpenSearch), die Portaloberfläche sowie der InGridCatalog.

![](../assets/drawio/ingrid-components.drawio)

### iBus
Der iBus (“Information Bus”) bildet in einem InGrid-System das zentrale, verbindende Element. Er arbeitet als Verteilungsstation zwischen den InGrid Komponenten.

### iPlugs
Ein iPlug (“Information Plug”) ist ein Datenadapter, der einen externen Datenbestand an das InGrid System anbindet. Das System ist flexibel erweiterbar, d.h. neue iPlugs können nachträglich entwickelt und angeschlossen werden, ohne dass das bestehende System geändert werden muss. Die wichtigsten iPlugs werden im Folgenden vorgestellt

**DSC-iPlug:** Über das “Datasource-Client”-iPlug können Datenbanken mit beliebiger Datenstruktur angeschlossen werden. Als Datenbanktypen werden alle per JDBC ansprechbaren Datenbanken unterstützt.

**SE-iPlug:** Die Suchmaschine (“Search-Engine-iPlug”) besteht aus einem Web Crawler und einer Administrationsoberfläche. Die Pflege der zu indexierenden Webseiten kann durch Redakteure über eine Benutzeroberfläche vorgenommen werden.

**SNS-iPlug:** Das SNS-iPlug ist eine spezielle Schnittstelle zu Thesaurus und Geothesaurus Diensten. Neben dem Semantic Network Service (www.semantic-network.de) des Umweltbundesamtes wird auch der ein Gazeteer des Geodatenzentrums (BKG) angebunden.

**CSW-iPlug:** Über das CSW-iPlug können OGC-konforme CSW-2.0-Schnittstellen angeschlossen werden.

Alle indexierten Ergebnisse werden in der Hauptergebnisliste auf der Portaloberfläche angezeigt. Die Ergebnisse, die aufgrund von Schnittstelleneigenschaften von nicht zu indexierenden Datenquellen stammen, erscheinen in der Nebenergebnisliste.

### Offene Schnittstellen
Für die Kommunikation eines InGrid-Portals mit externen Informationssystemen stehen Schnittstellen zur Verfügung, die auf offenen Standards beruhen und HTTP- sowie XML/SOAP-Technologien für den Datenaustausch nutzen. Die wichtigsten Schnittstellen sind hierbei die OpenSearch-Schnittstelle und die CSW-Schnittstelle.

**OpenSearch-Schnittstelle:** Über diese XML-basierte Schnittstelle kann ein InGrid-Portal über einfache http-GET-Requests abgefragt werden. Die Suchergebnisse werden in einem standardisierten XML-Format ausgegeben und können von Zielsystemen anwendungsbezogen analysiert und aufbereitet werden. Es können sowohl Trefferlisten als auch Detailergebnisse recherchiert werden. Die Schnittstelle kann zudem für parametrisierte Suchanfragen an ein InGrid-Portal genutzt werden. Die Ergebnisse einer solchen Anfrage können z.B. in einem eigenen Portal mit individuellem Layout dargestellt werden.

**CSW-Schnittstelle:** Die OGC-konforme CSW-Schnittstelle basiert auf den ISO-Standards 19115, 19119 und 19139. Sie ist für den Austausch von geografischen Metadaten konzipiert und erfüllt die Anforderungen der GDI-DE und von INSPIRE. Über die CSW-Schnittstelle können externe Systeme auf geografische Metadaten eines InGrid-Portals zugreifen. Die Schnittstelle spielt im Rahmen der Geodateninfrastruktur Deutschland (GDI-DE) sowie von INSPIRE eine zentrale Rolle.

**ATOM Download Service:** Der ATOM Download Service stellt eine INSPIRE kompatible Schnittstelle zwischen Metadaten und den darin referenzierten Daten zur Verfügung. Ausgehen von einem Dienst können dazugehörige Datengrundlagen zum Download angeboten werden.

### Portal
Das InGrid-Portal bietet einen komfortablen Zugang zu den in InGrid System verwalteten Daten. Zentrale Funktionalität ist die konfigurierbare, facettierte Suche, mit der der InGrid-Datenbestand durchsucht werden kann. Teil des Portal ist ein Kartenclient, mit dem OGC konforme Kartendienste aus den Suchergebnissen angezeigt werden können sowie ein Zeitreihenclient.

## Kommunikation
Die Kommunikation zwischen den InGrid-Komponenten basiert auf TCP-Sockets. Der iBus startet einen Kommunikations-Socket zu dem sich andere Komponenten verbinden können. Über eine etablierte Verbindung erfolgt die weitere Kommunikation.

Dies ermöglicht, dass iPlugs und Schnittstellen hinter Firewalls versteckt werden können. Es muss keine von außen erreichbare Verbindung existieren, so dass keine sicherheitskritischen Verbindungen zu den Komponenten benötigt werden. Die einzige von außen erreichbare Komponente ist der iBus. Firewalls zwischen iPlugs/Schnittstellen und dem iBus müssen nur eine ausgehende TCP-Verbindung zum iBus erlauben. Dies ermöglicht den Einsatz von iPlugs/Schnittstellen in Bereichen mit hohen IT-Sicherheitsanforderungen.

![](../assets/drawio/ingrid-communication.drawio)

## Installation
Informationen zur Inbetriebnahme von InGrid finden Sie unter **[Installation]({{ fix_url('start/index.md') }})**.
