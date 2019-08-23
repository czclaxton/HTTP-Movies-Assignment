import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = props => {
  // const [movies, setMovies] = useState([]);
  // console.log(props);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then(response => {
          // console.log("response", response);
          props.setMovies(response.data);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    getMovies();
  }, []);

  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <div>
          <Link to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
