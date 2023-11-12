import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "./../components/styles";
const { primary, tertiary } = Colors;

const Stack = createStackNavigator();

// Importa las pantallas necesarias
import Login from "../app/auth/Login";
import Register from "../app/auth/Register";
import Reserva from "../app/reserves/Reservation";
import ReservationInfo from "../app/reserves/ReservationInfo"; // Importa ReservationInfo.jsx
import Payment from "../app/reserves/Payment";
import History from "../app/History/History";


const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: "",
          headerLeftContainerStyle: { paddingLeft: 20 },
        }}
        initialRouteName="Reserva"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reserva" component={Reserva} />
        <Stack.Screen name="ReservationInfo" component={ReservationInfo} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
