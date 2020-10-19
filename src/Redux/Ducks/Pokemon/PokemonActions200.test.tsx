import {getPokemons, savePokemon} from './Pokemon';
import {IGetPokemonsResponse} from './PokemonTypes';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Database} from '../../../Database';

const mockAxios = new MockAdapter(axios);

mockAxios
  .onGet('https://pokeapi.co/api/v2/pokemon?limit=151')
  .reply<IGetPokemonsResponse>(200, {
    count: 0,
    next: '',
    previous: null,
    results: [{name: '0', url: ''}],
  });

describe('Device actions 200', () => {
  afterEach(() => {
    AsyncStorage.clear();
  });
  it('getPokemons action NO previous save', async () => {
    const expectedAction = {
      type: 'GET_POKEMONS',
      payload: [{name: '0', url: ''}],
    };
    expect(await getPokemons()).toEqual(expectedAction);
  });
  it('getPokemons action previous save', async () => {
    await Database.savePokemons([{name: '1', url: ''}]);
    const expectedAction = {
      type: 'GET_POKEMONS',
      payload: [{name: '1', url: ''}],
    };
    expect(await getPokemons()).toEqual(expectedAction);
  });
  it('savePokemon action', async () => {
    const list = {
      name: '0',
      id: 0,
      moves: [],
      type: [],
      sprites: {back_default: '', front_default: ''},
    };
    const expectedAction = {
      type: 'SAVE_POKEMON',
      payload: [list],
    };
    expect(savePokemon([list])).toEqual(expectedAction);
  });
});
