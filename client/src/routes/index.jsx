import { Dashboard, NotFound } from "../components";
import * as p from "../constants/path";
import { ActorDetails, Actors, Home, TVShowDetails, TVShows } from "../pages";
import { Root } from "./Root";

export const routes = [
  {
    path: p.ROOT,
    element: <Root />,
    children: [
      { path: p.ROOT, element: <Home /> },
      { path: p.DASHBOARD, element: <Dashboard /> },
      { path: p.TVSHOWS, element: <TVShows /> },
      { path: p.TVSHOWDETAILS, element: <TVShowDetails /> },
      { path: p.ACTORS, element: <Actors /> },
      { path: p.ACTORDETAILS, element: <ActorDetails /> },
      { path: p.NOTFOUND, element: <NotFound /> },
    ],
  },
];
