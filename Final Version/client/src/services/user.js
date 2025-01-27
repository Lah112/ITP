import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/api/users`;
const baseUrl1 = `${backendUrl}/api/user`;
const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getUserData = async (username) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${username}`); // Use the correct endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Optionally rethrow to handle in the component
  }
};


const getUser = async (username, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/${username}/?limit=${limit}&page=${page}`
  );
  return response.data;
};

const uploadAvatar = async (avatarObj) => {
  const response = await axios.post(
    `${baseUrl}/avatar`,
    avatarObj,
    setConfig()
  );
  return response.data;
};

const removeAvatar = async () => {
  const response = await axios.delete(`${baseUrl}/avatar`, setConfig());
  return response.data;
};


const deleteUser = async (userId) => {
  const response = await axios.delete(`${baseUrl}/${userId}`);
  return response.data;
};


export const updateUsername = async (userId, newUsername) => {
  console.log("in user service");
  console.log(userId, newUsername);
  try {
    console.log("in user service try");
    const response = await axios.put(`${baseUrl}/user-name`, { userId, newUsername }, setConfig()); // Only send newUsername
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : null; // Return error response if available
  }
  
   // Ensure this returns the updated user data
};

export const updatebirthyear = async (userId, newBirthyear) => {
  //console.log("in user service");
  //console.log(userId, newUsername);
  try {
    console.log("in user service try");
    const response = await axios.put(`${baseUrl}/birth-year`, { userId, newBirthyear }, setConfig()); // Only send newUsername
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : null; // Return error response if available
  }
  
   // Ensure this returns the updated user data
};

export const updateUserRole = async (email, newRole) => {
  //console.log("in user service");
  //console.log(userId, newUsername);
  console.log("in service update role of "+email+" to "+newRole);
  try {
    console.log("in user service try");
    const response = await axios.put(`${baseUrl}/user-role`, { email, newRole }, setConfig()); // Only send newUsername
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : null; // Return error response if available
  }
  
   // Ensure this returns the updated user data
};

const userService = { getUser, uploadAvatar, removeAvatar, updateUsername, deleteUser, updatebirthyear,updateUserRole, getUserData };

export default userService;
