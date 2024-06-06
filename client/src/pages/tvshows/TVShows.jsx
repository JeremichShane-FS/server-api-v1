import { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components";
import { TVShowsContext } from "../../contexts/TVShowsContext";
import "./TVShows.scss";

const TVShows = () => {
  const { data, isLoading, error } = useContext(TVShowsContext);
  return (
    <Card className="tv-shows">
      <h1 className="tv-shows__title">TV Shows</h1>
      {isLoading && <div className="tv-shows__loading">Loading...</div>}
      {error && <div className="tv-shows__error">{error}</div>}
      <ul className="tv-shows__list">
        {data.map(tvShow => (
          <Link to={`/tvshows/${tvShow._id}`} key={tvShow._id} className="tv-shows__link">
            <li key={tvShow._id} className="tv-shows__item">
              <img src={tvShow.poster} alt={tvShow.title} className="tv-shows__poster" />
              <h2 className="tv-shows__name">{tvShow.title}</h2>
            </li>
          </Link>
        ))}
        {!isLoading && !error && data.length === 0 && (
          <div className="tv-shows__empty">No TV Shows</div>
        )}
      </ul>
    </Card>
  );
};

export default TVShows;
