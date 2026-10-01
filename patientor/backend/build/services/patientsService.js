import patientsData from '../data/patient.json' with { type: 'json' };
import { v1 as uuid } from 'uuid';
const patients = patientsData;
const getEntries = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map((patient) => {
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
const findById = (id) => {
    return patients.find(patient => patient.id === id);
};
const addPatient = (entry) => {
    const newPatient = {
        id: uuid(),
        ...entry,
    };
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (entry, patient) => {
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
