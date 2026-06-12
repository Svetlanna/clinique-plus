const userModel = require('../Model/userModel');

const login = async (req, res) => {
    const { mail, password } = req.body;

    try {
        const user = await userModel.findUserByMail(mail);


        if (user && user.password === password) {
            const { password, ...userSafe } = user;
            return res.json({ message: "Connexion réussie", user: userSafe });
        } else {
            // Si l'utilisateur n'existe pas ou si le mot de passe ne correspond pas
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};

module.exports = { login };