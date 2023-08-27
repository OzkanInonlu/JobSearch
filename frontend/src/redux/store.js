import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadJobReducer, loadSingleJobReducer } from "./reducers/jobReducer";
import { loadJobTypeReducer } from "./reducers/jobTypeReducer";
import { userSignInReducer, userLogOutReducer, userProfileReducer, userApplyJobReducer, allUsersReducer } from "./reducers/userReducer";

//combine reducers
const reducer = combineReducers({
  loadJobs: loadJobReducer,
  loadJobTypes: loadJobTypeReducer,
  userSignIn: userSignInReducer,
  userLogOut: userLogOutReducer,
  userProfile: userProfileReducer,
  loadSingleJob: loadSingleJobReducer,
  userApplyJob: userApplyJobReducer,
  allUsers: allUsersReducer
});

//initial state
let initialState = {
  userSignIn: { // for log in - log out
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")) 
      : null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
