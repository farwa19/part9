import express, { Request, Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientsService';
import parseNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request, res: Response) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;