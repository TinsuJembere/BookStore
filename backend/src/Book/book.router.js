const express = require("express");
const Book = require("./book.schema");
const {
  postBook,
  getAllBooks,
  getOneBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const router = express.Router();

router.post("/", postBook); // POST /books
router.get("/", getAllBooks); // GET /books
router.get("/:id", getOneBook); // GET /books/:id
router.put("/:id", updateBook); // PUT /books/:id
router.delete("/:id", deleteBook); // DELETE /books/:id


module.exports = router;
