import {
  IPokemonList,
  IGetPokemonsResponse,
  IGetPokemonResponse,
  IPokemon,
  ITypes,
  ICategories,
} from './PokemonTypes';
import axios from 'axios';
import {Database} from '../../../Database';

interface IState {
  pokemons: IPokemonList[];
  isLoading: boolean;
  catchedPokemons: IPokemon[];
  types: ITypes[];
  categories: ICategories[];
}

const initialState: IState = {
  pokemons: [],
  catchedPokemons: [],
  isLoading: true,
  types: [
    {name: 'normal', color: '#a8a878'},
    {name: 'fighting', color: '#c13029'},
    {name: 'fire', color: '#ef8030'},
    {name: 'water', color: '#6790f0'},
    {name: 'flying', color: '#a790f0'},
    {name: 'grass', color: '#78c850'},
    {name: 'poison', color: '#a040a0'},
    {name: 'electric', color: '#f9cf31'},
    {name: 'ground', color: '#e0c069'},
    {name: 'psychic', color: '#f95888'},
    {name: 'rock', color: '#b8a038'},
    {name: 'ice', color: '#98d8d8'},
    {name: 'bug', color: '#a8b720'},
    {name: 'dragon', color: '#7038f8'},
    {name: 'ghost', color: '#6f5898'},
    {name: 'dark', color: '#705848'},
    {name: 'steel', color: '#b8b8d0'},
    {name: 'fairy', color: '#ee99ac'},
  ],
  categories: [
    {name: 'special', color: '#4F5870'},
    {name: 'physical', color: '#C92112'},
    {name: 'status', color: '#8C888C'},
  ],
};

export type PokemonTypes = GetPokemons | GetPokemon | SavePokemon;

const GET_POKEMONS = 'GET_POKEMONS';

interface GetPokemons {
  type: typeof GET_POKEMONS;
  payload: IPokemonList[];
}

export const getPokemons = () =>
  new Promise<GetPokemons>(
    async (resolve, reject): Promise<void> => {
      try {
        const pokemons = await Database.getPokemons();
        resolve({
          type: GET_POKEMONS,
          payload: pokemons,
        });
      } catch (e) {
        if (e.message === 'No hay pokemones guardados previamente') {
          try {
            const pokemons = await axios.get<IGetPokemonsResponse>(
              'https://pokeapi.co/api/v2/pokemon?limit=151',
            );
            await Database.savePokemons(pokemons.data.results);
            resolve({type: GET_POKEMONS, payload: pokemons.data.results});
          } catch (e) {
            reject(e);
          }
        }
        reject(e);
      }
    },
  );

const GET_POKEMON = 'GET_POKEMON';

interface GetPokemon {
  type: typeof GET_POKEMON;
  payload: IPokemon;
}

export const getPokemon = (pokemon: IPokemonList) =>
  new Promise<GetPokemon>(
    async (resolve, reject): Promise<void> => {
      try {
        const pokemonSaved = await Database.getPokemonCatched(pokemon.name);
        resolve({
          type: GET_POKEMON,
          payload: pokemonSaved,
        });
      } catch (e) {
        if (
          e.message === 'No se tienes este pokemon' ||
          e.message === 'No tienes ningún pokemon'
        ) {
          try {
            const pokemonRequested = await axios.get<IGetPokemonResponse>(
              pokemon.url,
            );
            resolve({
              type: GET_POKEMON,
              payload: {
                name: pokemonRequested.data.name,
                sprites: {
                  back_default: pokemonRequested.data.sprites.back_default,
                  front_default: pokemonRequested.data.sprites.front_default,
                },
                id: pokemonRequested.data.id,
                type: pokemonRequested.data.types,
                moves: pokemonRequested.data.moves.map((move) => move.move),
              },
            });
          } catch (e) {
            reject(e);
          }
        } else {
          reject(e);
        }
      }
    },
  );

const SAVE_POKEMON = 'SAVE_POKEMON';

interface SavePokemon {
  type: typeof SAVE_POKEMON;
  payload: IPokemon[];
}

export const savePokemon = (payload: IPokemon[]): SavePokemon => ({
  type: SAVE_POKEMON,
  payload,
});

export const reducer = (state = initialState, action: PokemonTypes): IState => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        isLoading: false,
      };
    case GET_POKEMON:
      return {
        ...state,
      };
    case SAVE_POKEMON:
      return {
        ...state,
        catchedPokemons: action.payload,
      };
    default:
      return state;
  }
};
