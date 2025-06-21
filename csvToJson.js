const fs = require('fs');
const path = require('path');

/**
 * Converts a CSV file to a JSON file.
 * @param {string} csvFilePath - Path to the input CSV file.
 * @param {string} jsonFilePath - Path to the output JSON file.
 */
function csvToJson(csvFilePath, jsonFilePath) {
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    const jsonArray = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, idx) => {
            obj[header] = values[idx];
        });
        return obj;
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');
}

// Example usage:
csvToJson('github_repos.csv', 'output.json');
module.exports = csvToJson;