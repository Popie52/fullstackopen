import type { Diagnosis, Entry, Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails";
// import AddEntryForm from "./AddEntryForm";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";

type Props = { diagnoses: Diagnosis[] };

const PatientInfo = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPoint = async () => {
      if (!id) return;
      try {
        const data = await patientService.getPatient(id);
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };
    fetchPoint();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleNewEntry = async (entry: Omit<Entry, "id">) => {
  try {
    if (!id) return;
    const updatedPatient = await patientService.addEntry(id, entry);
    console.log("Updated patient from addEntry:", updatedPatient);
    setPatient(updatedPatient);
  } catch (e) {
    console.error("Failed to add entry", e);
  }
};


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </Typography>

      {patient.ssn && <Typography>SSN: {patient.ssn}</Typography>}
      <Typography>Occupation: {patient.occupation}</Typography>

      {/* <AddEntryForm onSubmit={handleNewEntry} /> */}
      <AddHealthCheckEntryForm diagnoses={diagnoses} onSubmit={handleNewEntry} />

      <Typography variant="h5" sx={{ mt: 3 }}>
        Entries
      </Typography>

      {Array.isArray(patient.entries) &&
  patient.entries.map((entry) => (
    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
  ))
}

      {/* <List>
        {patient.entries.map((entry: Entry) => (
          <Box key={entry.id} sx={{ mb: 2, border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {entry.date}
            </Typography>
            <Typography variant="body1">{entry.description}</Typography>

            {entry.diagnosisCodes && (
              <List dense>
                {entry.diagnosisCodes.map(code => (
                  <ListItem key={code} sx={{ pl: 2 }}>
                    <ListItemText
                      primary={`${code} – ${getDiagnosisName(code)}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </List> */}
    </Box>
  );
};

export default PatientInfo;
