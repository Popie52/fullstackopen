import patientData from '../data/patients';
import { Patient ,NonssnPatient, NewPatient } from '../types';
import {v1 as uuid } from 'uuid';


const patients: Patient[] = patientData;

const getPatient = ():NonssnPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }))
}


const addPatient= (data: NewPatient): Patient => {
    const newPatient = {id: uuid(), ...data, entries: [] };
    patients.push(newPatient);
    return  newPatient;
} 

const getPatientById = (id: string): Patient | undefined => {
    const patient:Patient | undefined = patients.find(e => e.id === id);
    return patient;
}

export default {
    getPatient,
    addPatient,
    getPatientById
}