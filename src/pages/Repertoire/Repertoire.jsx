import React from 'react';
import { Link } from 'react-router-dom';


const Repertoire = () => {

  return (
    <div>
      <Link to="/reservation">
        <button>Przejdź do strony rezerwacji</button>
      </Link>
    </div>
  );
};

export default Repertoire;
