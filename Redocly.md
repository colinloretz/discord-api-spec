## Using Redocly

Install Redocly CLI

``` shell
npm i -g @redocly/cli@latest
```

To lint your docs changes:

``` shell
redocly lint
```

To preview your docs changes:

``` shell
redocly preview-docs discord
```

To generate a spec with your decorated changes:

``` shell
redocly bundle discord --output dist/decorated-spec.json
```

## Scripts folder

> WIP

#### Step 1: Export Endpoints with Tags and Descriptions
Save the file as `/scripts/input/endpoints.csv`.

#### Step 2: Export the Tags and Tag Descriptions
Save the file as `/scripts/input.csv`. Whatever order these appear in the CSV will be the order they show up in the spec.

#### Step 4: Transform the Endpoint CSV into markdown files
This script will create a `{operation_id}.md` file for each endpoint/operation.

``` shell
npm run generate-operations
```

#### Step 5: Update the redocly.yaml with the operation overrides
This script will add each of the operation markdown files to Redocly.yaml

``` shell
npm run redocly-up
```

#### Step 6: Generate our Tag <> Operation Mapping
This file will be used in the `oas/plugins/add-discord-tags.js` file to add tags to our operations.

``` shell
npm run generate-tags
```

#### Step 7: Export to the newly decorated spec

``` shell
redocly bundle discord --output dist/decorated-spec.json
```


## Metadata

> WIP: Goal is to make a tags folder so we don't have to push metadata from scripts into the plugins

The `/docs` folder containers markdown files of each operation and information that appears at the top of the spec.

## OAS Plugins

The `/oas/plugins` folder is where you can include Redocly plugins to decorate and preprocess an OpenAPI spec.

I've added an `add-discord-tags` plugin as an example with a bit of a naive mapping of endpoints to tags. We can update this to be more explicit if we want to make sure certain endpoints end up in certain tags.