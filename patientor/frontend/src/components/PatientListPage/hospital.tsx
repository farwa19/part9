import type {
  Diagnosis,
  HospitalEntry as HospitalEntrytype,
} from '../../types';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
const HospitalEntry = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntrytype;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
      <MedicationOutlinedIcon></MedicationOutlinedIcon>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
       <p>{entry.specialist}</p>
      {entry.discharge && (
        <>
          <p>Discharge date: {entry.discharge.date}</p>
          <p>{entry.discharge.criteria}</p>
        </>
      )}
    \
       
      

      {entry.diagnosisCodes?.map(code => {
        const diagnosis = diagnoses.find(d => d.code === code);

        return (
          <p key={code}>
            {code} {diagnosis?.name}
          </p>
        );
      })}
    </div>

  );};

  export default HospitalEntry;