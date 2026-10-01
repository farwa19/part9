import type {
  Diagnosis,
  OccupationalHealthcareEntry as HealthCheckEntryType,
} from '../../types';
import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined';
const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
        <MedicationLiquidOutlinedIcon></MedicationLiquidOutlinedIcon>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
       <p>{entry.specialist}</p>
        <p>{entry.employerName}</p>
        <p>{entry.sickLeave?.startDate}</p>
        <p>{entry.sickLeave?.endDate}</p>
      
      

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

  export default OccupationalHealthcare;