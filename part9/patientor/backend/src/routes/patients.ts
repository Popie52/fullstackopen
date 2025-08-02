import express from 'express';
import patientService from '../services/patientService';
import toNewPatients from '../utils';


const router = express.Router();

router.get("/", async (_req, res) => {
    res.send(patientService.getPatient());
})

router.post("/", async (_req, res) => {
    try {
        const newPatients = toNewPatients(_req.body);
        const addedPatient = patientService.addPatient(newPatients);
        res.json(addedPatient);
        
    } catch (error) {
        let errorMessage: string = 'Something went wrong.';
        if(error instanceof Error) {
            errorMessage += "Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }

})

export default router;