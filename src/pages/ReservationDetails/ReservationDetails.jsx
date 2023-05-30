import React from 'react';
import { useParams } from 'react-router-dom';

const ReservationDetails = () => {
  const { reservationId } = useParams();

  return <div>ReservationDetails/{reservationId}</div>;
};

export default ReservationDetails;
