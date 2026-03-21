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
          KC_HOSTNAME: http://${HOST_URL}/keycloak
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
          HARVESTER_URL: http://${HOST_URL}/harvester
          HARVESTER_SECRET: <my-secret>
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
| ADDITIONAL_REDIRECT_URIS  | Füge weitere URLs zum Client hinzu, um weitere InGrid-Editor Instanzen mit demselben Keycloak zu betreiben |                       |
| HARVESTER_URL             | Die URL zum Harvester, welche für den Redirect verwendet wird                                              |                       |
| HARVESTER_SECRET          | Das Secret für den Client                                                                                  |                       |
| IGE_CLIENT_ID             | Der Präfix für die Clients für den InGrid-Editor                                                           | ige-ng                |
| IGE_FRONTEND_URL          | Die URL unter der der InGrid-Editor erreichbar ist. Dies wird bspw. für die RedirectURL benötigt.          |                       |
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
| SIMPLE_SECURITY           | Initialisiert das InGrid-Realm mit einfachen Anforderungen für das Passwort (keine Mindestlänge, ...)      |                       |
| WAIT_FOR_DATABASE         | Warte auf die Datenbank, bevor Keycloak gestartet wird                                                     | true                  |
| WAIT_FOR_DATABASE_TIMEOUT | Maximale Wartezeit, die auf die Datenbank gewartet werden soll (in Sekunden)                               | 180                   |
