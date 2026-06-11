const express = require('express');
const router = express.Router();
const db = require('../database');

function findUserByMail(mail) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, mail, password, role FROM users WHERE mail = [mail]`;

        db.get(sql, [mail], (err, user) => {
            if (err) reject(err);
            else resolve(user);
        });
    });
}
module.exports = { findUserByMail };

router.post('/login', async (req, res) => {
    const { mail, password } = req.body;

    try {
        const user = await findUserByMail(mail);
            console.log("Utilisateur trouvé :", user);

        const dbPassword = String(user.password || "").trim();
        const inputPassword = String(password || "").trim();

        if (user) {
         const { password, ...userSafe } = user;
            return res.json({ message: "Connexion réussie", user: userSafe });
        } else {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

module.exports = router;





