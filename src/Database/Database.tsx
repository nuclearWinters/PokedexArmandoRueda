import AsyncStorage from '@react-native-community/async-storage';
import {IPokemonList, IPokemon} from '../Redux/Ducks/Pokemon/PokemonTypes';

export const Database = {
  savePokemons: (pokemonList: IPokemonList[]) =>
    new Promise<IPokemonList[]>(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem('pokemons', JSON.stringify(pokemonList));
        resolve(pokemonList);
      } catch (e) {
        reject(e);
      }
    }),
  getPokemons: () =>
    new Promise<IPokemonList[]>(async (resolve, reject) => {
      try {
        const pokemons = await AsyncStorage.getItem('pokemons');
        if (!pokemons) {
          throw new Error('No hay pokemones guardados previamente');
        }
        resolve(JSON.parse(pokemons));
      } catch (e) {
        reject(e);
      }
    }),
  savePokemon: (pokemon: IPokemon) =>
    new Promise<IPokemon[]>(async (resolve, reject) => {
      try {
        const pokemonsCatched = await AsyncStorage.getItem('pokemonsCatched');
        if (!pokemonsCatched) {
          await AsyncStorage.setItem(
            'pokemonsCatched',
            JSON.stringify([pokemon]),
          );
          return resolve([pokemon]);
        }
        const pokemonsCatchedParse: IPokemon[] = JSON.parse(pokemonsCatched);
        const hasPokemon = pokemonsCatchedParse.find(
          (item) => pokemon.name === item.name,
        );
        if (hasPokemon) {
          return resolve(pokemonsCatchedParse);
        }
        pokemonsCatchedParse.push(pokemon);
        await AsyncStorage.setItem(
          'pokemonsCatched',
          JSON.stringify(pokemonsCatchedParse),
        );
        resolve(pokemonsCatchedParse);
      } catch (e) {
        reject(e);
      }
    }),
  getPokemonCatched: (name: string) =>
    new Promise<IPokemon>(async (resolve, reject) => {
      try {
        const pokemonsCatched = await AsyncStorage.getItem('pokemonsCatched');
        if (!pokemonsCatched) {
          throw new Error('No tienes ningún pokemon');
        }
        const pokemonsCatchedParse: IPokemon[] = JSON.parse(pokemonsCatched);
        const hasPokemon = pokemonsCatchedParse.find(
          (item) => name === item.name,
        );
        if (!hasPokemon) {
          throw new Error('No se tienes este pokemon');
        }
        resolve(hasPokemon);
      } catch (e) {
        reject(e);
      }
    }),
  getAllPokemonCatched: () =>
    new Promise<IPokemon[]>(async (resolve, reject) => {
      try {
        const pokemonsCatched = await AsyncStorage.getItem('pokemonsCatched');
        if (!pokemonsCatched) {
          throw new Error('No tienes ningún pokemon');
        }
        const pokemonsCatchedParse: IPokemon[] = JSON.parse(pokemonsCatched);
        resolve(pokemonsCatchedParse);
      } catch (e) {
        if (e.message === 'No tienes ningún pokemon') {
          resolve([]);
        } else {
          reject(e);
        }
      }
    }),
};
