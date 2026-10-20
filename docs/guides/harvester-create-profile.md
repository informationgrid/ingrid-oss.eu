---
title: Harvester Profil erstellen
description: Der InGrid Harvester erfasst Daten aus verschiedenen Quellen, speichert sie in Postgres und stellt sie strukturiert für diverse Kataloge (Elasticsearch, pyCSW) bereit.
---
# Harvester Profil erstellen

Dieser Leitfaden zeigt, wie ein neues Profil für den [InGrid Harvester](https://github.com/informationgrid/ingrid-harvester) angelegt wird. Als Beispiel dient ein Profil `uba`, das DCAT-AP-Kataloge harvestet und in einen eigenen Elasticsearch-Index schreibt.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie wollen den **Harvester installieren**?

    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Harvester Dokumentation]({{ fix_url('components/harvester.md') }}){ .md-button }

</div>

## Überblick

Mit derselben Codebasis des Harvesters werden ganz unterschiedliche Anwendungen betrieben, zum Beispiel InGrid (`ingrid`), DiPlanung (`diplanung`) oder Angebote des Landschaftsverbands Rheinland (`lvr`). Diese Anwendungen harvesten zum Teil dieselben Formate. Sie unterscheiden sich aber darin, welche Daten sie benötigen, wie ihr Suchindex aufgebaut ist und wohin die Daten geschrieben werden. Ein **Profil** fasst alles zusammen, was für eine solche Anwendung spezifisch ist. Der Kern des Harvesters bleibt für alle Anwendungen gleich.

Ein Profil legt fest:

- **Datenquellen-Typen:** welche Typen (z. B. `CSW`, `DCATAP`, `WFS`) in der Oberfläche zur Auswahl stehen und welcher Importer sie verarbeitet.
- **Indexdokument:** welche Felder ein Datensatz im Zielsystem hat und wie die Werte der Quelle darauf abgebildet werden.
- **Zielkataloge:** in welche Systeme geschrieben wird (Elasticsearch, CSW, Piveau) und wie das geschieht.
- **Deduplizierung:** welche Datensätze als Duplikate gelten, welcher davon Vorrang hat und wie sie zusammengeführt werden.
- **Elasticsearch-Index:** Mapping und Settings, also Feldtypen und Analyzer für die Suche.
- **Oberfläche:** profilspezifische Hilfetexte (siehe [Schritt 7](#schritt-7-kontexthilfe-optional)) und Formularfelder.

Das Profil wird beim Start über die Umgebungsvariable `IMPORTER_PROFILE` gewählt und gilt für die gesamte Laufzeit. Eine Instanz des Harvesters arbeitet also immer mit genau einem Profil.

Der Kern stellt Importer und Format-Mapper bereit, die das Quellformat lesen. Im Beispiel sind das `DcatapImporter` und `DcatapMapper`. Sie sind profilunabhängig und werden nur wiederverwendet. Das Profil ergänzt einen eigenen Mapper, der aus den gelesenen Werten das Indexdokument erzeugt (`UbaDcatapMapper`), und einen eigenen Katalog, der Duplikate zusammenführt und in Elasticsearch schreibt (`UbaElasticsearchCatalog`). Verbesserungen am Kern, etwa an einem Importer, kommen dadurch allen Profilen zugute.

!!! tip "Brauche ich ein neues Profil?"

    Soll nur eine weitere Quelle angebunden werden, genügt eine neue Datenquelle im bestehenden Profil. Ein neues Profil lohnt sich erst, wenn die Anwendung ein eigenes Indexformat, eigene Regeln für die Deduplizierung oder andere Zielkataloge benötigt.

Das fertige Profil besteht aus diesen Dateien unter `server/app/profiles/uba/`:

| Datei | Inhalt |
| ----- | ------ |
| `profile.factory.ts` | `UbaFactory`, der Einstiegspunkt des Profils |
| `uba.utils.ts` | `createEsId()` |
| `model/index.document.ts` | `UbaIndexDocument` |
| `mapper/uba.dcatap.mapper.ts` | `UbaDcatapMapper` |
| `catalog/elasticsearch.catalog.ts` | `UbaElasticsearchCatalog` |
| `persistence/default-mapping.json` | Elasticsearch-Mapping |
| `persistence/default-settings.json` | Elasticsearch-Settings |
| `persistence/elastic.queries.ts` | Abfragen für Historie und Prüfungen in der Oberfläche |

Als Vorlage eignet sich das Profil [`lvr`](https://github.com/informationgrid/ingrid-harvester/tree/main/server/app/profiles/lvr). Für den DCAT-AP-Teil dient [`ingrid`](https://github.com/informationgrid/ingrid-harvester/tree/main/server/app/profiles/ingrid) als Vorlage.

## Schritt 1: Profil-Factory

```typescript title="server/app/profiles/uba/profile.factory.ts"
import type { CatalogSettings, ElasticsearchCatalogSettings } from '@shared/catalog.js';
import log4js from 'log4js';
import type { Catalog, CatalogColumnType, CatalogOperation } from '../../catalog/catalog.factory.js';
import type { DcatapMapper } from '../../importer/dcatap/dcatap.mapper.js';
import type { DcatapSettings } from '../../importer/dcatap/dcatap.settings.js';
import type { Importer } from '../../importer/importer.js';
import type { ImporterType } from '../../importer/importer.settings.js';
import type { DocumentFactory } from '../../model/index.document.factory.js';
import type { Summary } from '../../model/summary.js';
import type { ElasticQueries as AbstractElasticQueries } from '../../persistence/elastic.queries.js';
import { CatalogService } from '../../services/catalog/CatalogService.js';
import * as MiscUtils from '../../utils/misc.utils.js';
import { ProfileFactory } from '../profile.factory.js';
import { UbaDcatapMapper } from './mapper/uba.dcatap.mapper.js';
import type { UbaIndexDocument } from './model/index.document.js';
import { ElasticQueries } from './persistence/elastic.queries.js';

const log = log4js.getLogger(import.meta.filename);

export class UbaFactory extends ProfileFactory<DcatapSettings> {

    dateReplacer = MiscUtils.dateReplacer;

    protected getSupportedTypeNames(): ImporterType[] {
        return ['DCATAP'];
    }

    getElasticQueries(): AbstractElasticQueries {
        return ElasticQueries.getInstance();
    }

    getDocumentFactory(mapper: DcatapMapper): DocumentFactory<UbaIndexDocument> {
        switch (mapper.constructor.name) {
            case 'DcatapMapper': return new UbaDcatapMapper(mapper);
            default: throw new Error(`No mapper "${mapper.constructor.name}" registered`);
        }
    }

    async getImporter(settings: DcatapSettings): Promise<Importer<DcatapSettings>> {
        let importer: Importer<DcatapSettings>;
        switch (settings.type) {
            case 'DCATAP':
                const { DcatapImporter } = await import('../../importer/dcatap/dcatap.importer.js');
                importer = new DcatapImporter(settings);
                break;
            default:
                log.error('Importer not found: ' + settings.type);
        }
        if (importer) {
            await importer.database.init();
        }
        return importer;
    }

    async getCatalog(catalogId: number, summary: Summary): Promise<Catalog<CatalogColumnType, CatalogSettings, CatalogOperation>> {
        const catalogSettings = CatalogService.getCatalogSettings(catalogId);
        if (catalogSettings?.type != 'elasticsearch') {
            log.error(`Catalog type not found: ${catalogSettings?.type}`);
            return null;
        }
        const { UbaElasticsearchCatalog } = await import('./catalog/elasticsearch.catalog.js');
        return new UbaElasticsearchCatalog(catalogSettings as ElasticsearchCatalogSettings, summary);
    }

    getProfileName(): string {
        return 'uba';
    }
}
```

| Methode | Zweck |
| ------- | ----- |
| `getProfileName()` | Name des Profils. Er muss dem Verzeichnisnamen entsprechen, weil Mappings, Settings und SQL-Abfragen unter `profiles/<name>/persistence/` gesucht werden |
| `getSupportedTypeNames()` | Datenquellen-Typen, die die Oberfläche anbietet |
| `getImporter()` | Importer zum Datenquellen-Typ. Für einen weiteren Typ wird dieser in `getSupportedTypeNames()` ergänzt und je ein weiterer `case` hier und in `getDocumentFactory()` hinzugefügt. Der Settings-Typ der Factory wird dann zur Union, z. B. `DcatapSettings \| CswSettings` (vgl. `ingridSettings` im Profil `ingrid`) |
| `getDocumentFactory()` | Profil-Mapper zum Mapper des Importers |
| `getCatalog()` | Katalog-Implementierung zum Katalogtyp |
| `getElasticQueries()` | Abfragen für Historie, URL- und Index-Prüfung |

## Schritt 2: Profil registrieren

In [`server/app/profiles/profile.factory.loader.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/app/profiles/profile.factory.loader.ts):

```typescript
import { UbaFactory } from './uba/profile.factory.js';

// in createInstance():
case 'uba':
    this.instance = new UbaFactory() as unknown as ProfileFactory<any>;
    break;
```

Startskript in `server/package.json`:

```json
"start-uba": "cross-env IMPORTER_PROFILE=uba ELASTIC_PREFIX=uba- ELASTIC_INDEX=harvester nodemon"
```

## Schritt 3: Indexdokument

Das Indexdokument muss `IndexDocument` erweitern, also `uuid` und `extras.metadata` enthalten.

```typescript title="server/app/profiles/uba/model/index.document.ts"
import type { License } from '@shared/license.model.js';
import type { Geometry, Point } from 'geojson';
import type { DateRange } from '../../../model/dateRange.js';
import type { Distribution } from '../../../model/distribution.js';
import type { IndexDocument } from '../../../model/index.document.js';

export type UbaIndexDocument = IndexDocument & {
    title: string,
    description?: string,
    keywords: string[],
    themes: string[],
    publisher: string[],
    distributions: Distribution[],
    license?: License,
    spatial?: { geometry: Geometry, centroid: Point, title?: string },
    temporal?: DateRange[],
    modified?: Date
};
```

## Schritt 4: Mapper

Der Profil-Mapper implementiert `DocumentFactory`. Er erbt nicht vom `DcatapMapper`, sondern kapselt ihn und liest die Werte über dessen Getter. Das RDF-Parsing übernimmt der `DcatapMapper`.

```typescript title="server/app/profiles/uba/mapper/uba.dcatap.mapper.ts"
import type { DcatapMapper } from '../../../importer/dcatap/dcatap.mapper.js';
import type { DocumentFactory } from '../../../model/index.document.factory.js';
import * as GeoJsonUtils from '../../../utils/geojson.utils.js';
import type { UbaIndexDocument } from '../model/index.document.js';
import { createEsId } from '../uba.utils.js';

export class UbaDcatapMapper implements DocumentFactory<UbaIndexDocument> {

    constructor(private baseMapper: DcatapMapper) {}

    async createIndexDocument(): Promise<UbaIndexDocument> {
        const m = this.baseMapper;
        const geometry = m.getSpatial();
        const document: UbaIndexDocument = {
            uuid: m.getGeneratedId(),
            title: m.getTitle(),
            description: m.getDescription(),
            keywords: m.getKeywords(),
            themes: m.getThemes(),
            publisher: m.getPublisher().map(p => p.name),
            distributions: await m.getDistributions(),
            license: await m.getLicense(),
            spatial: geometry ? { geometry, centroid: GeoJsonUtils.getCentroid(geometry), title: m.getSpatialText() } : undefined,
            temporal: m.getTemporal(),
            modified: m.getModifiedDate(),
            extras: {
                metadata: {
                    harvested: m.getHarvestingDate(),
                    issued: m.getIssued(),
                    modified: m.getModifiedDate(),
                    source: m.getMetadataSource(),
                    merged_from: []
                }
            }
        };
        document.extras.metadata.merged_from.push(createEsId(document));
        m.executeCustomCode(document);
        return document;
    }

    // UBA schreibt nur nach Elasticsearch
    createCswIsoDocument(): string {
        return null;
    }

    createDcatapdeDocument(): string {
        return null;
    }
}
```

```typescript title="server/app/profiles/uba/uba.utils.ts"
import type { UbaIndexDocument } from './model/index.document.js';

export function createEsId(document: UbaIndexDocument): string {
    return document.uuid;
}
```

!!! info "Eingangsformate"

    Der `DcatapImporter` liest RDF/XML, Turtle und JSON-LD. Das Format wird anhand der Dateiendung in der URL bzw. des Inhalts erkannt (`server/app/importer/dcatap/dcatap.rdf.ts`). Weitere verfügbare Getter wie `getContactPoints()`, `getLicenses()`, `getHvdCategories()` oder `getConformsTo()` finden Sie in [`dcatap.mapper.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/app/importer/dcatap/dcatap.mapper.ts).

## Schritt 5: Elasticsearch-Katalog

`ElasticsearchCatalog` legt den Index und den Alias aus den Katalog-Settings an und schreibt die Operationen. Das Profil implementiert nur `processBucket()`. Ein Bucket enthält alle Datensätze mit gleichem Identifier. Daraus entsteht entweder ein Index-Eintrag oder eine Löschung.

```typescript title="server/app/profiles/uba/catalog/elasticsearch.catalog.ts"
import { ElasticsearchCatalog } from '../../../catalog/elasticsearch/elasticsearch.catalog.js';
import type { ImporterSettings } from '../../../importer/importer.settings.js';
import type { Bucket } from '../../../model/bucket.js';
import type { EsOperation } from '../../../persistence/elastic.utils.js';
import type { UbaIndexDocument } from '../model/index.document.js';
import { createEsId } from '../uba.utils.js';

export class UbaElasticsearchCatalog extends ElasticsearchCatalog {

    async processBucket(bucket: Bucket<UbaIndexDocument>, importerSettings: ImporterSettings): Promise<EsOperation[]> {
        const documents = [...bucket.documents.values()];
        const active = documents.filter(d => d.extras.metadata.deleted == null);

        // alle Datensätze gelöscht -> Dokument entfernen
        if (active.length == 0) {
            return [{ operation: 'delete', _id: createEsId(documents[0]) }];
        }

        // zuletzt geänderter Datensatz gewinnt, die übrigen werden als Duplikate vermerkt
        active.sort((a, b) => (b.modified?.getTime() ?? 0) - (a.modified?.getTime() ?? 0));
        const [main, ...duplicates] = active;
        const operations: EsOperation[] = [];
        for (const duplicate of duplicates) {
            const id = createEsId(duplicate);
            main.extras.metadata.merged_from.push(id);
            if (id != createEsId(main)) {
                operations.push({ operation: 'delete', _id: id });
            }
        }
        operations.push({ operation: 'index', _id: createEsId(main), document: main });
        return operations;
    }
}
```

Welche Datensätze einen Bucket bilden, legt `getBuckets.sql` fest. Eine Datei unter `uba/persistence/queries/` ersetzt die gleichnamige Standardabfrage aus `server/app/persistence/queries/`. Ein Beispiel ist [`lvr/persistence/queries/getBuckets.sql`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/app/profiles/lvr/persistence/queries/getBuckets.sql).

## Schritt 6: Mapping, Settings und Abfragen

- `persistence/default-mapping.json`: Felder des `UbaIndexDocument`.
- `persistence/default-settings.json`: die Analyzer, die im Mapping verwendet werden. Mapping und Settings müssen zusammenpassen, sonst schlägt das Anlegen des Index fehl. Übernehmen Sie daher beide Dateien aus demselben Profil, z. B. `ingrid/persistence/opendata-mapping.json` zusammen mit `ingrid/persistence/default-settings.json`, und passen Sie das Mapping an.
- `persistence/elastic.queries.ts`: kann unverändert aus `lvr/persistence/elastic.queries.ts` übernommen werden.

```json title="server/app/profiles/uba/persistence/default-mapping.json (Auszug)"
{
    "properties": {
        "uuid": { "type": "keyword" },
        "title": { "type": "text", "analyzer": "german" },
        "description": { "type": "text", "analyzer": "german" },
        "keywords": { "type": "keyword" },
        "themes": { "type": "keyword" },
        "publisher": { "type": "keyword" },
        "distributions": {
            "properties": {
                "format": { "type": "keyword" },
                "accessURL": { "type": "keyword" },
                "downloadURL": { "type": "keyword" }
            }
        },
        "spatial": {
            "properties": {
                "geometry": { "type": "geo_shape" },
                "centroid": { "type": "geo_point" }
            }
        },
        "modified": { "type": "date" }
    }
}
```

## Schritt 7: Kontexthilfe (optional)

Die Hilfetexte der Oberfläche sind Markdown-Dateien unter [`server/app/contextHelp/`](https://github.com/informationgrid/ingrid-harvester/tree/main/server/app/contextHelp). Sie sind nach Sprache und Profil abgelegt: `contextHelp/<sprache>/<profil>/<id>.md`. Der Dateiname ohne Endung ist die ID, unter der die Oberfläche den Text anfordert (`rest/api/help/<sprache>/<id>`). Der `title` im Frontmatter wird als Überschrift der Hilfe angezeigt.

```markdown title="server/app/contextHelp/de/ingrid/harvester_csw_settings.md (Auszug)"
---
title: CSW Einstellungen
---
# CSW Einstellungen

Konfigurationsbereich für grundlegende Parameter zur Anbindung einer CSW-Quelle.
```

Der Server sucht eine Datei in zwei Schritten:

1. `contextHelp/<sprache>/<aktives Profil>/<id>.md`
2. falls dort nicht vorhanden: `contextHelp/<sprache>/ingrid/<id>.md`

Der Ordner `ingrid` enthält den vollständigen Satz an Hilfetexten und dient als Standard für alle Profile. Ein neues Profil muss daher **keine** Hilfetexte mitbringen. Ohne eigenen Ordner zeigt es die Texte aus `ingrid` an. Weicht ein Text ab, legen Sie im Ordner des Profils eine Datei mit **demselben Namen** an. Sie ersetzt dann den Standardtext aus `ingrid`. Alle übrigen Texte werden weiterhin aus `ingrid` geladen.

So macht es das Profil `diplanung`: Es überschreibt nur `harvester_csw_settings.md` und verwendet für alle anderen Hilfetexte die Dateien aus `ingrid`.

Für `uba` würde etwa eine eigene Beschreibung der Datenquellen-Einstellungen so angelegt:

```shell
mkdir -p server/app/contextHelp/de/uba
cp server/app/contextHelp/de/ingrid/harvester_settings_general.md server/app/contextHelp/de/uba/
# danach die Kopie anpassen
```

!!! info "Hinweis"

    Existiert eine Datei weder im Profil noch in `ingrid`, antwortet der Server mit einem Fehler. Neue Hilfe-IDs, die alle Profile verwenden sollen, gehören deshalb nach `ingrid`. Die Markdown-Dateien werden beim Build automatisch mitkopiert (`postbuild` in `server/package.json`).

## Schritt 8: Konfigurieren und starten

Katalog und Datenquelle werden in der Oberfläche angelegt. Siehe Beispiele: 

* [Datenquelle Verbinden (CSW-Beispiel)]({{ fix_url('guides/harvester-catalog.md') }})
* [Katalog verbinden]({{ fix_url('guides/harvester-catalog.md') }})
* [Konfigurationsdateien]({{ fix_url('guides/harvester-config-files.md') }})

```json title="Reduziertes Beispiel config-catalogs.json für Zielkataloge"
[
    { 
        "id": 1, 
        "type": "elasticsearch", 
        "name": "UBA", 
        "url": "http://elasticsearch:9200",
        "settings": { 
            "index": "uba-index", 
            "alias": "uba" 
        } 
    }
]
```

```json title="Reduziertes Beispiel config.json für Datenquellen"
[
    { 
        "id": 1, 
        "type": "DCATAP", 
        "description": "UBA OpenData",
        "sourceURL": "https://example.org/dcat/catalog.ttl", 
        "catalogIds": [1], 
        ...
    }
]
```

```shell
cd server
npm run start-uba
```

Im Log erscheint `Loaded profile: uba`. Fehlt die Registrierung, bricht der Start mit `Could not find profile: uba` ab.

## Tests

Tests liegen in `server/test/`. Vorlagen für DCAT-AP aus dem InGrid-Profil: 

* [`test/importer/dcatap/ingrid.dcatap.mapper.spec.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/test/importer/dcatap/ingrid.dcatap.mapper.spec.ts) 
    * Test für den Mapper 
* [`test/integration/dcatap.integration.spec.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/test/integration/dcatap.integration.spec.ts) 
    * Integration-Test für einen kompletten Harvesting-Lauf (PostgreSQL als Testcontainer, Elasticsearch gemockt)

??? success "Mapper-Test"

    ```typescript title="server/test/importer/dcatap/uba.dcatap.mapper.spec.ts"
    import { expect } from 'chai';
    import { DataFactory } from 'n3';
    import { DcatapMapper } from '../../../app/importer/dcatap/dcatap.mapper.js';
    import { parseRdfPayload } from '../../../app/importer/dcatap/dcatap.rdf.js';
    import type { DcatapSettings } from '../../../app/importer/dcatap/dcatap.settings.js';
    import { namespaces } from '../../../app/importer/namespaces.js';
    import { Summary } from '../../../app/model/summary.js';
    import { UbaDcatapMapper } from '../../../app/profiles/uba/mapper/uba.dcatap.mapper.js';

    const SOURCE_URL = 'https://example.org/catalog.ttl';
    const settings = { type: 'DCATAP', sourceURL: SOURCE_URL } as DcatapSettings;

    const DATASET = `
    @prefix dcat: <http://www.w3.org/ns/dcat#> .
    @prefix dct: <http://purl.org/dc/terms/> .
    <https://example.org/dataset/1> a dcat:Dataset ;
        dct:identifier "dataset-1" ;
        dct:title "Luftqualität" ;
        dcat:keyword "Luft" .
    `;

    async function createMapper(payload: string): Promise<UbaDcatapMapper> {
        const store = await parseRdfPayload(payload, SOURCE_URL);
        const [subject] = store.getSubjects(
            DataFactory.namedNode(namespaces.RDF + 'type'),
            DataFactory.namedNode(namespaces.DCAT + 'Dataset'),
            null
        );
        const mapper = new DcatapMapper(settings, subject, store, payload, new Date(), new Summary('test', settings as any));
        return new UbaDcatapMapper(mapper);
    }

    describe('UbaDcatapMapper', () => {
        it('maps title and keywords', async () => {
            const doc = await (await createMapper(DATASET)).createIndexDocument();
            expect(doc.title).to.equal('Luftqualität');
            expect(doc.keywords).to.include('Luft');
        });
    });
    ```

??? success "Integrationstest"

    Fixtures unter `test/data/uba/<quelle>/`: `config.json` (Datenquelle), `input/` (Antwort des Endpunkts) und `elasticsearch/` (erwartete Dokumente).

    ```typescript title="server/test/integration/uba.integration.spec.ts"
    import type { DcatapSettings } from '../../app/importer/dcatap/dcatap.settings.js';
    import settings from '../data/uba/example/config.json' with { type: 'json' };
    import { runImporterIntegrationTest, setupIntegrationTestLifecycle } from '../utils/integration-test-runner.js';

    describe('UBA Integration Tests', function () {
        this.timeout(60000);
        const profile = 'uba';
        setupIntegrationTestLifecycle(profile);

        it('harvests a DCAT-AP catalog', async () => {
            await runImporterIntegrationTest({
                profile,
                expectedDocsDir: 'elasticsearch',
                mocks: [{ match: { url: settings.sourceURL }, fixture: 'input/catalog.ttl' }],
                settings: settings as DcatapSettings,
                baseFixture: 'test/data/uba/example'
            });
        });
    });
    ```

```shell
cd server
npx mocha "test/**/uba*.spec.ts"
```

!!! tip "Tipp"

    Geben Sie den Glob wie oben in Anführungszeichen an. `npm test` übergibt ihn ungequotet an die Shell, die `**` dann nur eine Verzeichnisebene tief auflöst.

## Docker

Alle Profile sind im selben Image enthalten. Das Profil wird zur Laufzeit über `IMPORTER_PROFILE` gewählt, voreingestellt ist `ingrid`.

```shell
docker build --build-arg VERSION=8.5.0 --build-arg GIT_COMMIT=$(git rev-parse --short HEAD) -t ingrid-harvester:8.5.0 .
```

```yaml title="docker-compose.yml"
harvester:
  image: ingrid-harvester:8.5.0
  environment:
    - IMPORTER_PROFILE=uba
    - ELASTIC_PREFIX=uba-
```

## Checkliste

- [ ] `server/app/profiles/uba/` mit Factory, Indexdokument, Mapper, Katalog und `persistence/` angelegt
- [ ] Profil in `profile.factory.loader.ts` registriert
- [ ] Mapping und Settings aus demselben Profil übernommen und angepasst
- [ ] Abweichende Hilfetexte unter `contextHelp/de/uba/` angelegt (nur bei Bedarf)
- [ ] Mapper- und Integrationstest grün
- [ ] Start mit `IMPORTER_PROFILE=uba` zeigt `Loaded profile: uba`
