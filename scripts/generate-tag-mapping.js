const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const csvFilePath = path.join(__dirname, "/input/endpoints.csv");
const outputJsonFilePath = path.join(
  __dirname,
  "/output/operationTagMapping.json"
);

const operationTagMapping = {};

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const tag = row["Tag"];
    const operation = row["Operation"];
    operationTagMapping[operation] = tag;
  })
  .on("end", () => {
    fs.writeFileSync(
      outputJsonFilePath,
      JSON.stringify(operationTagMapping, null, 2),
      "utf-8"
    );
    console.log(
      `Operation-Tag mapping has been saved to ${outputJsonFilePath}`
    );
  })
  .on("error", (err) => {
    console.error("Error processing the CSV file:", err);
  });
