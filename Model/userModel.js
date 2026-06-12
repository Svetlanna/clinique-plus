const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/database.sqlite');
const db = new sqlite3.Database(dbPath);

module.exports = db;

const findUserByMail = (mail) => {
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM users WHERE mail = ?`;

db.get(sql, [mail], (err, user) => {
    if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};
module.exports = { findUserByMail };