const express = require('express');
const app = express();

app.use(express.json());


const authRoutes = require('../src/routes/auth');
const patientsRoutes = require('./routes/patients');

const medecinsRoutess = require('./routes/medecinsModel');
app.use('/med', medecinsRoutess);

const medecinsRoutes = require('./routes/medecins');
const appointmentsRoutes = require('./routes/appointments');

app.use('/', authRoutes);
app.use('/patients', patientsRoutes);

 app.use('/medecins', medecinsRoutes);
app.use('/appointments', appointmentsRoutes);

app.listen(3000, () => console.log("Serveur prêt sur http://localhost:3000"));

