import React, { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";

import "./App.css";

function App() {
  const [allpokie, setAllPokie] = useState([]);

  const [loadMorePokies, setLoadMorePokies] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [loading, setLoading] = useState(true);

  const loadPokies = async () => {
    const res = await fetch(loadMorePokies);

    const data = await res.json();
    setLoadMorePokies(data.next);

    function createPokieObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        const data = await res.json();

        setAllPokie((currentPage) => [...currentPage, data]);
      });
    }
    createPokieObject(data.results);
  };

  useEffect(() => {
    setLoading(true);
    loadPokies();
    setLoading(false);

    setLoading(false);
  }, []);

  // function gotoNextPage() {
  //   setCurrentList(nextPage);
  // }
  // function gotoPrevPage() {
  //   setCurrentList(prevPage);
  // }
  if (loading) return <p className="loading-text">Loading... Please Wait</p>;
  return (
    <div className="App">
      <div className="header">
        <h1>Pokemon Characters</h1>
      </div>
      <div className="pokemon-container">
        <div className="main-container">
          {allpokie.map((pokemon, index) => (
            <PokemonList
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              key={index}
            />
          ))}
        </div>

        <button className="pokie-button" onClick={() => loadPokies()}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
