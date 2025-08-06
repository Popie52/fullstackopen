import { Diagnosis, Gender, NewEntry, NewPatient } from "./types";
import { z } from 'zod';

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


export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if(!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
}

export const toNewEntry = (object: any): NewEntry => {
  if (!object.type || typeof object.type !== "string") {
    throw new Error("Missing or invalid entry type");
  }

  const baseEntry = {
    date: object.date,
    specialist: object.specialist,
    description: object.description,
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case "Hospital":
      if (!object.discharge || !object.discharge.date || !object.discharge.criteria) {
        throw new Error("Missing hospital discharge info");
      }

      return {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: object.discharge.date,
          criteria: object.discharge.criteria,
        },
      };

    case "HealthCheck":
      if (object.healthCheckRating === undefined || object.healthCheckRating < 0 || object.healthCheckRating > 3) {
        throw new Error("Invalid or missing healthCheckRating");
      }

      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: object.healthCheckRating,
      };

    case "OccupationalHealthcare":
      if (!object.employerName) {
        throw new Error("Missing employerName");
      }

      const sickLeave = object.sickLeave
        ? {
            startDate: object.sickLeave.startDate,
            endDate: object.sickLeave.endDate,
          }
        : undefined;

      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: object.employerName,
        sickLeave,
      };

    default:
      throw new Error(`Unknown entry type: ${object.type}`);
  }
}

export default toNewPatients;