import express from 'express';
import cors from 'cors';
import diagnosesrouter from './routes/diagnoses.ts';
import patientrouter from './routes/patients.ts';

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.get('/api/ping', (_req, res) => {
      console.log('someone pinged here');
     
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesrouter);
app.use('/api/patients', patientrouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});