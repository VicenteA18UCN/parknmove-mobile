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

import agent from "../../api/agent";
//Colores
const { brand, darkLight } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = (data) => {
    agent.Login.login(data.email, data.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors;
        console.log(errorMessage);
        console.log(error.response);
      })
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require("../../assets/icon.png")}
        />
        <Title>ParknMove</Title>
        <SubTitle>Hola! Que gusto verte otra vez</SubTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
            handleLogin(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email"
                icon="mail"
                placeholder="a@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                isPassword={false}
              />

              <MyTextInput
                label="Contraseña"
                icon="lock"
                placeholder="**********"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox></MsgBox>
              <StyledButton onPress={() => handleSubmit()}>
                <ButtonText>Iniciar Sesión</ButtonText>
              </StyledButton>
              <Line />
              {/* <StyledButton onPress={(event) => navigation.navigate("Signup")}>
                <ButtonText>Registrate</ButtonText>
              </StyledButton> */}
              <ExtraView>
                <ExtraText>Te olvidaste de la contraseña?</ExtraText>
                <TextLink>
                  <TextLinkContent> Recuperar contraseña</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={24} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
