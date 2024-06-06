import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import API from "../API";

export const TVShowsContext = createContext();

export const TVShowsContextProvider = ({ children }) => {
  const initialState = {
    data: [],
    isLoading: true,
    error: "",
    refreshData: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_TVSHOWS_SUCCESS":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case "FETCH_TVSHOWS_FAILURE":
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case "REFRESH_DATA":
        return {
          ...state,
          refreshData: !state.refreshData,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const refresh = () => {
    dispatch({ type: "REFRESH_DATA" });
  };

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const res = await API.getAllTVShows();
        dispatch({ type: "FETCH_TVSHOWS_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "FETCH_TVSHOWS_FAILURE", payload: err.message });
      }
    };

    fetchTVShows();
  }, [state.refreshData]);

  return (
    <TVShowsContext.Provider value={{ ...state, refresh }}>{children}</TVShowsContext.Provider>
  );
};

TVShowsContextProvider.propTypes = {
  children: PropTypes.node,
};
