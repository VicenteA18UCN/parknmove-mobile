import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

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
const { brand, darkLight, green } = Colors;

const Register = ( ) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const handleSubmitButton = (data) => {
    if (data.password !== data.passwordConfirm) {
      setPasswordMismatch(true);
      console.log("MAL")
    } else {
      setPasswordMismatch(false);
      console.log("BIEN")
      completeData(data);
    }
  };
  const completeData = (data) => {
    console.log(completeData);
    agent.Login.register(data.name, data.lastname, data.email, data.password, 1)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        let errorMessage = error.response.data.errors;
        console.log(errorMessage);
        console.log(error.response);
      })
      .finally(() => {
        reset();
      });
  };
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <ScrollView>
        <InnerContainer>
          <Title>ParknMove</Title>
          <SubTitle>¡Registrate!</SubTitle>
          <Formik
            initialValues={{
              name: "",
              email: "",
              lastname: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              handleSubmitButton(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nombre"
                  icon="note"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  isPassword={false}
                />

                <MyTextInput
                  label="Apellido"
                  icon="note"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("lastname")}
                  onBlur={handleBlur("lastname")}
                  value={values.lastname}
                  isPassword={false}
                />
                <MyTextInput
                  label="Correo electronico"
                  icon="mail"
                  placeholder="ejemplo@dominio.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  isPassword={false}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="**********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                />

                <MyTextInput
                  label="Confirmar Contraseña"
                  icon="lock"
                  placeholder="**********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  value={values.passwordConfirm}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                />
                <MsgBox></MsgBox>
                <StyledButton onPress={() => handleSubmit()}>
                  <ButtonText>Registrate</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Ya estas registrado?</ExtraText>
                  <TextLink>
                    <TextLinkContent onPress={(event) => navigation.navigate("Iniciar sesión")}> Inicia Sesión!</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </ScrollView>
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
        <Octicons name={icon} size={24} color={green} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default Register;
