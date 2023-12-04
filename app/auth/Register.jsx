import React, { useState } from "react";
import { Text, View, ScrollView, ToastAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";
import { login } from "../../navigators/userSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigation = useNavigation();
  const handleSubmitButton = (data) => {
    if (data.password !== data.passwordConfirm) {
      setPasswordMismatch(true);
      ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
    } else {
      setPasswordMismatch(false);
      console.log("BIEN");
      completeData(data);
    }
  };
  const completeData = (data) => {
    console.log(completeData);
    if(data.name === "" || data.lastname === "" || data.email === "" || data.password === "" || data.passwordConfirm === ""){ 
      ToastAndroid.show("Por favor complete todos los campos", ToastAndroid.SHORT);
      return;
    }
    agent.Login.register(data.name, data.lastname, data.email, data.password, 1)
      .then((response) => {
        console.log(response);
        ToastAndroid.show("Usuario registrado", ToastAndroid.SHORT);
        navigation.navigate("Iniciar sesión");
      })
      .catch((error) => {
        let errorResponse = error.response.data.errors;
        let errorMessage = "Ha ocurrido un error.";
        if (errorResponse.includes("Correo electrónico inválido.")) {
          errorMessage = "Correo electrónico inválido.";
        }
        if (errorResponse.includes("El correo electrónico ya está en uso.")) {
          errorMessage = "El correo electrónico ya está en uso.";
        }
        if (errorResponse.includes("Contraseña inválida. (min 8)")) {
          errorMessage = "La contraseña debe tener al menos 8 caracteres.";
        }

        console.log(errorMessage);
        console.log(error.response);
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
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
                    <TextLinkContent
                      onPress={(event) => navigation.navigate("Iniciar sesión")}
                    >
                      {" "}
                      Inicia Sesión!
                    </TextLinkContent>
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
