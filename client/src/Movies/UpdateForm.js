import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = props => {
  //   console.log("update props", props);

  const [movie, setMovie] = useState({});

  useEffect(() => {
    console.log("running effect");
    const id = props.match.params.id;
    const movieInArr = props.movies.find(movie => {
      console.log(movie.id, id);
      return `${movie.id}` === id;
    });

    console.log("movieInArr:", movieInArr);
    if (movieInArr) setMovie(movieInArr);
  }, [props.items, props.match.params.id]);

  const handleChange = e => {
    return setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          placeholder="Update title"
        />
        <input
          type="text"
          onChange={handleChange}
          name="director"
          placeholder="Update director"
        />
        <input
          type="text"
          onChange={handleChange}
          name="actors"
          placeholder="Update actors"
        />
        {/* <button type="submit">Update</button> */}
      </form>
    </div>
  );
};

export default UpdateForm;
