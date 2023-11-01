import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import agent from "../../api/agent";
import { useNavigation } from "@react-navigation/native";
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
  const [user_id, setUser_id] = useState(1);
  const [entry_time, setEntryTime] = useState(new Date());
  const [extraFee, setExtraFee] = useState(400);
  const [reservationCreated, setReservationCreated] = useState(false);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
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

  const fetchOccupiedSpaces = async () => {
    try {
      const response = await agent.Parking.getOccupiedSpaces();
      console.log(response);
      if (response) {
        setOccupiedSpaces(response);
      }
    } catch (error) {
      console.error("Error al obtener los espacios ocupados:", error);
    }
  };

  useEffect(() => {
    fetchParkingData();
  }, []);

  useEffect(() => {
    if (parkingData) {
      fetchExtraFee();
      fetchOccupiedSpaces();
    }
  }, [parkingData]);

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
        extra_fee: extraFee,
      });

      if (response) {
        const reservationDataInfo = {
          response: response,
          userName: "John Doe",
          parkingName: parkingData.name,
        };
        navigation.navigate("ReservationInfo", { reservationData: reservationDataInfo });

        setReservationCreated(true);
      } else {
        console.error("Error al crear la reserva.");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  return (
    <View style={styles.container}>
      {parkingData ? (
        <>
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
            {!reservationCreated ? (
              <StyledButton style={styles.button} onPress={handleReservation}>
                <Text style={styles.buttonText}>Reservar</Text>
              </StyledButton>
            ) : (
              <Text>¡Reserva creada con éxito!</Text>
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
