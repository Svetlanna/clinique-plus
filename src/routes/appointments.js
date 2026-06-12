const express = require('express');
const router = express.Router();
// 1. Importez le bon contrôleur
const appointmentController = require('../../Controller/AppointmentController');

// 2. Utilisez la variable correcte (appointmentController)
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);

module.exports = router;