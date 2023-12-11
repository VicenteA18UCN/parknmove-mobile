import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import agent from "../../api/agent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledButton,
} from "../../components/styles";

const Payment = ({ route }) => {
  const { reservationDataInfo } = route.params;
  const navigation = useNavigation();
  const [parkingUserData, setParkingData] = useState(null);

  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    if (!dataToken) {
      navigation.replace("Login");
    }
  };
  const fetchParkingData = async () => {
    try {
      const entryTime = new Date(
        reservationDataInfo.response.entry_time
      ).toLocaleString("es-CL");
      const exitTime = new Date().toLocaleString("es-CL");
      const calculateFinalPayment = await agent.Parking.calculateFinalPayment({
        reservationDataInfo: reservationDataInfo,
      });

      setParkingData({
        total_price: calculateFinalPayment,
        entry_time: entryTime,
        exit_time: exitTime,
      });
    } catch (error) {
      console.error("Error al obtener los datos del estacionamiento:", error);
    }
  };

  useEffect(() => {
    fetchParkingData();

    setTimeout(() => {
      navigation.navigate("Reserva", { reservationCreated: false });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.space} />
      <Text style={styles.title}>Detalles del Pago</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Precio a pagar:</Text>
        <Text style={styles.value}>
          ${parkingUserData ? parkingUserData.total_price : "Cargando"}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hora entrada:</Text>
        <Text style={styles.value}>
          {parkingUserData ? parkingUserData.entry_time : "Cargando"}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hora salida:</Text>
        <Text style={styles.value}>
          {parkingUserData ? parkingUserData.exit_time : "Cargando"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: "center", // Centra el código QR
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  space: {
    marginBottom: 30, // Agrega espacio entre elementos
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
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

export default Payment;
