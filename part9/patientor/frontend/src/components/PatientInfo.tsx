import type { Patient } from "../types"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from '../services/patients';

const PatientInfo = () => {
  const {id} = useParams<{id: string}>();
  const [patient, setPatient] = useState<Patient|null>(null);
  
  useEffect(() => {
    const fetchPoint = async () => {
      if(!id) return;
      try {
        const data = await patientService.getPatient(id);
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    }
    fetchPoint();
  }, [id])

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin: '10px'}}>
      <Typography variant="h4">{patient.name} {patient.gender.toLowerCase() === 'male' ? <MaleIcon/> : <FemaleIcon /> }</Typography> 
      {patient.ssn && <Typography>ssn: {patient.ssn}</Typography>}
      <Typography>occupation: {patient.occupation}</Typography>
    </div>
  )
}

export default PatientInfo;