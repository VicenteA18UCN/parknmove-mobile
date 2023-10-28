import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import { Colors } from "./../components/styles";
// const { primary, tertiary } = Colors;

const Stack = createStackNavigator();

//Import screens
import Login from "../app/auth/Login";
// import Signup from "./../screens/Signup";
// import Welcome from "./../screens/Welcome";

const RootStack = () => {
  return (
    <Login />
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerStyle: { backgroundColor: "transparent" },
    //       headerTintColor: tertiary,
    //       headerTransparent: true,
    //       headerTitle: "",
    //       headerLeftContainerStyle: { paddingLeft: 20 },
    //     }}
    //     initialRouteName="Login"
    //   >
    //     <Stack.Screen name="Login" component={Login} />
    //     {/* <Stack.Screen name="Signup" component={Signup} />
    //     <Stack.Screen name="Welcome" component={Welcome} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default RootStack;