import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Parking = {
  // Función para obtener todos los datos del estacionamiento
  getAllParkingData: () => requests.get("/parking"),

  // Función para calcular el precio total (Manteniendo tu función original)
  calculateExtraFee: (parkingId) => requests.get(`/calculateExtraFee`),
  
};

const Reservation = { 
  createReservation: (reservationData) => requests.post("/reservations", reservationData),
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
