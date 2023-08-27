import {
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_RESET,
  JOB_LOAD_SUCCESS,

  JOB_LOAD_SINGLE_FAIL,
  JOB_LOAD_SINGLE_REQUEST,
  JOB_LOAD_SINGLE_RESET,
  JOB_LOAD_SINGLE_SUCCESS,
} from "../constants/jobConstant";

export const loadJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_REQUEST:
      return { loading: true };
    case JOB_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        locationSet: action.payload.locationSet,
        jobs: action.payload.jobs,
      };
    case JOB_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

//single job reducer
export const loadSingleJobReducer = (state = { job: {} }, action) => {
  switch (action.type) {
    case JOB_LOAD_SINGLE_REQUEST:
      return { loading: true };
    case JOB_LOAD_SINGLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        singleJob: action.payload.job
      };
    case JOB_LOAD_SINGLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case JOB_LOAD_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};