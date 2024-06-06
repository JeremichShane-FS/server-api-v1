import PropTypes from "prop-types";
import { ActorsContextProvider } from "./ActorsContext";
import { TVShowsContextProvider } from "./TVShowsContext";

export const AppContextProvider = ({ children }) => {
  return (
    <TVShowsContextProvider>
      <ActorsContextProvider>{children}</ActorsContextProvider>
    </TVShowsContextProvider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
