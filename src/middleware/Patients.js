

router.post('/login', (req, res) => {
    const { mail, password } = req.body;

    const found = userModel.findUserByMailAndPassword(mail,password);

    if(found) {
      return res.json({ message: "Connexion réussie", user });
    } else {

    }
});
module.exports = router;