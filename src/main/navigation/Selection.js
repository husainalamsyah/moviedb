// Selection.js

import React from "react";
import "./Selection.css";

const Selection = ({genre, genres, onGenreChange }) => (
  <div className="selection">
    <label>Genre</label>
    <select value={genre} onChange={onGenreChange}>
      
      { genres.map( genre => (
        <option value={genre.name} key={genre.id}>{genre.name}</option>
      ))}
    </select>
  </div>
);

export default Selection;