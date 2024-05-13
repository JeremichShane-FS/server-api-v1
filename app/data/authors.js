const fs = require("fs");
const path = require("path");

let authors;
let authorsPath = path.join(__dirname, "authors.json");

if (!fs.existsSync(authorsPath)) {
  fs.writeFileSync(authorsPath, JSON.stringify([]), "utf8");
}

try {
  authors = JSON.parse(fs.readFileSync(authorsPath, "utf8"));
} catch (err) {
  console.error(err);
  authors = [];
}

module.exports = authors;
