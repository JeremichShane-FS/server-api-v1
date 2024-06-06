import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API";
import { Card } from "../../components";
import { TVSHOWS } from "../../constants/path";
import { TVShowsContext } from "../../contexts/TVShowsContext";
import "./TVShowDetails.scss";

const TVShowDetails = () => {
  const { id } = useParams();
  const { refresh } = useContext(TVShowsContext);
  const [tvShow, setTVShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        const res = await API.getTVShow(id);
        setTVShow(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchTVShow();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;

  const deleteTVShow = async () => {
    try {
      await API.deleteTVShow(id);
      refresh();
      history(TVSHOWS);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="tvshow-card">
      <div className="tvshow-card__header">
        <img className="tvshow-card__image" src={tvShow.poster} alt={`${tvShow.title} poster`} />
        <div className="tvshow-card__info">
          <h2 className="tvshow-card__title">{tvShow.title}</h2>
          <p className="tvshow-card__genre">Genre: {tvShow.genre}</p>
          <p className="tvshow-card__year">Release Year: {tvShow.releaseYear}</p>
          <p className="tvshow-card__description">{tvShow.description}</p>
        </div>
      </div>
      <div className="tvshow-card__cast">
        <h3 className="tvshow-card__cast-title">Cast</h3>
        <div className="tvshow-card__cast-list">
          {tvShow.actors.map((actor, i) => (
            <div key={i}>
              <p>
                {actor.name} as {actor.characterName}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="tvshow-card__delete" onClick={deleteTVShow}>
        Delete TV Show
      </button>
    </Card>
  );
};
export default TVShowDetails;
