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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}


interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface OccupationalHealthcareEntry {
    // type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;

}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcare extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave: SickLeave;
}

export interface Patient extends NewPatient {
    id: string,
    entries: Entry[]
}

export type NonssnPatient = Omit<Patient, 'ssn'| 'entries'>;
export type NewPatient = z.infer<typeof newPatientSchema>;
export type NewEntry = Omit<Entry, 'id'>;
