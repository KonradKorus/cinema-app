import React from 'react'
import ReservationProfile from './ReservationProfile'

const ListReservationsProfile = ({Reservations}) => {
  return (
        <>
            {Reservations.map((reservation) => (<ReservationProfile Reservation={reservation}/>))}
        </>
  )
}

export default ListReservationsProfile
