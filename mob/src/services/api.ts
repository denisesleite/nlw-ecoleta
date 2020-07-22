import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.64.248:3333', //para acessar no celular precisa colocar o ip do PC se não o dispositivo pensa que é ele mesmo
});

export default api;
