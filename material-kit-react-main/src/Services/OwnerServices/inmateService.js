 /* eslint-disable */
import axios from 'axios';

const API_URL_REGISTER = '/api/v1/inmate/create';
const API_URL_RETRIEVE = '/api/v1/auth/users';
const API_URL_DETAIL = '/api/v1/inmate/detail';
const API_URL_UPDATE = '/api/v1/inmate/update-1';
const API_URL_DELETE = '/api/v1/inmate/delete';

// Register inmate
const register = async (formData, inmateId) => {
  console.log('inmate-service =>', inmateId);
  const response = await axios.post(`${API_URL_REGISTER}/${inmateId}`, formData);
  return response.data;
};

// Retrieve all inmates
const retrieveInmates = async (ownerId) => {
  const response = await axios.get(`${API_URL_RETRIEVE}/${ownerId}`);
  console.log('inmate retrieved=>', response);
  return response.data;
};

// Retrieve a single inmate
const retrieveInmate = async (inmateNum) => {
  const response = await axios.get(`${API_URL_DETAIL}/${inmateNum}`);
  return response.data;
};

// Update a single inmate
const updateInmate = async (id, formData) => {
  console.log('update-id', id);
  const response = await axios.post(`${API_URL_UPDATE}/${id}`, formData);
  console.log(response);
  return response.data;
};

// Delete a single inmate
const deleteInmate = async (id) => {
  const response = await axios.delete(`${API_URL_DELETE}/${id}`);
  return response.data;
};

const inmateService = {
  register,
  retrieveInmates,
  retrieveInmate,
  updateInmate,
  deleteInmate,
};

export default inmateService;













// import axios from 'axios';

// // const API_URL_REGISTER = '/api/v1/auth/create';
// const API_URL_RETRIEVE = '/api/v1/auth/users';
// const API_URL_DETAIL = '/api/v1/inmate/detail';
// const API_URL_UPDATE = '/api/v1/inmate/update-1';
// const API_URL_DELETE = '/api/v1/inmate/delete';

// // // Register inmate
// // const register = async (formData, ownerId) => {
// //   console.log('owner-service =>', ownerId);
// //   const response = await axios.post(`${API_URL_REGISTER}/${ownerId}`, formData);
// //   return response.data;
// // };

// // Retrieve all inmates
// const retrieveAllUsers = async (ownerId) => {
//   const response = await axios.get(`${API_URL_RETRIEVE}/${ownerId}`);
//   console.log('user retrieved=>', response);
//   return response.data;
// };

// // Retrieve a single inmate
// const retrieveUser = async (inmateNum) => {
//   const response = await axios.get(`${API_URL_DETAIL}/${inmateNum}`);
//   return response.data;
// };

// // Update a single inmate
// const updateUser = async (id, formData) => {
//   console.log('update-id', id);
//   const response = await axios.post(`${API_URL_UPDATE}/${id}`, formData);
//   console.log(response);
//   return response.data;
// };

// // Delete a single inmate
// const deleteUser = async (id) => {
//   const response = await axios.delete(`${API_URL_DELETE}/${id}`);
//   return response.data;
// };

// const ownerService = {
//   // register,
//   retrieveAllUsers,
//   retrieveUser,
//   updateUser,
//   deleteUser,
// };

// export default ownerService;

