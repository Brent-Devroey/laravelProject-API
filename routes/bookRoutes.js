const express = require('express');
const bookService = require('../services/bookService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const bookData = req.body;
        const bookId = await bookService.createBook(bookData);
        res.status(200).json({ message: "Book created", bookId });
    } catch (e) {
        if (Array.isArray(e)){
            return res.status(400).json({message: "Validation failed", errors: e})
        }
        res.status(500).json({ message: "Error creating book", error: e.message });
    }
});

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;  
    const offset = parseInt(req.query.offset, 10) || 0; 
    const searchQuery = req.query.search || "";         
    
    try {
      const books = await bookService.getBooks(searchQuery, limit, offset);
      res.json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json("Failed to fetch books");
    }
  });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookService.getBookById(id);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json({ message: "Book not found", error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const bookData = req.body;
    try {
        const result = await bookService.updateBook(id, bookData);
        res.status(200).json({ message: "Book updated", result });
    } catch (e) {
        if (Array.isArray(e)){
            return res.status(400).json({message: "Validation failed", errors: e})
        }
        res.status(500).json({ message: "Error updating book", error: e.message });

    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookService.deleteBook(id);
        res.status(200).json({message: `Book with ID ${id} has been deleted successfully.`});
    } catch (e) {
        res.status(500).json({ message: "Error deleting book", error: e.message });
    }
});

module.exports = router;