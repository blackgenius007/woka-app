/* eslint-disable */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define your base URL here
const BASE_URL = 'https://woka-app.vercel.app';

axios.defaults.baseURL = BASE_URL;

const API_URL_REGISTER = '/api/v1/auth/register';
const API_URL_LOGIN = '/api/v1/auth/login';
const API_URL_USERS_BY_ID = '/api/v1/auth/users';
const API_URL_DEPARTMENT = '/api/v1/auth/department';
const API_URL_CREATE_DATA_COLLECTION_POINT = '/api/v1/auth/dcollector';
// const API_URL_AUTH_DATA_ACCESS = '/api/v1/employee/collectorId';

// Function to construct the base URL
const constructURL = (endpoint) => `${BASE_URL}${endpoint}`;

// Register user
const register = async (registrationData, navigate) => {
  console.log('auth-service =>', registrationData);
  const response = await axios.post(constructURL(API_URL_REGISTER), registrationData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    navigate('/welcome'); // Redirect to welcome route
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(constructURL(API_URL_LOGIN), userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = (navigate) => {
  localStorage.removeItem('user');
  navigate('/'); // Redirect to home route
};

// Retrieve user by ID
const retrieveUsers = async (id) => {
  const response = await axios.get(constructURL(`${API_URL_USERS_BY_ID}/${id}`));
  return response.data;
};

// Save department data
const saveDepartment = async (email, department) => {
  const formData = new FormData();
  department.forEach((user) => formData.append('department', JSON.stringify(user)));
  const response = await axios.post(constructURL(`${API_URL_DEPARTMENT}/${email}`), formData);
  return response.data;
};

// Function to create data collection point
const createDataCollectionPoint = async ({ employeeNumber, tag, userEmail }) => {
  console.log('collector-services=>', { employeeNumber, tag, userEmail });

  const response = await axios.post(
    constructURL(API_URL_CREATE_DATA_COLLECTION_POINT),
    { employeeNumber, tag, userEmail }
  );

  return response.data;
};
// auth port access
// const authDataAccess = async (dataCode) => {
//   console.log('Data-services code =>',dataCode)
//   const response = await axios.get(constructURL(API_URL_AUTH_DATA_ACCESS + `/${dataCode}`));
//   return response.data;
// };

const authService = {
  register,
  logout,
  login,
  retrieveUsers,
  saveDepartment,
  createDataCollectionPoint,
  // authDataAccess,
};

export default authService;
