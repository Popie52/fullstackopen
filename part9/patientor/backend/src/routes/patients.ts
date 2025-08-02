import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get("/", async (_req, res) => {
    res.send(patientService.getPatient());
})

export default router;