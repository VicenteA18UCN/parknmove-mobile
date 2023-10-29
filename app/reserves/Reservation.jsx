import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
//Estilos
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
import agent from "../../api/agent"; // Importa tu agente de API

const Reservation= ({ route }) => {
    const [parkingData, setParkingData] = useState(null);
  
    // Función para obtener los datos del estacionamiento
    const fetchParkingData = async () => {
      try {
        const response = await agent.Parking.getAllParkingData();
        setParkingData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del estacionamiento:", error);
      }
    };
  
    useEffect(() => {
      fetchParkingData(); // Llama a la función al cargar la pantalla
    }, []);
  
    return (
      <StyledContainer>
        <InnerContainer>
          {parkingData ? (
            <>
              <PageLogo source={require("../../assets/icon.png")} />
              <PageTitle>{parkingData.name}</PageTitle>
              <SubTitle>{parkingData.address}</SubTitle>
              <Text>Base Price: {parkingData.base_price}</Text>
              {/* Otros detalles del estacionamiento */}
              <StyledButton>
                <Text>Reservar</Text>
              </StyledButton>
            </>
          ) : (
            <Text>Cargando información del estacionamiento...</Text>
          )}
        </InnerContainer>
      </StyledContainer>
    );
  };
  
  export default Reservation;
  
