import Axios from "axios";

/// Actions types
const GET_POKEMONS_SUCCESS = "GET_POKEMONS_SUCCESS";

/// InitialState
const initialState = {
  pokemons: [],
};

/// Reducer
const pokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS_SUCCESS:
      return {
        ...state,
        pokemons: action.payload,
      };

    default:
      return state;
  }
};

export default pokeReducer;

/// Actions creators
export const getPokemons = () => async (dispatch, getState) => {
  try {
    const apiData = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
    const { data } = Axios.get(apiData);

    dispatch({
      type: GET_POKEMONS_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    console.log(error);
  }
};
