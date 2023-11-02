   /* eslint-disable */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define your base URL here
 
const BASE_URL = 'https://woka-app.vercel.app';

axios.defaults.baseURL = BASE_URL;


const API_URL_R = '/api/v1/auth/register'
const API_URL_L = '/api/v1/auth/login'
const API_URL_USER_BY_ID = '/api/v1/auth/users'
const API_URL_DEPARTMENT = '/api/v1/auth/department'


// Register user
const register = async (RegistrationData,navigate) => {
  console.log('auth-service =>',RegistrationData)
  const response = await axios.post(BASE_URL+API_URL_R,RegistrationData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    navigate('/welcome'); // Redirect to welcome route
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(BASE_URL+API_URL_L , userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    }

  return response.data
}

// Logout user
const logout = (navigate) => {
  localStorage.removeItem('user');
 navigate('/'); // Redirect to home route
};

// Retrieve allUser  inmate
const retrieveUsers = async (id) => {
  const response = await axios.get(`${API_URL_USER_BY_ID}/${id}`);
  return response.data;
};

const saveDepartment = async (email, department) => {
  const formData = new FormData();
  department.forEach((user) => formData.append('department', JSON.stringify(user)));
  const response = await axios.post(`${API_URL_DEPARTMENT}/${email}`, formData);
  return response.data;
};
const authService = {
  register,
  logout,
  login,
  retrieveUsers,
  saveDepartment,
}

export default authService



 