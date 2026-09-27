import patientsData from '../data/patient.json' with { type: 'json' };
import { v1 as uuid } from 'uuid';
const getEntries = () => {
    return patientsData;
};
const getNonSensitiveEntries = () => {
    return patientsData.map((patient) => {
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
    return patientsData.find((p) => p.id === id);
};
const addPatient = (entry) => {
    const newPatient = {
        id: uuid(),
        ...entry,
    };
    patientsData.push(newPatient);
    return newPatient;
};
export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addPatient,
};
