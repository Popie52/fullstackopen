import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';
import { Request, Response } from 'express';
import middleware from '../middleware/newPatientParser';
import { NewPatient } from '../types';
import { toNewEntry } from '../utils';


const router = express.Router();

router.get("/", async (_req, res) => {
    res.send(patientService.getPatient());
})

router.post("/", middleware.newPatientParser ,async (_req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
        const addedPatient = patientService.addPatient(_req.body);
        res.json(addedPatient);

});

router.get("/:id", async(_req, res) => {
    const id = _req.params.id;
    const ans = patientService.getPatientById(id);
    if(ans) {
        res.json(ans);
    } else {
        res.status(404).json({error: "Not Found"})
    } 

})

router.post(`/:id/entries`, (_req, res) => {
    try {
        const newEntry = toNewEntry(_req.body);
        const added = patientService.addEntry(_req.params.id, newEntry);
        if(!added) {
            return res.status(404).send('Patient not found');
        }
        return res.json(added);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if(error instanceof Error) {
            errorMessage += "Error: "+ error.message;
        }
        return res.status(400).send(errorMessage);
    }
})

router.use(middleware.errorMiddleware);

export default router;