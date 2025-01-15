const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        const userId = await userService.createUser(userData);
        res.status(200).json({ message: "User created", userId });
    } catch (e) {
        if (Array.isArray(e)){
            return res.status(400).json({message: "Validation failed", errors: e})
        }
        res.status(500).json({ message: "Error creating user", error: e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: "Error fetching users", error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (e) {
        res.status(404).json({ message: "User not found", error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const result = await userService.updateUser(id, userData);
        res.status(200).json({ message: "User updated", result });
    } catch (e) {
        if (Array.isArray(e)){
            return res.status(400).json({message: "Validation failed", errors: e})
        }
        res.status(500).json({ message: "Error updating user", error: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUser(id);
        res.status(200).json({message: `User with ID ${id} has been deleted successfully.`});

    } catch (e) {
        res.status(500).json({ message: "Error deleting user", error: e.message });
    }
});

module.exports = router;