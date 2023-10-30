import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledButton,
} from "../../components/styles";
import agent from "../../api/agent";
import { useNavigation } from '@react-navigation/native';


const Reservation = ({ route }) => {
  const [parkingData, setParkingData] = useState(null);
  const [user_id, setUser_id] = useState(1);
  const [entry_time, setEntryTime] = useState(new Date());
  const [extraFee, setExtraFee] = useState(400);
  const [reservationCreated, setReservationCreated] = useState(false);
  const navigation = useNavigation();

  const fetchParkingData = async () => {
    try {
      const response = await agent.Parking.getAllParkingData();
      if (response && response.length > 0) {
        const parkingInfo = response[0];
        setParkingData(parkingInfo);
      }
    } catch (error) {
      console.error("Error al obtener los datos del estacionamiento:", error);
    }
  };

  const fetchExtraFee = async () => {
    try {
      const parkingId = parkingData.id;
      const response = await agent.Parking.calculateExtraFee(parkingId);
      if (response && response.ExtraFee) {
        setExtraFee(response.ExtraFee);
      }
    } catch (error) {
      setExtraFee(500);
      console.error("Error al obtener el extra_fee:", error);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, []);

  useEffect(() => {
    if (parkingData) {
      fetchExtraFee();
    }
  }, [parkingData]);

  const handleReservation = async () => {
    const parking_id = parkingData.id;
    const total_price = 2000;
  
    try {
      const response = await agent.Reservation.createReservation({
        user_id: user_id,
        parking_id,
        total_price,
        entry_time,
        exit_time: null,
        extra_fee: extraFee, // Utiliza el valor calculado de extra_fee
      });
  
      if (response) {
        // Crea un objeto con los datos de la reserva incluyendo los nombres
        const reservationDataInfo = {
          response: response,
          userName: "John Doe", // Agrega el nombre del usuario
          parkingName: parkingData.name, // Agrega el nombre del estacionamiento
        };
        // Redirige a ReservationInfo y pasa los datos de la reserva
        navigation.navigate('ReservationInfo', { reservationData: reservationDataInfo });
  
        // Marca la reserva como creada con éxito
        setReservationCreated(true);
      } else {
        console.error("Error al crear la reserva.");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    <StyledContainer>
      <InnerContainer>
        {parkingData ? (
          <>
            <PageLogo source={require("../../assets/icon.png")} />
            <PageTitle style={styles.title}>{parkingData.name}</PageTitle>
            <SubTitle style={styles.subTitle}>{parkingData.address}</SubTitle>
            <Text style={styles.capacityText}>
              Capacidad: {parkingData.floor_count * parkingData.places_per_floor}
            </Text>
            <View style={styles.priceContainer}>
              <FontAwesome5 name="money-bill-wave" size={24} color="#007BFF" />
              <Text style={styles.priceText}>
                Precio por hora: ${extraFee}
              </Text>
            </View>
            {!reservationCreated ? (
              <StyledButton style={styles.button} onPress={handleReservation}>
                <Text style={styles.buttonText}>Reservar</Text>
              </StyledButton>
            ) : (
              <Text>¡Reserva creada con éxito!</Text>
            )}
          </>
        ) : (
          <Text>Cargando información del estacionamiento...</Text>
        )}
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  capacityText: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  priceText: {
    fontSize: 20,
    color: "#007BFF",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default Reservation;
