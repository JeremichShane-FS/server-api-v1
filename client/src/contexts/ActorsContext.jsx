import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import API from "../API";

export const ActorsContext = createContext();

export const ActorsContextProvider = ({ children }) => {
  const initialState = {
    data: [],
    isLoading: true,
    error: "",
    refreshData: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_ACTORS_SUCCESS":
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      case "FETCH_ACTORS_FAILURE":
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
    const fetchData = async () => {
      try {
        const res = await API.getAllActors();
        dispatch({ type: "FETCH_ACTORS_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "FETCH_ACTORS_FAILURE", payload: err.message });
      }
    };

    fetchData();
  }, [state.refreshData]);

  return <ActorsContext.Provider value={{ ...state, refresh }}>{children}</ActorsContext.Provider>;
};

ActorsContextProvider.propTypes = {
  children: PropTypes.node,
};
