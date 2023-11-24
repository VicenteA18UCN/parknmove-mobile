import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = "http://localhost:4000/";

const ApiManager = axios.create({
  baseURL: "http://localhost:4000/",
  responseType: "json",
  withCredentials: true,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const addTokenToRequest = async (config) => {
  const token = await AsyncStorage.getItem('AccessToken');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
};

axios.interceptors.request.use(addTokenToRequest);

const Parking = {
  getAllParkingData: () => requests.get(`/parking`),
  calculateExtraFee: (parkingId) => requests.get(`/calculateExtraFee`),
  calculateFinalPayment: (user_id) => requests.post(`/calculateFinalPayment`, user_id),
  getOccupiedSpaces: () => requests.get(`parking/occupiedSpaces`),
  registerPayment: (user_id) => requests.post("/registerPayment", user_id),
  getParkingUserData: ({ parking_id, user_id }) => requests.post("/parkinguserdata", { parking_id, user_id }),
  getHistory: (userId) => requests.get(`/parking/history/${userId}`, userId),
};

const Reservation = { 
  createReservation: (reservationData) => requests.post("/reservations", reservationData),
  getReservationByUserId: (user_id) => requests.get(`/reservations/user/${user_id}`),
};

const Login = {
  login: (email, password) => requests.post("user/login", { email, password }),
  register: (name, lastname, email, password, priority) =>
    requests.post("user/register", {
      name,
      lastname,
      email,
      password,
      priority,
    }),
};

const agent = {
  Login,
  Parking,
  Reservation,
};

export default agent;
