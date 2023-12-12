import axios from "axios";

const instance = axios.create({
  baseURL: "http://39.114.134.185:5555"
});

export default instance;