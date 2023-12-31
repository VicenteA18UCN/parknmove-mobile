import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import agent from "../../api/agent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../navigators/userSlice";

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
  const [extraFee, setExtraFee] = useState();
  const [reservationCreated, setReservationCreated] = useState(false);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
  const navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [reservationDataInfo, setReservationDataInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setReservationCreated(route.params.reservationCreatedParam);
    }
  }, [route.params]);

  useEffect(() => {
    handleGetToken();
  }, []);

  useEffect(() => {
    const checkReservation = async () => {
      try {
        const user_id = userData.id;
        const reservationResponse =
          await agent.Reservation.getReservationByUserId(user_id);

        if (reservationResponse !== null) {
          setReservationCreated(true);
        } else {
          setReservationCreated(false);
        }
      } catch (error) {}
    };

    checkReservation();
  }, [userData, parkingData]);

  useEffect(() => {
    fetchParkingData();
  }, []);

  useEffect(() => {
    let timer;
    if (parkingData) {
      fetchExtraFee();
      fetchOccupiedSpaces();
      timer = setTimeout(() => {
        fetchExtraFee();
        fetchOccupiedSpaces();
      }, 300000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [parkingData]);

  useEffect(() => {
    if (parkingData) {
      dataParkingUser();
    }
  }, [reservationDataInfo]);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    if (!dataToken) {
      navigation.replace("Login");
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
    } catch (error) {}
  };

  const fetchExtraFee = async () => {
    try {
      const parkingId = parkingData.id;
      const response = await agent.Parking.calculateExtraFee(parkingId);
      if (response && response.ExtraFee) {
        setExtraFee(response.ExtraFee);
      }
    } catch (error) {
      console.error("Error al obtener el precio extra:", error);
    }
  };

  const fetchOccupiedSpaces = async () => {
    try {
      const response = await agent.Parking.getOccupiedSpaces();
      if (response) {
        setOccupiedSpaces(response);
      }
    } catch (error) {}
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
    try {
      const status = await agent.Parking.getParkingUserData({
        parking_id: parking_id,
        user_id: user_id,
      });
      console.log("status: ", status);
      if (status !== null) {
        setReservationDataInfo(status);
        setReservationCreated(true);
        return;
      }
    } catch (error) {}
  };

  const handleGoToReservation = async () => {
    try {
      const user_id = userData.id;

      // Llamada a la API para obtener la reserva activa del usuario
      const reservationResponse =
        await agent.Reservation.getReservationByUserId(user_id);

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
    } catch (error) {}
  };

  const handleReservation = async () => {
    const parking_id = parkingData.id;
    var entry_time = new Date().toLocaleString("es-CL");
    try {
      const status = await agent.Parking.getParkingUserData({
        parking_id: parking_id,
        user_id: userData.id,
      });
      if (status === null) {
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
          navigation.navigate("Detalle Reserva", {
            reservationDataInfo: reservationDataInfo,
          });
          setReservationDataInfo(status);
          setReservationCreated(true);
          updateOccupiedSpaces();
        } else {
          console.error("Error al crear la reserva.");
        }
      } else {
        handleGoToReservation();
        return;
      }
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await AsyncStorage.removeItem("AccessToken");
      navigation.replace("Iniciar sesión");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      {parkingData ? (
        <>
          <View>
            <Text>Bienvenido</Text>
          </View>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{getEmotion().emoji}</Text>
            <Text style={styles.emotionText}>{getEmotion().text}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.pageTitle}>{parkingData.name}</Text>
            <Text style={styles.subTitle}>{parkingData.address}</Text>
            <Text style={styles.capacityText}>
              Sitios ocupados: {occupiedSpaces}/
              {parkingData.floor_count * parkingData.places_per_floor}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>Precio por segundo: ${extraFee}</Text>
            </View>
            {reservationCreated ? (
              <StyledButton
                style={styles.button}
                onPress={handleGoToReservation}
              >
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
        <>
          <Text>Cargando información del estacionamiento...</Text>
        </>
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
    color: "#276953",
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
