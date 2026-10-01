export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type EntryWithoutId = Omit<Entry, 'id'>;
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;


export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export const gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = typeof gender[keyof typeof gender];
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}


export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating =
  typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: {
    date: string;
    criteria: string;
  };
}


export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export type NewEntry =
  | Omit<HealthCheckEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HospitalEntry, "id">;