import React, {useEffect, useState} from 'react';
import {Button, Container, Dialog, DialogTitle, MenuItem, Select, TextField} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {getRepertoire, addScreening, updateScreening, getScreeningById} from '../../../hooks/hook';
import dayjs from "dayjs";

const EventForm = () => {
  const {movieId} = useParams();
  const {eventId} = useParams();


  const [selectedRepertoireId, setSelectedRepertoireId] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedTranslation, setSelectedTranslation] = React.useState('');
  const [selectedFormat, setSelectedFormat] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [pageToBack, setPageToBack] = useState("Movies")

  const [screeningData, setScreeningData] = useState({
    "start_time": null,
    "room_number": null,
    "translation": null,
    "image_format": null,
    "ticket_price": null,
    "repertoire_id": null
  })
  const [screeningDataToUpdate, setScreeningDataToUpdate] = useState({
    "start_time": null,
    "room_number": null,
    "translation": null,
    "image_format": null,
    "ticket_price": null,
  })


  useEffect(() => {
    if (selectedDate) {
      setSelectedDate(selectedDate.length !== 10 ? selectedDate.format('YYYY-MM-DD') : selectedDate);
    }
    const isoDateTime = new Date(`${selectedDate}T${selectedHour}:00.000Z`)
    setScreeningData({
      start_time: isoDateTime,
      room_number: parseInt(selectedHall),
      translation: selectedTranslation,
      image_format: selectedFormat,
      ticket_price: parseFloat(selectedPrice),
      repertoire_id: parseInt(selectedRepertoireId)
    });
    setScreeningDataToUpdate({
      start_time: isoDateTime,
      room_number: parseInt(selectedHall),
      translation: selectedTranslation,
      image_format: selectedFormat,
      ticket_price: parseFloat(selectedPrice),
    });
  }, [screeningData, screeningDataToUpdate])


  useEffect(() => {
    const fetchData = async () => {
      const repertoire = await getRepertoire()
      setSelectedRepertoireId(repertoire.items.find(item => item.movie_id === parseInt(movieId)).id);
      setSelectedTitle(repertoire.items.find(item => item.movie_id === parseInt(movieId)).title)
      const event = await getScreeningById(parseInt(eventId))

      if(eventId !== "0" && event){
          setSelectedDate(event.start_time.split('T')[0])
          setSelectedHour(event.start_time.split('T')[1].split(':')[0] + ':' + event.start_time.split('T')[1].split(':')[1])
          setSelectedHall(event.room_number)
          setSelectedPrice(event.ticket_price)
          setSelectedTranslation(event.translation)
          setSelectedFormat(event.image_format)
          setPageToBack("Events")
      }
    }
      fetchData()
  }, [eventId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleHourChange = (event) =>{
    setSelectedHour(event.target.value)
  }
  const handleHallChange = (event) => {
    setSelectedHall(event.target.value);
  };
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value)
  }
  const handleTranslationChange = (event) => {
    setSelectedTranslation(event.target.value);
  };
  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleSaveClick = async() => {

    if(eventId === "0"){
      setOpenDialog(true);
      try {
        const statement = await addScreening(screeningData);
        setDialogMessage(statement);
      } catch (error) {
        console.error(error);
        setDialogMessage('Wystąpił błąd podczas zapisywania filmu.');
      }
    } else{
      setOpenDialog(true);

      try {
        const statement = await updateScreening(screeningDataToUpdate, parseInt(eventId));
        setDialogMessage(statement);
      } catch (error) {
        console.error(error);
        setDialogMessage('Wystąpił błąd podczas zapisywania filmu.');
      }
    }

  }
  const handleCloseDialog = () => {
    setOpenDialog(false); // Zamknij okienko dialogowe
  }



  return (
      <div style={{minHeight: '822px'}}>
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '10px', flexDirection: 'row', marginLeft: '30%' }}>
          <Link to={`/${pageToBack}`}>
            <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>
              <ArrowBackIcon />
            </Button>
          </Link>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Edycja/dodawanie wydarzenia</h1>
        </Container>
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{width: '500px'}}>
            <span style={{display: 'block' }}>Tytuł</span>
            <TextField style={{marginBottom:'10px', width: '100%'}} value={selectedTitle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '500px' }}>
            <div style={{ marginRight: '16px', marginBottom: '10px', width: '100%' }}>
              <span style={{ display: 'block' }}>Data premiery</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={selectedDate && dayjs(selectedDate)}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ display: 'block' }}>Godzina (np. 16:30) </span>
              <TextField onChange={handleHourChange} value={selectedHour}/>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '500px' }}>
            <div style={{ marginRight: '16px', width: '100%' }}>
              <span style={{ display: 'block'}}>Sala</span>
              <Select value={selectedHall} onChange={handleHallChange} style={{width: '100%'}}>
                <MenuItem value="1">Sala 1</MenuItem>
                <MenuItem value="2">Sala_2</MenuItem>
                <MenuItem value="3">Sala_3</MenuItem>
              </Select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ display: 'block' }} >Cena biletu</span>
              <TextField onChange={handlePriceChange} value={selectedPrice}/>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '500px' }}>
            <div style={{ marginRight: '16px', marginBottom: '10px', width: '100%' }}>
              <span style={{ display: 'block' }}>Tłumaczenie</span>
              <RadioGroup value={selectedTranslation} onChange={handleTranslationChange}>
                <FormControlLabel value="SUBTITLES" control={<Radio />} label="Napisy" />
                <FormControlLabel value="DUBBING" control={<Radio />} label="Dubbing" />
                <FormControlLabel value="VOICE_OVER" control={<Radio />} label="Lektor" />
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
              <Button variant="contained" component="span" style={{marginTop: '20px'}} onClick={handleSaveClick}>
                Zapisz
              </Button>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{dialogMessage}</DialogTitle>
              </Dialog>
            </div>
          </div>
        </Container>
      </div>
  )
}

export default EventForm