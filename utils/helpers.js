const authors = require("../app/data/authors.json");

const findAuthorIndex = id => {
  const index = authors.findIndex(author => author.id === id);
  if (index === -1) {
    throw new Error("Author not found");
  }
  return index;
};

module.exports = { findAuthorIndex };
