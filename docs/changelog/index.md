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

#### InGrid Editor

Die Konfiguration des InGrid Editors hat sich für die Anbindung an Keycloak geändert. Die Authentisierung sowie
Autoriserung erfolgen nun vollständig im Backend.
Folgende Anpassungen müssen getätigt werden:

- Keycloak-Image `docker-registry.wemove.com/keycloak:26.5.6-2` sollte mindestens verwendet werden
    - dieses erzeugt einen neuen Client `editor`
    - über Umgebungsvariable `EDITOR_SECRET` wird das Secret für den Client definiert
    - die Umgebungsvariable `IGE_FRONTEND_URL` muss durch `EDITOR_URL` ersetzt werden
    - bei eigenem Keycloak bitte die Dokumentation beachten: [Keycloak](../components/keycloak.md)
- Anpassung der Editor-Konfiguration:
    - die Umgebungsvariable `KEYCLOAK_CLIENT_SECRET` muss das definierte Secret aus dem Keycloak-Client haben
    - die folgenden Umgebungsvariablen können entfernt werden:
        - `KEYCLOAK_BACKEND_USER`
        - `KEYCLOAK_BACKEND_USER_PASSWORD`
        - `KEYCLOAK_URL_FRONTEND`
