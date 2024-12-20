import axios from "axios";

// Habilitar el envío de cookies
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://192.168.3.34:8000';
// Configurar la URL base para las peticiones
/* axios.defaults.baseURL = "https://backend.comunidadecowaste.com";  */


export default axios;
