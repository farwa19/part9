import { useState, SyntheticEvent, useEffect } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import {
  OutlinedInput,
  Box,
  Chip,
  FormControl,
} from "@mui/material";

import diagnoseService from '../../services/diagnoses';
import {
  Entry,
  NewEntry,
  HealthCheckRating,
  Diagnosis,
} from "../../types";


interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;

}

const NewEntryForm = ({
  onCancel,
  onSubmit,

}: Props) => {
      const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
      useEffect(() => {
    diagnoseService.getAll().then(data => {
      setDiagnoses(data);
    });
  }, []);
    console.log(diagnoses);
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState<Entry["type"]>("HealthCheck");

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const [employerName, setEmployerName] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as Entry["type"]);
  };
  const resetForm = () => {
  setDate("");
  setSpecialist("");
  setDescription("");
  setType("HealthCheck");
  setDiagnosisCodes([]);
  setHealthCheckRating(HealthCheckRating.Healthy);
  setEmployerName("");
  setDischargeDate("");
  setDischargeCriteria("");

  onCancel();
};

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (type === "HealthCheck") {
      const newEntry: NewEntry = {
        type: "HealthCheck",
        date,
        specialist,
        description,
        diagnosisCodes,
        healthCheckRating: healthCheckRating 
      };

      onSubmit(newEntry);
      resetForm();
    }

    if (type === "Hospital") {
      const newEntry: NewEntry = {
        type: "Hospital",
        date,
        specialist,
        description,
        diagnosisCodes,
        discharge:
          dischargeDate || dischargeCriteria
            ? {
                date: dischargeDate,
                criteria: dischargeCriteria,
              }
            : undefined,
      };

       onSubmit(newEntry);
    resetForm();
  

    }

    if (type === "OccupationalHealthcare") {
      const newEntry: NewEntry = {
        type: "OccupationalHealthcare",
        date,
        specialist,
        description,
        diagnosisCodes,
        employerName,
      };

        onSubmit(newEntry);
    resetForm();
    }
  };

  return (
    <div>
   
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ marginTop: 2 }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginTop: 2 }}
        />

        <InputLabel sx={{ marginTop: 2.5 }}>
          Type
        </InputLabel>

        <Select
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          <MenuItem value="HealthCheck">
            Health Check
          </MenuItem>

          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>

          <MenuItem value="Hospital">
            Hospital
          </MenuItem>
        </Select>

        {type === "HealthCheck" && (
          <>
            <InputLabel sx={{ marginTop: 2.5 }}>
              Health Check Rating
            </InputLabel>

            <Select
              fullWidth
              value={healthCheckRating.toString()}
              onChange={(event) =>
                setHealthCheckRating(
                  Number(event.target.value) as HealthCheckRating
                )
              }
            >
              <MenuItem value="0">
                0 - Healthy
              </MenuItem>

              <MenuItem value="1">
                1 - Low Risk
              </MenuItem>

              <MenuItem value="2">
                2 - High Risk
              </MenuItem>

              <MenuItem value="3">
                3 - Critical Risk
              </MenuItem>
            </Select>
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) =>
              setEmployerName(target.value)
            }
            sx={{ marginTop: 2 }}
          />
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) =>
                setDischargeDate(target.value)
              }
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{ marginTop: 2 }}
            />

            <TextField
              label="Discharge Criteria"
              fullWidth
              multiline
              rows={2}
              value={dischargeCriteria}
              onChange={({ target }) =>
                setDischargeCriteria(target.value)
              }
              sx={{ marginTop: 2 }}
            />
          </>
        )}

        <FormControl fullWidth sx={{ marginTop: 2 }}>
  <InputLabel id="diagnosis-codes-label">
    Diagnosis Codes
  </InputLabel>

  <Select
    labelId="diagnosis-codes-label"
    multiple
    value={diagnosisCodes}
   onChange={(event) => {
  const value = event.target.value;

  setDiagnosisCodes(
    typeof value === "string" ? value.split(",") : value
  );
}}
    input={<OutlinedInput label="Diagnosis Codes" />}
    renderValue={(selected) => (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((code) => (
          <Chip key={code} label={code} />
        ))}
      </Box>
    )}
  >
    {diagnoses.map((diagnosis) => (
      <MenuItem
        key={diagnosis.code}
        value={diagnosis.code}
      >
        {diagnosis.code} - {diagnosis.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        <Grid
          container
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>

          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add Entry
            </Button>
          </Grid>
        </Grid>
      </form>
     
    </div>
    
  );
};

export default NewEntryForm;