import React from 'react';
import { Link } from 'react-router-dom';


const Repertoire = () => {

  return (
    <div>
      <h1>Reservation</h1>
      <Link to="/reservation">
        <button>Przejdź do strony rezerwacji</button>
      </Link>
    </div>
  );
};

export default Repertoire;
