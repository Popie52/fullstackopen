import { newPatientSchema } from "./utils";
import {z} from "zod";

export interface Diagnosis {
    code : string,
    name: string,
    latin ?: string 
}

export enum Gender {
    Male ='male',
    Female = 'female',
    Other = 'other'
}

export interface Entry {

}

export interface Patient extends NewPatient {
    id: string,
    entries: Entry[]
}

export type NonssnPatient = Omit<Patient, 'ssn'| 'entries'>;
export type NewPatient = z.infer<typeof newPatientSchema>;
