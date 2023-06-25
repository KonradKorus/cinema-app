import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Dialog, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  getScreeningById,
  getReservedBookSeats,
  addReservation,
  deleteScreening,
} from '../../hooks/hook';

const Reservation = () => {
  const { eventId } = useParams();
  const [movie, setMovie] = useState([]);
  const [event, setEvent] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [buttonColors, setButtonColors] = useState(Array(72).fill('#282828'));
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getScreeningById(parseInt(eventId));
      const seats = await getReservedBookSeats(parseInt(eventId));
      setReservedSeats(seats);
      console.log(selectedSeats);
      if (data) {
        setEvent(data);
        setMovie(data.repertoire.movie);
        setDate(data.start_time.split('T')[0]);
        setHour(
          data.start_time.split('T')[1].split(':')[0] +
            ':' +
            data.start_time.split('T')[1].split(':')[1]
        );
        if (event.translation === 'SUBTITLES') setTranslation('Napisy');
        if (event.translation === 'DUBBING') setTranslation('Dubbing');
        if (event.translation === 'VOICE_OVER') setTranslation('Lektor');
      }
    };
    fetchData();
  }, [eventId, translation, date, hour]);

  const isSeatReserved = (row, col) => {
    return reservedSeats.some(
      (seat) => seat.row_number === row && seat.seat_number === col
    );
  };
  const handleSeatClick = (index) => {
    setButtonColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = prevColors[index] === '#282828' ? 'green' : '#282828';
      return newColors;
    });

    const row = Math.floor(index / 12) + 1;
    const seat = (index % 12) + 1;

    setSelectedSeats((prevSeats) => {
      const seatExists = prevSeats.some(
        (selectedSeat) =>
          selectedSeat.row_number === row && selectedSeat.seat_number === seat
      );

      if (seatExists) {
        // Remove the seat if it already exists in selectedSeats
        return prevSeats.filter(
          (selectedSeat) =>
            selectedSeat.row_number !== row || selectedSeat.seat_number !== seat
        );
      } else {
        // Add the seat if it doesn't exist in selectedSeats
        return [...prevSeats, { row_number: row, seat_number: seat }];
      }
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveClick = () => {
    setOpenDialog(true);
    const data = {
      screening_id: parseInt(eventId),
      seats: selectedSeats,
    };
    addReservation(data)
      .then((statement) => {
        setDialogMessage(statement);
      })
      .catch((error) => {
        console.error(error);
        setDialogMessage('Wystąpił błąd podczas usuwania filmu');
      });
  };
  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '36px' }}>
          Wybierz miejsca
        </h1>
        <Container
          sx={{ marginLeft: '21.8%', textAlign: 'left', marginBottom: '85px' }}
        >
          <ul>
            <li style={{ listStyleType: 'none', cursor: 'pointer' }}>
              <Container style={{ display: 'flex' }}>
                <p>
                  Tytuł: {movie.title} <br></br> <br></br>
                  {translation}, {event.image_format}
                  <br></br>
                  <br></br>
                  {date} {hour} <br></br>
                  <br></br>
                  Numer sali: {event.room_number}
                </p>
                <Link
                  style={{ paddingLeft: 540 }}
                  to={`/movie-description/${movie.id}`}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{
                      width: '180px',
                      height: 'auto',
                      marginTop: '13px',
                    }}
                  />
                </Link>
              </Container>
            </li>
            <div
              style={{
                width: '78%',
                height: '60px',
                marginTop: '2%',
                backgroundColor: 'lightgray',
                display: 'flex',
                color: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Ekran</span>
            </div>
          </ul>
        </Container>
        <Container
          sx={{ marginLeft: '24%', textAlign: 'left', marginBottom: 10 }}
        >
          {Array.from({ length: 6 }, (_, row) => (
            <Container sx={{ display: 'flex', marginBottom: '10px' }}>
              {Array.from({ length: 12 }, (_, col) => {
                const index = row * 12 + col;
                const isReserved = isSeatReserved(row + 1, col + 1);
                const buttonColor = isReserved ? 'red' : buttonColors[index];
                const block = isReserved ? 'disabled' : '';

                return (
                  <Button
                    key={index + 1}
                    variant="contained"
                    sx={{
                      margin: '2px',
                      width: '10px',
                      backgroundColor: buttonColor,
                      '&.Mui-disabled': {
                        backgroundColor:
                          block === 'disabled' ? 'red' : buttonColor,
                      },
                    }}
                    disabled={isReserved}
                    onClick={() => handleSeatClick(index)}
                  >
                    {col + 1}
                  </Button>
                );
              })}
            </Container>
          ))}

          <Button
            variant="contained"
            style={{ marginLeft: '63.5%', marginTop: '30px' }}
            onClick={handleSaveClick}
          >
            Zarezerwuj
          </Button>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default Reservation;
