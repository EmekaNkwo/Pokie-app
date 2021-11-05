import React from "react";
import "./PokemonList.css";

export default function PokemonList({ id, name, image }) {
  return (
    <div className="pokie-container">
      <div className="number">
        <small>0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="pokie-wrapper">
        <h1>{name}</h1>
      </div>
    </div>
  );
}
