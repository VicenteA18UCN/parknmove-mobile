
import React, { useState, useEffect } from 'react';
import agent from "../../api/agent";




const ReservationHistory = ( ) =>{
  const [Reservations, setReservations] = useState([
    {
      id: 1, user_id:1, parking_id:1, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:500,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z"
    },
    {
      id: 2, user_id:2, parking_id:2, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:200,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:300,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:100,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:400,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z"
    }

  ]);


  
  /** 
  useEffect(() => {
    fetchHistory();
  }, []);


  const fetchHistory = async () => {
    try {
      const response = await agent.Parking.getHistory(1);
      console.log(response);
      if (response) {
        setReservations(response);
      }
      console.log(Reservations);
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  }*/
  return (
    <div>
      {Reservations.length > 0 ? (
        <ul>
          {Reservations.map(Reservation => (
            <li key={Reservation.id}>
            <p>Entrada: {Reservation.entry_time}</p>
            <p>Salida: {Reservation.exit_time}</p>
            <p>Precio: {Reservation.extra_fee}</p>
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
