const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/login', (req, res) => {
    const { mail, password } = req.body;
    const sql = `SELECT id, mail, role FROM users WHERE mail = ? AND password = ?`;

    db.get(sql, [mail, password], (err, user) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        if (user) {
            res.json({ message: "Connexion réussie", user });
        } else {
            res.status(401).json({ message: "Identifiants invalides" });
        }
    });
});
module.exports = router;