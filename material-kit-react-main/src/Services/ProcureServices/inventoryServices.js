/* eslint-disable */
import axios from 'axios';

// Define your base URL here
const BASE_URL = 'https://woka-app.vercel.app';
axios.defaults.baseURL = BASE_URL;

const API_URL_ALL_INVENTORY = '/api/v1/inventory/all-inventory';
const API_URL_ONE_INVENTORY = '/api/v1/inventory';
const API_URL_CREATE_INVENTORY = '/api/v1/inventory/create';
const API_URL_PER_ITEM = '/api/v1/inventory/per-item';
const API_URL_TOTAL_INVENTORY = '/api/v1/inventory/count';
const API_URL_TOTAL_COST = '/api/v1/inventory/cost';
const API_URL_OUTGOING_STOCK = '/api/v1/inventory/outstock';
const API_URL_INCOMING_STOCK = '/api/v1/inventory/instock';
const API_URL_STOCK_BALANCE = '/api/v1/inventory/stockbalance';
const API_URL_UPDATE_INVENTORY = '/api/v1/inventory/update';
const API_URL_CONNECT_ITEM = '/api/v1/inventory/connect';
const API_URL_DELETE_INVENTORY = '/api/v1/inventory/delete';

// Function to construct the base URL
const constructURL = (endpoint) => `${BASE_URL}${endpoint}`;

// Get all inventory items
const getAllInventory = async (email) => {
    console.log('inventory-services',email)
  //   const response = await axios.get(constructURL(`${API_URL_ALL_INVENTORY}/${email}/${projectName}`));
  const response = await axios.get(constructURL(`${API_URL_ALL_INVENTORY}/${email} `));
  return response.data;
};

// Get one inventory item by ID
const getOneInventory = async (id) => {
  const response = await axios.get(constructURL(`${API_URL_ONE_INVENTORY}/${id}`));
  return response.data;
};

// Create a new inventory item
const createInventory = async (id, projectName, inventoryData) => {
  const response = await axios.post(
    constructURL(`${API_URL_CREATE_INVENTORY}/${id}/${projectName}`),
    inventoryData
  );
  return response.data;
};

// Get quantity per item
const quantityPerItem = async (email, projectName) => {
  const response = await axios.get(constructURL(`${API_URL_PER_ITEM}/${email}/${projectName}`));
  return response.data;
};

// Get total inventory count
const getTotalInventory = async (email, projectName) => {
  const response = await axios.get(
    constructURL(`${API_URL_TOTAL_INVENTORY}/${email}/${projectName}`)
  );
  return response.data;
};

// Get total cost of inventory
const getTotalCost = async (email, projectName) => {
  const response = await axios.get(constructURL(`${API_URL_TOTAL_COST}/${email}/${projectName}`));
  return response.data;
};

// Outgoing stock
const outGoingStock = async (email, id, num, quantity, order) => {
  const response = await axios.get(
    constructURL(`${API_URL_OUTGOING_STOCK}/${email}/${id}/${num}/${quantity}/${order}`)
  );
  return response.data;
};

// Incoming stock
const incomingStock = async (email, id, num, quantity) => {
  const response = await axios.get(
    constructURL(`${API_URL_INCOMING_STOCK}/${email}/${id}/${num}/${quantity}`)
  );
  return response.data;
};

// Get stock balance
const getStockBalance = async (email, projectName) => {
  const response = await axios.get(
    constructURL(`${API_URL_STOCK_BALANCE}/${email}/${projectName}`)
  );
  return response.data;
};

// Update inventory item
const updateInventory = async (id, inventoryData) => {
  const response = await axios.post(
    constructURL(`${API_URL_UPDATE_INVENTORY}/${id}`),
    inventoryData
  );
  return response.data;
};

// Connect item
const connectItem = async (inventoryData) => {
  const response = await axios.post(constructURL(API_URL_CONNECT_ITEM), inventoryData);
  return response.data;
};

// Delete inventory item
const deleteInventory = async (id) => {
  const response = await axios.delete(constructURL(`${API_URL_DELETE_INVENTORY}/${id}`));
  return response.data;
};

const inventoryService = {
  getAllInventory,
  getOneInventory,
  createInventory,
  quantityPerItem,
  getTotalInventory,
  getTotalCost,
  outGoingStock,
  incomingStock,
  getStockBalance,
  updateInventory,
  connectItem,
  deleteInventory,
};

export default inventoryService;
