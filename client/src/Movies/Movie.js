import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import MovieCard from "./MovieCard";

const Movie = props => {
  // console.log(props);
  const [movie, setMovie] = useState(null);
  const [movieSaved, setMovieSaved] = useState(false);
  useEffect(() => {
    const id = props.match.params.id;

    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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

  return (
    <div className="save-wrapper">
      <MovieCard key={movie.id} movie={movie} />
      <div onClick={() => setMovieSaved(true)} className="save-button">
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <div className="update-button">Update</div>
      </Link>
    </div>
  );
};

export default Movie;
