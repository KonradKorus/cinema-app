import React, {useEffect, useState} from 'react';
import {Button, Container, MenuItem, Select, TextField} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import {moviesMock} from "../../../utils/moviesMock";
import dayjs from 'dayjs';


const MovieForm = () => {
  const {movieId} = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Komedia');
  const [selectedImage, setSelectedImage] = useState(null);
  const [movie, setMovie] = useState(null);

  const findMovieById = (id) => {
    return moviesMock.find(movie => movie.id === parseInt(id));
  };
  useEffect(() => {
    const selectedMovie = findMovieById(movieId);
    setMovie(selectedMovie);
  }, [movieId]);

  useEffect(() => {
    if (movie && movie.date) {
      setSelectedDate(movie.date);
    } else {
      setSelectedDate(null);
    }
  }, [movie]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
      <div>
        {(movie || !movie) && (
            <div>
              <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '10px', flexDirection: 'row', marginLeft: '30%' }}>
                <Link to="/Movies">
                  <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    <ArrowBackIcon />
                  </Button>
                </Link>
                <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Edycja/dodawanie filmu</h1>
              </Container>
              <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{width: '500px'}}>
                  <span style={{display: 'block' }}>Tytuł</span>
                  <TextField style={{marginBottom:'10px', width: '100%'}} value={movie ? movie.title : ""} />
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
                    <span style={{ display: 'block' }}>Czas trwania</span>
                    <TextField value ={movie ? movie.duration : ""}/>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '500px' }}>
                  <div style={{ marginRight: '16px', width: '100%' }}>
                    <span style={{ display: 'block' }}>Dolna granica wieku</span>
                    <TextField value ={movie ? movie.ageRestriction : ""}/>
                  </div>
                </div>
                <div style={{ alignItems: 'center', width: '500px', marginBottom: '10px' }}>
                  <div>
                    <span style={{ display: 'block' }}>Opis</span>
                    <TextField
                        value ={movie ? movie.description : ""}
                        multiline
                        rows={4}
                        sx={{ "& .MuiInputBase-root": { height: 100 } }} // Usuń overflowY: "auto"
                        style={{ width: '100%', overflowWrap: "break-word" }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '500px' }}>
                  <div style={{ marginRight: '16px', width: '100%' }}>
                    <span style={{ display: 'block'}}>Kategoria</span>
                    <Select value={selectedCategory} onChange={handleCategoryChange} style={{width: '100%'}}>
                      <MenuItem value="Komedia">Komedia</MenuItem>
                      <MenuItem value="Dramat">Dramat</MenuItem>
                      <MenuItem value="Akcja">Akcja</MenuItem>
                    </Select>
                  </div>
                  <div style={{ width: '100%' }}>
                    <span style={{ display: 'block' }}>Link do trailera</span>
                    <TextField style={{ width: '100%' }}/>
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '10px', width: '500px' }}>
                  <div style={{ marginRight: '50px', width: '100%', marginTop: '30px', height:'200px' }}>
                    <span style={{ display: 'block' }}></span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="upload-image"
                    />
                    <label htmlFor="upload-image">
                      <Button variant="contained" component="span">
                        Wybierz zdjęcie
                      </Button>
                    </label>
                    <Button variant="outlined" component="span" style={{marginTop: '50px'}}>
                      Zapisz
                    </Button>
                  </div>
                  <div style={{ width: '100%', alignItems: 'center', marginTop: '15px'}}>
                    <span style={{ display: 'block' }}></span>
                    {selectedImage && <img src={selectedImage} alt="Podgląd zdjęcia" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                  </div>
                </div>
              </Container>
            </div>
        )}
      </div>
  );
};

export default MovieForm;
