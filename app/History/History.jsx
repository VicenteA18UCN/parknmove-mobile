
import React, { useState, useEffect } from 'react';
import agent from "../../api/agent";




const ReservationHistory = ( ) =>{
  const [Reservations, setReservations] = useState([
    {
      id: 1, user_id:1, parking_id:1, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:500,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z", direccion: "calle A"
    },
    {
      id: 2, user_id:2, parking_id:2, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:200,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z", direccion: "calle C"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:300,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z", direccion: "calle B"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:100,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z", direccion: "calle D"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-11-01T23:26:03.000Z",exit_time:null,extra_fee:400,createdAt:"2023-11-01T23:26:03.000Z",updatedAt:"2023-11-01T23:26:03.000Z", direccion: "calle Z"
    }

  ]);
  const [interval, setInterval] = useState('ultimoMes');

  const changeInterval = (newInterval) => {
    setInterval(newInterval);
  };


  
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
      <h1 style={{ textAlign: 'center' }}>Historial de Reservas</h1>
      <div style={{ textAlign: 'center' }}>
          <button onClick={() => changeInterval('ultimoMes')}>Último Mes</button>
          <button onClick={() => changeInterval('ultimaSemana')}>Última Semana</button>
          <button onClick={() => changeInterval('ultimoAnio')}>Último Año</button>
        </div>
      {Reservations.length > 0 ? (
        <table style={{ margin: '0 auto' }}>
          <thead>
            <tr>
              <th>Lugar</th>
              <th>Fecha</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Reservations.map((Reservation) => (
              <tr key={Reservation.id}>
                <td>{Reservation.direccion}</td>
                <td>{Reservation.entry_time}</td>
                <td>{Reservation.extra_fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
}

export default ReservationHistory;
