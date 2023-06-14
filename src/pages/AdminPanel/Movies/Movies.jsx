import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { moviesMock } from '../../../utils/moviesMock';

const Movies = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(moviesMock);

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
    const filtered = moviesMock.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '1%', flexDirection: 'row', marginLeft: '30%' }}>
        <Link to="/admin-panel">
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            <ArrowBackIcon />
          </Button>
        </Link>
        <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Lista filmów</h1>
      </Container>
      <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: 8, flexDirection: 'row', marginLeft: '30%' }}>
        <span style={{ display: 'inline-block' }}></span>

        <TextField label="Search" value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
        <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
          <SearchIcon />
        </Button>
        <Button variant="contained" color="primary" style={{ marginLeft: '41%' }}>
          Dodaj film
        </Button>
      </Container>
      <Container sx={{ marginLeft: '30%' }}>
        {filteredMovies.map((movie, index) => (
          <div key={movie.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1%' }}>
            <span style={{ display: 'inline-block' }}>{index + 1}.</span>
            <span style={{ flexGrow: 1, marginLeft: '1rem', fontWeight: 'bold' }}>{movie.title}</span>
            <div style={{ display: 'flex', gap: '1rem', marginRight: '25%' }}>
              <Button variant="contained" color="primary">
                Usun
              </Button>
              <Button variant="contained" color="primary">
                Edytuj
              </Button>
              <Button variant="contained" color="primary">
                Stworz wydarzenie
              </Button>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Movies;
