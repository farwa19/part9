import patientsData from '../data/patient.json'with { type: 'json' };
import { Patient, NonSensitivePatient, NewPatient } from '../types.js';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return (patientsData as Patient[]).map((patient: Patient): NonSensitivePatient => {
    const { id, name, dateOfBirth, gender, occupation } = patient;
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const findById = (id: string): Patient | undefined => {
  return (patientsData as Patient[]).find((p: Patient) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
  };

  (patientsData as Patient[]).push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};