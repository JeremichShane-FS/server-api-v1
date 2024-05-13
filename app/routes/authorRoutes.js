const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const authors = require("../data/authors");
const { updateAuthors } = require("../../utils/filestorage");
const { findAuthorIndex } = require("../../utils/helpers");

// Get All Users
router.get("/", (req, res) => {
  if (!authors) {
    return res.status(500).json({
      success: false,
      message: `
      Internal Server Error: Authors data not found
      ${req.method} - ${req.hostname} - ${req.originalUrl}`,
    });
  }

  res.status(200).json({
    success: true,
    message: `${req.method} - ${req.hostname} - ${req.originalUrl}`,
    data: authors,
  });
});

// Get User by ID
router.get("/:id", (req, res) => {
  const author = authors.find(author => author.id === req.params.id);

  if (!author) {
    return res.status(404).json({
      success: false,
      message: "Error: Author not found",
    });
  }

  res.status(200).json({
    success: true,
    message: `${req.method} - Author by ID`,
    data: author,
  });
});

// Create User
router.post("/", (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Invalid author data",
    });
  }

  try {
    const newAuthor = { id: uuidv4(), ...req.body };
    const newAuthors = [...authors, newAuthor];
    updateAuthors(newAuthors);
    res.status(200).json({
      success: true,
      message: `${req.method} - Author successfully created`,
      data: newAuthor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
});

// Update User
router.put("/:id", (req, res) => {
  try {
    const index = findAuthorIndex(req.params.id);
    console.log(index);
    authors[index] = { ...authors[index], ...req.body };
    updateAuthors(authors);
    res.status(200).json({
      success: true,
      message: `${req.method} - Author with id: ${req.params.id} updated successfully`,
      data: authors[index],
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Update Error: ${err.message}`,
    });
  }
});

// Delete User
router.delete("/:id", (req, res) => {
  try {
    const updatedAuthors = authors.filter(author => author.id !== req.params.id);
    updateAuthors(updatedAuthors);
    res.status(200).json({
      success: true,
      message: `${req.method} - Author with id: ${req.params.id} deleted successfully`,
      data: updatedAuthors,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Delete Error: ${err.message}`,
    });
  }
});

module.exports = router;
