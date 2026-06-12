const express = require('express');
const router = express.Router();
const medecinController = require('../../Controller/medecinController');

router.get('/', medecinController.getAllMedecins);
router.get('/:id', medecinController.getMedecinById);
router.post('/', medecinController.createMedecin);
router.delete('/:id', medecinController.deleteMedecin);


module.exports = router;