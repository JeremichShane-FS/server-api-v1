import PropTypes from "prop-types";
import "./Card.scss";

const Card = ({ children, className }) => {
  return <article className={`card ${className}`}>{children}</article>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
