
import React, { useState, useEffect } from 'react';
import agent from "../../api/agent";



const ReservationHistory = ( ) =>{
  const [Reservations, setReservations] = useState([]);


  

  useEffect(() => {
    // fetch reservation history from server
    agent.Parking.getHistory(1)
      .then(data => {
        console.log(data); // log the returned data
        setReservations(data);
        console.log(Reservations);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {Reservations.length > 0 ? (
        <ul>
          {Reservations.map(Reservation => (
            <li key={Reservation.id}>
            <p>Date: {Reservation.entry_time}</p>
            <p>Time: {Reservation.exit_time}</p>
            <p>Location: {Reservation.extra_fee}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
}

export default ReservationHistory;
