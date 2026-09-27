import { z } from 'zod';


import {
  gender,
 
  type NewPatient
} from './types.js';




const NewEntrySchema = z.object({
  gender: z.nativeEnum(gender),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  name: z.string()
});
const parseNewPatientEntry = (object: unknown): NewPatient => {
     return NewEntrySchema.parse(object);
};

export default parseNewPatientEntry;