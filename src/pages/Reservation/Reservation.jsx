import React from 'react'
import './seats.css'
import Button from '../Reservation/Button'

const reserved = [
  { row: 4, seat: 11 },
  { row: 3, seat: 1 },
  { row: 5, seat: 6 },
  { row: 1, seat: 5 },
  { row: 3, seat: 7 },
  { row: 3, seat: 8 }
]

const Reservation = () => {

  const selectedSeats = []
  const handleSeatClick = (id, isSelected) => {isSelected ? selectedSeats.push(id) : selectedSeats.pop(id) }

  const findReservedSeatsID = (seats) => {
    const reservedSeats = seats.map((element) => (element.row - 1) * 12 + element.seat)
    return reservedSeats
  }

  const renderRow = (rowNumber) => {
    const seats = []
    for (let i = 0; i < 12; i++) {
      const id = rowNumber * 12 + i+1
      seats.push(
        <Button
          key={id}
          id={id}
          className='seatBlack'
          text={i}
          handleSeatClick={handleSeatClick}
        />
      )
    }

    const reservedSeats = findReservedSeatsID(reserved)

    const updatedSeats = seats.map((button) => {
      if (reservedSeats.includes(button.props.id)) {
        return React.cloneElement(button, { className: 'seatRed' })
      } else {
        return button
      }
    })

    return updatedSeats
  }

  const renderSeats = () => {
    const seats = []
    for (let i = 0; i < 6; i++) {
      seats.push(<div className="row">{renderRow(i)}</div>)
    }
    return seats
  }

  return (
    <div>
        <div>
          <div className='main'>
            <p>Tytul</p>
            <p>Napisy/2D</p>
            <p>Data, godzina</p>
            <p>Sala 1 ile wolnych miejsc</p>
            <div className="screen">
              <span>Ekran</span>
            </div>
          </div>
          <div>
            {renderSeats()}
          </div>
          <div className='main'>
            <button>Zarezerwuj</button>
          </div>
        </div>
    </div>

  )
}

export default Reservation