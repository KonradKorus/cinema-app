import React from 'react';
import { useParams } from 'react-router-dom';
import { moviesMock } from '../../utils/moviesMock';


/*const MovieDescription = () => {
  const { movieId } = useParams();

  return <div>MovieDescription/{movieId}</div>;
};

export default MovieDescription;

*/


const MovieDescription = () => {
  //console.log(moviesMock.find((film) => film.id === 1))
  const param  = useParams()
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
      <img src={film.photo} alt={film.title} style={{ width: '300px', height: 'auto' }} />
      <div style={{ display: 'inline-block', marginLeft: '20px' }}>
        <h2>{film.title}</h2>
        <p>
          <strong>Kategoria:</strong> {film.genre}<br />
          <strong>Wiek:</strong> {film.ageRestriction}<br />
          <strong>Czas trwania:</strong> {film.duration}<br />
          <strong>Napisy:</strong> {film.subtitles}
        </p>
      </div>
      <p>{film.description}</p>
    </div>
  );
}

export default MovieDescription;
