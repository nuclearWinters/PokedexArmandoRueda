import {getPokemons} from './Pokemon';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const mockAxios = new MockAdapter(axios);

mockAxios.onGet('https://pokeapi.co/api/v2/pokemon?limit=151').networkError();

describe('Device actions 500', () => {
  afterEach(() => {
    AsyncStorage.clear();
  });
  it('getPokemons action NO previous save', async () => {
    try {
      await getPokemons();
    } catch (e) {
      expect(e.message).toEqual('Network Error');
    }
  });
});
