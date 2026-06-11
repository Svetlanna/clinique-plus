const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/:id', (req, res) => {
    const patientId = req.params.id; // Récupère le '2' de l'URL
    const sql = "SELECT * FROM patients WHERE id = ?";

    db.get(sql, [patientId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row) {
            res.json(row); // Patient trouvé
        } else {
            res.status(404).json({ message: "Patient non trouvé" }); // Erreur 404
        }
    });
});


router.get('/', (req, res) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});




router.post('/', (req, res) => {
    const { nom, prenom, date_naissance, telephone, email } = req.body;
    const sql = `INSERT INTO patients (nom, prenom, date_naissance, telephone, email) VALUES (?,?,?,?,?)`;
    db.run(sql, [nom, prenom, date_naissance, telephone, email], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Patient créé" });
    });
});

router.delete('/:id', (req, res) => {
    db.run("DELETE FROM patients WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Patient supprimé", changes: this.changes });
    });
});

module.exports = router;