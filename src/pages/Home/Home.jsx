import React from 'react';
import { Grid, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { moviesMock } from '../../utils/moviesMock';

const Home = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/repertoire/1/movies?latest=false&page=1&size=50`
        );
        const jsonData = await response.json();

        setMovies(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData(); // Call the data fetching function
  }, []);

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
          {movies !== null &&
            movies.items &&
            movies.items.map((movie, index) => {
              let prevIndex = index === 0 ? movies.items.length - 1 : index - 1;
              let nextIndex = index === movies.items.length - 1 ? 0 : index + 1;
              return (
                <Paper
                  key={movie.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Link
                    href={
                      'movie-description/' + movies.items[prevIndex].movie_id
                    }
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: '0.5s',
                      },
                    }}
                  >
                    <img
                      src={movies.items[prevIndex].image}
                      style={{
                        width: '300px',
                        height: '45vh',
                        marginTop: '2.5vh',
                        marginRight: '10px',
                      }}
                    />
                  </Link>
                  <Link
                    href={'movie-description/' + movie.movie_id}
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: '0.5s',
                      },
                    }}
                  >
                    <img
                      src={movie.image}
                      style={{ width: '320px', height: '50vh' }}
                    />
                  </Link>
                  <Link
                    href={
                      'movie-description/' + movies.items[nextIndex].movie_id
                    }
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: '0.5s',
                      },
                    }}
                  >
                    <img
                      src={movies.items[nextIndex].image}
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
            {movies &&
              movies.items &&
              movies.items.map((movie) => (
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
                    href={'movie-description/' + movie.movie_id}
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
                      src={movie.image}
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
