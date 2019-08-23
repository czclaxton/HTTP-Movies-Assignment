import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = props => {
  //   console.log("update props", props);

  const [movie, setMovie] = useState(null);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => {
        console.error(err.response);
      });
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = e => {
    return setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleStar = index => e => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        return starIndex === index ? e.target.value : star;
      })
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie.title}
          onChange={handleChange}
          name="title"
          placeholder="Update title"
        />
        <input
          type="text"
          value={movie.director}
          onChange={handleChange}
          name="director"
          placeholder="Update director"
        />
        <input
          type="text"
          value={movie.metascore}
          onChange={handleChange}
          name="metascore"
          placeholder="Update metascore"
        />

        {movie.stars.map((starName, index) => {
          return (
            <input
              type="text"
              value={starName}
              key={index}
              onChange={handleStar(index)}
              name="stars"
              placeholder="Update stars"
            />
          );
        })}
        <button>Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateForm;
