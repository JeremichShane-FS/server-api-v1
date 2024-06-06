import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";
const API = Object.create(null);

API.getAllTVShows = async query => {
  const res = await axios.get(`${baseURL}/tvshows`, { params: query });
  return res.data;
};

API.getTVShow = async id => {
  const res = await axios.get(`${baseURL}/tvshows/${id}`);
  return res.data;
};

API.createTVShow = async data => {
  const res = await axios.post(`${baseURL}/tvshows`, data);
  console.log("Status code:", res.status);
  console.log("Response data:", res.data);
  return res.data;
};

API.deleteTVShow = async id => {
  const res = await axios.delete(`${baseURL}/tvshows/${id}`);
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

API.createActor = async data => {
  const res = await axios.post(`${baseURL}/actors`, data);
  return res.data;
};

API.deleteActor = async id => {
  const res = await axios.delete(`${baseURL}/actors/${id}`);
  return res;
};

API.getProfilePicture = async () => {
  const res = await axios.get("https://randomuser.me/api/");
  return res.data.results[0].picture.thumbnail;
};

export default API;
