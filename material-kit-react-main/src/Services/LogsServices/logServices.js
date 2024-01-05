/* eslint-disable */
import axios from 'axios';

// Defined base URL here
const BASE_URL = 'https://woka-app.vercel.app';
axios.defaults.baseURL = BASE_URL;

const API_URL_LOG_INVENTORY = '/api/v1/inventory/logs';

// Function to construct the base URL
const constructURL = (endpoint) => `${BASE_URL}${endpoint}`;

// Log inventory activity
const logInventoryActivity = async (email, tagName) => {
  console.log('logs:', email, tagName);
  const response = await axios.get(constructURL(`${API_URL_LOG_INVENTORY}/${email}/${tagName}`));
  return response.data;
};

const inventoryService = {
  logInventoryActivity,
};

export default inventoryService;
