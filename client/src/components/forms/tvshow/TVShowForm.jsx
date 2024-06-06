import { useContext, useState } from "react";
import API from "../../../API";
import { TVShowsContext } from "../../../contexts/TVShowsContext";
import Form from "../Form";

const TVShowForm = () => {
  const initialFormState = {
    title: "",
    genre: "",
    releaseYear: "",
    poster: "",
    description: "",
  };
  const { refresh } = useContext(TVShowsContext);
  const [form, setForm] = useState(initialFormState);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.createTVShow(form);
      setForm(initialFormState);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === "releaseYear") {
      value = Number(value);
    }

    setForm({ ...form, [e.target.name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Enter TV Show</h2>
      <label htmlFor="title">
        Title
        <input type="text" id="title" name="title" value={form.title} onChange={handleChange} />
      </label>

      <label htmlFor="genre">
        Genre
        <input type="text" id="genre" name="genre" value={form.genre} onChange={handleChange} />
      </label>

      <label htmlFor="releaseYear">
        Release Year
        <input
          type="text"
          id="releaseYear"
          name="releaseYear"
          value={form.releaseYear}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="poster">
        Poster
        <input type="text" id="poster" name="poster" value={form.poster} onChange={handleChange} />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          type="text"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </Form>
  );
};
export default TVShowForm;
