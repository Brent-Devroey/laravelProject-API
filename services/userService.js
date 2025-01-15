const bcrypt = require("bcrypt");
const db = require("../db");
const { validatePartialUser, validateUser } = require("./validationService");

const userService = {
  createUser: async (userData) => {
    const errors = validateUser(userData);
    if(errors.length > 0){
        return Promise.reject(errors);
    }

    const { name, email, password, is_admin } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, password, is_admin, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [name, email, hashedPassword, is_admin],
        (e, results) => {
          if (e) {
            console.error("Error creating user: ", e);
            reject(e);
          }
          resolve(results.insertId);
        }
      );
    });
  },

  getUsers: async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (e, results) => {
        if (e) {
          console.error("Error fetching users: ", e);
          reject(e);
        }
        resolve(results);
      });
    });
  },

  getUserById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (e, results) => {
        if (e) {
          console.error("Error fetching user by id: ", e);
          reject(e);
        }
        resolve(results);
      });
    });
  },

  updateUser: async (id, userData) => {
    const errors = validatePartialUser(userData);
    if(errors.length > 0){
        return Promise.reject(errors);
    }

    const { name, email, password, is_admin } = userData;
    let hashedPassword
    if (password){
        hashedPassword = await bcrypt.hash(password, 10);
    }
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), password = COALESCE(?, password), is_admin = COALESCE(?, is_admin), updated_at = NOW() WHERE id = ?",
        [name, email, hashedPassword, is_admin, id],
        (e, results) => {
          if (e) {
            console.error("Error updating user with by: ", e);
            reject(e);
          }
          resolve(results.changedRows);
        }
      );
    });
  },

  deleteUser: async (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (e, results) => {
        if (e) {
          console.error("Error deleting user with id: ", e);
          reject(e);
        }
        resolve(results.affectedRows)
      });
    });
  },
};

module.exports = userService;
