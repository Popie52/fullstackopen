import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Entry, HealthCheckRating } from "../types";

interface Props {
  onSubmit: (entry: Omit<Entry, "id">) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEntry = {
        type: "HealthCheck",
        date,
        description,
        specialist,
        healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        diagnosisCodes: diagnosisCodes.split(",").map((d) => d.trim()),
      };
      onSubmit(newEntry as Omit<Entry, "id">);
      setError("");
    } catch (e) {
      setError("Invalid entry data.");
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6">Add New HealthCheck Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Diagnosis Codes (comma separated)"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Health Check Rating (0–3)"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(e.target.value)}
          margin="normal"
          type="number"
          inputProps={{ min: 0, max: 3 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Entry
        </Button>
      </form>
    </Box>
  );
};

export default AddEntryForm;
