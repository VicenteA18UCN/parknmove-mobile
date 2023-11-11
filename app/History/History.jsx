
import React, { useState, useEffect } from 'react';
import agent from "../../api/agent";




const ReservationHistory = ( ) =>{
  const [Reservations, setReservations] = useState([]);
  const [interval, setInterval] = useState('todos');

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
  
  const fetchHistory = async () => {
    try {
      const response = await agent.Parking.getHistory(1);
      console.log(response.history);
      console.log(Reservations.length);
      console.log(Reservations, "Reservations")
      if (Reservations.length == 0) {
        setReservations(response.history);
        console.log(Reservations);
      }
      console.log("separador");
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  };

useEffect(() => { fetchHistory(); }, []);



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
              <th>Hora</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
          {filteredReservations.map((Reservation) => (
            <tr key={Reservation.id}>
              <td>{Reservation.direccion}</td>
              <td>{new Date(Reservation.entry_time).toLocaleDateString()}</td>
              <td>{new Date(Reservation.entry_time).toLocaleTimeString()}</td>
              <td>{Reservation.extra_fee}</td>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>No reservations found.</p>
          </div>
      )}
    </div>
  );
}

export default ReservationHistory;
