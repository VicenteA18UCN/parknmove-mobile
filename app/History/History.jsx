
import React, { useState, useEffect } from 'react';
import agent from "../../api/agent";




const ReservationHistory = ( ) =>{
  const [Reservations, setReservations] = useState([
    {
      id: 1, user_id:1, parking_id:1, total_price:null,entry_time:"2023-11-02T23:26:03.000Z",exit_time:null,extra_fee:500, direccion: "calle A"
    },
    {
      id: 2, user_id:2, parking_id:2, total_price:null,entry_time:"2023-10-02T23:26:03.000Z",exit_time:null,extra_fee:200, direccion: "calle C"
    }
    ,{
      id: 3, user_id:3, parking_id:3, total_price:null,entry_time:"2023-10-30T23:26:03.000Z",exit_time:null,extra_fee:300, direccion: "calle B"
    }
    ,{
      id: 4, user_id:4, parking_id:4, total_price:null,entry_time:"2023-10-01T23:26:03.000Z",exit_time:null,extra_fee:100, direccion: "calle D"
    }
    ,{
      id: 5, user_id:5, parking_id:5, total_price:null,entry_time:"2022-11-01T23:26:03.000Z",exit_time:null,extra_fee:400, direccion: "calle Z"
    }

  ]);
  const [interval, setInterval] = useState('ultimoMes');

  const [filteredReservations, setFilteredReservations] = useState(Reservations);

  const changeInterval = (newInterval) => {
    setInterval(newInterval);
    filterReservations(newInterval);
  };


  const filterReservations = (interval) => {
    if (interval === 'todos') {
      setFilteredReservations(Reservations);
    } else {
      const today = new Date();
      let startDate;
      if (interval === 'ultimoMes') {
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      } else if (interval === 'ultimaSemana') {
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      } else if (interval === 'ultimoAnio') {
        startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      }

      const filtered = Reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.entry_time);
        return reservationDate >= startDate;
      });

      setFilteredReservations(filtered);
    }
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
          <button onClick={() => changeInterval('todos')}>Todos</button>
          <button onClick={() => changeInterval('ultimoMes')}>Último Mes</button>
          <button onClick={() => changeInterval('ultimaSemana')}>Última Semana</button>
          <button onClick={() => changeInterval('ultimoAnio')}>Último Año</button>
        </div>
        {filteredReservations.length > 0 ? (
        <table style={{ margin: '0 auto' }}>
          <thead>
            <tr>
              <th>Lugar</th>
              <th>Fecha</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((Reservation) => (
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
