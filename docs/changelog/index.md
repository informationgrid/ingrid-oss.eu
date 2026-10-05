---
title: News
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Deprecation Warnung InGrid 7.5.x ⚠️

Die Komponenten der InGrid Software in der Version 7.5.x werden offiziell nicht mehr unterstützt. Es werden keine
Sicherheitsupdates für diese Versionen bereitgestellt. Es wird dringend empfohlen auf die neusten Versionen der
Komponenten zu aktualisieren.




<hr>

### Hinweise für die Aktualisierung&nbsp;⚠️

#### Neue Registry für Docker Images
Mit Version 8.5.0 wechseln die Docker Images aller InGrid-Komponenten ihren Ort von vorher 
`docker-registry.wemove.com` auf `registry.opencode.de/informationgrid`

Bei folgenden Images hat sich auch der Name geändert:

| vorher (bis 8.4.0)                               | nachher (ab 8.4.1 / 8.5.0)                                 |
|:-------------------------------------------------|:-----------------------------------------------------------|
| `docker-registry.wemove.com/ingrid-ige-ng:8.4.0` | `registry.opencode.de/informationgrid/ingrid-editor:8.5.0` |

#### Umstellung auf die neue CSW-Schnittstelle

Das Interface-CSW wird nicht mehr weiterentwickelt und wird durch pyCSW abgelöst. Der größte Unterschied bei der Umstellung betrifft die Indizierung der Daten. Während das Interface-CSW eine Quelle benötigt hat und die Daten zusammenhängend indiziert hat, werden die Daten über pyCSW direkt eingeliefert. Dies hat den Vorteil, dass die Daten sofort verfügbar sind. Dafür müssen Anpassungen im Portal, Harvester und Editor erfolgen. Nähere Informationen gibt es hier: [Migration zu pyCSW]({{ fix_url('components/pycsw.md#ingrid-editor') }})

<hr>
