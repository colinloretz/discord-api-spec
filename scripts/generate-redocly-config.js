// run this using `npm run redocly-up` from root

const fs = require('fs-extra');
const YAML = require('js-yaml');
const SwaggerParser = require('@apidevtools/swagger-parser');
const path = require('path');

const openApiPath = 'specs/openapi.json';
const markdownDir = 'docs/operations';
const redoclyConfigPath = 'redocly.yaml';

async function generateOperationDescriptionOverrides() {
  try {
    const api = await SwaggerParser.parse(openApiPath);
    const operationIds = {};

    // Iterate through each path and method to find operation IDs
    for (const [apiPath, methods] of Object.entries(api.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        if (operation.operationId) {
          const markdownPath = path.join(markdownDir, `${operation.operationId}.md`);
          if (fs.existsSync(markdownPath)) {
            operationIds[operation.operationId] = `./${path.relative(path.dirname(redoclyConfigPath), markdownPath)}`;
          }
        }
      }
    }

    // Load the existing Redocly config or create a new one if it doesn't exist
    let redoclyConfig = {};
    if (fs.existsSync(redoclyConfigPath)) {
      redoclyConfig = YAML.load(fs.readFileSync(redoclyConfigPath, 'utf8'));
    }

    // Update the operation-description-override section
    redoclyConfig.apis = redoclyConfig.apis || {};
    redoclyConfig.apis.discord = redoclyConfig.apis.discord || {};
    redoclyConfig.apis.discord.decorators = redoclyConfig.apis.discord.decorators || {};
    redoclyConfig.apis.discord.decorators['operation-description-override'] = {
      operationIds
    };

    // Save the updated config
    fs.writeFileSync(redoclyConfigPath, YAML.dump(redoclyConfig), 'utf8');
    console.log('👾 ✅: Redocly configuration updated successfully.');

  } catch (error) {
    console.error('👾 ❌: Failed to generate Redocly configuration:', error);
  }
}

generateOperationDescriptionOverrides();