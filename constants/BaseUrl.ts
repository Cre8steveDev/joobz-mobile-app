import axios from 'axios';

// Define Base API URL
// const BASE_URL = 'http://localhost:3000';

// Airtel
// const BASE_URL = 'http://192.168.1.113:3000';

// 9mobile
const BASE_URL = 'http://192.168.201.252:3000';

// Create Axios Instance
export const API = axios.create({ baseURL: BASE_URL });

export default BASE_URL;
