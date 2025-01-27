import userService from '../services/user';

export const updateUsername = (userId, newUsername) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.updateUsername(userId, newUsername);
      dispatch({
        type: 'UPDATE_USERNAME',
        payload: updatedUser.username,
      });
    } catch (error) {
      console.error('Error updating username:', error);
      // Handle error as needed
    }
  };
};