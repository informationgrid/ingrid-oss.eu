---
title: InGrid Editor Schnittstelle
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

## Allgemeines

Die **InGrid Editor Schnittstelle** bietet API-Endpunkte zur maschinellen Verarbeitung von Metadaten. Sie ermöglicht den standardisierten Zugriff auf Datensätze über Schnittstellen wie **OGC Records** und **CSW-T** sowie weitere nützliche APIs zur Verarbeitung und Integration von Metadaten. 

Eine flexible Authentifizierung erlaubt den gesicherten Zugriff auf editierte oder veröffentlichte Inhalte – ideal für automatisierte Workflows und den strukturierten Datenaustausch.

![](../assets/drawio/ingrid-editor-api.drawio)

Eine ausführliche Dokumentation der Endpunkte ist über das **Swagger-UI** zu erreichen. Es dient als Hilfestellung für Testanfragen und gibt detailierte Auskunft über verfügbare Schnittstellen, Anfrage-Parameter und Pfad-Struktur.

* https://ige-ng.informationgrid.eu/swagger-ui/index.html

    Um einen API-Endpunkt über die Swagger-Benutzeroberfläche zu testen, müssen Sie den zuständigen Server auswählen (Dropdown-Menü "Server") und ein gültiges Bearer-Token eingeben (Schaltfläche "Authorise").

<hr>

## Leitfaden

Sie haben die Konfiguration bereits abgeschlossen? Diese Leitfaden könnten Sie interessieren.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __OGC Records Schnittstelle__

    ---

    Dieser Leitfaden begleitet Sie bei der Bediehnung der **OGC Records Schnittstelle**. 

    [OGC Records Schnittstelle](../../guides/ige-api-ogc/){ .md-button }

-   :material-book-open-variant-outline: __CSW-T Schnittstelle__

    ---

    Dieser Leitfaden begleitet Sie bei der Bediehnung der **CSW-T Schnittstelle**. 

    [CSW-T Schnittstelle](../../guides/ige-api-cswt/){ .md-button }

</div>

<hr>

## Konfiguration

Um die Schnittstellen nutzen zu können, muss der [InGrid Editor](ige.md) installiert sein. Achten Sie bei der Installation darauf, die entsprechenden Profile zu aktivieren, da die Schnittstellen andernfalls nicht zur Verfügung stehen.

Die Aktivierung erfolgt über die Startparameter, z. B.:

```
-Dspring.profiles.active=ogc-api,ogc-distributions-api,csw-t
```

Folgende Profile stehen zur Verfügung und können je nach Bedarf aktiviert werden:

| Profil                  | Schnittstelle            | Beschreibung                                                                                                                                       |
| ----------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ogc-api`               | OGC API – Records        | Aktiviert eine OGC-konforme Schnittstelle zur Bearbeitung und Abfrage von Metadaten.                                                  |
| `ogc-distributions-api` | Distributions (Dateien) | Ergänzt die OGC API – Records um die Möglichkeit, Dateien (z. B. PDF, Bilder) hochzuladen, zu ersetzen oder zu löschen und Datensätzen zuzuordnen. |
| `csw-t`                 | CSW-T nach ISO 19139 (2007)   | Aktiviert eine CSW-T Schnittstelle (POST-Methode) für die Operationen INSERT, UPDATE und DELETE.                                      |


<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie wollen den **Editor installieren**? 
    
    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Editor Dokumentation](../../components/ige/){ .md-button }

</div>

<hr>

## Authentifizierung

Alle APIs sind mit OAuth 2.0 über Keycloak gesichert. Um mit Endpunkten zu interagieren, muss zunächst ein Bearer-Token erstellt werden und in der Anfrage mit übergeben werden.

Überblick über die erforderlichen Variablen und Berechtigungsnachweise:

| Variable          | Description                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| *$KEYCLOAK_HOST*  | Keycloak Host e.g. `https://keycloak.informationgrid.eu`                                                                             |
| *$REALM*          | Legen Sie den Keycloak-Realm fest, der eine Reihe von Benutzern, Anmeldeinformationen, Rollen und Gruppen verwaltet (e.g. "InGrid"). |
| *$CLIENTID*       | Keycloak client ID  (e.g. "ige-ng-frontend")                                                                                         |
| *$CLIENTSECRET*   | Keycloak client secret (e.g. "admin")                                                                                                |
| *$USERNAME*       | Benutzername (InGird Editor Login)                                                                                                   |
| *$PASSWORD*       | Passwort (InGrid Editor Login)                                                                                                       |
| Grant type        | Type: Password Credential                                                                                                            |
| Access Token URL  | `KEYCLOAK_HOST`/realms/`$REALM`/protocol/openid-connect/token                                                                        |
| Refresh Token URL | `KEYCLOAK_HOST`/realms/`$REALM`/protocol/openid-connect/token                                                                        |

> **_NOTE:_** Zugangstokens sind 1 Minute lang gültig. Nach Ablauf der Gültigkeitsdauer muss das Token mit einem Refresh-Token aufgefrischt werden.

### Token anfragen
In diesem Abschnitt wird beschrieben, wie Sie Zugangstoken und Refresh-Token via *cURL* erhalten können.

Ersetzen Sie folgende Variable und führen Sie cURL aus: `$KEYCLOAK_HOST`, `$REALM`, `$USERNAME`, `$PASSWORD`, `$CLIENTID`, `$CLIENTSECRET`
```
curl -X POST
    $KEYCLOAK_HOST/realms/$REALM/protocol/openid-connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -d username=$USERNAME
    -d password=$PASSWORD
    -d grant_type=password
    -d client_id=$CLIENTID
    -d client_secret=$CLIENTSECRET
```

Die Antwort ist ein JSON-Objekt, das unter anderem **Access-Token** und **Refresh-Token** enthält. Beispiel einer Antwort:
```
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInZGMZvcm1hdGlvbmdyaWQuZXUvcmVhbG1zL3JpZCIs...",
    "expires_in": 60,
    "refresh_expires_in": 1800,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6I...",
    "token_type": "Bearer",
    "not-before-policy": 1632732926,
    "session_state": "1afef5ee-272c-4c4a-a181-3da38b432bac",
    "scope": "email profile"
}
```

### Token anwenden
Sobald Sie einen gültigen `access_token` erhalten haben, können Sie die Schnittstellen aufrufen. Dazu müssen Sie den `access_token` als Bearer-Token in den Header beifügen.

```
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInZGMZvcm1hdGlvbmdyaWQuZXUvcmVhbG1zL3JpZCIs...'
```

## FAQ

??? question "Wie bediene ich die OGC Records Schnittstelle?"

    Siehe Leitfaden [Editor API: OGC Records](../../guides/ige-api-ogc/)

??? question "Wie bediene ich die CSW-T Schnittstelle?"

    Siehe Leitfaden [Editor API: CSW-T](../../guides/ige-api-cswt/)