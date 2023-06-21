import React, {useEffect, useState} from 'react';
import {Button, Container, MenuItem, Select, TextField, Dialog, DialogTitle } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {addMovieToDatabase, getCategory, getMovie, updateMovie, getMovies, addRepertorie} from '../../../hooks/hook';

const MovieForm = () => {
  const {movieId} = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [selectedAgeRestriction, setSelectedAgeRestriction] = useState(null)
  const [selectedDescription, setSelectedDescription] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [movieData, setMovieData] = useState({

    title: null,
    category_id: null,
    age_restrictions: null,
    description: null,
    image: null,
    trailer_link: null,
    duration_minutes: null,
    release_date: null,
  });

  useEffect(() => {
    const selectedCategoryObj = categories.find((category) => category.name === selectedCategory);
    const categoryId = selectedCategoryObj ? selectedCategoryObj.id : null;

    if (selectedDate) {
      setSelectedDate(selectedDate.length !== 10 ? selectedDate.format('YYYY-MM-DD') : selectedDate);
    }
    const formatedDate = selectedDate;

    setMovieData({
      title: selectedTitle,
      category_id: categoryId,
      age_restrictions: parseInt(selectedAgeRestriction),
      description: selectedDescription,
      image: selectedImage,
      trailer_link: selectedLink,
      duration_minutes: parseInt(selectedDuration),
      release_date: formatedDate,
    });

  }, [movieData])

  useEffect(() => {

    if (movieId !== "0") {
      const fetchData = async () => {
        const movie = await getMovie(movieId)
        const categoryData = await getCategory()
        setCategories(categoryData.items)
        const category = categoryData.items.find(item => item.id = movie.category_id)
        if(movie){
          setSelectedTitle(movie.title);
          setSelectedDate(movie.release_date);
          setSelectedDuration(movie.duration_minutes);
          setSelectedAgeRestriction(movie.age_restrictions);
          setSelectedDescription(movie.description);
          setSelectedCategory(category.name)
          setSelectedLink(movie.trailer_link);
          setSelectedImage(movie.image);
        }

      };
      fetchData();
    }
    else{
      const fetchData = async () => {
        const categoryData = await getCategory()
        setCategories(categoryData.items)
      }
      fetchData()
    }
  }, [movieId]);

  const onSaveClick = async () => {
    if (movieId === '0') {
      setOpenDialog(true);
      try {
        const statement = await addMovieToDatabase(movieData);
        setDialogMessage(statement);

        const response = await getMovies();
        if (response.items.length > 0) {
          const maxId = Math.max(...response.items.map((movie) => movie.id));
          const repertoireData = {
            cinema_id: 1,
            movie_id: parseInt(maxId),
          };
          await addRepertorie(repertoireData);
        }
      } catch (error) {
        console.error(error);
        setDialogMessage('Wystąpił błąd podczas zapisywania filmu.');
      }
    } else {
      setOpenDialog(true);
      try {
        const statement = await updateMovie(movieData, parseInt(movieId));
        setDialogMessage(statement);
      } catch (error) {
        console.error(error);
        setDialogMessage('Wystąpił błąd podczas zapisywania filmu.');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Zamknij okienko dialogowe
  }

  const handleTitleChange = (event) => {
      setSelectedTitle(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
  }

  const handleAgeRestrictionChange = (event) => {
    setSelectedAgeRestriction(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setSelectedDescription(event.target.value)
  }
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLinkChange = (event) => {
    setSelectedLink(event.target.value)
  }

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


  return (
      <div style={{minHeight: '822px'}}>
            <div>
              <Container sx={{ display: 'flex', textAlign: 'left', marginBottom: '10px', flexDirection: 'row', marginLeft: '30%' }}>
                <Link to="/Movies">
                  <Button variant="outlined" color="primary" style={{ marginTop: '10px' }}>
                    <ArrowBackIcon />
                  </Button>
                </Link>
                <h1 style={{ textAlign: 'center', fontSize: '24px', marginLeft: '16px' }}>Edycja/dodawanie filmu</h1>
              </Container>
              <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{width: '500px'}}>
                    <span style={{ display: 'block' }}>Tytuł</span>
                    <TextField
                        id="title"
                        style={{ marginBottom: '10px', width: '100%' }}
                        value={selectedTitle}
                        onChange={handleTitleChange}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', width: '500px' }}>
                  <div style={{ marginRight: '16px', marginBottom: '10px', width: '100%' }}>
                    <span style={{ display: 'block' }}>Data premiery</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                          id="date"
                          value={selectedDate && dayjs(selectedDate)}
                          onChange={handleDateChange}
                          renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <span style={{ display: 'block' }}>Czas trwania (w minutach)</span>
                    <TextField
                        id="duration"
                        value ={selectedDuration}
                        onChange={handleDurationChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '500px' }}>
                  <div style={{ marginRight: '16px', width: '100%' }}>
                    <span style={{ display: 'block' }}>Dolna granica wieku</span>
                    <TextField
                        id="age_restriction"
                        value ={selectedAgeRestriction}
                        onChange ={handleAgeRestrictionChange}
                    />
                  </div>
                </div>
                <div style={{ alignItems: 'center', width: '500px', marginBottom: '10px' }}>
                  <div>
                    <span style={{ display: 'block' }}>Opis</span>
                    <TextField
                        id = "description"
                        value ={selectedDescription}
                        multiline
                        rows={4}
                        sx={{ "& .MuiInputBase-root": { height: 100 } }} // Usuń overflowY: "auto"
                        style={{ width: '100%', overflowWrap: "break-word" }}
                        onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '500px' }}>
                  <div style={{ marginRight: '16px', width: '100%' }}>
                    <span style={{ display: 'block'}}>Kategoria</span>
                    <Select id="category" value={selectedCategory} onChange={handleCategoryChange} style={{ width: '100%' }}>
                      {categories.map((category) => (
                          <MenuItem key={category.id} value={category.name}>
                            {category.name}
                          </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div style={{ width: '100%' }}>
                    <span style={{ display: 'block' }}>Link do trailera</span>
                    <TextField
                        id="link"
                        style={{ width: '100%' }}
                        value={selectedLink}
                        onChange={handleLinkChange}
                    />
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
                      <Button variant="outlined" component="span">
                        Wybierz zdjęcie
                      </Button>
                    </label>
                    <Button variant="contained" component="span" style={{marginTop: '50px'}} onClick={onSaveClick}>
                      Zapisz
                    </Button>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                      <DialogTitle>{dialogMessage}</DialogTitle>
                    </Dialog>

                  </div>
                  <div style={{ width: '100%', alignItems: 'center', marginTop: '15px'}}>
                    <span style={{ display: 'block' }}></span>
                    {selectedImage && <img src={selectedImage} alt="Podgląd zdjęcia" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                  </div>
                </div>
              </Container>
            </div>
      </div>
  );
};

export default MovieForm;
