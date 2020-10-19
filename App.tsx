import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {Home} from './src/Screens/Home';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider, useDispatch} from 'react-redux';
import {store, useTypedSelector} from './src/Redux';
import {Loading} from './src/Screens/Loading';
import {PokemonPrison} from './src/Screens/PokemonPrison';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import {setInternet} from './src/Redux/Ducks/Device/Device';
import {PokemonMoves} from './src/Screens/PokemonMoves';
import {IPokemon, Move2} from './src/Redux/Ducks/Pokemon/PokemonTypes';
import {InfoMoveModal} from './src/Screens/InfoMoveModal';

export type MainStackParamList = {
  Home: undefined;
  Prison: undefined;
  Loading: undefined;
  PokemonMoves: {
    pokemon: IPokemon;
  };
};

export type RootStackParamList = {
  Main: undefined;
  InfoMoveModal: {
    move: Move2;
  };
};

const MainStack = createStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function MainStackScreen() {
  const isLoading = useTypedSelector((state) => state.pokemon.isLoading);
  return (
    <MainStack.Navigator>
      {isLoading ? (
        <>
          <MainStack.Screen
            name="Loading"
            component={Loading}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <MainStack.Screen
            name="Prison"
            component={PokemonPrison}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
          <MainStack.Screen
            name="PokemonMoves"
            component={PokemonMoves}
            options={{
              headerShown: false,
              animationEnabled: false,
            }}
          />
        </>
      )}
    </MainStack.Navigator>
  );
}

const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <NavigationProvider />
    </Provider>
  );
};

const NavigationProvider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (mounted) {
        dispatch(setInternet(state.isConnected));
      }
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="InfoMoveModal"
          component={InfoMoveModal}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default ReduxProvider;

export type HomeScreensNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export type LoadingScreensNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Loading'>,
  StackNavigationProp<RootStackParamList>
>;

export type PokemonMovesScreensNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'PokemonMoves'>,
  StackNavigationProp<RootStackParamList>
>;

export type PrisonScreensNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Prison'>,
  StackNavigationProp<RootStackParamList>
>;

export type InfoMoveModalScreensNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'InfoMoveModal'>,
  StackNavigationProp<MainStackParamList>
>;

export type InfoMoveModalScreenRouteProp = RouteProp<
  RootStackParamList,
  'InfoMoveModal'
>;

export type MainScreensNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  StackNavigationProp<MainStackParamList>
>;

export type PokemonMovesScreenRouteProp = RouteProp<
  MainStackParamList,
  'PokemonMoves'
>;
