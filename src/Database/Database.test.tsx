import {Database} from './Database';
import AsyncStorage from '@react-native-community/async-storage';

describe('Database test', () => {
  afterEach(() => {
    AsyncStorage.clear();
  });
  it('savePokemons test', async () => {
    const list = [{name: 'Prueba', url: 'Prueba'}];
    const returnedList = await Database.savePokemons(list);
    expect(list).toEqual(returnedList);
    const savedPokemons = await AsyncStorage.getItem('pokemons');
    expect(savedPokemons).toEqual(JSON.stringify(list));
  });
  it('getPokemons test', async () => {
    const list = [{name: 'Prueba', url: 'Prueba'}];
    try {
      await Database.getPokemons();
    } catch (e) {
      expect(e.message).toBe('No hay pokemones guardados previamente');
    }
    await Database.savePokemons(list);
    const savedPokemons = await Database.getPokemons();
    expect(savedPokemons).toEqual(list);
  });
  it('savePokemon test', async () => {
    const newPokemon = {
      name: '0',
      id: 0,
      moves: [],
      type: [],
      sprites: {back_default: '', front_default: ''},
    };
    const savedPokemons = await Database.savePokemon(newPokemon);
    expect(savedPokemons).toEqual([newPokemon]);
    const savedPokemonsStorage = await AsyncStorage.getItem('pokemonsCatched');
    expect(savedPokemonsStorage).toEqual(JSON.stringify([newPokemon]));

    const twoSavedPokemonsSameName = await Database.savePokemon(newPokemon);
    expect(twoSavedPokemonsSameName).toEqual([newPokemon]);
    const twoSavedPokemonsSameNameStorage = await AsyncStorage.getItem(
      'pokemonsCatched',
    );
    expect(twoSavedPokemonsSameNameStorage).toEqual(
      JSON.stringify([newPokemon]),
    );

    const newPokemonId1 = {
      name: '1',
      id: 1,
      moves: [],
      type: [],
      sprites: {back_default: '', front_default: ''},
    };
    const twoSavedPokemonsDiffName = await Database.savePokemon(newPokemonId1);
    expect(twoSavedPokemonsDiffName).toEqual([newPokemon, newPokemonId1]);
    const twoSavedPokemonsDiffNameStorage = await AsyncStorage.getItem(
      'pokemonsCatched',
    );
    expect(twoSavedPokemonsDiffNameStorage).toEqual(
      JSON.stringify([newPokemon, newPokemonId1]),
    );
  });
  it('getPokemonCatched test', async () => {
    try {
      await Database.getPokemonCatched('0');
    } catch (e) {
      expect(e.message).toBe('No tienes ningún pokemon');
    }
    const newPokemon = {
      name: '0',
      id: 0,
      moves: [],
      type: [],
      sprites: {back_default: '', front_default: ''},
    };
    await Database.savePokemon(newPokemon);
    try {
      await Database.getPokemonCatched('1');
    } catch (e) {
      expect(e.message).toBe('No tienes este pokemon');
    }
    const pokemon = await Database.getPokemonCatched('0');
    expect(pokemon).toEqual(newPokemon);
  });
  it('getAllPokemonCatched test', async () => {
    const pokemons = await Database.getAllPokemonCatched();
    expect(pokemons).toEqual([]);
    const newPokemon = {
      name: '0',
      id: 0,
      moves: [],
      type: [],
      sprites: {back_default: '', front_default: ''},
    };
    await Database.savePokemon(newPokemon);
    const pokemons1 = await Database.getAllPokemonCatched();
    expect(pokemons1).toEqual([newPokemon]);
  });
});
