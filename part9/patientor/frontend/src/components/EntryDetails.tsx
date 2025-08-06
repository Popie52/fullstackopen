import { Diagnosis, Entry, HealthCheckRating } from "../types";
import { Favorite, LocalHospital, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type EntryDetailsProps = {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HealthCheckRatingColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return "grey";
  }
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const renderDiagnosisList = () =>
    entry.diagnosisCodes?.map((code) => {
      const diagnosis = diagnoses.find((d) => d.code === code);
      return (
        <li key={code}>
          <Typography variant="body2">
            {code} {diagnosis?.name}
          </Typography>
        </li>
      );
    });

  switch (entry.type) {
    case "Hospital":
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          <Typography variant="subtitle1">
            {entry.date} <LocalHospital />
          </Typography>
          <Typography>{entry.description}</Typography>
          {entry.diagnosisCodes && <ul>{renderDiagnosisList()}</ul>}
          <Typography variant="body2">
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          <Typography variant="subtitle1">
            {entry.date} <Work /> <strong>{entry.employerName}</strong>
          </Typography>
          <Typography>{entry.description}</Typography>
          {entry.diagnosisCodes && <ul>{renderDiagnosisList()}</ul>}
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );

    case "HealthCheck":
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          <Typography variant="subtitle1">
            {entry.date} <Favorite sx={{ color: HealthCheckRatingColor(entry.healthCheckRating) }} />
          </Typography>
          <Typography>{entry.description}</Typography>
          {entry.diagnosisCodes && <ul>{renderDiagnosisList()}</ul>}
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
