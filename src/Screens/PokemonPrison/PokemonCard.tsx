import React from 'react';
import {
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageStyle,
  View,
} from 'react-native';
import {IdBadge} from '../../ComponentsLibrary/Badge/IdBadge';
import {PokeNameBadge} from '../../ComponentsLibrary/Badge/PokeNameBadge';
import {IPokemon} from '../../Redux/Ducks/Pokemon/PokemonTypes';
import unknownPokemon from '../../imgs/turtleMini.png';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList, RootStackParamList} from '../../../App';

interface IProps {
  id: string;
  navigation: CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Prison'>,
    StackNavigationProp<RootStackParamList>
  >;
  Pokemon?: IPokemon;
  backgroundColor: string;
}

export const PokemonCard = React.memo<IProps>(
  ({id, navigation, Pokemon, backgroundColor}) => (
    <>
      {Pokemon ? (
        <TouchableOpacity
          style={pokeContainerStyle}
          onPress={() => {
            navigation.navigate('PokemonMoves', {
              pokemon: Pokemon,
            });
          }}>
          <Image
            style={pokemonImageStyle}
            source={{uri: Pokemon.sprites.front_default}}
          />
          <IdBadge text={String(id)} />
          <PokeNameBadge
            backgroundColor={backgroundColor}
            text={Pokemon.name}
          />
        </TouchableOpacity>
      ) : (
        <View style={pokeContainerStyle}>
          <Image style={unknownImageStyle} source={unknownPokemon} />
          <IdBadge text={String(id)} />
        </View>
      )}
    </>
  ),
);

const {
  unknownImageStyle,
  pokemonImageStyle,
  pokeContainerStyle,
}: {
  unknownImageStyle: ImageStyle;
  pokemonImageStyle: ImageStyle;
  pokeContainerStyle: ViewStyle;
} = {
  unknownImageStyle: {
    height: 30,
    width: 30,
  },
  pokemonImageStyle: {
    height: 70,
    width: 70,
  },
  pokeContainerStyle: {
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
