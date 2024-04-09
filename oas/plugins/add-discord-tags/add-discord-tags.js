const id = "add-discord-tags";
const fs = require("fs");
const csv = require('csv-parser');

// Assuming the mapping file is named 'operationTagMapping.json'
const tagMappingData = fs.readFileSync(
  "scripts/output/operationTagMapping.json",
  "utf-8"
);
const operationTagMapping = JSON.parse(tagMappingData);

const tagMetadataPath = "scripts/input/tags.csv";

function InjectOperationTags() {
  console.log("👾 discord: adding operation tags... ");
  return {
    Operation: {
      leave(target) {
        if (!target.tags) {
          target.tags = [];
        }

        if (operationTagMapping[target.operationId]) {
          target.tags.push(operationTagMapping[target.operationId]);
        }
      },
    },
  };
}

function SetupTags() {
  console.log("👾 discord: setting up operation tags... ");
  return {
    Root(spec) {
      if (!spec.tags) {
        spec.tags = [];
      }

      fs.createReadStream(tagMetadataPath)
        .pipe(csv())
        .on("data", (row) => {
          const tagName = row["Tag"].trim();
          const description = row["Tag Description"];

          spec.tags.push({
            name: tagName,
            description: description,
          });
        });
    },
  };
}

module.exports = {
  id,
  preprocessors: {
    oas3: {
      "setup-tags": SetupTags,
    },
  },
  decorators: {
    oas3: {
      "add-tags": InjectOperationTags,
    },
  },
};
