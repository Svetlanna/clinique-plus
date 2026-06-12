const db = require('../src/database');
const appointmentController = require('../Controller/AppointmentController');
const Appointment = {
    getAll: (callback) => {
        const sql = `SELECT a.*, p.nom as patient_nom, m.nom as medecin_nom 
                     FROM appointments a
                     JOIN patients p ON a.patient_id = p.id
                     JOIN medecins m ON a.medecin_id = m.id`;
        db.all(sql, [], callback);
    },
    getById: (id, callback) => {
        const sql = `SELECT a.*, p.nom AS patient_nom, p.prenom AS patient_prenom, 
                            m.nom AS medecin_nom, m.prenom AS medecin_prenom
                     FROM appointments a
                     JOIN patients p ON a.patient_id = p.id
                     JOIN medecins m ON a.medecin_id = m.id
                     WHERE a.id = ?`;
        db.get(sql, [id], callback);
    },
    create: (data, callback) => {
        const sql = `INSERT INTO appointments (patient_id, medecin_id, date_rdv, motif, statut) VALUES (?,?,?,?,?)`;
        db.run(sql, [data.patient_id, data.medecin_id, data.date_rdv, data.motif, data.statut || 'planifie'], callback);
    },
    update: (id, data, callback) => {
        const sql = `UPDATE appointments SET date_rdv = ?, motif = ?, statut = ? WHERE id = ?`;
        db.run(sql, [data.date_rdv, data.motif, data.statut, id], callback);
    }
};

module.exports = Appointment;