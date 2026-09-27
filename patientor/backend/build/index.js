import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.js';
import patientRouter from './routes/patients.js';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
