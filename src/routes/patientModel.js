const express = require('express');
const router = express.Router();
const db = require('../database');


function findPatientById(id) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT id, nom, prenom, date_naissance, telephone, email FROM patients WHERE id = ?`;

        db.get(sql, [id], (err, patient) => {
            if (err){
                reject(err);
                console.log(err)
            }
            else{
                resolve(patient);
                console.log(patient)
            }
        });
    });
}

router.get(':id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await findPatientById(id);

        if (patient) {
            console.log(patient)
            return res.json({ patient });
        } else {
            console.log(res)
            return res.status(404).json({ message: "Patient non trouvé" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

module.exports = { findPatientById, router };