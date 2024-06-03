import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const API = Object.create(null);

API.getAllTVShows = async query => {
  const res = await axios.get(`${baseURL}/tv-shows`, { params: query });
  return res.data;
};

API.getTVShow = async id => {
  const res = await axios.get(`${baseURL}/tv-shows/${id}`);
  return res.data;
};

API.getAllActors = async query => {
  const res = await axios.get(`${baseURL}/actors`, { params: query });
  return res.data;
};

API.getActor = async id => {
  const res = await axios.get(`${baseURL}/actors/${id}`);
  return res.data;
};

export default API;
