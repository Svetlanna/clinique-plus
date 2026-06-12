const db = require('../src/database');

const Patient = {
    getAll: (callback) => {
        db.all("SELECT * FROM patients", [], callback);
    },
    getById: (id, callback) => {
        db.get("SELECT * FROM patients WHERE id = ?", [id], callback);
    },
    create: (data, callback) => {
        const { nom, prenom, date_naissance, telephone, email } = data;
        const sql = `INSERT INTO patients (nom, prenom, date_naissance, telephone, email) VALUES (?,?,?,?,?)`;
        db.run(sql, [nom, prenom, date_naissance, telephone, email], callback);
    },
    delete: (id, callback) => {
        db.run("DELETE FROM patients WHERE id = ?", [id], callback);
    }
};

module.exports = Patient;