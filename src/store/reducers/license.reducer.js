import ACTION from '../actionTypes';

const initialState = {
  searchLoading: false,
  searchError: null,
  fetchTypesLoading: false,
  fetchTypesError: null,
  licenseTypes: [],
  fetchStatesLoading: false,
  fetchStatesError: null,
  states: [],
  searchResult: null,
};

export default function licenseReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SEARCH_BY_LICENSE_NUMBER:
      return {
        ...state,
        searchLoading: true,
        searchError: null
      };
    case ACTION.SEARCH_BY_LICENSE_NUMBER_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResult: action.data.nurse,
        downloadUrl: action.data.url,
        searchError: null
      };
    case ACTION.SEARCH_BY_LICENSE_NUMBER_ERROR:
      return {
        ...state,
        searchLoading: false,
        searchError: action.error.response.data.message,
      };
    case ACTION.FETCH_LICENSE_TYPES:
      return {
        ...state,
        fetchTypesLoading: true,
      };
    case ACTION.FETCH_LICENSE_TYPES_SUCCESS:
      return {
        ...state,
        fetchTypesLoading: false,
        licenseTypes: action.data.licenseTypes,
      };
    case ACTION.FETCH_LICENSE_TYPES_ERROR:
      return {
        ...state,
        fetchTypesLoading: false,
        fetchTypesError: action.error,
      };
    case ACTION.FETCH_STATES:
      return {
        ...state,
        fetchStatesLoading: true,
      };
    case ACTION.FETCH_STATES_SUCCESS:
      return {
        ...state,
        fetchStatesLoading: false,
        states: action.data.states,
      };
    case ACTION.FETCH_STATES_ERROR:
      return {
        ...state,
        fetchStatesLoading: false,
        fetchStatesError: action.error,
      };
    default:
      return state;
  }
}
