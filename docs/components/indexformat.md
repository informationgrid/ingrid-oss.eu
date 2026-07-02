---
title: Indexformat/JSON-Schema
description: "InGrid: Indexieren, Recherchieren, Visualisieren, Teilen"
---

# Indexformat/JSON-Schema

Das **InGrid Indexformat** ist das zentrale, versionierte JSON-Schema, das die Struktur der Dokumente im InGrid-Suchindex definiert. Es wird von zahlreichen Komponenten wie dem Editor, dem Harvester und dem Portal (über den iBus) gemeinsam verwendet, um eine einheitliche Dokumentenstruktur sicherzustellen. Die JSON-Schemas können genutzt werden, um Dokumente vor dem Indexieren zu validieren, und stellen so die Kompatibilität zwischen den einzelnen Komponenten sicher.

![](../assets/drawio/ingrid-indexformat.drawio)

Eine Übersicht aller für InGrid relevanten Schemas findet sich unter [schema.ingrid-oss.eu](https://schema.ingrid-oss.eu/). Aktuell wird dort die Kategorie ***InGrid Index*** gepflegt, die versioniert ist und mehrere Profile (u. a. DCAT-AP.de, InGrid, InGrid-BAW, LVR, OpenData, Umweltnavi) mit jeweiliger JSON-Schema-Datei und Dokumentation enthält.

## Ressourcen

- **InGrid Index:** [schema.ingrid-oss.eu/index](https://schema.ingrid-oss.eu/index)
- **Quellcode:** [github.com/informationgrid/ingrid-index](https://github.com/informationgrid/ingrid-index)
