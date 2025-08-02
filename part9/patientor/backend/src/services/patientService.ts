import patientData from '../data/patients';
import { Patient ,NonssnPatient } from '../types';


const patients: Patient[] = patientData;

const getPatient = ():NonssnPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }))
}

export default {
    getPatient
}