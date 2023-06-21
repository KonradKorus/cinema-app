import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {getMovies, deleteMovie, deleteRepertoire} from '../../../hooks/hook';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      setMovies(data.items);
      setFilteredMovies(data.items);
    };
    fetchData();
    if (refreshPage) {
      setRefreshPage(false); // Ustawienie wartości refreshPage na false, aby uniknąć zapętlenia
      fetchData();
    }
  }, [refreshPage]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleDeleteClick = (id) => {
    setMovieIdToDelete(parseInt(id));
    setDialogMessage("Czy na pewno usunąć film?");
    setDeleteConfirmationDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteConfirmationDialog(false);
  };

  const handleOkayClick = async (id) => {
    handleCloseDialog();
    await deleteRepertoire(parseInt(id));
    deleteMovie(parseInt(id))
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
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '1%', flexDirection: 'row', marginLeft: '30%' }}>
          <Link to="/admin-panel">
            <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>
              <ArrowBackIcon />
            </Button>
          </Link>
          <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Lista filmów</h1>
        </Container>
        <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: 8, flexDirection: 'row', marginLeft: '30%', width: '900px' }}>
          <span style={{ display: 'inline-block' }}></span>

          <TextField label="Search" value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
          <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
            <SearchIcon />
          </Button>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/MovieForm/0">
              <Button variant="contained" color="primary">
                Dodaj film
              </Button>
            </Link>
          </div>
        </Container>
        <Container sx={{ marginLeft: '30%', width: '900px' }}>
          {filteredMovies.map((movie, index) => (
              <div key={movie.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1%' }}>
                <span style={{ display: 'inline-block' }}>{index + 1}.</span>
                <span style={{ flexGrow: 1, marginLeft: '1rem', fontWeight: 'bold' }}>{movie.title}</span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button key={movie.id} variant="outlined" color="primary" onClick={() => handleDeleteClick(movie.id)}>
                    Usun
                  </Button>
                  <Link to={`/MovieForm/${movie.id}`}>
                    <Button variant="outlined" color="primary">
                      Edytuj
                    </Button>
                  </Link>
                  <Link to={`/EventForm/${movie.id}/0`}>
                    <Button variant="outlined" color="primary">
                      Stworz wydarzenie
                    </Button>
                  </Link>
                </div>
              </div>
          ))}
        </Container>
        <Dialog open={deleteConfirmationDialog} onClose={handleCloseDialog} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>{dialogMessage}</DialogTitle>
          <DialogContent style={{ textAlign: 'center' }}>
            Wszystkie dane powiązane z tym filmem zostaną utracone
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleCloseDialog}>Anuluj</Button>
              <Button variant="contained" color="primary" onClick={() => handleOkayClick(movieIdToDelete)}>OK</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openDialog} onClose={handleCloseDialog} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>{dialogMessage}</DialogTitle>
        </Dialog>
      </div>
  );
};

export default Movies;
