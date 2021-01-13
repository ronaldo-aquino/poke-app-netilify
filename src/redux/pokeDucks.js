import Axios from "axios";

/// Actions types
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS";
const GET_NEXT_POKEMONS_SUCCESS = "GET_NEXT_POKEMONS_SUCCESS";
const GET_PREVIOUS_POKEMONS_SUCCESS = "GET_PREVIOUS_POKEMONS_SUCCESS";
const GET_POKEMON_DETAIL_SUCCESS = "GET_POKEMON_DETAIL_SUCCESS";

/// InitialState
const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

/// Reducer
const pokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS_SUCCESS:
    case GET_NEXT_POKEMONS_SUCCESS:
    case GET_PREVIOUS_POKEMONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case GET_POKEMON_DETAIL_SUCCESS:
      return {
        ...state,
        pokemonDetail: action.payload,
      };

    default:
      return state;
  }
};

export default pokeReducer;

const setPokemonsStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getPokemonsStorage = (dispatch, type, key) => {
  dispatch({
    type: type,
    payload: JSON.parse(localStorage.getItem(key)),
  });
};

/// Actions creators
export const getPokemons = () => async (dispatch) => {
  const offSet = "offset";
  if (localStorage.getItem(offSet)) {
    return getPokemonsStorage(dispatch, GET_POKEMONS_SUCCESS, "offset");
  }

  try {
    console.log("dados da api");
    const apiData = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10";
    const { data } = await Axios.get(apiData);

    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: data,
    });

    setPokemonsStorage(offSet, data);
  } catch (error) {
    console.log(error);
  }
};

export const getNextPokemons = () => async (dispatch, getState) => {
  const { next } = getState().pokemons;

  if (localStorage.getItem(next)) {
    return getPokemonsStorage(dispatch, GET_NEXT_POKEMONS_SUCCESS, next);
  }

  try {
    const { data } = await Axios.get(next);

    dispatch({
      type: GET_NEXT_POKEMONS_SUCCESS,
      payload: data,
    });

    setPokemonsStorage(next, data);
  } catch (error) {
    console.log(error);
  }
};

export const getPreviousPokemons = () => async (dispatch, getState) => {
  const { previous } = getState().pokemons;

  if (localStorage.getItem(previous)) {
    return getPokemonsStorage(
      dispatch,
      GET_PREVIOUS_POKEMONS_SUCCESS,
      previous
    );
  }

  try {
    const { data } = await Axios.get(previous);

    dispatch({
      type: GET_PREVIOUS_POKEMONS_SUCCESS,
      payload: data,
    });

    setPokemonsStorage(previous, data);
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonDetailSuccess = (
  getPokemonDetailUrl = "https://pokeapi.co/api/v2/pokemon/1/"
) => async (dispatch) => {
  if (localStorage.getItem(getPokemonDetailUrl)) {
    return getPokemonsStorage(
      dispatch,
      GET_POKEMON_DETAIL_SUCCESS,
      getPokemonDetailUrl
    );
  }

  try {
    const { data } = await Axios.get(getPokemonDetailUrl);

    const dataDetail = {
      name: data.name,
      weight: data.weight,
      height: data.height,
      img: data.sprites.front_default,
    };

    dispatch({
      type: GET_POKEMON_DETAIL_SUCCESS,
      payload: dataDetail,
    });

    setPokemonsStorage(getPokemonDetailUrl, dataDetail);
  } catch (error) {
    console.log(error);
  }
};
