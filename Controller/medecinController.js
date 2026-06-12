const Medecin = require('../Model/medecinModel');

exports.getAllMedecin = (req, res) => {
    Medecin.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getByIdMedecin = (req, res) => {
    Medecin.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Medecin non trouvé" });
        res.json(row);
    });
};

exports.createMedecin = (req, res) => {
    Medecin.create(req.body, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Medecin créé" });
    });
};

exports.deleteMedecin = (req, res) => {
    Medecin.delete(req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Medecin supprimé", changes: this.changes });
    });
};
