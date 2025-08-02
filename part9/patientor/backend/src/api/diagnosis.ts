import express from 'express';
import diagnosesRouter from '../routes/diagnosis';
import patientRouter from '../routes/patients';
import cors from 'cors';

const app = express();
app.use(cors())
const PORT = 3001;


app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})