import axios from "axios";
import {
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_APPLY_JOB_REQUEST,
  USER_APPLY_JOB_SUCCESS,
  USER_APPLY_JOB_FAIL,
  ALL_USER_LOAD_REQUEST,
  ALL_USER_LOAD_SUCCESS,
  ALL_USER_LOAD_FAIL,
} from "../constants/userConstant";
import { toast } from "react-toastify";

/*
In summary, actions are events that describe something happening in the app, 
constants define action types, and reducers specify how state changes in response to actions.
This combination creates the core mechanism of Redux for managing the state of your React application.
*/

// sign in action
export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post("http://localhost:8000/api/signIn", user); // data received from the frontend will be user object
    console.log("data", data);
    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    toast.success("Successfully logged in");
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data.error,
    });
    toast.error("Invalid credentials, check and try again");
  }
};

// log out action
export const userLogOutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:8000/api/logout");
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("You logged out");
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

// user profile action
export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:8000/api/me");
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};


// user apply job action
export const userApplyJobAction = (job) => async (dispatch) => {
  dispatch({ type: USER_APPLY_JOB_REQUEST });
  try {
    const { data } = await axios.post("http://localhost:8000/api/user/jobsHistory", job);
    dispatch({
      type: USER_APPLY_JOB_SUCCESS,
      payload: data,
    });
    toast.success("Applied Successfully");
  } catch (error) {
    dispatch({
      type: USER_APPLY_JOB_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error); //should login first
  }
};

// all users action
export const allUsersAction = () => async (dispatch) => {
  dispatch({ type: ALL_USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:8000/api/allUsers");
    dispatch({
      type: ALL_USER_LOAD_SUCCESS,
      payload: data,
    });
    toast.success("Applied Successfully");
  } catch (error) {
    dispatch({
      type: ALL_USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error); //should login first
  }
};