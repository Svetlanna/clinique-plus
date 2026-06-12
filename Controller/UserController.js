const userModel = require('../Model/userModel');
const {json} = require("express");

const login = async (req, res) => {

const { mail, password } = req.body;


    if (!mail || !password) {
        return res.status(400).json({ message: "Mail ou mot de passe manquant" });
    }
    try {
        const user = await userModel.findUserByMail(mail);

        if (user && user.password === password) {
            const { password, ...userSafe } = user;
            return res.json({ message: "Connexion réussie", user: userSafe });
        } else {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};
module.exports = { login };