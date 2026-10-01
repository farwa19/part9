import express, { Request, Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientsService.js';
import parseNewPatientEntry from '../utils.js';
import type { NewEntry } from '../types.js';
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const patient = patientService.findById(id);

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


const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const body: unknown = req.body;

    if (!isObject(body)) {
      return res.status(400).send({
        error: "Request body must be an object",
      });
    }

    if (
      typeof body.description !== "string" ||
      !body.description ||
      typeof body.date !== "string" ||
      !body.date ||
      typeof body.specialist !== "string" ||
      !body.specialist
    ) {
      return res.status(400).send({
        error: "description, date and specialist are required",
      });
    }

    if (body.type === "HealthCheck") {
      if (
        typeof body.healthCheckRating !== "number"
      ) {
        return res.status(400).send({
          error: "healthCheckRating is missing",
        });
      }
    }

    if (body.type === "OccupationalHealthcare") {
      if (
        typeof body.employerName !== "string" ||
        !body.employerName
      ) {
        return res.status(400).send({
          error: "employerName is missing",
        });
      }
    }

    if (body.type === "Hospital") {
      if (
        typeof body.discharge !== "object" ||
        body.discharge === null
      ) {
        return res.status(400).send({
          error: "discharge is missing",
        });
      }
    }

    if (
      body.type !== "HealthCheck" &&
      body.type !== "OccupationalHealthcare" &&
      body.type !== "Hospital"
    ) {
      return res.status(400).send({
        error: "Invalid entry type",
      });
    }

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const patient = patientService.findById(id);

    if (!patient) {
      return res.status(404).send({
        error: "Patient not found",
      });
    }

    // At this point body still needs to be converted/validated as NewEntry
    const addedEntry = patientService.addEntry(
      body as NewEntry,
      patient
    );

    return res.status(201).send(addedEntry);

  } catch (error: unknown) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return res.status(400).send({
        error: error.issues,
      });
    }

    return res.status(400).send({
      error: "unknown error",
    });
  }
});

export default router;