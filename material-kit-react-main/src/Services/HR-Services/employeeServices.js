/* eslint-disable */
import axios from 'axios';

// Define your base URL here
const BASE_URL = 'https://woka-app.vercel.app';

axios.defaults.baseURL = BASE_URL;

const API_URL_REGISTER = '/api/v1/employee/create';
const API_URL_RETRIEVE = '/api/v1/employee/employees';
const API_URL_DETAIL = '/api/v1/employee/detail';
const API_URL_UPDATE = '/api/v1/employee/update-1';
const API_URL_DELETE = '/api/v1/employee/delete';
const API_PAYROLL = '/api/v1/designation';
const API_URL_RETRIEVE_DESIGNATION = '/api/v1/employee/designation';
const API_URL_COMPLAIN_STATUS = '/api/v1/employee/complain-status';
const API_URL_MARK_TODAY = '/api/v1/employee/mark';
const API_URL_UPDATE_COMPLAIN = '/api/v1/employee/updateComplain';
const API_URL_MARK_ALL_TODAY = '/api/v1/employee/all/mark';
const API_URL_FETCH_ALL_ATTENDANCE = '/api/v1/employee/all-attendance';
const API_URL_AUTH_PORT_ACCESS = '/api/v1/employee/accessId';
const API_URL_AUTH_DATA_ACCESS = '/api/v1/employee/collectorId';

// Function to construct the base URL
const constructURL = (endpoint) => `${BASE_URL}${endpoint}`;

// Register employee
const register = async (employeeData, employeeId) => {
  console.log('employee-service =>', employeeData);
  const response = await axios.post(
    constructURL(API_URL_REGISTER + `/${employeeId}`),
    employeeData
  );
  return response.data;
};

// Retrieve all employees
const retrieveEmployees = async (email) => {
  console.log('retrievedEmployee=>', email);
  const response = await axios.get(constructURL(API_URL_RETRIEVE + `/${email}`));
  console.log('employees retrieved =>', response);
  return response.data;
};

// Retrieve employee designations
const retrieveDesignations = async (email) => {
  console.log('retrieval email...');
  const url = constructURL(API_URL_RETRIEVE_DESIGNATION + `/${email}`);
  const response = await axios.get(url);
  return response.data;
};

// Retrieve a single employee
const retrieveEmployee = async (employeeNum) => {
  const response = await axios.get(constructURL(API_URL_DETAIL + `/${employeeNum}`));
  console.log('single mployees retrieved =>', response);
  return response.data;
};

// Update a single employee
const updateEmployee = async (id, formData) => {
  console.log('update-id', id);
  const response = await axios.post(constructURL(API_URL_UPDATE + `/${id}`), formData);
  console.log(response);
  return response.data;
};

// Delete a single employee
const deleteEmployee = async (id) => {
  const response = await axios.delete(constructURL(API_URL_DELETE + `/${id}`));
  return response.data;
};

// Save payroll data for an employee
const savePayrollData = async (requestPayload) => {
  console.log('employeeId=>', requestPayload);
  const response = await axios.post(constructURL(API_PAYROLL), requestPayload);
  return {
    requestPayload: response.data,
  };
};

// Complain status
const complainStatus = async (date, employeeId, complainDetail, dueDate, label) => {
  const response = await axios.get(
    constructURL(
      API_URL_COMPLAIN_STATUS + `/${employeeId}/${dueDate}/${date}/${label}/${complainDetail}`
    )
  );
  return response.data;
};

// Update complain
const updateComplain = async (date) => {
  console.log('updateComplain date=>', date);
  const response = await axios.post(constructURL(API_URL_UPDATE_COMPLAIN + `/${date}`));
  return response.data;
};

// Mark today for a single employee
const markTodayEmployee = async (date, employeeId, label) => {
  console.log('employeeId:', employeeId, 'label:', label, 'date:', date);
  const response = await axios.get(
    constructURL(API_URL_MARK_TODAY + `/${date}/${employeeId}/${label}`)
  );
  return response.data;
};

// Mark today for all employees
const markTodayAllEmployees = async (userEmail, label, date) => {
  console.log(userEmail, label, date);
  const response = await axios.get(
    constructURL(API_URL_MARK_ALL_TODAY + `/${userEmail}/${date}/${label}`)
  );
  console.log(response);
  // return response.data;
};

// Retrieve all employee attendance
const retrieveAllAttendance = async (userEmail, dateOffset) => {
  const response = await axios.get(
    constructURL(API_URL_FETCH_ALL_ATTENDANCE + `/${userEmail}/${dateOffset}`)
  );
  return response.data;
};

// auth port access
const authenticatePortalAccess = async (portalCode) => {
  console.log(portalCode)
  const response = await axios.get(constructURL(API_URL_AUTH_PORT_ACCESS + `/${portalCode}`));
  return response.data;
};

// auth port access
const authDataAccess = async (dataCode) => {
  console.log('Data-services code =>',dataCode)
  const response = await axios.get(constructURL(API_URL_AUTH_DATA_ACCESS + `/${dataCode}`));
  return response.data;
};


const employeeService = {
  register,
  retrieveEmployees,
  retrieveEmployee,
  updateEmployee,
  deleteEmployee,
  savePayrollData,
  retrieveDesignations,
  complainStatus,
  markTodayEmployee,
  markTodayAllEmployees,
  updateComplain,
  retrieveAllAttendance,
  authenticatePortalAccess,
  authDataAccess,
 
};

export default employeeService;
