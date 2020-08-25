import axios from 'axios';
import ACTION from '../actionTypes';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export function searchByLicenseNumberStart() {
  return {
    type: ACTION.SEARCH_BY_LICENSE_NUMBER,
  };
}

export function searchByLicenseNumberSuccess(data) {
  return {
    type: ACTION.SEARCH_BY_LICENSE_NUMBER_SUCCESS,
    data,
  };
}

export function searchByLicenseNumberError(error) {
  return {
    type: ACTION.SEARCH_BY_LICENSE_NUMBER_ERROR,
    error,
  };
}

export function searchByLicenseNumber(data) {
  return (dispatch) => {
    dispatch(searchByLicenseNumberStart());
    return instance
      .post('licenses/search', data)
      .then((response) => {
        dispatch(searchByLicenseNumberSuccess(response.data));
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        dispatch(searchByLicenseNumberError(error));
        return Promise.reject(error);
      });
  };
}

export function fetchLicenseTypesStart() {
  return {
    type: ACTION.FETCH_LICENSE_TYPES,
  };
}

export function fetchLicenseTypesSuccess(data) {
  return {
    type: ACTION.FETCH_LICENSE_TYPES_SUCCESS,
    data,
  };
}

export function fetchLicenseTypesError(error) {
  return {
    type: ACTION.FETCH_LICENSE_TYPES_ERROR,
    error,
  };
}

export function fetchLicenseTypes() {
  return (dispatch) => {
    dispatch(fetchLicenseTypesStart());
    return instance
      .get('licenses/types')
      .then((response) => {
        dispatch(fetchLicenseTypesSuccess(response.data));
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        dispatch(fetchLicenseTypesError(error));
        return Promise.reject(error);
      });
  };
}

export function fetchStatesStart() {
  return {
    type: ACTION.FETCH_STATES,
  };
}

export function fetchStatesSuccess(data) {
  return {
    type: ACTION.FETCH_STATES_SUCCESS,
    data,
  };
}

export function fetchStatesError(error) {
  return {
    type: ACTION.FETCH_STATES_ERROR,
    error,
  };
}

export function fetchStates() {
  return (dispatch) => {
    dispatch(fetchStatesStart());
    return instance
      .get('licenses/states')
      .then((response) => {
        dispatch(fetchStatesSuccess(response.data));
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        dispatch(fetchStatesError(error));
        return Promise.reject(error);
      });
  };
}
