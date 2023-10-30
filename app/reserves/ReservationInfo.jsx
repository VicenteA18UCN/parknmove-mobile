import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReservationInfo = ({ route }) => {
  // Obten los datos de la reserva de las props
  const { reservationData } = route.params;

  // Formatear la hora de entrada
  const entryTime = new Date(reservationData.response.entry_time).toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Reserva</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{reservationData.userName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Estacionamiento:</Text>
        <Text style={styles.value}>{reservationData.parkingName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hora de entrada:</Text>
        <Text style={styles.value}>{entryTime}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Costo por hora:</Text>
        <Text style={styles.value}>${reservationData.response.extra_fee}</Text>
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
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
});

export default ReservationInfo;
