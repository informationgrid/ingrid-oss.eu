---
title: Harvester Profil erstellen
description: Anleitung zum Anlegen eines eigenen Harvester-Profils am Beispiel uba.
---
# Harvester Profil erstellen

Dieser Leitfaden zeigt, wie ein neues Profil für den [InGrid Harvester](https://github.com/informationgrid/ingrid-harvester) angelegt wird. Als Beispiel dient ein Profil `uba`, das CKAN-Kataloge (z. B. [GovData](https://ckan.govdata.de)) harvestet und in einen eigenen Elasticsearch-Index schreibt.

<div class="grid cards" markdown>

-   :material-book-open-variant-outline: __Installation & Konfiguration__

    ---

    ![](../assets/pictogram/component_exchange.svg "Installation"){ class="grid-pictogram" }

    Sie wollen den **Harvester installieren**?

    Informationen zur Komponente können Sie der Dokumentation entnehmen.

    [Harvester Dokumentation]({{ fix_url('components/harvester.md') }}){ .md-button }

</div>

## Überblick

Der Harvester wird für verschiedene Einsatzzwecke verwendet, zum Beispiel für InGrid (`ingrid`), DiPlanung (`diplanung`) oder Angebote des Landschaftsverbands Rheinland (`lvr`). Bei diesen Anwendungen werden zum Teil dieselben Formate geharvestet; es gibt aber Unterschiede darin, welche Daten benötigt werden, wie der Suchindex aufgebaut ist und wohin die Daten geschrieben werden. Ein **Profil** fasst alles zusammen, was für eine solche Anwendung spezifisch ist. Der Kern des Harvesters bleibt für alle Anwendungen gleich.

Ein Profil legt fest:

- **Datenquellen-Typen:** welche Typen (z. B. `CSW`, `CKAN`, `WFS`) in der Oberfläche zur Auswahl stehen und welcher Importer sie verarbeitet.
- **Indexdokument:** welche Felder ein Datensatz im Zielsystem hat und wie die Werte der Quelle darauf abgebildet werden.
- **Zielkataloge:** in welche Systeme geschrieben wird (Elasticsearch, CSW, Piveau).
- **Deduplizierung:** welche Datensätze als Duplikate gelten, welcher davon Vorrang hat und wie sie zusammengeführt werden.
- **Elasticsearch-Index:** Mapping und Settings, also Feldtypen und Analyzer für die Suche.
- **Oberfläche:** profilspezifische Hilfetexte (siehe [Schritt 7](#schritt-7-kontexthilfe-optional)) und Formularfelder.

Das Profil wird beim Start über die Umgebungsvariable `IMPORTER_PROFILE` gewählt und kann nur mit einem Neustart geändert werden.

Der Kern stellt Importer und Format-Mapper bereit, die das Quellformat lesen. Im Beispiel sind das `CkanImporter` und `CkanMapper`. Sie sind profilunabhängig und werden nur wiederverwendet. Das Profil ergänzt einen eigenen Mapper, der aus den gelesenen Werten das Indexdokument erzeugt (`UbaCkanMapper`), und einen eigenen Katalog, der Duplikate zusammenführt und in Elasticsearch schreibt (`UbaElasticsearchCatalog`). Verbesserungen am Kern, etwa an einem Importer, kommen dadurch allen Profilen zugute.

!!! tip "Brauche ich ein neues Profil?"

    Soll nur eine weitere Quelle angebunden werden, genügt eine neue Datenquelle im bestehenden Profil. Ein neues Profil lohnt sich erst, wenn die Anwendung etwa ein eigenes Indexformat, eigene Regeln für die Deduplizierung oder andere Zielkataloge benötigt.

Das fertige Profil besteht aus diesen Dateien unter `server/app/profiles/uba/`:

| Datei | Inhalt |
| ----- | ------ |
| `profile.factory.ts` | `UbaFactory`, der Einstiegspunkt des Profils |
| `uba.utils.ts` | `createEsId()`, für die Erzeugung der Elasticsearch-ID aus dem Dokument |
| `model/index.document.ts` | `UbaIndexDocument` |
| `mapper/uba.ckan.mapper.ts` | `UbaCkanMapper` |
| `catalog/elasticsearch.catalog.ts` | `UbaElasticsearchCatalog` |
| `persistence/opendata-mapping.json` | Elasticsearch-Mapping |
| `persistence/default-settings.json` | Elasticsearch-Settings |
| `persistence/elastic.queries.ts` | Abfragen für Historie und Prüfungen in der Oberfläche |
| `persistence/queries/getBuckets.sql` | SQL-Abfrage für "Buckets" von Datensätzen |

Als Vorlage wird das Profil [`ingrid`](https://github.com/informationgrid/ingrid-harvester/tree/main/server/app/profiles/ingrid) verwendet, da dadurch das Zusammenspiel mit dem Portal sichergestellt ist.

## Schritt 1: Profil-Factory

```typescript title="server/app/profiles/uba/profile.factory.ts"
import type { CatalogSettings, ElasticsearchCatalogSettings } from '@shared/catalog.js';
import log4js from 'log4js';
import type { Catalog, CatalogColumnType, CatalogOperation } from '../../catalog/catalog.factory.js';
import type { CkanMapper } from '../../importer/ckan/ckan.mapper.js';
import type { CkanSettings } from '../../importer/ckan/ckan.settings.js';
import type { Importer } from '../../importer/importer.js';
import type { ImporterType } from '../../importer/importer.settings.js';
import type { DocumentFactory } from '../../model/index.document.factory.js';
import type { Summary } from '../../model/summary.js';
import type { ElasticQueries as AbstractElasticQueries } from '../../persistence/elastic.queries.js';
import { CatalogService } from '../../services/catalog/CatalogService.js';
import { ProfileFactory } from '../profile.factory.js';
import { UbaCkanMapper } from './mapper/uba.ckan.mapper.js';
import type { UbaIndexDocument } from './model/index.document.js';
import { ElasticQueries } from './persistence/elastic.queries.js';

const log = log4js.getLogger(import.meta.filename);

export type UbaSettings = CkanSettings; // multiple settings can be defined as: CkanSettings | CswSettings; see ingrid profile factory for examples

export type UbaMapperType = CkanMapper; // multiple types can be defined as: CkanMapper | CswMapper; see ingrid profile factory for examples

export class UbaFactory extends ProfileFactory<CkanSettings> {

    protected getSupportedTypeNames(): ImporterType[] {
        return ['CKAN'];
    }

    getElasticQueries(): AbstractElasticQueries {
        return ElasticQueries.getInstance();
    }

    getDocumentFactory(mapper: UbaMapperType): DocumentFactory<UbaIndexDocument> {
        switch (mapper.constructor.name) {
            case 'CkanMapper': return new UbaCkanMapper(mapper as CkanMapper);
            default: throw new Error(`No mapper "${mapper.constructor.name}" registered`);
        }
    }

    async getImporter(settings: UbaSettings): Promise<Importer<UbaSettings>> {
        let importer: Importer<CkanSettings>;
        switch (settings.type) {
            case 'CKAN':
                const { CkanImporter } = await import('../../importer/ckan/ckan.importer.js');
                importer = new CkanImporter(settings as CkanSettings);
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
| `getProfileName()` | Name des Profils, der dem Verzeichnisnamen entsprechen muss. SQL-Abfragen sowie Elasticsearch-Mappings und -Settings werden unter `profiles/<name>/persistence/` angenommen |
| `getSupportedTypeNames()` | Datenquellen-Typen, die die Oberfläche anbietet |
| `getImporter()` | Importer zum Datenquellen-Typ. Für einen weiteren Typ wird dieser in `getSupportedTypeNames()` ergänzt und je ein weiterer `case` hier und in `getDocumentFactory()` hinzugefügt. Der Settings-Typ der Factory wird dann zur Union, z. B. `CkanSettings \| CswSettings` (vgl. `ingridSettings` im Profil `ingrid`) |
| `getDocumentFactory()` | Profil-Mapper zum Mapper des Importers |
| `getCatalog()` | Katalog-Implementierung zum Katalogtyp |
| `getElasticQueries()` | Abfragen für Historie, URL- und Index-Prüfung |

## Schritt 2: Profil registrieren

In [`server/app/profiles/profile.factory.loader.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/app/profiles/profile.factory.loader.ts):

```typescript
import { UbaFactory } from './uba/profile.factory.js';

// in createInstance():
case 'uba':
    this.instance = new UbaFactory();
    break;
```

Für die Entwicklung kann ein Startskript in `server/package.json` unter `scripts` hinzugefügt werden:

```json
"start-uba": "cross-env IMPORTER_PROFILE=uba nodemon"
```

## Schritt 3: Elasticsearch-Indexdokument

Das Indexdokument muss `IndexDocument` erweitern, also `uuid` und `extras.metadata` enthalten.
Sollen die Dokumente auch im Portal angezeigt werden, muss `IngridIndexDocument` oder für OpenData-Dokumente `IngridOpendataIndexDocument` erweitert werden:

```typescript title="server/app/profiles/uba/model/index.document.ts"
import type { IngridOpendataIndexDocument } from '../../ingrid/model/opendataindex.document.js';

export type UbaIndexDocument = IngridOpendataIndexDocument & {
    full_description: string,
    has_distributions: boolean
};
```

Werden keine zusätzlichen Felder verwendet, kann `IngridIndexDocument`/`IngridOpendataIndexDocument` direkt verwendet werden.

## Schritt 4: Mapper

Der Profil-Mapper implementiert `DocumentFactory`. Er erbt nicht direkt von `CkanMapper`, sondern kapselt ihn als `baseMapper` und liest die Werte über dessen Getter. Das Auswerten der CKAN-Datensätze (JSON der CKAN-API) übernimmt der Basis-`CkanMapper`.
Wenn ein bestimmter Profil-Mapper nur erweitert wird, kann dies aber auch direkt geschehen, wie hier im Beispiel `ingridCkanMapper`.

```typescript title="server/app/profiles/uba/mapper/uba.ckan.mapper.ts"
import type { CkanMapper } from '../../../importer/ckan/ckan.mapper.js';
import type { DocumentFactory } from '../../../model/index.document.factory.js';
import type { UbaIndexDocument } from '../model/index.document.js';
import { createEsId } from '../uba.utils.js';
import { ingridCkanMapper } from '../../ingrid/mapper/ingrid.ckan.mapper.js';
import type { IngridOpendataIndexDocument } from '../../ingrid/model/opendataindex.document.js';

export class UbaCkanMapper extends ingridCkanMapper implements DocumentFactory<UbaIndexDocument> {

    constructor(baseMapper: CkanMapper) {
        super(baseMapper);
    }

    async createIndexDocument(): Promise<UbaIndexDocument> {
        const document: UbaIndexDocument = {
            ...await super.createIndexDocument() as IngridOpendataIndexDocument,
            full_description: this.getFullDescription(),
            has_distributions: await this.getHasDistributions()
        }
        document.extras.metadata.merged_from.push(createEsId(document));
        return document;
    }

    // UBA schreibt nur nach Elasticsearch
    createCswIsoDocument(): string {
        return null;
    }

    createDcatapdeDocument(): string {
        return null;
    }

    getFullDescription(): string {
        const title = this.baseMapper.getTitle() ?? '';
        const description = this.baseMapper.getDescription() ?? '';
        return `${title}\n${description}`;
    }

    async getHasDistributions(): Promise<boolean> {
        const distributions = await this.baseMapper.getDistributions();
        return distributions?.length > 0;
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

    Der `CkanImporter` liest die JSON-Antworten der CKAN-API; `sourceURL` ist die Basis-URL der CKAN-Instanz. Über `requestType` wird der Endpunkt gewählt: `Search` verwendet `package_search` (optional eingeschränkt über den Solr-Filter `additionalSearchFilter`, z.B. `organization:umweltbundesamt`), `ListWithResources` verwendet `current_package_list_with_resources`. Mit `filterTags` und `filterGroups` werden Datensätze ohne passende Tags bzw. Gruppen übersprungen, `markdownAsDescription` rendert das Feld `notes` als HTML (`server/app/importer/ckan/ckan.settings.ts`). Weitere verfügbare Getter wie `getPublisher()`, `getMaintainer()`, `getAuthor()`, `getThemes()`, `getTemporal()` oder `getAccrualPeriodicity()` finden Sie in [`ckan.mapper.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/app/importer/ckan/ckan.mapper.ts).

## Schritt 5: Elasticsearch-Katalog

`ElasticsearchCatalog` legt den Index und den Alias aus den Katalog-Settings an und erstellt die Elasticsearch-Operationen. Das Beispiel-Profil implementiert `processBucket()`: Ein "Bucket" enthält eine Menge "zusammengehöriger" Datensätze, beispielsweise ein CSW-Metadatensatz mit zugehörigen Diensten oder etwaige Duplikate (gleiche ID) aus verschiedenen Quellen.

Aus einem Bucket wird üblicherweise ein Elasticsearch-Dokument erstellt, ggf. entstehen Lösch-Operationen für existierende, im Bucket sekundäre Datensätze.

```typescript title="server/app/profiles/uba/catalog/elasticsearch.catalog.ts"
import { IngridElasticsearchCatalog } from '../../ingrid/catalog/elasticsearch.catalog.js';
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
            return [...new Set(documents.map(createEsId))].map(id => ({ operation: 'delete', _id: id }));
        }

        // zuletzt geänderter Datensatz wird übernommen, die übrigen werden als Duplikate vermerkt
        active.sort((a, b) => (b.modified?.getTime() ?? 0) - (a.modified?.getTime() ?? 0));
        const [main, ...duplicates] = active;
        const idsToDelete = new Set([
            ...duplicates.map(createEsId),
            ...documents.filter(d => d.extras.metadata.deleted != null).map(createEsId)
        ]);
        idsToDelete.delete(createEsId(main));
        const operations: EsOperation[] = [...idsToDelete].map(id => ({ operation: 'delete', _id: id }));
        for (const duplicate of duplicates) {
            const id = createEsId(duplicate);
            main.extras.metadata.merged_from.push(id);
        }
        operations.push({ operation: 'index', _id: createEsId(main), document: main });
        return operations;
    }
}
```

Die Gruppierung zusammengehöriger Datensätze in Buckets erfolgt mittels `getBuckets.sql`, diese muss unter `uba/persistence/queries/` angelegt werden. Ein Beispiel ist [`ingrid/persistence/queries/getBuckets.sql`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/app/profiles/ingrid/persistence/queries/getBuckets.sql).

## Schritt 6: Mapping, Settings und Abfragen

- `persistence/opendata-mapping.json`: Felder des `UbaIndexDocument`
    - hierzu kann `ingrid/persistence/opendata-mapping.json` übernommen werden, ergänzt um:
        ```javascript title="server/app/profiles/uba/persistence/opendata-mapping.json"
        {
            "properties": {

                <!-- full_description & has_distributions unter properties hinzufügen -->
                "full_description": {
                    "type": "text"
                },
                "has_distributions": {
                    "type": "boolean"
                }

            }
        }
        ```
- `persistence/default-settings.json`: die Analyzer, die im Mapping verwendet werden
    - hierzu kann `ingrid/persistence/default-settings.json` übernommen werden
- `persistence/elastic.queries.ts`: Elasticsearch-Abfragen, die unter anderem für die History verwendet werden 
    - hierzu kann `ingrid/persistence/elastic.queries.ts` übernommen werden

## Schritt 7: Kontexthilfe (optional)

Die Hilfetexte der Oberfläche sind Markdown-Dateien unter [`server/app/contextHelp/`](https://github.com/informationgrid/ingrid-harvester/tree/main/server/app/contextHelp), abgelegt nach Sprache und Profil: `contextHelp/<sprache>/<profil>/<id>.md`. Der Dateiname ohne Endung ist die ID, unter der die Oberfläche den Text anfordert (`rest/api/help/<sprache>/<id>`). Der `title` im Frontmatter wird als Überschrift der Hilfe angezeigt.

```markdown title="server/app/contextHelp/de/ingrid/harvester_csw_settings.md (Auszug)"
---
title: CSW Einstellungen
---
# CSW Einstellungen

Konfigurationsbereich für grundlegende Parameter zur Anbindung einer CSW-Quelle.
```

Als Fallback wird die Version des ingrid-Profils verwendet: `contextHelp/<sprache>/ingrid/<id>.md`

Der Ordner `ingrid` enthält den vollständigen Satz an Hilfetexten und dient als Standard für alle Profile. Ein neues Profil muss daher nur die Hilfetexte anlegen, in denen von InGrid abweichende Informationen angezeigt werden sollen.

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

* [Datenquelle verbinden (CSW-Beispiel)]({{ fix_url('guides/harvester-csw.md') }})
* [Katalog verbinden]({{ fix_url('guides/harvester-catalog.md') }})
* [Konfigurationsdateien]({{ fix_url('guides/harvester-config-files.md') }})

```json title="Beispiel config-catalogs.json für Zielkataloge"
[
    { 
        "id": 1, 
        "type": "elasticsearch", 
        "name": "UBA", 
        "url": "http://localhost:9200",
        "settings": { 
            "index": "uba-index", 
            "alias": "uba",
            "mappingFile": "opendata-mapping",
            "version": "9",
            "user": "elastic",
            "password": "elastic"
        } 
    }
]
```

```json title="Reduziertes Beispiel config.json für Datenquellen"
[
    { 
        "id": 1, 
        "type": "CKAN", 
        "description": "UBA OpenData",
        "sourceURL": "https://ckan.govdata.de", 
        "requestType": "Search",
        "additionalSearchFilter": "organization:umweltbundesamt",
        "markdownAsDescription": true,
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

Tests liegen in `server/test/`. Vorlage für CKAN aus dem InGrid-Profil: 

* [`test/integration/ckan.integration.spec.ts`](https://github.com/informationgrid/ingrid-harvester/blob/main/server/test/integration/ckan.integration.spec.ts) 
    * Integration-Test für einen kompletten Harvesting-Lauf (PostgreSQL als Testcontainer, Elasticsearch gemockt)
    * Daten für den Test liegen unter `test/data/<type>/<source>`, z. B. `test/data/ckan/govdata-uba`
        * `config.json`: Konfiguration der Datenquelle
        * `./input`: Input-Daten bzw. (gemockte) Antworten der CKAN-API (`package_list.json`, `package_search.json`)
        * `./elasticsearch`, `.csw`, etc.: erwartete Output-Dokumente für verschiedene Formate

??? success "Mapper-Test"

    ```typescript title="server/test/importer/ckan/uba.ckan.mapper.spec.ts"
    import { expect } from 'chai';
    import { CkanMapper } from '../../../app/importer/ckan/ckan.mapper.js';
    import type { CkanSettings } from '../../../app/importer/ckan/ckan.settings.js';
    import { ckanDefaults } from '../../../app/importer/ckan/ckan.settings.js';
    import { Summary } from '../../../app/model/summary.js';
    import { UbaCkanMapper } from '../../../app/profiles/uba/mapper/uba.ckan.mapper.js';

    const SOURCE_URL = 'https://example.org';
    const settings = { ...ckanDefaults, type: 'CKAN', sourceURL: SOURCE_URL } as CkanSettings;

    const DATASET = {
        id: 'dataset-1',
        name: 'luftqualitaet',
        title: 'Luftqualität',
        notes: 'Messwerte zur Luftqualität',
        metadata_modified: '2024-01-01T00:00:00',
        tags: [{ name: 'Luft', display_name: 'Luft' }],
        resources: []
    };

    function createMapper(record: object): UbaCkanMapper {
        const mapper = new CkanMapper(settings, record, new Date(), new Summary('test', settings as any));
        return new UbaCkanMapper(mapper);
    }

    describe('UbaCkanMapper', () => {
        it('maps title and keywords', async () => {
            const doc = await createMapper(DATASET).createIndexDocument();
            expect(doc.title).to.equal('Luftqualität');
            expect(doc.keywords.map(k => k.term)).to.include('Luft');
        });
    });
    ```

??? success "Integrationstest"

    ```typescript title="server/test/integration/uba.integration.spec.ts"
    import type { CkanSettings } from '../../app/importer/ckan/ckan.settings.js';
    import settings from '../data/uba/example/config.json' with { type: 'json' };
    import { runImporterIntegrationTest, setupIntegrationTestLifecycle } from '../utils/integration-test-runner.js';

    describe('UBA Integration Tests', function () {
        this.timeout(60000);
        const profile = 'uba';
        setupIntegrationTestLifecycle(profile);

        it('harvests a CKAN catalog', async () => {
            await runImporterIntegrationTest({
                profile,
                expectedDocsDir: 'elasticsearch',
                mocks: [
                    { match: { url: `${settings.sourceURL}/api/3/action/package_list` }, fixture: 'input/package_list.json' },
                    { match: { url: `${settings.sourceURL}/api/action/package_search` }, fixture: 'input/package_search.json' }
                ],
                settings: settings as CkanSettings,
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
```

## Checkliste

- [ ] `server/app/profiles/uba/` mit Factory, Indexdokument, Mapper, Katalog und `persistence/` (inkl. `getBuckets.sql`) angelegt
- [ ] Profil in `profile.factory.loader.ts` registriert
- [ ] Mapping und Settings aus demselben Profil übernommen und angepasst
- [ ] Abweichende Hilfetexte unter `contextHelp/de/uba/` angelegt (nur bei Bedarf)
- [ ] Mapper- und Integrationstest grün
- [ ] Start mit `IMPORTER_PROFILE=uba` zeigt `Loaded profile: uba`
