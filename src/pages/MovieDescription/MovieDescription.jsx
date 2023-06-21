import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDescription.css';
import { useState, useEffect } from 'react';
import { categories } from '../../utils/moviesMock';

function convertYouTubeUrl(url) {
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

const MovieDescription = () => {
  const { movieId } = useParams();

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        `${process.env.REACT_APP_API_URL}/repertoire/1/movies?latest=false&page=1&size=50`
      );
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/repertoire/1/movies?latest=false&page=1&size=50`
        );
        const jsonData = await response.json();

        console.log(jsonData);
        setMovies(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData(); // Call the data fetching function
  }, []);

  const film =
    movies !== null && movies.items.find((film) => film.movie_id == movieId);

  if (!film && movies) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Nie znaleziono filmu</h1>
      </div>
    );
  }
  if (!film && !movies) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Proszę czekać...</h1>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="upper-container">
        <img src={film.image} alt={film.title} />
        <div className="whole-info-container">
          <div className="film-info">
            <h2>{film.title}</h2>
            <p>
              Kategoria:{' '}
              {categories.find((cat) => cat.id == film.category_id).name}
            </p>
            <p>Wiek: {film.age_restrictions}</p>
            <p>Czas trwania: {film.duration_minutes}</p>
          </div>
          <div className="film-description">
            <p>Opis: </p>
            <p>{film.description}</p>
          </div>
        </div>
      </div>
      <div className="film-player">
        <iframe
          width="560"
          height="315"
          src={convertYouTubeUrl(film.trailer_link)}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDescription;
