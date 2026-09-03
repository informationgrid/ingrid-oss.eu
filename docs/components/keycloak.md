---
title: Keycloak
description: "Die zentrale Benutzerverwaltung"
---

[Keycloak](https://www.keycloak.org/) ist eine Open-Source-Identitäts- und Zugriffsverwaltungslösung, die eine zentrale
Benutzerverwaltung für
moderne Anwendungen und Dienste ermöglicht. Als robuste Authentifizierungs- und Autorisierungsplattform bietet Keycloak:

- Single Sign-On (SSO) für Web-Anwendungen und RESTful Webservices
- Unterstützung für verschiedene Authentifizierungsprotokolle (OpenID Connect, OAuth 2.0, SAML)
- Integration mit externen Benutzerverzeichnissen (LDAP, Active Directory)
- Zwei-Faktor-Authentifizierung und Social Login
- Benutzer-Federation und Identity Brokering
- Umfangreiche Administrative Funktionen und Benutzer-Self-Service

Die Plattform ermöglicht eine sichere und effiziente Verwaltung von Benutzeridentitäten und Zugriffsrechten über eine
zentrale Stelle.

Bisher wird Keycloak ausschließlich vom InGrid-Editor verwendet. Weitere Komponenten werden folgen, mit dem Ziel,
Keycloak in allen InGrid-Komponenten zu verwenden.

<hr>

## Systemvoraussetzungen

|              | **Systembestandteil** | **Anforderung**       |
|--------------|-----------------------|-----------------------|
| **Hardware** | Arbeitsspeicher       | 1 GB RAM              |
|              | Festplattenspeicher   | 10 GB frei            |
|              | Prozessor             | Dual Core CPU         |
| **Software** | Java                  | Java 21               |
|              | PostgreSQL            | Version 13 oder höher |

<hr>

## Installation

Am einfachsten ist die Installation über Docker und unser bereitgestelltes Docker-Image. Dies beinhaltet folgende
Konfigurationen:

* neuer Realm für InGrid
* angepasstes Theme, das sich an die InGrid-Komponenten angliedert
* einfache Konfiguration der Emails für das Zurücksetzen des Passworts
* Erstellung der benötigten Rollen
* Erstellung der Clients
* Erstellung des Super-Admins für die Verwaltung des InGrid-Editors
* Verzögerter Start bis Datenbank bereit ist

### :material-docker: Docker

<div class="grid cards" markdown>

- :material-file-edit-outline:{ .lg .middle } __Docker-Image__

      ---

      Zur Installation kann das folgende Docker-Image verwendet werden:

      [:octicons-arrow-right-24: docker-registry.wemove.com/keycloak](https://docker-registry.wemove.com/keycloak)

</div>

``` yaml title="Beispiel docker-compose.yml"
services:

    keycloak:
        image: docker-registry.wemove.com/keycloak:${KEYCLOAK_VERSION}
        restart: unless-stopped
        environment:
          KC_BOOTSTRAP_ADMIN_USERNAME: admin
          KC_BOOTSTRAP_ADMIN_PASSWORD: admin
          KC_HTTP_RELATIVE_PATH: /keycloak
          KC_HOSTNAME: https://${HOST_URL}/keycloak
          KC_HTTP_ENABLED: true
          KC_DB: postgres
          KC_DB_URL_HOST: db
          KC_DB_USERNAME: ${DB_USERNAME}
          KC_DB_PASSWORD: ${DB_PASSWORD}
          MAIL_SMTP: mailrelay
          MAIL_FROM: ${MAIL_FROM}
          IGE_SUPER_USER_LOGIN: ige
          IGE_SUPER_USER_PASSWORD: ige
          IGE_SUPER_USER_FIRSTNAME: Max
          IGE_SUPER_USER_LASTNAME: Mustermann
          IGE_SUPER_USER_EMAIL: max.mustermann@beispiel.de
          EDITOR_URL: https://${HOST_URL}/editor
          EDITOR_SECRET: ${INGRID_EDITOR_SECRET}
          HARVESTER_URL: https://${HOST_URL}/harvester
          HARVESTER_SECRET: ${INGRID_HARVESTER_SECRET}
          INGRID_API_URL: https://${HOST_URL}/ingrid-api
          INGRID_API_SECRET: ${INGRID_API_SECRET}
        networks:
          - informationgrid-network
```

In einer weiteren Datei `.env` werden die Variablen für die docker-compose.yml Datei gesetzt.

#### Umgebungsvariablen

Da als Basis das Original-Keycloak-Image verwendet wird, können hier alle Umgebungsvariablen für Keycloak verwendet
werden ([Keycloak-Umgebungsvariablen](https://www.keycloak.org/server/all-config)). Zusätzlich werden von uns die
folgenden Umgebungsvariablen bereitgestellt:

| **Variable**              | **Hinweis**                                                                                                | **Defaultwert**       |
|---------------------------|------------------------------------------------------------------------------------------------------------|-----------------------|
| EDITOR_URL                | Die URL zum Editor, welche für den Redirect verwendet wird                                                 |                       |
| EDITOR_SECRET             | Das Secret für den Editor                                                                                  |                       |
| HARVESTER_URL             | Die URL zum Harvester, welche für den Redirect verwendet wird                                              |                       |
| HARVESTER_SECRET          | Das Secret für den Client                                                                                  |                       |
| INGRID_API_URL            | Die URL zur InGrid API, welche für den Redirect verwendet wird                                             |                       |
| INGRID_API_SECRET         | Das Secret für den InGrid API                                                                              |                       |
| IGE_SUPER_USER_EMAIL      | Die Email-Adresse des Super-Admins im InGrid-Editor                                                        |                       |
| IGE_SUPER_USER_FIRSTNAME  | Der Vorname des Super-Admins im InGrid-Editor                                                              |                       |
| IGE_SUPER_USER_LASTNAME   | Der Nachname des Super-Admins im InGrid-Editor                                                             |                       |
| IGE_SUPER_USER_LOGIN      | Die Benutzername des Super-Admins im InGrid-Editor                                                         |                       |
| IGE_SUPER_USER_PASSWORD   | Das Passwort des Super-Admins im InGrid-Editor                                                             |                       |
| IMPRINT_URL               | Die URL für das Impressum, welches auf der Login-Seite gezeigt werden soll                                 | #                     |
| MAIL_SMTP_PORT            | Der Port des SMTP-Servers für das Versenden von Emails                                                     |                       |
| MAIL_SMTP                 | Der Host des SMTP-Servers für das Versenden von Emails                                                     |                       |
| ORGANIZATION              | Die Organisation, welches auf der Login-Seite gezeigt werden soll                                          | Name der Organisation |
| PROFILE                   | Auswahl eines Profils für spezielle Anpassungen des Themes                                                 |                       |
| PRIVACY_NOTE_URL          | Die URL für den Datenschutz, welches auf der Login-Seite gezeigt werden soll                               | #                     |
| SIMPLE_SECURITY           | Initialisiert das InGrid-Realm mit einfachen Anforderungen für das Passwort (keine Mindestlänge, ...)      | false                 |
| WAIT_FOR_DATABASE         | Warte auf die Datenbank, bevor Keycloak gestartet wird                                                     | true                  |
| WAIT_FOR_DATABASE_TIMEOUT | Maximale Wartezeit, die auf die Datenbank gewartet werden soll (in Sekunden)                               | 180                   |

### Manuelle Installation

Wird ein eigener Keycloak-Server verwendet, so müssen folgende Schritte getätigt werden:

- Erstellung eines neuen Realms `InGrid`
- Erstellung eines neuen Clients `editor`
    - Redirect-URIs: `<URL-Editor>/*`
    - `Client authentication`, `Standard-Flow` und `Service account roles` aktivieren
    - Client Secret unter `Credentials` für die Konfiguration des Editors nehmen
    - unter `Roles` die Client-Rollen `user` und `admin` erstellen
    - unter `Client scopes` -> `editor-dedicated` die predefinied Mapper `client roles`und `realm roles` hinzufügen
        - in beiden Mappern `Add to ID token` aktivieren
    - unter `Service account roles` füge Client-Rolle `realm-admin` aus `realm-management` hinzu
- Erstellung eines neuen Clients `editor-api` (für OGC-Records-API und CSW-T)
    - Redirect-URIs: `<URL-Editor>/*`
    - `Client authentication` und `Standard-Flow` aktivieren
- Erstellung eines neuen Clients `harvester`
    - Redirect-URIs: `<URL-Harvester>/*`
    - `Client authentication` und `Standard-Flow` aktivieren
    - Client Secret unter `Credentials` für die Harvester-Konfiguration nehmen
    - unter `Roles` die Client-Rollen `viewer`, `editor` und `admin` erstellen
- Erstellung eines neuen Clients `ingrid-api`
    - Redirect-URIs: `<URL-API>/*`
    - `Client authentication` und `Standard-Flow` aktivieren
    - Client Secret unter `Credentials` für die InGrid-API-Konfiguration nehmen
    - unter `Roles` die Client-Rolle `admin` erstellen

Für die Administration der InGrid-Komponenten, muss ein Benutzer angelegt werden, der die entsprechenden Client-Rollen erhält
- Erstellung eines Benutzers mit der Client-Rolle (editor) `admin`, um den InGrid-Editor einzurichten
