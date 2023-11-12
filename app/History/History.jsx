
import React, { useState, useEffect } from 'react';
import agent from "../../api/agent";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle as Title,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledButton,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  ButtonText,
  Colors,
  Line,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../../components/styles";




const ReservationHistory = ( ) =>{
  const [Reservations, setReservations] = useState([]);
  const [interval, setInterval] = useState('todos');
  const [userId, setUserId] = useState(1);

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
      const response = await agent.Parking.getHistory(userId);
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

  const buttonStyle = {
    marginRight: '10px', // Ajusta el valor de margen según tus preferencias
  };



  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Historial de Reservas</h1>
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' , marginBottom: '20px' }}>
          <StyledButton onPress={() => changeInterval('todos')}style={buttonStyle}>
            <ButtonText>Todos</ButtonText>
          </StyledButton>
          <StyledButton onPress={() => changeInterval('ultimoMes')}style={buttonStyle}>
            <ButtonText>Ultimo mes</ButtonText>
          </StyledButton>
          <StyledButton onPress={() => changeInterval('ultimaSemana')}style={buttonStyle}>
            <ButtonText>Ultima semana</ButtonText>
          </StyledButton>
          <StyledButton onPress={() => changeInterval('ultimoAnio')}style={buttonStyle}>
            <ButtonText>Ultimo año</ButtonText>
          </StyledButton>
        </div>
        {filteredReservations.length > 0 ? (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Lugar</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Fecha</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Hora</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((Reservation, index) => (
              <tr key={Reservation.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{Reservation.direccion}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{new Date(Reservation.entry_time).toLocaleDateString()}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{new Date(Reservation.entry_time).toLocaleTimeString()}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{Reservation.extra_fee}</td>
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
