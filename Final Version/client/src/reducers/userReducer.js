import authService from '../services/auth';
import userService from '../services/user';
import storageService from '../utils/localStorage';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'SIGNUP':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'SET_USER':
      return action.payload;
    case 'SET_AVATAR':
      return { ...state, ...action.payload };
    case 'REMOVE_AVATAR':
      return { ...state, avatar: { exists: false } };
    
    case 'UPDATE_USERNAME': // Update the username in the state
    return { ...state, username: action.payload };
    
    case 'UPDATE_Birthyear': // Update the username in the state
      return { ...state, year: action.payload };
    case 'UPDATE_Role': // Update the username in the state
      return { ...state, role: action.payload };
   
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,  // Update the state with new user data
      };   
    //case 'OTP_VERIFIED': // Handle OTP verification
    //return { ...state, otpVerified: true };  
    default:
      return state;
  }
};

export const updateUsername = (userId, newUsername, email, password) => {
  return async (dispatch) => {
    try {
      // Make the API call to update the username in MongoDB
      console.log("updateUsername in userreducer");
      console.log(userId, newUsername);
      
      const updatedUser = await userService.updateUsername(userId, newUsername);
      
      // Dispatch an action to update the username in the state
      dispatch({
        type: 'UPDATE_USERNAME',
        payload: updatedUser.username, // Assuming the API returns the updated user data
      });
      const credentials = {
        email: email,
        password: password, 
      };

      const loginResponse = await authService.login(credentials);
      
      
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: loginResponse, 
      });

    
      localStorage.setItem('authToken', loginResponse.token);

      setUser();
      
      console.log(loginResponse.username);
      storageService.saveUser(loginResponse);
      console.log("done");

    } catch (error) {
      console.log(error);
      console.error('Error updating username:', error);
      
      // Handle error state as needed
    }
  };
};

export const updatebirthyear = (userId, newBirthyear) => {
  return async (dispatch) => {
    try {
      // Make the API call to update the username in MongoDB
     
      
      const updatedYear = await userService.updatebirthyear(userId, newBirthyear);
      
      // Dispatch an action to update the username in the state
      dispatch({
        type: 'UPDATE_Birthyear',
        payload: updatedYear.newBirthyear, // Assuming the API returns the updated user data
      });
      
    

    } catch (error) {
      console.log(error);
      console.error('Error updating birthyear:', error);
      
      // Handle error state as needed
    }
  };
};

export const updateUserRole = (email, newRole) => {
  return async (dispatch) => {
    try {
      // Make the API call to update the username in MongoDB
     
      console.log("in user reducer update role of "+email+" to "+newRole);
      const updatedRole = await userService.updateUserRole(email, newRole);
      
      // Dispatch an action to update the username in the state
      dispatch({
        type: 'UPDATE_Role',
        payload: updatedRole.newRole, // Assuming the API returns the updated user data
      });
      
    

    } catch (error) {
      console.log(error);
      console.error('Error updating birthyear:', error);
      
      // Handle error state as needed
    }
  };
};


// Send OTP action
export const sendOtpToEmail = (email) => {
  return async (dispatch) => {
    try {
      const response = await authService.sendOtp(email);
      dispatch({
        type: 'OTP_SENT',
        payload: response.message,
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
};

// Verify OTP action
export const verifyOtp = (email, otp) => {
  return async (dispatch) => {
    try {
      const response = await authService.verifyOtp(email, otp);
      console.log('Response:', response);
      dispatch({
        type: 'OTP_VERIFIED',
        payload: response.message,
      });
      console.log(response.status || response);
      return response.message === "OTP verified successfully";

    } catch (error) {
      console.error('Error verifying OTP:', error);
      console.log(error);
      return false;
    }
  };
};


export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.login(credentials);
    storageService.saveUser(user);
    authService.setToken(user.token);

    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };
};

export const signupUser = (credentials) => {
  return async (dispatch) => {
    console.log("singupuserreduser")
    const user = await authService.signup(credentials);
    storageService.saveUser(user);
    authService.setToken(user.token);

    dispatch({
      type: 'SIGNUP',
      payload: user,
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    storageService.logoutUser();
    authService.setToken(null);

    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const setUser = () => {
  return (dispatch) => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      authService.setToken(loggedUser.token);

      dispatch({
        type: 'SET_USER',
        payload: loggedUser,
      });
    }
  };
};

export const setAvatar = (avatarImage) => {
  return async (dispatch) => {
    const uploadedAvatar = await userService.uploadAvatar({ avatarImage });
    const prevUserData = storageService.loadUser();
    storageService.saveUser({ ...prevUserData, ...uploadedAvatar });

    dispatch({
      type: 'SET_AVATAR',
      payload: uploadedAvatar,
    });
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    await userService.removeAvatar();
    const prevUserData = storageService.loadUser();
    storageService.saveUser({ ...prevUserData, avatar: { exists: false } });

    dispatch({
      type: 'REMOVE_AVATAR',
    });
  };
};

export default userReducer;
