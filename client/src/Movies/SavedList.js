import React from "react";
import { NavLink, Link } from "react-router-dom";

const SavedList = props => (
  <div className="saved-list">
    <h3>Saved Movies:</h3>
    {props.list.map(movie => (
      <NavLink
        to={`/movies/${movie.id}`}
        key={movie.id}
        activeClassName="saved-active"
      >
        <span className="saved-movie">{movie.title}</span>
      </NavLink>
    ))}
    <Link to="/">
      <div className="home-button">Home</div>
    </Link>
  </div>
);

export default SavedList;
