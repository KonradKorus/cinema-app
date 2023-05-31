import React from 'react';
import { useParams } from 'react-router-dom';
import { moviesMock } from '../../utils/moviesMock';
import YouTube from 'react-youtube';
import './MovieDescription.css';


/*const MovieDescription = () => {
  const { movieId } = useParams();

  return <div>MovieDescription/{movieId}</div>;
};

export default MovieDescription;

*/


const MovieDescription = () => {
  //console.log(moviesMock.find((film) => film.id === 1))
  const param = useParams()
  const movieId = param.movieId
  const film = moviesMock.find((film) => film.id === parseInt(movieId, 10));

  if (!film) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Film not found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="film-container">
        <div className="film-image">
          <img src={film.photo} alt={film.title} />
        </div>
        <div className="film-info">
          <h2>{film.title}</h2>
          <p>Kategoria: {film.genre}</p>
          <p>Wiek: {film.ageRestriction}</p>
          <p>Czas trwania: {film.duration}</p>
          <p>Napisy: {film.subtitles}</p>
        </div>
      </div>
      <div className="film-player">
        <YouTube videoId={film.trailerLink} />
      </div>
    </div>
  );
}

export default MovieDescription;
