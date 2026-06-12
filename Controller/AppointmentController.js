
const Appointment =  require('../Model/appointmentModel');

exports.getAllAppointments = (req, res) => {
    Appointment.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getAppointmentById = (req, res) => {
    Appointment.getById(req.params.id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Non trouvé" });
        res.json(row);
    });
};

exports.createAppointment = (req, res) => {
    Appointment.create(req.body, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Rendez-vous créé" });
    });
};

exports.updateAppointment = (req, res) => {
    Appointment.update(req.params.id, req.body, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Mise à jour réussie" });
    });
};