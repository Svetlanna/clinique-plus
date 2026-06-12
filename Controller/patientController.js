const Patient = require('../Model/patientModel');

exports.getAllPatients = (req, res) => {
    Patient.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getPatientById = (req, res) => {
    Patient.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Patient non trouvé" });
        res.json(row);
    });
};

exports.createPatient = (req, res) => {
    Patient.create(req.body, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Patient créé" });
    });
};

exports.deletePatient = (req, res) => {
    Patient.delete(req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Patient supprimé", changes: this.changes });
    });
};