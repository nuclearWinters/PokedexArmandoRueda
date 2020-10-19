import {reducer} from './Pokemon';

describe('Device actions', () => {
  it('should fill pokemons list and turn isLoading to false', () => {
    expect(
      reducer(undefined, {
        type: 'GET_POKEMONS',
        payload: [{name: '0', url: ''}],
      }),
    ).toEqual({
      pokemons: [{name: '0', url: ''}],
      isLoading: false,
      catchedPokemons: [],
      types: types,
      categories: categories,
    });
  });
  it('should fill catchedPokemons list', () => {
    expect(
      reducer(undefined, {
        type: 'SAVE_POKEMON',
        payload: [
          {
            name: '0',
            id: 0,
            moves: [],
            type: [],
            sprites: {back_default: '', front_default: ''},
          },
        ],
      }),
    ).toEqual({
      pokemons: [],
      isLoading: true,
      catchedPokemons: [
        {
          name: '0',
          id: 0,
          moves: [],
          type: [],
          sprites: {back_default: '', front_default: ''},
        },
      ],
      types: types,
      categories: categories,
    });
  });
});

const types = [
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
];

const categories = [
  {name: 'special', color: '#4F5870'},
  {name: 'physical', color: '#C92112'},
  {name: 'status', color: '#8C888C'},
];
