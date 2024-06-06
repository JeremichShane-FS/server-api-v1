import { BsFilePersonFill } from "react-icons/bs";
import { ImTv } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { ACTORS, TVSHOWS } from "../../constants/path";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__nav">
        <li className="navbar__item">
          <NavLink to={TVSHOWS} className="navbar__link">
            <ImTv className="navbar__icon" />
            <span className="navbar__span">TV Show</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to={ACTORS} className="navbar__link">
            <BsFilePersonFill className="navbar__icon" />
            <span className="navbar__span">Actors</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
