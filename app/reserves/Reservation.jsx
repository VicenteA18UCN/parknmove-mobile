import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import agent from "../../api/agent";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { Image } from "react-native";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledButton,
} from "../../components/styles";

const Reservation = ({ route }) => {
  const [parkingData, setParkingData] = useState(null);
  const [user_id, setUser_id] = useState();
  const [entry_time, setEntryTime] = useState(new Date());
  const [extraFee, setExtraFee] = useState(400);
  const [reservationCreated, setReservationCreated] = useState(false);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
  const navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [reservationDataInfo, setReservationDataInfo] = useState(null);
  const { reservationCreatedParam } = route.params ?? {};  

  useEffect(() => {

    if (route.params) {
      console.log("reserva", route.params);
      setReservationCreated(route.params.reservationCreatedParam);
    }
  }, [route.params]);

  useEffect(() => {
    handleGetToken();
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener la reserva activa del usuario
    const checkReservation = async () => {
      try {
        const user_id = userData.id;
        const reservationResponse = await agent.Reservation.getReservationByUserId(user_id);

        if (reservationResponse !== null) {
          setReservationCreated(true);
        } else {
          setReservationCreated(false);
        }
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };

    checkReservation();
  }, [userData, parkingData]);

  useEffect(() => {
    fetchParkingData();
  }, []);
  
  useEffect(() => {
    if (parkingData) {
      fetchExtraFee();
      fetchOccupiedSpaces();
    }
  }, [parkingData]);

  useEffect(() => {
    if(parkingData){
      dataParkingUser();
    }
  }, [reservationDataInfo]);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      const decoded = jwtDecode(dataToken);
      setUserData(decoded);
    }
  };

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

  const fetchOccupiedSpaces = async () => {
    try {
      const response = await agent.Parking.getOccupiedSpaces();
      //console.log(response);
      if (response) {
        setOccupiedSpaces(response);
      }
    } catch (error) {
      console.error("Error al obtener los espacios ocupados:", error);
    }
  };

  const getEmotion = () => {
    const totalSpaces = parkingData.floor_count * parkingData.places_per_floor;
    const occupancyPercentage = (occupiedSpaces / totalSpaces) * 100;
    if (occupancyPercentage < 30) {
      return {
        emoji: "😄", // Carita feliz
        text: "Bastante vacío",
      };
    } else if (occupancyPercentage >= 30 && occupancyPercentage <= 70) {
      return {
        emoji: "😐", // Carita normal
        text: "Bastante normal",
      };
    } else {
      return {
        emoji: "😡", // Carita enojada
        text: "Bastante lleno",
      };
    }
  };

  const dataParkingUser = async () => {
    const parking_id = 1;
    const user_id = userData.id;
    try{
      const status = await agent.Parking.getParkingUserData({ parking_id: parking_id, user_id: user_id });
      console.log(status);
      if (status !== null){
        setReservationDataInfo(status);
        setReservationCreated(true);
        return;
      }
    } catch (error) {
      console.error("Error al guardar la información:", error);
    }
  }

  const handleGoToReservation = async () => {
    try {
      const user_id = userData.id;

      // Llamada a la API para obtener la reserva activa del usuario
      const reservationResponse = await agent.Reservation.getReservationByUserId(user_id);

      if (reservationResponse !== null) {
        // Si se encuentra una reserva activa, navega a la pantalla de detalles de la reserva
        const reservationDataInfo = {
          response: reservationResponse,
          userName: userData.name,
          parkingName: parkingData.name,
          userId: userData.id,
        };
        navigation.navigate("Detalle Reserva", { reservationDataInfo });
      } else {
        // Si no hay reserva activa, muestra un mensaje al usuario
        alert("No tienes una reserva activa en este momento.");
      }
    } catch (error) {
      console.error("Error al obtener la reserva:", error);
    }
  };

  const handleReservation = async () => {
    const parking_id = parkingData.id;

    try {
      const status = await agent.Parking.getParkingUserData({ parking_id: parking_id, user_id: userData.id });
      if (status === null){
        const response = await agent.Reservation.createReservation({
          user_id: userData.id,
          parking_id,
          entry_time,
          exit_time: null,
          extra_fee: extraFee,
        });
        if (response) {
          const reservationDataInfo = {
            response: response,
            userName: userData.name,
            parkingName: parkingData.name,
            userId: userData.id,
          };
          navigation.navigate("Detalle Reserva", { reservationDataInfo: reservationDataInfo });
          setReservationDataInfo(status);
          setReservationCreated(true);
        } else {
          console.error("Error al crear la reserva.");
        }
      } else {
        handleGoToReservation();
        return;
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    
    <View style={styles.container}>
      {parkingData ? (
        <>
        <View>
        </View>
        <View>
          <Image
                source={require("../../assets/parking.gif")}
                style={{ width: 450, height: 200 , borderColor: '#10B981', borderWidth: 10}}
              />
        </View>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{getEmotion().emoji}</Text>
            <Text style={styles.emotionText}>{getEmotion().text}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.pageTitle}>{parkingData.name}</Text>
            <Text style={styles.subTitle}>{parkingData.address}</Text>
            <Text style={styles.capacityText}>
              Sitios ocupados: {occupiedSpaces}/{parkingData.floor_count * parkingData.places_per_floor}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                Precio por hora: ${extraFee}
              </Text>
            </View>
            {reservationCreated ? (
              <StyledButton style={styles.button} onPress={handleGoToReservation}>                
                <Text style={styles.buttonText}>Ir a mi reserva</Text>
              </StyledButton>
            ) : (
              <>
                <StyledButton style={styles.button} onPress={handleReservation}>                
                  <Text style={styles.buttonText}>Reservar</Text>
                </StyledButton>
                <Text>¡Reserve ahora!</Text>
                
              </>

              
              
            )}
          </View>
        </>
      ) : (
        <Text>Cargando información del estacionamiento...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  gifContainer: {
    marginTop: 20,
  },
  emojiContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emoji: {
    fontSize: 60,
  },
  emotionText: {
    fontSize: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  pageLogo: {
    width: 80,
    height: 80,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
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
    backgroundColor: "#10B981",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default Reservation;
