import axios from "axios";
import {
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_SINGLE_FAIL,
  JOB_LOAD_SINGLE_REQUEST,
  JOB_LOAD_SINGLE_SUCCESS,
  JOB_LOAD_SUCCESS,
} from "../constants/jobConstant";

/*
In summary, actions are events that describe something happening in the app, 
constants define action types, and reducers specify how state changes in response to actions.
This combination creates the core mechanism of Redux for managing the state of your React application.
*/

/*
You define actions using plain JavaScript objects. 
An action must have a type property that describes the type of action being performed, 
and it can optionally include a payload property to carry additional data.
You call dispatch with an action object. This is typically done within a component or an action creator function.
Redux takes the action and passes it to all of your reducers.
Reducers are functions that specify how the state should change in response to actions. 
They return a new state object based on the old state and the action.
The Redux store updates its state with the new state returned by the reducer.


*/

export const jobLoadAction =
  (pageNumber, keyword = "", cat = "", location = "") =>
  async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`
      );
      dispatch({
        type: JOB_LOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOB_LOAD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

//single job
export const singleJobLoadAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
      const { data } = await axios.get(`http://localhost:8000/api/job/${id}`);
      dispatch({
        type: JOB_LOAD_SINGLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: JOB_LOAD_SINGLE_FAIL,
        payload: error.response.data.error,
      });
    }
  };
