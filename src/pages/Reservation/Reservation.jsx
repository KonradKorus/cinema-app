import React, { useEffect, useState } from 'react';
import './seats.css'
import Button from '../Reservation/Button'
import { useParams } from 'react-router-dom'
import { moviesMock } from '../../utils/moviesMock';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const reserved = [
  { row: 4, seat: 11 },
  { row: 3, seat: 1 },
  { row: 5, seat: 6 },
  { row: 1, seat: 5 },
  { row: 3, seat: 7 },
  { row: 3, seat: 8 }
]

const Reservation = () => {
  const { eventId } = useParams(); // Pobranie id z adresu URL
  const [movie, setMovie] = useState(null); // Stan przechowujący dane filmu

  // Znajdowanie filmu na podstawie eventId
  const findMovieById = (id) => {
    return moviesMock.find(movie => movie.id === parseInt(id));
  };

  // Efekt pobierający dane filmu na podstawie eventId
  useEffect(() => {
    const selectedMovie = findMovieById(eventId);
    setMovie(selectedMovie);
  }, [eventId]);

  const selectedSeats = [];
  const handleSeatClick = (id, isSelected) => { isSelected ? selectedSeats.push(id) : selectedSeats.pop(id) };

  const findReservedSeatsID = (seats) => {
    const reservedSeats = seats.map((element) => (element.row - 1) * 12 + element.seat);
    return reservedSeats;
  };

  const renderRow = (rowNumber) => {
    const seats = [];
    for (let i = 0; i < 12; i++) {
      const id = rowNumber * 12 + i + 1;
      seats.push(
        <Button
          key={id}
          id={id}
          className='seatBlack'
          text={i}
          handleSeatClick={handleSeatClick}
        />
      );
    }

    const reservedSeats = findReservedSeatsID(reserved);

    const updatedSeats = seats.map((button) => {
      if (reservedSeats.includes(button.props.id)) {
        return React.cloneElement(button, { className: 'seatRed' });
      } else {
        return button;
      }
    });

    return updatedSeats;
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 0; i < 6; i++) {
      seats.push(<div className="row">{renderRow(i)}</div>);
    }
    return seats;
  };

  return (
    <div>
      {movie && (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '36px' }}>Choose seats</h1>
        <Container sx={{ marginLeft: '25%', marginRight: '25%', textAlign: 'left', marginBottom: 10 }}>
            <ul>
                <li style={{ listStyleType: 'none', cursor: 'pointer' }}>
                    <Container style={{ display: 'flex' }}>
                        <p>
                            Title: {movie.title} <br></br> <br></br>
                            Subtitles {movie.subtitles}, {movie.format}<br></br><br></br>
                            {movie.date} {movie.hour} <br></br><br></br>
                            Hall:

                        </p>
                        <Link style={{ paddingLeft: 400}} to={`/movie-description/${movie.id}`}>
                            <img src={movie.photo} alt={movie.title} style={{ width: '180px', height: 'auto', marginTop: '13px'}} />
                        </Link>
                    </Container>
                </li>
                <div className="screen">
                    <span>Ekran</span>
                </div>
            </ul>
        </Container>
                  <div>
            {renderSeats()}
          </div>
      </div>
      )}
    </div>
  );
};

export default Reservation