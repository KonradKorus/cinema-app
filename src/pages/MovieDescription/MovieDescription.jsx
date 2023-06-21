import React from 'react';
import { useParams } from 'react-router-dom';
import { moviesMock } from '../../utils/moviesMock';
import YouTube from 'react-youtube';
import './MovieDescription.css';

const MovieDescription = () => {
  const { movieId } = useParams();
  const film = moviesMock.find((film) => film.id === parseInt(movieId, 10));

  if (!film) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Film not found</h1>
      </div>
    );
  }

  return (
    <div className='main-container'>
      <div className='upper-container'>
        <img src={film.photo} alt={film.title} />
        <div className='whole-info-container'>
          <div className="film-info">
            <h2>{film.title}</h2>
            <p>Kategoria: {film.genre}</p>
            <p>Wiek: {film.ageRestriction}</p>
            <p>Czas trwania: {film.duration}</p>
            <p>Napisy: {film.subtitles}</p>
          </div>
          <div className="film-description">
            <p>{film.description}</p>
          </div>
        </div>
      </div>

      <div className="film-player">
        <YouTube videoId={film.trailerLink} />
      </div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/97zD7xeqSZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div >
  );
}

export default MovieDescription;
