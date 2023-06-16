import React, { useState} from 'react';
import {Button, Container, MenuItem, Select, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const EventForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHall, setSelectedHall] = useState('Sala_1');
  const [selectedTranslation, setSelectedTranslation] = React.useState('');
  const [selectedFormat, setSelectedFormat] = React.useState('');

  const handleTranslationChange = (event) => {
    setSelectedTranslation(event.target.value);
  };
  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };
  const handleHallChange = (event) => {
    setSelectedHall(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
      <div>
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '10px', flexDirection: 'row', marginLeft: '30%' }}>
          <Link to="/Movies">
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
              <ArrowBackIcon />
            </Button>
          </Link>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Edycja/dodawanie wydarzenia</h1>
        </Container>
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{width: '500px'}}>
            <span style={{display: 'block' }}>Tytuł</span>
            <TextField style={{marginBottom:'10px', width: '100%'}} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '500px' }}>
            <div style={{ marginRight: '16px', marginBottom: '10px', width: '100%' }}>
              <span style={{ display: 'block' }}>Data premiery</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ display: 'block' }}>Cena biletu</span>
              <TextField />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '500px' }}>
            <div style={{ marginRight: '16px', width: '48%' }}>
              <span style={{ display: 'block'}}>Sala</span>
              <Select value={selectedHall} onChange={handleHallChange} style={{width: '100%'}}>
                <MenuItem value="Sala_1">Sala 1</MenuItem>
                <MenuItem value="Sala_2">Sala_2</MenuItem>
                <MenuItem value="Sala_3">Sala_3</MenuItem>
              </Select>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '500px' }}>
            <div style={{ marginRight: '16px', marginBottom: '10px', width: '100%' }}>
              <span style={{ display: 'block' }}>Tłumaczenie</span>
              <RadioGroup value={selectedTranslation} onChange={handleTranslationChange}>
                <FormControlLabel value="Napisy" control={<Radio />} label="Napisy" />
                <FormControlLabel value="Dubbing" control={<Radio />} label="Dubbing" />
                <FormControlLabel value="Lektor" control={<Radio />} label="Lektor" />
                <FormControlLabel value="Brak" control={<Radio />} label="Brak" />
              </RadioGroup>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ display: 'block' }}>Format obrazu</span>
              <RadioGroup value={selectedFormat} onChange={handleFormatChange}>
                <FormControlLabel value="2D" control={<Radio />} label="2D" />
                <FormControlLabel value="3D" control={<Radio />} label="3D" />
              </RadioGroup>
            </div>
          </div>
          <div style={{ display: 'flex', marginBottom: '10px', width: '500px' }}>
            <div style={{width: '100%'}}>
              <span style={{ display: 'block' }}></span>
              <Button variant="contained" component="span" style={{marginTop: '20px'}}>
                Zapisz
              </Button>
            </div>
          </div>
        </Container>
      </div>
  )
}

export default EventForm