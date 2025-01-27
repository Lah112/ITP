import axios from 'axios';
import backendUrl from '../backendUrl';

export let token = null;

const setToken = (newToken) => {
  token = newToken;
};

// Send OTP to email
const sendOtp = async (email) => {
  const response = await axios.post(`${backendUrl}/api/send-otp`, { email });
  return response.data;
};

// Verify OTP
const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${backendUrl}/api/verify-otp`, { email, otp });
  return response.data;
};

const login = async (credentials) => {
  console.log("loggin")
  const response = await axios.post(`${backendUrl}/api/login`, credentials);
  return response.data;
};

const logout = () => {
  token = null; // Clear the token (you can also remove it from localStorage if stored there)
  // You can add any other logout-related logic here, such as redirecting or clearing cookies
};

const signup = async (enteredData) => {
  const response = await axios.post(`${backendUrl}/api/signup`, enteredData);
  return response.data;
};

const authService = { setToken, login, logout, signup, sendOtp, verifyOtp };

export default authService;
