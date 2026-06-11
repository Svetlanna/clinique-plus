const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/', (req, res) => {
    db.all("SELECT * FROM medecins", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


// Récupérer un médecin par son ID
router.get('/:id', (req, res) => {
    const medecinId = req.params.id;
    const sql = "SELECT * FROM medecins WHERE id = ?";

    db.get(sql, [medecinId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: "Médecin non trouvé" });
        }
    });
});

router.delete('/:id', (req, res) => {
    db.run("DELETE FROM medecins WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Medecin supprimé", changes: this.changes });
    });
});

module.exports = router;