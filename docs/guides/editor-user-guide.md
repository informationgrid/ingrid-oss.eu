---
title: Editor - Erstkonfiguration
description: Der InGrid Editor ermöglicht die Erfassung beliebiger Formulare und bietet einen umfangreichen Workflow, der den Import sowie Export von unterschiedlichen Formaten erlaubt.
---

# InGrid Editor einrichten – Leitfaden für die Erstkonfiguration

Diese Anleitung richtet sich an Administratorinnen und Administratoren, die einen **frisch installierten** InGrid
Editor so einrichten möchten, dass Mitarbeiterinnen und Mitarbeiter damit Metadaten-Datensätze erfassen
können. Sie führt Schritt für Schritt vom ersten Login bis zum ersten erfassten Datensatz.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie wollen den **Editor installieren**?

    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Editor Dokumentation]({{ fix_url('components/editor.md') }}){ .md-button }

</div>

## Inhalt

1. [Überblick und Begriffe](#1-überblick-und-begriffe)
2. [Voraussetzungen und erster Login](#2-voraussetzungen-und-erster-login)
3. [Profile (Katalogtypen)](#3-profile-katalogtypen)
4. [Katalog erstellen](#4-katalog-erstellen)
5. [Katalog konfigurieren](#5-katalog-konfigurieren)
6. [Rollen im InGrid Editor](#6-rollen-im-ingrid-editor)
7. [Gruppen und Berechtigungen](#7-gruppen-und-berechtigungen)
8. [Benutzer erstellen](#8-benutzer-erstellen)
9. [Benutzer verwalten](#9-benutzer-verwalten)
10. [Das persönliche Profil](#10-das-persönliche-profil)
11. [Erste Datensätze erfassen](#11-erste-datensätze-erfassen)
12. [Checkliste für die Einrichtung](#12-checkliste-für-die-einrichtung)
13. [Häufige Fragen und Probleme](#13-häufige-fragen-und-probleme)

---

## 1. Überblick und Begriffe

| Begriff                | Bedeutung                                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Katalog**            | Abgeschlossener Datenbestand mit eigenen Datensätzen, Adressen, Gruppen und Einstellungen. Eine Installation kann mehrere Kataloge enthalten.                                      |
| **Profil**             | Der Typ eines Katalogs (z. B. „InGrid Katalog“, „UVP Katalog“). Das Profil bestimmt Datensatztypen, Formulare, Codelisten, Import-/Exportformate und Prüfregeln.                  |
| **Datensatz**          | Ein Metadatensatz (z. B. Geodatensatz, Geodatendienst), erfasst im Bereich **Daten**.                                                                                             |
| **Adresse**            | Organisation oder Person, die in Datensätzen referenziert wird (z. B. als Ansprechpartner), erfasst im Bereich **Adressen**.                                                      |
| **Rolle**              | Grundsätzliche Befugnis eines Benutzers (Super-Administrator, Katalog-Administrator, Metadaten-Administrator, Autor).                                                             |
| **Gruppe**             | Bündelt Berechtigungen auf Datensätze und Adressen. Benutzer erhalten ihre Rechte auf Daten über die Gruppen, denen sie angehören.                                                 |
| **Keycloak**           | Externer Dienst für die Anmeldung (Authentifizierung). Die Rechtevergabe (Autorisierung) erfolgt im InGrid Editor selbst.                                                          |

Die Einrichtung folgt immer derselben Reihenfolge:

```
Erster Login (Super-Administrator)
   └─► Katalog mit passendem Profil anlegen und aktivieren
         └─► Katalog konfigurieren
               └─► Ordnerstruktur für Daten und Adressen anlegen
                     └─► Gruppen mit Berechtigungen anlegen
                           └─► Benutzer anlegen und Gruppen zuweisen
                                 └─► Datensätze erfassen
```

---

## 2. Voraussetzungen und erster Login

### 2.1 Der Super-Administrator

Nach der Installation existiert genau ein Benutzer: der **Super-Administrator**. Er wird in Keycloak angelegt und
besitzt dort die Rolle `admin` des Keycloak-Clients `editor`.

- Beim vorkonfigurierten Keycloak-Docker-Image wird er über die Umgebungsvariablen `IGE_SUPER_USER_LOGIN`,
  `IGE_SUPER_USER_PASSWORD`, `IGE_SUPER_USER_FIRSTNAME`, `IGE_SUPER_USER_LASTNAME` und `IGE_SUPER_USER_EMAIL`
  erzeugt (Standard-Login: `ige`).
- Bei einer eigenen Keycloak-Instanz muss der Benutzer manuell angelegt werden (*Users → Add user*) und unter
  *Role mapping* die Rolle `admin` des Clients `editor` erhalten.


### 2.2 Erster Login

1. Rufen Sie die URL des InGrid Editors im Browser auf.
2. Sie werden zur Keycloak-Anmeldeseite weitergeleitet. Melden Sie sich mit den Zugangsdaten des Super-Administrators an.
3. Da noch kein Katalog existiert, ist zunächst nur die Verwaltung sinnvoll nutzbar. In der Katalogverwaltung erscheint
   der Hinweis *„Sie sind noch keinem Katalog zugewiesen. Erst wenn Sie einem Katalog angehören, können Sie zusätzliche
   Operationen ausführen.“*

Fahren Sie mit der Wahl des passenden Profils fort.

---

## 3. Profile (Katalogtypen)

Jeder Katalog basiert auf einem **Profil**. Das Profil legt fest,

- welche **Datensatz- und Adresstypen** erfasst werden können (z. B. Geodatensatz, Geodatendienst, Organisation, Person),
- welche **Formularfelder** und **Pflichtfelder** es gibt,
- welche **Codelisten** im Katalog angelegt werden,
- welche **Import- und Exportformate** zur Verfügung stehen (z. B. ISO 19139, IDF),
- welche **Prüfungen** beim Veröffentlichen ausgeführt werden,
- welche **Schnellfilter, Recherchen und Berichte** angeboten werden.

> **Wichtig:** Das Profil wird beim Anlegen des Katalogs festgelegt und kann danach **nicht mehr geändert** werden.
> Wählen Sie es daher sorgfältig.

### 3.1 Verfügbare Profile

Welche Profile auswählbar sind, hängt von der Konfiguration der Installation ab (Spring-Profile, mit denen der Server
gestartet wird, z. B. `ingrid`, `uvp`). Typische Profile sind:

| Profil (Anzeige im Dialog)        | Einsatzzweck                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| InGrid Katalog                    | Standardprofil für ISO 19115/19119- und INSPIRE-konforme Metadaten von Geodaten und Geodiensten.    |
| InGrid mit Opendata - Katalog     | InGrid-Profil mit zusätzlichen Open-Data-Angaben (Kategorien, Lizenzen).                           |
| InGrid Katalog (BASt, BAW, BKG, HMDK, KRZN, LfU Bayern, LUBW, UP-SH, WSV, …) | Institutionsspezifische Varianten des InGrid-Profils mit zusätzlichen Feldern bzw. Regeln. |
| UVP Katalog                       | Erfassung von Verfahren nach dem Gesetz über die Umweltverträglichkeitsprüfung.                     |
| Open-Data Katalog                 | Allgemeine Open-Data-Metadaten (DCAT-AP.de-orientiert).                                           |
| Open Data Katalog (Bund)          | Open-Data-Profil für Bundesbehörden.                                                               |

Für die Erfassung von Geo-Metadaten nach ISO/INSPIRE ist in der Regel **„InGrid Katalog“** die richtige Wahl.

---

## 4. Katalog erstellen

Kataloge können nur vom **Super-Administrator** angelegt werden.

### 4.1 Neuen Katalog anlegen

1. Öffnen Sie oben rechts das Menü (Symbol mit den drei Punkten) und wählen Sie **Verwaltung**.
2. Wechseln Sie in den Reiter **Katalogverwaltung**.
3. Klicken Sie auf **Hinzufügen**. Der Dialog **„Neuen Katalog anlegen“** öffnet sich.
4. Geben Sie einen **Katalognamen** ein (z. B. „Geodatenkatalog Landesamt“). Der Name muss innerhalb der Installation
   eindeutig sein.
5. Wählen Sie im Feld **Typ** das gewünschte Profil (siehe [Kapitel 3](#3-profile-katalogtypen)).
6. Klicken Sie auf **Anlegen**.

Beim Anlegen werden automatisch die profilspezifischen Codelisten, vordefinierte Recherchen und die
Datenbank-Indizes für den Katalog erzeugt.

### 4.2 Katalog aktivieren

Der Super-Administrator kann zwischen mehreren Katalogen wechseln. Gearbeitet wird immer im **aktiven Katalog**.

1. In der Katalogverwaltung werden alle Kataloge als Kacheln angezeigt, getrennt in **Aktiver Katalog** und
   **Weitere Kataloge**.
2. Öffnen Sie beim gewünschten Katalog das Menü (drei Punkte) und wählen Sie **Aktivieren**.
3. Die Anwendung wird mit dem gewählten Katalog neu geladen; der Katalogname erscheint in der Kopfzeile.

Jede Kachel zeigt das Erstellungsdatum bzw. das Datum der letzten Änderung sowie die Anzahl der enthaltenen Datensätze.

### 4.3 Katalog bearbeiten, exportieren und löschen

Über das Menü einer Katalogkachel stehen außerdem zur Verfügung:

- **Bearbeiten** – öffnet den Dialog „Katalog bearbeiten“. Hier können **Titel** und **Beschreibung** geändert werden.
  Zusätzlich werden die zugewiesenen **Administratoren** angezeigt. Mit **Löschen** wird der Katalog inklusive aller
  Datensätze entfernt, mit **Aktualisieren** werden die Änderungen gespeichert.
- **Exportieren** – exportiert den gesamten Katalog, z. B. zur Sicherung oder zur Übernahme in eine andere Installation.
- **Importieren** (Schaltfläche oberhalb der Kacheln) – importiert einen zuvor exportierten Katalog.

> **Achtung:** Das Löschen eines Katalogs kann nicht rückgängig gemacht werden. Exportieren Sie den Katalog vorher.

### 4.4 Kataloge Benutzern zuweisen

Ein Benutzer kann mehreren Katalogen angehören. Neu angelegte Benutzer werden automatisch dem Katalog zugeordnet, in
dem sie angelegt wurden. Um einen bestehenden Benutzer zusätzlich einem weiteren Katalog zuzuweisen:

1. **Verwaltung → Katalogzuweisung** öffnen.
2. Im Feld **Nutzer auswählen…** den Benutzer wählen.
3. Im Feld **Katalog auswählen…** den Katalog wählen.
4. Auf **Katalog zuweisen** klicken.

Sollte der Super-Administrator selbst nach dem Anlegen des ersten Katalogs noch keinem Katalog zugeordnet sein, kann
er sich auf diese Weise selbst zuweisen.

---

## 5. Katalog konfigurieren

Nach dem Aktivieren des Katalogs sollten die katalogspezifischen Einstellungen geprüft werden. Sie finden diese im linken Seiten-Menü unter **Katalog** (nur für Katalog-Administratoren und Super-Administratoren).

| Reiter               | Inhalt                                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Konfiguration**    | Katalogname, Beschreibung, Partner, Anbieter, Katalogsprache (Deutsch/Englisch), Farbschema, Namespace, Elasticsearch-Alias, ATOM-Downloadservice-URL, Standard-Raumbezug sowie Einstellungen zu **abgelaufenen Metadaten** (Gültigkeitszeitraum in Tagen, E-Mail-Benachrichtigungen vor bzw. nach Ablauf). Die verfügbaren Felder hängen vom Profil ab. |
| **Codelisten**       | Katalogspezifische Codelisten anzeigen und pflegen (z. B. „Freie Konformitäten“, „Verwaltungsgebiet“, „Symbolkatalog“, „Schlüsselkatalog“ im InGrid-Profil). Einträge können ergänzt und Standardwerte gesetzt werden.               |
| **Verhalten**        | Ein- und Ausschalten optionaler Funktionen des Editors (z. B. Verantwortlichkeit von Benutzern für Datensätze, Vorgaben für Formulare).                                                                                             |
| **Indizierung**      | Konfiguration der regelmäßigen Indizierung der veröffentlichten Datensätze für Portal und Suche (Zeitplan, manuelles Starten, Protokoll).                                                                                           |
| **KI-Konfiguration** | Einstellungen für KI-gestützte Funktionen, sofern in der Installation verfügbar.                                                                                                                                                   |

> **Hinweis:** Die Codelisten aus dem zentralen Codelist-Repository werden vom Super-Administrator unter
> **Verwaltung → Codelist Repository** synchronisiert. Verbindungen zu Elasticsearch werden unter
> **Verwaltung → Verbindungen** eingerichtet.

---

## 6. Rollen im InGrid Editor

Jeder Benutzer hat genau **eine Rolle**. Die Rolle gilt **katalogübergreifend** – wird sie geändert, wirkt sich das auf
alle Kataloge aus, denen der Benutzer angehört.

| Rolle                         | Typischer Einsatz                         | Befugnisse                                                                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Super-Administrator**       | Betreiber der Installation                | Vollzugriff auf alle Kataloge. Darf Kataloge anlegen, löschen und zuweisen, Inhalte und Benachrichtigungen verwalten, Verbindungen und Codelist-Repository konfigurieren. Wird nur in Keycloak vergeben.                       |
| **Katalog-Administrator**     | Verantwortliche Stelle für einen Katalog  | Vollzugriff auf alle Datensätze und Adressen der zugewiesenen Kataloge. Verwaltet Katalogeinstellungen, Benutzer und Gruppen, darf importieren und exportieren. Benötigt keine Gruppe.                                         |
| **Metadaten-Administrator**   | Fachliche Koordination einer Abteilung     | Darf Benutzer und Gruppen verwalten, allerdings nur im Rahmen seiner eigenen Rechte. Zugriff auf Daten nur über seine Gruppen. Kann keine Katalog-Administratoren anlegen.                                                     |
| **Autor**                     | Erfasserinnen und Erfasser                | Zugriff auf Datensätze und Adressen ausschließlich über die zugewiesenen Gruppen. Darf exportieren; Anlegen und Importieren nur, wenn eine Gruppe Schreibrechte auf Ordner gewährt.                                           |

Wichtige Regeln:

- **Katalog-Administratoren** und **Super-Administratoren** benötigen keine Gruppen, da sie ohnehin alle Rechte haben.
- **Metadaten-Administratoren** und **Autoren** müssen **mindestens einer Gruppe** angehören, sonst sehen sie keine Daten.
- Ein Metadaten-Administrator kann nur Gruppen verwalten und vergeben, deren Rechte innerhalb seiner eigenen Rechte liegen.

---

## 7. Gruppen und Berechtigungen

Rechte auf Datensätze und Adressen werden **nicht direkt an Benutzer**, sondern an **Gruppen** vergeben. Ein Benutzer
erhält die Summe der Rechte aller Gruppen, denen er angehört. Legen Sie deshalb **zuerst die Gruppen** und erst danach
die Benutzer an.

### 7.1 Vorbereitung: Ordnerstruktur anlegen

Berechtigungen werden am einfachsten auf **Ordner** vergeben, da Rechte an alle darin enthaltenen Datensätze und
Unterordner vererbt werden. Legen Sie daher vor dem Anlegen der Gruppen in den Bereichen **Daten** und **Adressen**
eine passende Ordnerstruktur an, z. B. nach Abteilungen oder Themen:

```
Daten
├── Abteilung Boden
├── Abteilung Wasser
│   ├── Grundwasser
│   └── Oberflächengewässer
└── Abteilung Naturschutz

Adressen
├── Landesamt (Organisation)
└── Externe Partner
```

### 7.2 Gruppe anlegen

1. Öffnen Sie im linken Menü **Benutzer & Rechte** und wechseln Sie in den Reiter **Gruppen & Rechte**.
2. Klicken Sie auf **Hinzufügen**.
3. Geben Sie im Dialog **„Gruppe hinzufügen“** einen **Gruppennamen** ein (z. B. „Abteilung Wasser – Bearbeiter“).
   Der Name muss eindeutig sein.
4. Klicken Sie auf **Anlegen**. Die neue Gruppe wird in der Liste ausgewählt und rechts angezeigt.
5. Ergänzen Sie optional eine **Beschreibung**.
6. Vergeben Sie die Berechtigungen (siehe unten).
7. Klicken Sie oben auf **Speichern**.

### 7.3 Berechtigungen vergeben

Im Detailbereich einer Gruppe gibt es zwei Arten von Berechtigungen.

#### Allgemeine Berechtigungen

| Schalter                      | Wirkung                                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allgemeines Leserecht**     | Mitglieder dürfen **alle** Datensätze und Adressen des Katalogs lesen.                                                                        |
| **Allgemeines Schreibrecht**  | Mitglieder dürfen **alle** Datensätze und Adressen des Katalogs lesen und bearbeiten, neue anlegen und importieren. Überschreibt die Tabellenrechte. |

Diese Schalter werden nur angezeigt, wenn der angemeldete Benutzer selbst über das entsprechende allgemeine Recht verfügt
(z. B. als Katalog-Administrator).

#### Rechte auf einzelne Ordner und Datensätze

In den Tabellen **Berechtigungen Daten** und **Berechtigungen Adressen** werden gezielt Rechte auf einzelne Ordner oder
Datensätze vergeben:

1. Klicken Sie unter der jeweiligen Tabelle auf **Hinzufügen**.
2. Wählen Sie im Dialog **„Rechte hinzufügen“** im Baum den gewünschten Ordner oder Datensatz aus.
3. Bestätigen Sie mit **Hinzufügen**. Der Eintrag erscheint in der Tabelle (Spalte **Bezeichnung/Ort** mit Pfad).
4. Legen Sie in der Spalte **Berechtigung** die Stufe fest:

| Symbol | Berechtigung        | Bedeutung                                                                                                                   |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ![Leseberechtigung](../assets/components/editor/permission_read.png)    | **Leserecht**       | Der Ordner/Datensatz und alle Unterelemente können angesehen, aber nicht verändert werden.                                  |
| ![Unterbaumberechtigung](../assets/components/editor/permission_subtree.png) | **Nur Unterordner** | Nur für Ordner: Inhalte des Ordners dürfen bearbeitet werden, der Ordner selbst (Name, Lage, Löschen) jedoch nicht.         |
| ![Schreibberechtigung](../assets/components/editor/permission_write.png)   | **Schreibrecht**    | Der Ordner/Datensatz und alle Unterelemente dürfen bearbeitet, verschoben, gelöscht und neue Einträge angelegt werden.      |

Über das Menü (drei Punkte) in der Spalte **Aktion** kann ein Eintrag **geöffnet** oder **entfernt** werden.

> **Hinweis:** Schreibrechte können nur vergeben werden, wenn der angemeldete Benutzer selbst Schreibrechte auf das
> Element besitzt. Ein Benutzer erhält die Berechtigung zum **Anlegen neuer Datensätze bzw. Adressen**, sobald eine
> seiner Gruppen ihm Schreibrechte auf mindestens einen Ordner gewährt.

### 7.4 Weitere Funktionen

- **Benutzer anzeigen** (Menü oben rechts in der Gruppe): wechselt zur Benutzerliste, gefiltert auf die Mitglieder.
- **Zugeordnete Benutzer**: Liste aller Mitglieder am Ende der Gruppendetails; ein Klick öffnet den Benutzer.
- **Löschen**: entfernt die Gruppe. Mitglieder verlieren damit die über diese Gruppe vergebenen Rechte.
- Ist der angemeldete Benutzer selbst Mitglied einer Gruppe, kann er diese **nicht bearbeiten oder löschen**
  (Hinweis: *„Für Mitglieder der Gruppe ist die Bearbeitung deaktiviert.“*). So wird verhindert, dass man sich selbst
  Rechte erweitert oder entzieht.

### 7.5 Empfehlungen für ein Gruppenkonzept

- Legen Sie Gruppen nach **Zuständigkeiten** an, nicht nach Personen (z. B. „Wasser – Schreiben“, „Wasser – Lesen“).
- Vergeben Sie gemeinsam genutzte Adressen (z. B. die eigene Organisation) per **Leserecht** an alle Erfassergruppen,
  damit sie in Datensätzen referenziert werden können.
- Verwenden Sie das **Allgemeine Schreibrecht** sparsam – es gewährt Zugriff auf den gesamten Katalog.
- Eine eigene Gruppe für **Metadaten-Administratoren** einer Abteilung mit Schreibrecht auf den Abteilungsordner
  ermöglicht eine dezentrale Benutzerverwaltung.

---

## 8. Benutzer erstellen

Benutzer werden von **Katalog-Administratoren**, **Metadaten-Administratoren** oder dem **Super-Administrator** angelegt.
Der neue Benutzer wird automatisch dem aktuell aktiven Katalog zugeordnet und – falls noch nicht vorhanden – in
Keycloak angelegt.

### 8.1 Neuen Benutzer anlegen

1. Öffnen Sie **Benutzer & Rechte** und wählen Sie den Reiter **Benutzer**.
2. Klicken Sie auf **Hinzufügen**. Der Dialog **„Benutzer hinzufügen“** öffnet sich.
3. Füllen Sie die Felder aus:

   | Feld                   | Beschreibung                                                                                                                                                                            |
   | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Login**              | Benutzername für die Anmeldung, nur Kleinbuchstaben und ohne Leerzeichen. Es kann ein bereits in Keycloak vorhandener Benutzer ausgewählt (z. B. aus einer LDAP-Anbindung) oder ein neues Login eingegeben werden. |
   | **Rolle**              | Katalog-Administrator, Metadaten-Administrator oder Autor (siehe [Kapitel 6](#6-rollen-im-ingrid-editor)). Katalog-Administratoren können nur von Katalog- bzw. Super-Administratoren angelegt werden. |
   | **Name**               | Vorname und Nachname.                                                                                                                                                                   |
   | **E-Mail**             | An diese Adresse wird beim Anlegen automatisch eine E-Mail mit dem Passwort bzw. einem Link zur Passwortvergabe versendet.                                                              |

Je nach Rolle:

  * **Katalog-Administrator:** Klicken Sie direkt auf **Anlegen**.
  * **Metadaten-Administrator oder Autor:** Klicken Sie auf **Weiter**. Auf der zweiten Seite wählen Sie unter
     **Gruppen** mindestens eine Gruppe aus (*„Fügen Sie den Benutzer mindestens einer Gruppe hinzu, so dass dieser
     Rechte auf die Datensätze erhält.“*). Klicken Sie anschließend auf **Anlegen**. Mit **Zurück** gelangen Sie zur
     ersten Seite.

Der neue Benutzer erscheint in der Benutzerliste und kann sich nach Erhalt der E-Mail anmelden.

### 8.2 Weitere Angaben ergänzen

Nach dem Anlegen können in den Benutzerdetails (rechts neben der Liste) zusätzlich **Organisation**, **Abteilung** und
**Telefonnummer** gepflegt sowie weitere **Gruppen** hinzugefügt werden. Speichern Sie Änderungen mit **Speichern**.

Über den Pfeil im Kopfbereich lassen sich weitere Informationen einblenden: letzter Login, Erstellungs- und
Änderungsdatum.

---

## 9. Benutzer verwalten

Wählen Sie einen Benutzer in der Liste aus. Über das Menü (drei Punkte) im Kopf der Benutzerdetails stehen folgende
Aktionen zur Verfügung:

| Aktion                          | Beschreibung                                                                                                                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Passwort zurücksetzen**       | Der Benutzer erhält per E-Mail ein neues Passwort.                                                                                                                                                         |
| **Verantwortung übertragen**    | Überträgt die Verantwortung für alle Datensätze des Benutzers auf einen anderen Benutzer (sofern das Verhalten „Verantwortlichkeit“ aktiv ist).                                                           |
| **Löschen**                     | Entfernt den Benutzer. Ist er noch für Datensätze verantwortlich, muss die Verantwortung vorher auf einen anderen Benutzer mit denselben Gruppen übertragen werden.                                      |

Weitere Hinweise:

- **Rolle ändern:** Beim Wechsel der Rolle erscheint der Hinweis, dass die Änderung **katalogübergreifend** wirkt.
- **Gruppen:** Ein Klick auf eine zugewiesene Gruppe öffnet direkt deren Berechtigungen.
- **Externe Benutzer (LDAP/Benutzerföderierung):** Name, E-Mail und Kontaktdaten werden extern verwaltet und können im
  InGrid Editor nicht geändert werden. Rolle und Gruppen lassen sich dennoch zuweisen.
- Die **Suche** oberhalb der Liste filtert nach Login, Name und weiteren Angaben.

---

## 10. Das persönliche Profil

Jeder Benutzer kann seine eigenen Daten über das Benutzermenü oben rechts unter **Profil verwalten** einsehen und
anpassen.

Angezeigt werden Login, Rolle und die Gruppen, denen der Benutzer angehört. Bearbeitet werden können:

| Bereich               | Funktion                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Persönliche Daten** | Vor- und Nachname über **Ändern**.                                                                                             |
| **Kontakt**           | E-Mail-Adresse über **Ändern**.                                                                                                |
| **Sicherheit**        | Passwort über **Ändern**. Sie werden zur Login-Seite weitergeleitet und dort aufgefordert, ein neues Passwort zu vergeben.      |

Bei Benutzern aus einer externen Benutzerverwaltung (LDAP) sind diese Felder nicht änderbar.

> **Tipp für Administratoren:** Ändern Sie nach dem ersten Login das initiale Passwort des Super-Administrators
> über **Profil verwalten → Sicherheit**.

---

## 11. Erste Datensätze erfassen

Sobald Katalog, Gruppen und Benutzer eingerichtet sind, können Datensätze erfasst werden. Empfohlene Reihenfolge:

1. **Adressen anlegen** (Bereich **Adressen**): Zuerst die eigene Organisation, darunter ggf. Personen. Adressen werden
   in Datensätzen als Ansprechpartner, Herausgeber usw. benötigt.
2. **Datensatz anlegen** (Bereich **Daten**): Ordner auswählen, auf **Neu** klicken, den Datensatztyp wählen
   (abhängig vom Profil, z. B. Geodatensatz oder Geodatendienst) und einen Titel vergeben.
3. **Formular ausfüllen und speichern**: Pflichtfelder sind markiert. Beim Speichern wird der Datensatz als
   **Entwurf** abgelegt und ist noch nicht öffentlich.
4. **Veröffentlichen**: Beim Veröffentlichen werden alle Pflichtfelder und Prüfregeln des Profils kontrolliert.
   Erst veröffentlichte Datensätze werden indiziert und im Portal bzw. über die Schnittstellen sichtbar.

Bestehende Metadaten können alternativ über **Import / Export** übernommen werden (z. B. ISO-19139-XML-Dateien im
InGrid-Profil).

Über die **Übersicht** (Dashboard) sehen alle Benutzer zuletzt bearbeitete Datensätze und Statistiken, über
**Recherche** können Datensätze gesucht und gespeicherte Abfragen genutzt werden.

---


## 12. Eigene Profile erstellen

Die Erstellung eines eigenen Profils bedarf einer Anpassung des Quellcodes des InGrid-Editors. Genauere Informationen über das Vorgehen für die Erstellung eines eigenen Profils kann in der Dokumentation im Git-Repository nachgelesen werden: [Link](https://github.com/informationgrid/ingrid-editor/blob/main/docs/index.adoc#profile-creation)

## 13. Häufige Fragen und Probleme

**Nach dem Login erscheint die Meldung „Dem Benutzer … ist kein Katalog zugewiesen“.**
Der Benutzer gehört keinem Katalog an. Ein Super-Administrator muss ihn unter **Verwaltung → Katalogzuweisung** einem
Katalog zuweisen bzw. den Benutzer im gewünschten Katalog anlegen.

**Ein Autor sieht keine Datensätze.**
Prüfen Sie, ob der Benutzer mindestens einer Gruppe angehört und ob diese Gruppe Rechte auf die betreffenden Ordner bzw.
Datensätze hat.

**Ein Autor kann keine neuen Datensätze anlegen.**
Das Anlegen ist nur möglich, wenn eine Gruppe Schreibrechte auf mindestens einen Ordner gewährt. Neue Datensätze
können nur in Ordnern angelegt werden, auf die Schreibrechte bestehen. Beachten Sie auch profilspezifische
Einschränkungen (z. B. LUBW).

**Ich kann eine Gruppe nicht bearbeiten.**
Sie sind selbst Mitglied dieser Gruppe. Die Bearbeitung muss durch einen anderen Administrator erfolgen.

**Der Menüpunkt „Katalog“ oder „Verwaltung“ fehlt.**
Diese Bereiche sind nur für Katalog- bzw. Super-Administratoren sichtbar. „Katalogverwaltung“ und „Katalogzuweisung“
stehen ausschließlich dem Super-Administrator zur Verfügung.

**Der neue Benutzer hat keine E-Mail erhalten.**
Prüfen Sie die E-Mail-Adresse sowie die SMTP-Konfiguration im Keycloak-Realm. Über **Passwort zurücksetzen** kann die
E-Mail erneut ausgelöst werden.

**Kann das Profil eines Katalogs nachträglich geändert werden?**
Nein. Legen Sie einen neuen Katalog mit dem gewünschten Profil an und übernehmen Sie die Daten per Import/Export, sofern
die Formate kompatibel sind.
