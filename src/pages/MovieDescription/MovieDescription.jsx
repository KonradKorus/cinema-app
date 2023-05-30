import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDescription = () => {
  const { movieId } = useParams();

  return <div>MovieDescription/{movieId}</div>;
};

export default MovieDescription;
