import { Gender, NewPatient } from "./types";
import {z} from 'zod';

export const newPatientSchema = z.object({
    name: z.string(),
    ssn: z.string().optional(),
    dateOfBirth: z.iso.date(),
    occupation: z.string(),
    gender: z.enum(Gender)
})


const toNewPatients = (object: unknown): NewPatient => 
{
    return newPatientSchema.parse(object);
} 

export default toNewPatients;