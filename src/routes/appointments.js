const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    const sql = `SELECT a.*, p.nom as patient_nom, m.nom as medecin_nom 
                 FROM appointments a
                 JOIN patients p ON a.patient_id = p.id
                 JOIN medecins m ON a.medecin_id = m.id`;

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
router.get('/:id', (req, res) => {
    const { id } = req.params; // On extrait l'ID de l'URL

    const sql = `
        SELECT a.*, p.nom AS patient_nom, p.prenom AS patient_prenom, 
               m.nom AS medecin_nom, m.prenom AS medecin_prenom
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN medecins m ON a.medecin_id = m.id
        WHERE a.id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: "Rendez-vous non trouvé" });
        }
        res.json(row);
    });
});



router.post('/', (req, res) => {
    const { patient_id, medecin_id, date_rdv, motif, statut } = req.body;
    const sql = `INSERT INTO appointments (patient_id, medecin_id, date_rdv, motif, statut) VALUES (?,?,?,?,?)`;
    db.run(sql, [patient_id, medecin_id, date_rdv, motif, statut || 'planifie'], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Rendez-vous créé" });
    });
});


router.put('/:id', (req, res) => {
    const { date_rdv, motif, statut } = req.body;
    const sql = `UPDATE appointments SET date_rdv = ?, motif = ?, statut = planifie  WHERE id = 2`;

    db.run(sql, [date_rdv, motif, statut, req.params.id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Mise à jour réussie" });
    });
});
module.exports = router;