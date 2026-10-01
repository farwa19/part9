import type {
  Diagnosis,
  HealthCheckEntry as HealthCheckEntryType,
} from '../../types';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
const HealthCheckEntry = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div>
        <MedicalInformationOutlinedIcon></MedicalInformationOutlinedIcon>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
       <p> <strong>Diagnose by: </strong>{entry.specialist}</p>
        <p>{entry.employerName}</p>
      

      {entry.diagnosisCodes?.map(code => {
        const diagnosis = diagnoses.find(d => d.code === code);

        return (
          <p key={code}>
            {code} {diagnosis?.name}
          </p>
        );
      })}
    </div>
  );
};

export default HealthCheckEntry;