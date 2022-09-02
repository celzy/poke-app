import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';



function App() {

  const [pokemonName,setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
        species: "",
        img: "",
        hp: "",
        attack: "",
        defense: "",
        type: "",
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((Response) => {
      setPokemonInfo({
        name: pokemonName,
        species: Response.data.species.name,
        img: Response.data.sprites.front_default,
        hp: Response.data.stats[0].base_stat,
        attack: Response.data.stats[1].base_stat,
        defense: Response.data.stats[2].base_stat,
        type: Response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    });
    
  };

  return (
    <div className="App">
      <div className='titleSection'>
        <h1>Poke Stats</h1>
        <input type='text' onChange={(event) => {setPokemonName(event.target.value)}}></input>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='display'>
        {!pokemonChosen ? <h2>Please pick a pokemon</h2> : <h2>{pokemonInfo.name}</h2>}

        {!pokemonChosen ? <br></br> : <img  className="img-container" src={pokemonInfo.img}></img>}

        {!pokemonChosen ? <h2>Waiting For Your pokemon</h2> : <div className='info-container'>
          <div className='pokemon-info-left'>
            <h3>Species: {pokemonInfo.species}</h3>
            <h3>HP: {pokemonInfo.hp}</h3>
            <h3>Attack Power: {pokemonInfo.attack}</h3>
          </div>
          <div className='pokemon-info-right'>
            <h3>Defense Power: {pokemonInfo.defense}</h3>
            <h3>type: {pokemonInfo.type}</h3>
          </div>
        </div>}

        {/* <div className='info-container'>
          <div className='pokemon-info-left'>
            <h3>Species: {pokemonInfo.species}</h3>
            <h3>HP: {pokemonInfo.hp}</h3>
            <h3>Attack Power: {pokemonInfo.attack}</h3>
          </div>
          <div className='pokemon-info-right'>
            <h3>Defense Power: {pokemonInfo.defense}</h3>
            <h3>type: {pokemonInfo.type}</h3>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
