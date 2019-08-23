import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then(response => {
          // console.log("response", response);
          setMovies(response.data);
        })
        .catch(error => {
          console.error("Server Error", error);
        });
    };

    getMovies();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => (
          <MovieList {...props} movies={movies} setMovies={setMovies} />
        )}
      />
      <Route
        path="/movies/:id"
        render={props => (
          <Movie
            {...props}
            addToSavedList={addToSavedList}
            movies={movies}
            setMovies={setMovies}
          />
        )}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateForm {...props} movies={movies} setMovies={setMovies} />
        )}
      />
    </>
  );
};

export default App;
