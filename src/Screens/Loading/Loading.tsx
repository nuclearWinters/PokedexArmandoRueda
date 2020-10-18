import React, {FC, useEffect, useState, useRef, useCallback} from 'react';
import {View, ActivityIndicator, ViewStyle, TextStyle} from 'react-native';
import {Ducks} from '../../Redux';
import {useDispatch} from 'react-redux';
import {Database} from '../../Database';
import {InternetWarning} from '../../ComponentsLibrary/InternetWarning';
import {ErrorRetry} from '../../ComponentsLibrary/ErrorRetry';

export const Loading: FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(true);
  const fetchPokemons = useCallback(async () => {
    try {
      setIsLoading(true);
      const [capturedPokemons, pokemons] = await Promise.all([
        Database.getAllPokemonCatched(),
        Ducks.Pokemon.getPokemons(),
      ]);
      if (mounted.current) {
        setIsLoading(false);
        dispatch(Ducks.Pokemon.savePokemon(capturedPokemons));
        dispatch(pokemons);
      }
    } catch (e) {
      if (mounted.current) {
        setIsLoading(false);
        setError(e.message);
      }
    }
  }, [dispatch]);
  useEffect(() => {
    fetchPokemons();
    return () => {
      mounted.current = false;
    };
  }, [fetchPokemons]);
  return (
    <View style={style.container}>
      {!!error && <ErrorRetry onPress={fetchPokemons} />}
      {isLoading && <ActivityIndicator size="large" color="forestgreen" />}
      <InternetWarning />
    </View>
  );
};

const style: {container: ViewStyle; errorText: TextStyle} = {
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorText: {
    marginBottom: 20,
    fontSize: 20,
    marginHorizontal: 30,
    textAlign: 'center',
  },
};
