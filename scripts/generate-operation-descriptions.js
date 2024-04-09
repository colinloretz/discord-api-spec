// run this using `npm run generate-descriptions` from root

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const csvFilePath = 'scripts/input/endpoints.csv';
// Define the output directory path
const outputDir = path.join(__dirname, 'docs/operations');

// Ensure the output directory exists
fs.mkdir(outputDir, { recursive: true }, (err) => {
  if (err) {
    return console.error(`Failed to create output directory: ${err}`);
  }
  // Begin processing the CSV file after confirming the output directory exists
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {

      const operationName = row['Operation'].trim();
      const description = row['Short Description'];

      // Adjust the filePath to include the output directory
      const fileName = `${operationName}.md`;
      const filePath = path.join(outputDir, fileName);

      // Write the description to the Markdown file
      fs.writeFile(filePath, description, (err) => {
        if (err) {
          console.error(`👾 ❌: Error writing file for operation ${operationName}:`, err);
        } else {
          console.log(`👾 ✅: Markdown file created for operation: ${operationName}`);
        }
      });
    })
    .on('end', () => {
      console.log('👾 ✅: CSV file has been processed, and Markdown files have been created in the output directory.');
    })
    .on('error', (err) => {
      console.error('👾 ❌: Error reading CSV file:', err);
    });
});