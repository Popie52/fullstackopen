import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  // OutlinedTextFieldProps,
  // FilledTextFieldProps,
  // StandardTextFieldProps,
  // TextFieldVariants
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HealthCheckEntry, HealthCheckRating } from "../types";
// import { JSX } from "react/jsx-runtime";
import  { Dayjs } from "dayjs";

interface Props {
  diagnoses: { code: string; name: string }[];
  onSubmit: (entry: Omit<HealthCheckEntry, "id">) => void;
}

const AddHealthCheckEntryForm = ({ diagnoses, onSubmit }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [rating, setRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !description || !specialist) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const entry: Omit<HealthCheckEntry, "id"> = {
        type: "HealthCheck",
        date: date.format("YYYY-MM-DD"),
        description,
        specialist,
        diagnosisCodes: selectedCodes.length > 0 ? selectedCodes : undefined,
        healthCheckRating: rating
      };
      onSubmit(entry);
      setError("");
    } catch (err) {
      setError("Failed to submit entry.");
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6">Add HealthCheck Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          disableFuture
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="diag-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diag-label"
            multiple
            value={selectedCodes}
            label="Diagnosis Codes"
            onChange={(e) => setSelectedCodes(e.target.value as string[])}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} — {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Health Review Rating (0‑3)"
          type="number"
          value={rating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 3) setRating(val as HealthCheckRating);
          }}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, max: 3 }}
          required
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddHealthCheckEntryForm;