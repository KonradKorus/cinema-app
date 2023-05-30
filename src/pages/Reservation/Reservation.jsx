import React from 'react';
import { useParams } from 'react-router-dom';

const Reservation = () => {
  const { reservationId } = useParams();

  return <div>Reservation/{reservationId}</div>;
};

export default Reservation;
