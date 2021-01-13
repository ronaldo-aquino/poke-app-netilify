import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNextPokemons,
  getPokemonDetailSuccess,
  getPokemons,
  getPreviousPokemons,
} from "../redux/pokeDucks";
import PokemonDetail from "./PokemonDetail";

const Pokemons = () => {
  const dispatch = useDispatch();
  const { results, previous } = useSelector(({ pokemons }) => pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-6">
        <h2>List of Pokemons</h2>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-dark"
            onClick={() => dispatch(getNextPokemons())}
          >
            Next Pokemons
          </button>

          {previous && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(getPreviousPokemons())}
            >
              Previous Pokemons
            </button>
          )}
        </div>

        <ul className="list-group mt-2">
          {results.map((pokemon) => (
            <li
              className="list-group-item text-uppercase d-flex justify-content-between align-items-center"
              key={pokemon.name}
            >
              {pokemon.name}
              <button
                className="btn btn-sm btn-dark"
                onClick={() => dispatch(getPokemonDetailSuccess(pokemon.url))}
              >
                Detail
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h2 className="mt-2">Pokemon Detail</h2>
        <PokemonDetail />
      </div>
    </div>
  );
};

export default Pokemons;
