import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetailSuccess } from "../redux/pokeDucks";

const PokemonDetail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonDetailSuccess());
  }, [dispatch]);

  const { pokemonDetail } = useSelector(({ pokemons }) => pokemons);

  const getFistLetterUppercase = (name) => {
    return name[0].toUpperCase() + name.substr(1);
  };

  return pokemonDetail ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
        <img
          className="img-fluid"
          src={pokemonDetail.img}
          alt={pokemonDetail.name}
        />
        <div className="card-title">
          Pokemon Name: {getFistLetterUppercase(pokemonDetail.name)}
        </div>
        <p className="card-text">
          Height: {pokemonDetail.height} | Weight: {pokemonDetail.weight}
        </p>
      </div>
    </div>
  ) : null;
};

export default PokemonDetail;
