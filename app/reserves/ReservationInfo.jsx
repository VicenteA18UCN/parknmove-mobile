//import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import agent from "../../api/agent";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "redux";


import {
  StyledButton,
} from "../../components/styles";

const ReservationInfo = ({ route }) => {
  // Obten los datos de la reserva de las props
  const { reservationDataInfo } = route.params;
  const navigation = useNavigation();

  console.log("Datos de la reserva:", route.params);

  // Formatear la hora de entrada
  const entryTime = new Date(reservationDataInfo.response.entry_time).toLocaleString();
  // Combina toda la información en una cadena que se incluirá en el código QR
  const qrData = `Usuario: ${reservationDataInfo.userName}\nEstacionamiento: ${reservationDataInfo.parkingName}\nHora de entrada: ${entryTime}\nCosto por hora: $${reservationDataInfo.extra_fee}`;

  //const [user_id, setUser_id] = useState(null);
  const Payment = async () => {
    try {
      const response = await agent.Parking.registerPayment({
        user_id: reservationDataInfo.user_id
      });
    } catch (error) {
      console.error("Error al registrar el pago:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.space} />
      <Text style={styles.title}>Detalles de la Reserva</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{reservationDataInfo.userName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estacionamiento:</Text>
        <Text style={styles.value}>{reservationDataInfo.parkingName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hora de entrada:</Text>
        <Text style={styles.value}>{entryTime}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Costo por hora:</Text>
        <Text style={styles.value}>${reservationDataInfo.extra_fee}</Text>
      </View>
      <View style={styles.space} />
      <View style={styles.qrContainer}>
        <QRCode value={qrData} size={200} />
      </View>
      <View>
        <StyledButton style={styles.button} onPress={Payment}>
          <Text onPress={(event) => navigation.navigate("Payment", { reservationDataInfo: reservationDataInfo })} style={styles.buttonText}>Ir a pagar</Text>
        </StyledButton>
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
    alignItems: 'center', // Centra el código QR
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
    backgroundColor: "#007BFF",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default ReservationInfo;
