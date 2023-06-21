import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Dialog, DialogContent, DialogTitle, TextField} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import {getScreenings, deleteScreening} from "../../../hooks/hook";


const Events = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([])
  const [refreshPage, setRefreshPage] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScreenings();
      setEvents(data.items)
      setFilteredEvents(data.items)
    };
    fetchData();
    if (refreshPage) {
      setRefreshPage(false);
      fetchData();
    }
  }, [refreshPage]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    if(selectedDate) {
      const filtered = events.filter((event) =>
          event.repertoire.movie.title.toLowerCase().includes(searchText.toLowerCase()) &&
          event.start_time.split("T")[0] === selectedDate.format('YYYY-MM-DD')
      );
      setFilteredEvents(filtered);
    }else{
      const filtered = events.filter((event) =>
          event.repertoire.movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEvents(filtered);
    }

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit()
    }
  };

  const handleDeleteClick = (id) => {
    setEventIdToDelete(parseInt(id));
    setDialogMessage("Czy na pewno usunąć wydarzenie?");
    setDeleteConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteConfirmationDialog(false);
  };

  const handleOkayClick = (id) => {
    handleCloseDialog();
    deleteScreening(parseInt(id))
        .then(statement => {
          setDialogMessage((statement));
          setOpenDialog(true);
          setRefreshPage(true); // Ustawienie stanu refreshPage na true
        })
        .catch(error => {
          console.error(error);
          setDialogMessage("Wystąpił błąd podczas usuwania filmu");
          setOpenDialog(true);
        });
  };

  return (
      <div style={{minHeight: '822px'}}>
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '10px', flexDirection: 'row', marginLeft: '30%' }}>
          <Link to="/admin-panel">
            <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>
              <ArrowBackIcon />
            </Button>
          </Link>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Lista wydarzeń</h1>
        </Container>
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: 8, flexDirection: 'row', marginLeft: '30%', width:'900px' }}>
          <TextField label="Search" value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
          <Button variant="contained" color="primary" onClick={handleSearchSubmit} style={{marginRight:'10px'}}>
            <SearchIcon />
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                format="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <div style={{ marginLeft: 'auto' }}>
            <Link to="/Movies">
              <Button variant="contained" color="primary">
                Dodaj wydarzenie
              </Button>
            </Link>
          </div>
        </Container>
        <Container sx={{ display: 'flex', marginBottom: '10px', marginLeft:'30%', width:'900px'}}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1%', marginLeft:'110px' }}>
            <span style = {{fontWeight:'bold'}}>Data</span>
            <span style = {{fontWeight:'bold', marginLeft: '143px'}}>Godzina</span>
            <span style = {{fontWeight:'bold', marginLeft: '75px'}}>Tytuł</span>
          </div>

        </Container>
        <Container sx={{marginLeft: '30%', width:'900px'}}>
          <div>
            {filteredEvents.map((event, index) => (
                <div key={event.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1%', gap:'6rem' }}>
                  <span>{index+1}.</span>
                  <span>{event.start_time.split('T')[0]}</span>
                  <span>{event.start_time.split('T')[1].split(':')[0] + ':' + event.start_time.split('T')[1].split(':')[1]}</span>
                  <span>{event.repertoire.movie.title}</span>
                  <div style={{display: 'flex', marginLeft: 'auto', gap:'1rem'}}>
                    <Button variant="outlined" color="primary" onClick={() => handleDeleteClick(event.id)}>
                      Usun
                    </Button>
                    <Link to={`/EventForm/${event.repertoire.movie.id}/${event.id}`}>
                      <Button variant="outlined" color="primary">
                        Edytuj
                      </Button>
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </Container>
        <Dialog open={deleteConfirmationDialog} onClose={handleCloseDialog} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>{dialogMessage}</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            Wszystkie dane powiązane z tym wydarzeniem zostaną utracone
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleCloseDialog}>Anuluj</Button>
              <Button variant="contained" color="primary" onClick={() => handleOkayClick(eventIdToDelete)}>OK</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openDialog} onClose={handleCloseDialog} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>{dialogMessage}</DialogTitle>
        </Dialog>



      </div>
  )
}

export default Events