const bcrypt = require("bcrypt");
const db = require("../db");
const { validateNews, validatePartialNews } = require("./validationService");

const newsService = {
  createNews: async (newsData) => {
    const errors = validateNews(newsData);
    if(errors.length > 0){
        return Promise.reject(errors);
    }

    const { title, content, image } = newsData;

    let newsImage = null;
    if (image){
        newsImage = "image/" + image
    }
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO news (title, content, image, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
        [title, content, newsImage],
        (e, results) => {
          if (e) {
            console.error("Error creating news: ", e);
            reject(e);
          }
          resolve(results.insertId);
        }
      );
    });
  },

  getNews: async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM news", (e, results) => {
        if (e) {
          console.error("Error fetching news: ", e);
          reject(e);
        }
        resolve(results);
      });
    });
  },

  getNewsById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM news WHERE id = ?", [id], (e, results) => {
        if (e) {
          console.error("Error fetching news by id: ", e);
          reject(e);
        }
        resolve(results);
      });
    });
  },

  updateNews: async (id, newsData) => {
    const errors = validatePartialNews(newsData);
    if(errors.length > 0){
        return Promise.reject(errors);
    }

    const { title, content, image } = newsData;

    let newsImage = null;
    if (image){
        newsImage = "image/" + image
    }

    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE news SET title = COALESCE(?, title), content = COALESCE(?, content), image = COALESCE(?, image), updated_at = NOW() WHERE id = ?",
        [title, content, newsImage, id],
        (e, results) => {
          if (e) {
            console.error("Error updating news with by: ", e);
            reject(e);
          }
          resolve(results.changedRows);
        }
      );
    });
  },

  deleteNews: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM news WHERE id = ?", [id], (e, results) => {
        if (e) {
          console.error("Error deleting news with id: ", e);
          reject(e);
        }
        resolve(results.affectedRows)
      });
    });
  },
};

module.exports = newsService;
