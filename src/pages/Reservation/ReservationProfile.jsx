import { Box, Container, Grid, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom';
import React from 'react'

const ReservationProfile = ({Reservation}) => {
  const date = new Date(Reservation.screening.start_time);
  const dayOfWeek = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
  const options1 = {day: "numeric", month: "numeric", weekday: "long"};
  const options2 = {hour: "2-digit", minute: "2-digit", hour12: false}
  //dayOfWeek[date.getDay()] + ", " + date.getDate() + "." + date.getMonth()
  return (
    <Container sx={{display: "flex", flexDirection: "row",borderColor: "#FFF", borderBottom: 2, alignItems: "center", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", flexDirection:"column", marginTop: "1%"}}>
              <Typography
                  variant="subtitle1"
              >
                {date.toLocaleString('pl-PL', options1)}
              </Typography>
              <Typography
                variant='h4'
              >
                {date.toLocaleTimeString('pl-PL', options2)}
              </Typography>
          </Box>
          <Box sx={{marginTop: "1%"}}>
            <Typography
              variant='h4'
            >
              {Reservation.screening.repertoire.movie.title}
            </Typography>
          </Box>
          <Box sx={{marginTop: "1%"}}>
            <Link to={"/reservation-details/" + Reservation.id}>
              <Button>
                Szczegóły
              </Button>
            </Link>
            <Button>
              Anuluj rezerwacje
            </Button>
          </Box>
    </Container>
  )
}

export default ReservationProfile
