import { z } from 'zod';

import {
  gender,
  type Gender,
  type NewPatient
} from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(gender) as string[]).includes(param);
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
    throw new Error('Incorrect or missing gender: ' + value);
  }

  return value;
};
const NewEntrySchema = z.object({
  gender: z.enum(Object.values(gender) as [string, ...string[]]),
  occupation: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  name: z.string()
});
const parseNewPatientEntry = (object: unknown): NewPatient => {
     return NewEntrySchema.parse(object);
};

export default parseNewPatientEntry;