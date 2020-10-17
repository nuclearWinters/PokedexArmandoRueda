import {combineReducers} from 'redux';
import * as Ducks from './Ducks';

export const rootReducer = combineReducers({
  pokemon: Ducks.Pokemon.reducer,
  device: Ducks.Device.reducer,
});
