import React from 'react';
import { useParams } from 'react-router-dom';

const Reservation = () => {
  const { eventId } = useParams();

  return <div>Reservation/{eventId}</div>;
};

export default Reservation;
