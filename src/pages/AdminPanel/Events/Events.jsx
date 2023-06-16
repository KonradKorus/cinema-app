import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { moviesMock } from '../../../utils/moviesMock';
import { DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';


const Events = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(moviesMock);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    filterMovies();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      filterMovies();
    }
  };

  const filterMovies = () => {
    let filtered = moviesMock;

    if (searchText && selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter(
          (movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase()) &&
              movie.date === formattedDate
      );
    } else if (searchText) {
      filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter((movie) => movie.date === formattedDate);
    }

    setFilteredMovies(filtered);
  };

  return (
      <div>
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '10px', flexDirection: 'row', marginLeft: '30%' }}>
          <Link to="/admin-panel">
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
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
            />
          </LocalizationProvider>

          <div style={{ marginLeft: 'auto' }}>
            <Link to="/EventForm">
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
            {filteredMovies.map((movie, index) => (
                <div key={movie.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1%', gap:'6rem' }}>
                  <span>{index+1}.</span>
                  <span>{movie.date}</span>
                  <span>{movie.hour}</span>
                  <span>{movie.title}</span>
                  <div style={{display: 'flex', marginLeft: 'auto', gap:'1rem'}}>
                    <Button variant="contained" color="primary">
                      Usun
                    </Button>
                    <Link to="/EventForm">
                      <Button variant="contained" color="primary">
                        Edytuj
                      </Button>
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </Container>




      </div>
  )
}

export default Events