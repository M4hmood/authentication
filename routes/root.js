const express = require('express');
const router = express.Router();
const path = require('path');
const verifyToken = require('../middlewares/authMiddleware');

router.get('^/$|/home(.html)?', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', '/views','/home.html'));
    } catch (error) {
        res.status(400).json({ error: "can't load home page"});
    }
});

router.get('/login(.html)?', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    } catch (error) {
        res.status(400).json({ error: "can't load login html file"});
    }
});

router.get('/register(.html)?', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    } catch (error) {
        res.status(400).json({ error: "can't load register html file"});
    }
});

router.get('/profile(.html)?/:id', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/profile.html'));
    } catch (error) {
        res.status(400).json({ error: "can't load register html file"});
    }
});

module.exports = router;