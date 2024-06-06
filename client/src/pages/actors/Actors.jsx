import { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components";
import { ActorsContext } from "../../contexts/ActorsContext";
import "./Actors.scss";

const Actors = () => {
  const { data, error, isLoading } = useContext(ActorsContext);
  return (
    <Card className="actors">
      <h1 className="actors__title">Actors</h1>
      {isLoading && <div className="actors__loading">Loading...</div>}
      {error && <div className="actors__error">{error}</div>}
      <ul className="actors__list">
        {data.map(actor => (
          <Link to={`/actors/${actor._id}`} key={actor._id} className="actors__link">
            <li key={actor._id} className="actors__item">
              <img src={actor.picture} alt={actor.name} className="actors__image" />
              <h2 className="actors__name">
                {actor.firstName} {actor.lastName}
              </h2>
            </li>
          </Link>
        ))}
        {!isLoading && !error && data.length === 0 && (
          <div className="actors__empty">No Actors</div>
        )}
      </ul>
    </Card>
  );
};
export default Actors;
