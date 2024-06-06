import PropTypes from "prop-types";
import "./Form.scss";

const Form = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

export default Form;
