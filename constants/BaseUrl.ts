import axios from 'axios';

// Define Base API URL
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'http://192.168.161.252:3000';

// Create Axios Instance
export const API = axios.create({ baseURL: BASE_URL });

export default BASE_URL;
