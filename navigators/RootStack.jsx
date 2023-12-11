import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "./../components/styles";
const { primary, tertiary } = Colors;
import { Icon } from "react-native-elements";
import { Image } from "react-native";
import { logout } from "./userSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
// Importa las pantallas necesarias
import Login from "../app/auth/Login";
import Register from "../app/auth/Register";
import Reserva from "../app/reserves/Reservation";
import ReservationInfo from "../app/reserves/ReservationInfo";
import Payment from "../app/reserves/Payment";
import History from "../app/History/History";
import { useSelector } from "react-redux";
import { selectId } from "./userSlice";

function RootStack() {
  const isAuth = useSelector(selectId);
  const dispatch = useDispatch();

  const handleLogout = async (navigation) => {
    try {
      console.log("cerrando sesión");
      dispatch(logout());
      await AsyncStorage.removeItem("AccessToken");
      navigation.replace("Iniciar sesión");
      console.log("sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#10B981",
            height: 80,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            textAlign: "center",
            alignSelf: "center",
            fontWeight: "bold",
          },
        }}
        initialRouteName="Iniciar sesión"
      >
        {!isAuth && (
          <>
            <Stack.Screen name="Iniciar sesión" component={Login} />
            <Stack.Screen name="Registrar" component={Register} />
          </>
        )}
        <Stack.Screen
          name="Reserva"
          component={Reserva}
          options={({ navigation }) => ({
            headerTitle: "Reserva",
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="history"
                  type="font-awesome"
                  color="#fff"
                  onPress={() => navigation.navigate("Historial")}
                  containerStyle={{ marginRight: 10 }}
                />
                <Icon
                  name="sign-out"
                  type="font-awesome"
                  color="#ff0000"
                  onPress={() => {
                    handleLogout(navigation);
                  }}
                  containerStyle={{ marginRight: 10 }}
                />
              </View>
            ),
            headerLeft: () => (
              <Image
                source={require("../assets/favicon.png")}
                style={{ width: 40, height: 40, marginLeft: 10 }}
              />
            ),
          })}
        />
        <Stack.Screen name="Detalle Reserva" component={ReservationInfo} />
        <Stack.Screen name="Pago" component={Payment} />
        <Stack.Screen name="Historial" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
