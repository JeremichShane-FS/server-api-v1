import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API";
import { Card } from "../../components";
import { ACTORS } from "../../constants/path";
import { ActorsContext } from "../../contexts/ActorsContext";
import "./ActorDetails.scss";

const ActorDetails = () => {
  const { id } = useParams();
  const { refresh } = useContext(ActorsContext);
  const [actor, setActor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await API.getActor(id);
        setActor(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setIsLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  const deleteActor = async () => {
    try {
      await API.deleteActor(id);
      refresh();
      history(ACTORS);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="actor-card">
      <div className="actor-card__header">
        <img
          className="actor-card__image"
          src={actor.picture}
          alt={`${actor.firstName} ${actor.lastName}`}
        />
        <div className="actor-card__info">
          <h2 className="actor-card__name">
            {actor.firstName} {actor.lastName}
          </h2>
          <p className="actor-card__age">Age: {actor.age}</p>
          <p className="actor-card__gender">Gender: {actor.gender}</p>
          <p className="actor-card__bio">{actor.bio}</p>
        </div>
      </div>
      <div className="actor-card__filmography">
        <h3 className="actor-card__filmography-title">Filmography</h3>
        <div className="actor-card__filmography-list">
          {actor.filmography.map((film, i) => (
            <div key={i}>
              <p>
                {film.title} as {film.characterName}
              </p>
              <p>{film.year}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="actor-card__delete" onClick={deleteActor}>
        X
      </button>
    </Card>
  );
};
export default ActorDetails;
