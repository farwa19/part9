import diagnosesData from '../data/entries.json' with { type: "json" };
import type { Diagnosis } from '../types.ts';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

const addDiagnosis = (): null => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};