import express from 'express';
import { z } from 'zod';
import patientService from '../services/patientsService.js';
import parseNewPatientEntry from '../utils.js';
const router = express.Router();
router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const patient = patientService.findById(id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = parseNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});
export default router;
