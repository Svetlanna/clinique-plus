const express = require('express');
const router = express.Router();
const medecinController = require('../../Controller/medecinController');

router.get('/', medecinController.getAllMedecin);
router.get('/:id', medecinController.getByIdMedecin);
router.post('/', medecinController.createMedecin);
router.delete('/:id', medecinController.deleteMedecin);

module.exports = router;

