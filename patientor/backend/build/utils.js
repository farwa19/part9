import { z } from 'zod';
import { gender } from './types.js';
const NewEntrySchema = z.object({
    gender: z.nativeEnum(gender),
    occupation: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    name: z.string()
});
const parseNewPatientEntry = (object) => {
    return NewEntrySchema.parse(object);
};
export default parseNewPatientEntry;
