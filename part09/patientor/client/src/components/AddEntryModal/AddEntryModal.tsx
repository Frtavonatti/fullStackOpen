import { 
  TextField, 
  Button, 
  FormControl, 
  FormGroup,
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
import { EntryWithoutId } from "../../types";


interface addEntryModalProps {
  formState: EntryWithoutId,
  entryType: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void,
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void,
  handleEntryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AddEntryModal = ({ formState, entryType, handleChange, handleSelectChange, handleEntryChange }: addEntryModalProps) => {
  const diagnosisOptions = ["M51.2", "Z57.1", "J10.1"];

  return (
    <>
      <FormControl>
      <FormLabel id="entry-type-label">Type of Entry</FormLabel>
        <RadioGroup
          aria-labelledby="entry-type-label"
          name="typeOfEntry"
          value={entryType}
          onChange={handleEntryChange}
          style={{display: 'flex', flexDirection: 'row'}}
        >
          <FormControlLabel value={'HealthCheck'} control={<Radio />} label="HealthCheck" />
          <FormControlLabel value={'Hospital'} control={<Radio />} label="Hospital" />
          <FormControlLabel value={'OccupationalHealthcare'} control={<Radio />} label="OccupationalHealthcare" />
        </RadioGroup>
      </FormControl>

      <TextField
        id="description"
        name="description"
        value={formState.description}
        onChange={handleChange}
        label="Description"
        variant="outlined"
        required
      />
      <TextField
        id="date"
        type="date"
        name="date"
        value={formState.date}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        id="specialist"
        name="specialist"
        value={formState.specialist}
        onChange={handleChange}
        label="Specialist"
        variant="outlined"
        required
      />

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

      { entryType === "HealthCheck" && 
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
      }

      { entryType === "Hospital" && (
        <FormGroup>
          <TextField
            label="Discharge Date"
            type="date"
            name="dischargeDate"
            InputLabelProps={{ shrink: true }}
            value={formState.dischargeDate ?? ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Discharge Criteria"
            type="text"
            name="dischargeCriteria"
            value={formState.dischargeCriteria ?? ''}
            onChange={handleChange}
            margin="normal"
          />
        </FormGroup>
      )}

      { entryType === "OccupationalHealthcare" && (
        <FormGroup>
          <TextField
            label="Employer Name"
            type="text"
            name="employerName"
            value={formState.employerName ?? ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Sick Leave Start"
            type="date"
            name="sickLeaveStartDate"
            InputLabelProps={{ shrink: true }}
            value={formState.sickLeaveStartDate ?? ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Sick Leave End"
            type="date"
            name="sickLeaveEndDate"
            InputLabelProps={{ shrink: true }}
            value={formState.sickLeaveEndDate ?? ''}
            onChange={handleChange}
            margin="normal"
          />
        </FormGroup>
      )}
      
      <Button type="submit" variant="contained">Add</Button>
    </>
  );
};

export default AddEntryModal;
