import { Link } from "react-router-dom";
import { Avatar } from "../../components";
import { ROOT } from "../../constants/path";
import { Navbar } from "../../layout";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to={ROOT}>
        <div className="header__logo">📺 TV LAND</div>
      </Link>
      <Navbar />
      <Avatar />
    </div>
  );
};

export default Header;
