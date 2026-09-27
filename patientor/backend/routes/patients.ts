import express from 'express';
import patientService from '../services/patientsService.ts';
import { type NonSensitivePatient } from '../types.ts';
import parseNewPatientEntry from '../utils.ts';
import { z } from 'zod';
const router = express.Router();
 
router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  // eslint-disable-next-line
  res.json(patientService.getNonSensitiveEntries());


});
router.get('/:id', (req, res) => {
  const diary = patientService.findById(req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newDiaryEntry);
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