import { 
  TextField, 
  Button, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  InputLabel, 
  Select, 
  Checkbox,
  ListItemText,
  MenuItem, 
  SelectChangeEvent } from "@mui/material";
import { HealthCheckEntry } from "../../types";

interface addEntryModalProps {
  formState: Omit<HealthCheckEntry, 'id'>,
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void
}

const AddEntryModal = ({ formState, handleChange, handleSelectChange }: addEntryModalProps) => {
  const diagnosisOptions = ["M51.2", "Z57.1", "J10.1"];

  return (
    <>
      <TextField
        id="description"
        name="description"
        value={formState.description}
        onChange={handleChange}
        label="Description"
        variant="outlined"
      />
      <TextField
        id="date"
        type="date"
        name="date"
        value={formState.date}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        id="specialist"
        name="specialist"
        value={formState.specialist}
        onChange={handleChange}
        label="Specialist"
        variant="outlined"
      />

      <FormControl>
        <FormLabel id="health-check-rating-label">Health Check Rating</FormLabel>
        <RadioGroup
          aria-labelledby="health-check-rating-label"
          name="healthCheckRating"
          value={formState.healthCheckRating}
          onChange={handleChange}
          style={{display: 'flex', flexDirection: 'row'}}
        >
          <FormControlLabel value={0} control={<Radio />} label="0" />
          <FormControlLabel value={1} control={<Radio />} label="1" />
          <FormControlLabel value={2} control={<Radio />} label="2" />
          <FormControlLabel value={3} control={<Radio />} label="3" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosisCodes"
          name="diagnosisCodes"
          multiple
          value={formState.diagnosisCodes}
          onChange={handleSelectChange}
          renderValue={(selected) => (selected as string[]).join(', ')}
        >
          {diagnosisOptions.map((code) => (
            <MenuItem key={code} value={code}>
              <Checkbox checked={(formState.diagnosisCodes || []).indexOf(code) > -1} />
              <ListItemText primary={code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained">Add</Button>
    </>
  );
};

export default AddEntryModal;
