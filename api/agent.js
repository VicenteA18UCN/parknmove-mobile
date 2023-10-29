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

  // Otras funciones relacionadas con estacionamientos pueden ir aquí
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
};

export default agent;
