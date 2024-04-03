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

## Metadata

The `/docs` folder containers markdown files of each operation, tag and information that appears at the top of the spec.

## OAS Plugins

The `/oas/plugins` folder is where you can include Redocly plugins to decorate and preprocess an OpenAPI spec.

I've added an `add-discord-tags` plugin as an example with a bit of a naive mapping of endpoints to tags. We can update this to be more explicit if we want to make sure certain endpoints end up in certain tags.