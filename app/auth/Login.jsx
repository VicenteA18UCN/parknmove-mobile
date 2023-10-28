import React, { useState } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

//Iconos
import { Octicons, Ionicons } from "@expo/vector-icons";

//Formik
import { Formik } from "formik";

//Estilos
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

//Colores
const { brand, darkLight } = Colors;

const Login = ({ navigation }) => {

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>

      </InnerContainer>
    </StyledContainer>
  );
};


export default Login;
