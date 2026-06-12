const express = require('express');
const router = express.Router();
const db = require('../database');

function findMedecinById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM medecins WHERE id = ?`;

        db.get(sql, [id], (err, medecin) => {
            if (err) {
                reject(err);
            } else {
                resolve(medecin);
            }
        });
    });
}
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID reçu pour la recherche :", id);

   try {
        const medecin = await findMedecinById(id);
        console.log("Résultat de la DB :", medecin);
        if (medecin) {
            return res.json({ medecin });
        } else {
            return res.status(404).json({ message: "Médecin non trouvé" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

module.exports = router;