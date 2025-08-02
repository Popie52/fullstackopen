import DiagnosesData from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = DiagnosesData;


const getDiagnoses= (): Diagnosis[] => {
    return diagnoses;
}


export default {
    getDiagnoses
}