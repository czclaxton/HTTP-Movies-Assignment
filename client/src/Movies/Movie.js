import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import MovieCard from "./MovieCard";

const Movie = props => {
  // console.log(props);
  const [movie, setMovie] = useState(null);
  const [movieSaved, setMovieSaved] = useState(false);

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

  useEffect(() => {
    if (movieSaved === true) {
      const addToSavedList = props.addToSavedList;
      return addToSavedList(movie);
    }
    return;
  }, [movieSaved]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`);
    props.history.push("/");
  };

  return (
    <div className="save-wrapper">
      <MovieCard key={movie.id} movie={movie} />
      <div onClick={() => setMovieSaved(true)} className="save-button">
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <div className="update-button">Update</div>
      </Link>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
};

export default Movie;
