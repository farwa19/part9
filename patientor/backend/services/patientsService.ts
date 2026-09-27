import patientData from '../data/patient.json' with { type: "json" };
import type { NonSensitivePatient,Patient,NewPatient } from '../types.ts'
import { v1 as uuid } from 'uuid'

// ⇨ 'b18794e8-5d0d-417c-b361-ba38e78411b4'
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
const getEntries = () => {
  return patientData;
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();

  const newPatientEntry: Patient = {
    id,
    ...entry
  };

  patientData.push(newPatientEntry);

  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
 addPatient,
 findById
};