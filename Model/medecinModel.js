
const db = require('../src/database');

const Medecin = {
    getAll: (callback) => {
        db.all("SELECT * FROM medecins", [], callback);
    },
    getById: (id, callback) => {
        db.get("SELECT * FROM medecins WHERE id = ?", [id], callback);
    },
    create: (data, callback) => {
        const { nom, prenom,specialite , telephone, email } = data;
        const sql = `INSERT INTO medecins (nom, prenom, specialite, telephone) VALUES (?,?,?,?,?)`;
        db.run(sql, [nom, prenom, specialite, telephone], callback);
    },
    delete: (id, callback) => {
        db.run("DELETE FROM medecins WHERE id = ?", [id], callback);
    }
};

module.exports = Medecin;