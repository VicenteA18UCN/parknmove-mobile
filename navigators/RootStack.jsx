import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "./../components/styles";
const { primary, tertiary } = Colors;

const Stack = createStackNavigator();

//Import screens
import Login from "../app/auth/Login";
import Register from "../app/auth/Register";
// import Welcome from "./../screens/Welcome";

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
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
};

export default RootStack;