import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './Repertoire.css';
import Moment from 'moment'
import axios from 'axios';



const Repertoire = () => {
  const [repertuar, setRepertuar] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/screenings?upcoming_events=false&page=1&size=50`);
      const data = await response.json();
      setRepertuar(data);
    }
    fetchMovies();
  }, []);

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [searchText, setSearchText] = useState('');

  const filterData = (searchData) => {
    const url = `${process.env.REACT_APP_API_URL}/screenings?upcoming_events=false&page=1&size=50&screening_date=${searchData.data}&title=${searchData.tytul}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRepertuar(data);
      })
      .catch(error => console.error(error));
  };

  const handleSearch = () => {
    const searchData = {
      data: selectedDate.format('YYYY-MM-DD'),
     
      tytul: searchText
    };

    filterData(searchData);
    console.log('Wyszukiwanie...');
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleReservationClick = (filmId) => {
    console.log('Clicked on "Rezerwacja" button for film ID:', filmId);
  };

  const handleFilmClick = (filmId) => {
    console.log('Kliknięto film o ID:', filmId);
    alert(`Kliknięto film o ID: ${filmId}`);
  };

  const handleDateChange = (data) => {
    setSelectedDate(data);
  };

  const findCategoryName = async (categoryId) => {
  try {
    const response = await axios.get(`/category/${categoryId}`);
    const categoryData = response.data;
    return categoryData.name;
  } catch (error) {
    console.error('Błąd podczas pobierania nazwy kategorii:', error);
    return '';
  }
};

useEffect(() => {
  const fetchCategoryName = async () => {
    const categoryName = await findCategoryName(film.repertoire.movie.category_id);
    setCategoryName(categoryName);
  };

  fetchCategoryName();
}, [film.repertoire.movie.category_id]);


  const [categoryName, setCategoryName] = useState('');


  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '36px' }}>Teraz gramy</h1>
      <Container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'left', marginBottom: 8 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker
            value={selectedDate}
            onChange={(date) => handleDateChange(dayjs(date))}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
        <span style={{ width: '30px', display: 'inline-block' }}></span>
        <span style={{ width: '30px', display: 'inline-block' }}></span>

        <TextField
          label="Search"
          value={searchText}
          onChange={handleSearchTextChange}
        />

        <Button variant="contained" color="primary" onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </Container>

      <h2 style={{ textAlign: 'center', fontSize: '28px', cursor: 'pointer' }}>Repertuar na dzień {selectedDate.format('DD/MM/YYYY').toLocaleString() + ""}</h2>
      <Container sx={{ marginLeft: '25%', marginRight: '25%', textAlign: 'left', marginBottom: 10 }}>
        <ul>
          {console.log(repertuar.items)}
          {repertuar.items && repertuar.items.map((film) => (
            
            <li key={film.id} style={{ listStyleType: 'none', cursor: 'pointer' }}>
              <Container style={{ display: 'flex' }}>
                <p>
                  <Link to={`/movie-description/${film.id}`}>
                    <h3 style={{ fontSize: '28px' }}>{film.repertoire.movie.title}</h3>
                  </Link>
                  Data & godzina: {Moment(film.start_time).format('DD/MM/YYYY, HH:mm')}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Gatunek: {categoryName}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Wiek: {film.repertoire.movie.age_restrictions}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Czas trwania: {film.repertoire.movie.duration_minutes}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Napisy: {film.translation}
                </p>
                <Link style={{ paddingLeft: 40 }} to={`/movie-description/${film.id}`}>
                  <img src={film.repertoire.movie.image} alt={film.title} style={{ width: '180px', height: 'auto', marginTop: '50px' }} />
                </Link>
              </Container>
              <Link to={`/screening/${film.id}`}>
                <Button style={{ marginLeft: '40px', marginBottom: '40px' }} variant="contained" color="primary" onClick={() => handleReservationClick(film.id)}>
                  Rezerwacja
                </Button>
              </Link>
            </li>
          ))} 
        </ul>
      </Container>
    </div >
  );
}

export default Repertoire