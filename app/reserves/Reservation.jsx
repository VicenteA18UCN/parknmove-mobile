import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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

const Reservation = ({ route }) => {
  const [parkingData, setParkingData] = useState(null);

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

  useEffect(() => {
    fetchParkingData();
  }, []);

  return (
    <StyledContainer>
      <InnerContainer>
        {parkingData ? (
          <>
            <PageLogo source={require("../../assets/icon.png")} />
            <PageTitle style={styles.title}>{parkingData.name}</PageTitle>
            <SubTitle style={styles.subTitle}>{parkingData.address}</SubTitle>
            <View style={styles.priceContainer}>
              <FontAwesome5 name="money-bill-wave" size={24} color="#007BFF" />
              <Text style={styles.priceText}>
                Base Price: ${parkingData.base_price}
              </Text>
            </View>
            <StyledButton style={styles.button}>
              <Text style={styles.buttonText}>Reservar</Text>
            </StyledButton>
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
