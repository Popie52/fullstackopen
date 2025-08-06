import axios from 'axios';
import { Diagnosis } from '../types';

const baseUrl = '/api/diagnoses';

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(baseUrl);
  return data;
};

export default {
    getAllDiagnoses
}