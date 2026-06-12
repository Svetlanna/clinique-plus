const db = require('../src/database');

const findUserByMail = (mail) => {
    return new Promise((resolve, reject) => {

        const sql = `SELECT id, mail, password, role FROM users WHERE mail = ?`;

        db.get(sql, [mail], (err, user) => {
            if (err) reject(err);
            else resolve(user);
        });
    });
};
module.exports = { findUserByMail };