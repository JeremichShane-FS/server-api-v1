import logo from "../../assets/img/logo.png";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <img src={logo} alt="TV Land logo" className="home__logo" />
    </div>
  );
};
export default Home;
