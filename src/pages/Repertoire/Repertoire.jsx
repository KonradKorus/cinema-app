import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDataFromEndpoint } from '../../services/getDataFromEndpoint';

const Repertoire = () => {

  /*const [repertuar, setRepertuar] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      //const response = await getDataFromEndpoint('movies');

      const response = await fetch('https://606591d5-a3a9-4272-abea-3efea2cef0fa.mock.pstmn.io/movies');
      const data = await response.json();
      setRepertuar(data);
    }
    fetchMovies();
  }, []);*/

  //Do celow testowych, docelowo korzystanie z funkcji powyzej
  const [repertuar, setRepertuar] = useState([
    { id: 1, title: "Matrix", hour: "15:30", date: "2023-05-17", photo: "https://fwcdn.pl/fpo/06/28/628/7685907.3.jpg", genre: "Science Fiction", ageRestriction: "16+", duration: "2h 16min", subtitles: "PL", format: "2D" },
    { id: 2, title: "Interstellar", hour: "18:00", date: "2023-05-17", photo: "https://fwcdn.pl/fpo/56/29/375629/7670122.3.jpg", genre: "Sci-Fi, Drama", ageRestriction: "13+", duration: "2h 49min", subtitles: "PL", format: "2D" },
    { id: 3, title: "Pulp Fiction", hour: "20:30", date: "2023-05-17", photo: "https://fwcdn.pl/fpo/10/39/1039/7517880.3.jpg", genre: "Crime, Drama", ageRestriction: "18+", duration: "2h 34min", subtitles: "PL", format: "2D" },
    { id: 4, title: "Incepcja", hour: "23:00", date: "2023-05-17", photo: "https://fwcdn.pl/fpo/08/91/500891/7354571.3.jpg", genre: "Action, Adventure, Sci-Fi", ageRestriction: "16+", duration: "2h 28min", subtitles: "PL", format: "2D" },
  ]);


  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedCategory, setSelectedCategory] = useState('Kategoria');
  const [searchText, setSearchText] = useState('');
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterData = (searchData) => {
    // Tworzymy URL na podstawie danych wyszukiwania
    const url = `https://example.com/api/repertuar?data=${searchData.data}&kategoria=${searchData.kategoria}&tytul=${searchData.tytul}`;

    // Wywołujemy zapytanie do serwera
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Aktualizujemy stan aplikacji z otrzymanymi danymi
        setRepertuar(data);
      })
      .catch(error => console.error(error));
  };

  const handleSearch = () => {
    // Tu można zaimplementować logikę wyszukiwania repertuaru
    // Zbuduj obiekt z danymi wyszukiwania na podstawie wybranych wartości
    const searchData = {
      data: selectedDate.format('YYYY-MM-DD'),
      kategoria: selectedCategory,
      tytul: searchText
    };

    // Wywołaj funkcję pobierającą dane z odpowiednim zapytaniem
    filterData(searchData);
    console.log('Wyszukiwanie...');
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleReservationClick = (filmId) => {
    // Logic for handling the reservation click
    console.log('Clicked on "Rezerwacja" button for film ID:', filmId);
    // Implement the actual reservation functionality here
  };

  const handleFilmClick = (filmId) => {
    // Tutaj możesz zaimplementować nawigację do panelu rezerwacji na podstawie ID filmu
    console.log('Kliknięto film o ID:', filmId);
    alert(`Kliknięto film o ID: ${filmId}`);
    // Przykładowa nawigacja do panelu rezerwacji
    // history.push(`/panel-rezerwacji/${filmId}`);
  };

  const handleDateChange = (data) => {
    setSelectedDate(data);
  };


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

        <Select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          <MenuItem value="Kategoria">Kategoria</MenuItem>
          <MenuItem value="komedia">Komedia</MenuItem>
          <MenuItem value="dramat">Dramat</MenuItem>
          <MenuItem value="akcja">Akcja</MenuItem>
        </Select>

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
          {repertuar.map((film) => (

            <li key={film.id} style={{ listStyleType: 'none', cursor: 'pointer' }}>
              <Container style={{ display: 'flex' }}>
                <p>
                  <h3 style={{ fontSize: '28px' }} onClick={() => handleFilmClick(film.id)}>{film.title}</h3>
                  Date & hour: {film.date}, {film.hour}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Genre: {film.genre}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Age: {film.ageRestriction}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Duration: {film.duration}
                  <hr style={{ width: '400px', marginLeft: 0 }} /> Subtitles: {film.subtitles}, {film.format}
                </p>
                <Link style={{ paddingLeft: 40 }} to="https://www.youtube.com/watch?v=Sagg08DrO5U">
                  <img src={film.photo} alt={film.title} style={{ width: '180px', height: 'auto', marginTop: '50px' }} />
                </Link>
              </Container>
              <Link to="/reservation">
                <Button style={{ marginLeft: '40px', marginBottom: '40px' }} variant="contained" color="primary" onClick={() => handleReservationClick(film.id)}>
                  Reservation
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