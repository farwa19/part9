import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import type { Patient,Diagnosis,Entry, NewEntry } from '../../types';
import { Gender } from '../../types';
import { Alert, Button } from '@mui/material';
import OccupationalHealthcare from './OccupationalHealthcare';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './hospital';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import NewEntryForm from './NewEntryForm';

const createEntry = async (id: string, entry: NewEntry) => {
  return await patientService.createEntry(id, entry);
};

const Entrydetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;

    

    default:
      return null;
  }
};
const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;

    case Gender.Female:
      return <FemaleIcon />;

    default:
      return null;
  }
};
const PatientPage = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);
  console.log("SHOW FORM", showForm);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diagnoseService.getAll().then(data => {
      setDiagnoses(data);
    });
  }, []);

  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getbtid(id).then(data => {
        setPatient(data);
      });
    }
  }, [id]);

  console.log(patient?.entries);

  if (!patient) {
    return <div>Loading...</div>;
  }
  {patient.entries.map((entry, index) => {
  console.log("ENTRY", index, entry);

  return (
    <Card key={entry?.id ?? index} sx={{ minWidth: 275 }}>
      <CardContent>
        {entry ? (
          <Entrydetails
            entry={entry}
            diagnoses={diagnoses}
          />
        ) : (
          <p>Invalid entry</p>
        )}
      </CardContent>
    </Card>
  );
});}

  return (
    <div>
      <h2>Name: {patient.name}</h2>

      <p>
        Gender: <GenderIcon gender={patient.gender} />
      </p>

      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>

      <h3>entries</h3>

      {patient.entries.map(entry => (
        <Card key={entry.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Entrydetails
              entry={entry}
              diagnoses={diagnoses}
            />
          </CardContent>
        </Card>
      ))}

      <div>
         {error && (
  <Alert severity="error">
    {error}
  </Alert>
)}
      {showForm ? (
        <NewEntryForm
  onCancel={() => setShowForm(false)}
  onSubmit={(values) => {
    console.log("FORM VALUES:", values);
    

    createEntry(patient.id, values)
    //empty all forms and close the form

      .then((newEntry) => {
        console.log("NEW ENTRY FROM BACKEND:", newEntry);

        if ('entries' in newEntry) {
          setPatient(newEntry);
        } else {
          setPatient({
            ...patient,
            entries: [...patient.entries, newEntry],
          });
        }

        setShowForm(false);
      })
      .catch((error) => {
        console.error("CREATE ENTRY ERROR:", error);

        setError(
          error.response?.data?.error ||
          "Failed to create entry"
        );
          setTimeout(() => {
            setError(null);
          }, 5000);
        
      });
  }}
/>
      ) : (
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Add New Entry
        </Button>
      )}
      </div>
    </div>
  );
};

export default PatientPage;