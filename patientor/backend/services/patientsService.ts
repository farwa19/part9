import patientsData from '../data/patient.json' with { type: 'json' };
import { Patient, NonSensitivePatient, NewPatient ,Entry,NewEntry} from '../types.js';
import { v1 as uuid } from 'uuid';

const patients = patientsData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map((patient: Patient): NonSensitivePatient => {
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
  return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};
const addEntry = (entry: NewEntry, patient: Patient): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};
export default {
  addEntry,
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};