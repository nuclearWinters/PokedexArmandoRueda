import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {createStore} from 'redux';
import * as Ducks from './Ducks';
import {rootReducer} from './Reducers';

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer);

export {Ducks};
