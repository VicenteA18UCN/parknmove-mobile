import React, { useState, useEffect } from "react";
import agent from "../../api/agent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
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
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ReservationHistory = () => {
  const [Reservations, setReservations] = useState([]);
  const [interval, setInterval] = useState("todos");
  const [UserData, setUserData] = useState(0);

  const [filteredReservations, setFilteredReservations] =
    useState(Reservations);

  const changeInterval = (newInterval) => {
    setInterval(newInterval);
    filterReservations(newInterval);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      const decoded = jwtDecode(dataToken);
      setUserData(decoded);
    }
  };

  const filterReservations = (interval) => {
    if (interval === "todos") {
      setFilteredReservations(Reservations);
    } else {
      const today = new Date();
      let startDate;
      if (interval === "ultimoMes") {
        startDate = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
      } else if (interval === "ultimaSemana") {
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
      } else if (interval === "ultimoAnio") {
        startDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
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
    const dataToken = await AsyncStorage.getItem('AccessToken'); 
    const decoded = jwtDecode(dataToken);
    const response = await agent.Parking.getHistory(decoded.id);
      if (Reservations.length === 0) {
        setReservations(response.history);
      }
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  };

  const buttonStyle = {
    marginRight: "10px", // Ajusta el valor de margen según tus preferencias

    width: "150px", // Establece el ancho deseado para los botones
    margin: "5px", // Agrega un pequeño margen entre los botones
  };

  return (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
        Historial de Reservas
      </Text>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <StyledButton
            onPress={() => changeInterval("todos")}
            style={buttonStyle}
          >
            <ButtonText>Todos</ButtonText>
          </StyledButton>
          <StyledButton
            onPress={() => changeInterval("ultimoMes")}
            style={buttonStyle}
          >
            <ButtonText>Mensual</ButtonText>
          </StyledButton>
        </View>

        <View style={{ flexDirection: "row" }}>
          <StyledButton
            onPress={() => changeInterval("ultimaSemana")}
            style={buttonStyle}
          >
            <ButtonText>Semanal</ButtonText>
          </StyledButton>
          <StyledButton
            onPress={() => changeInterval("ultimoAnio")}
            style={buttonStyle}
          >
            <ButtonText>Anual</ButtonText>
          </StyledButton>
        </View>
      </View>

      {filteredReservations.length > 0 ? (
        <ScrollView style={{ marginHorizontal: "10%", width: "80%" }}>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: "#333" }]}>
              <Text style={styles.tableHeader}>Fecha</Text>
              <Text style={styles.tableHeader}>Hora</Text>
              <Text style={styles.tableHeader}>Valor</Text>
            </View>
            {filteredReservations.map((reservation, index) => (
              <View
                key={reservation.id}
                style={[
                  styles.tableRow,
                  { backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" },
                ]}
              >
                <Text style={styles.tableCell}>
                  {new Date(reservation.entry_time).toLocaleDateString()}
                </Text>
                <Text style={styles.tableCell}>
                  {new Date(reservation.entry_time).toLocaleTimeString()}
                </Text>
                <Text style={styles.tableCell}>
                  {reservation.extra_fee + reservation.total_price}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text>No reservations found.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeader: {
    flex: 1,

    padding: 8,
    textAlign: "center",
    color: "white",
  },
  tableCell: {
    flex: 1,

    padding: 8,
    textAlign: "center",
  },
});

export default ReservationHistory;
