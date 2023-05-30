import React from 'react';
import { Grid, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { moviesMock } from '../../utils/moviesMock';

const Home = () => {
  const [movies, setMovies] = useState(moviesMock);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}/movies`);
  //       const jsonData = await response.json();
  //       setMovies(jsonData);
  //       console.log(jsonData.message);
  //     } catch (error) {
  //       console.log('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Call the data fetching function
  // }, []);

  return (
    <>
      <Box
        sx={{
          width: '77%',
          ml: '11.5%',
        }}
      >
        <Typography sx={{ fontSize: '22px', mb: 3 }}>Nowości:</Typography>
        <Carousel sx={{ bgColor: 'pink' }}>
          {movies.map((movie, index) => {
            let prevIndex = index === 0 ? movies.length - 1 : index - 1;
            let nextIndex = index === movies.length - 1 ? 0 : index + 1;

            return (
              <Paper
                key={movie.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link
                  href={'movie-description/' + movies[prevIndex].id}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: '0.5s',
                    },
                  }}
                >
                  <img
                    src={movies[prevIndex].photo}
                    style={{
                      width: '300px',
                      height: '45vh',
                      marginTop: '2.5vh',
                      marginRight: '10px',
                    }}
                  />
                </Link>
                <Link
                  href={'movie-description/' + movie.id}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: '0.5s',
                    },
                  }}
                >
                  <img
                    src={movie.photo}
                    style={{ width: '320px', height: '50vh' }}
                  />
                </Link>
                <Link
                  href={'movie-description/' + movies[nextIndex].id}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: '0.5s',
                    },
                  }}
                >
                  <img
                    src={movies[nextIndex].photo}
                    style={{
                      width: '300px',
                      height: '45vh',
                      marginTop: '2.5vh',
                      marginLeft: '10px',
                    }}
                  />
                </Link>
              </Paper>
            );
          })}
        </Carousel>
        <Typography sx={{ fontSize: '22px', mb: 3 }}>W repertuarze:</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid
                key={movie.id}
                item
                xs={6}
                sm={6}
                md={3}
                lg={3}
                xl={2}
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Link
                  href={'movie-description/' + movie.id}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: '0.5s',
                    },
                  }}
                >
                  <img
                    style={{
                      width: '175px',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: '0.5s',
                      },
                    }}
                    src={movie.photo}
                  />
                  <Typography style={{ textAlign: 'center' }}>
                    {movie.title}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
