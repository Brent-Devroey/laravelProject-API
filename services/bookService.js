const db = require("../db");
const { validateBooks, validatePartialBooks } = require("./validationService");

const bookService = {
  createBook: (bookData) => {
    const errors = validateBooks(bookData);
    if(errors.length > 0){
        return Promise.reject(errors);
    }

    const { title, description, rating, image, user_id } = bookData;

    let bookImage = null;
    if (image){
        bookImage = "profile_pictures/" + image
    }

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO books (title, description, rating, image, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [title, description, rating, bookImage, user_id],
        (e, results) => {
          if (e) {
            console.error("Error creating book: ", e);
            reject(e);
          }
          resolve(results.insertId);
        }
      );
    });
  },
  getBooks: async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM books", (e, results) => {
        if (e) {
          console.error("Error fetching books: ", e);
          reject(e);
        }
        resolve(results);
      });
    });
  },

  getBookById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM books WHERE id = ?", [id], (e, results) => {
        if (e) {
          console.error("Error fetching book by id: ", e);
          reject(e);
        }
        resolve(results);
      });
    });
  },

  updateBook: async (id, bookData) => {
    const errors = validatePartialBooks(bookData);
    if(errors.length > 0){
        return Promise.reject(errors);
    }

    const { title, description, rating, image, user_id } = bookData;

    let bookImage = null;
    if (image){
        bookImage = "profile_pictures/" + image
    }

    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE books SET title = COALESCE(?, title), description = COALESCE(?, description), rating = COALESCE(?, rating), image = COALESCE(?, image), user_id = COALESCE(?, user_id), updated_at = NOW() WHERE id = ?",
        [title, description, rating, bookImage, user_id, id],
        (e, results) => {
          if (e) {
            console.error("Error updating book with by: ", e);
            reject(e);
          }
          resolve(results.changedRows);
        }
      );
    });
  },

  deleteBook: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM books WHERE id = ?", [id], (e, results) => {
        if (e) {
          console.error("Error deleting book with id: ", e);
          reject(e);
        }
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = bookService;
