import { useContext, useState } from "react";
import API from "../../../API";
import { ActorsContext } from "../../../contexts/ActorsContext";
import Form from "../Form";

const ActorForm = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bio: "",
    picture: "",
    filmography: [{ tvShowId: "", characterName: "" }],
  };
  const { refresh } = useContext(ActorsContext);
  const genders = ["Male", "Female", "Non-Binary"];
  const [form, setForm] = useState(initialFormState);

  const handleChange = e => {
    if (e.target.name === "tvShowId" || e.target.name === "characterName") {
      setForm({
        ...form,
        filmography: [
          {
            ...form.filmography[0],
            [e.target.name]: e.target.value,
          },
        ],
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let actorData = { ...form };

    if (form.filmography[0].tvShowId === "" || form.filmography[0].characterName === "") {
      delete actorData.filmography;
    }

    try {
      await API.createActor(actorData);
      setForm(initialFormState);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Enter Actor</h2>

      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="lastName">
        Last Name
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="dob">
        Date of Birth
        <input type="date" id="dob" name="dob" value={form.dob} onChange={handleChange} />
      </label>

      {genders.map(gender => (
        <label key={gender} htmlFor={gender}>
          <input
            type="radio"
            id={gender}
            name="gender"
            value={gender}
            onChange={handleChange}
            checked={form.gender === gender}
          />
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </label>
      ))}

      <label htmlFor="bio">
        Biography
        <textarea type="text" id="bio" name="bio" value={form.bio} onChange={handleChange} />
      </label>

      <label htmlFor="picture">
        Picture
        <input
          type="text"
          id="picture"
          name="picture"
          value={form.picture}
          onChange={handleChange}
        />
      </label>

      <h2>Filmography</h2>
      <label htmlFor="tvShowId">
        TV Show ID
        <input
          type="text"
          id="tvShowId"
          name="tvShowId"
          value={form.filmography[0].tvShowId}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="characterName">
        Character Name
        <input
          type="text"
          id="characterName"
          name="characterName"
          value={form.filmography[0].characterName}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </Form>
  );
};
export default ActorForm;
