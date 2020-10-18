import React, {FC} from 'react';
import {View, FlatList, Image, ImageStyle, ViewStyle} from 'react-native';
import {useTypedSelector} from '../../Redux';
import {PokedexLayout} from '../../ComponentsLibrary/PokedexLayout';
import {useNavigation} from '@react-navigation/native';
import {PrisonScreensNavigationProp} from '../../../App';
import unknownPokemon from '../../imgs/turtleMini.png';
import {IdBadge} from '../../ComponentsLibrary/Badge/IdBadge';
import {PokeNameBadge} from '../../ComponentsLibrary/Badge/PokeNameBadge';
import {InternetWarning} from '../../ComponentsLibrary/InternetWarning';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const PokemonPrison: FC = () => {
  const navigation = useNavigation<PrisonScreensNavigationProp>();

  const capturedPokemons = useTypedSelector(
    (state) => state.pokemon.catchedPokemons,
  );

  const CatchEmAll = new Array<number>(151)
    .fill(0)
    .map((_, index) => index + 1);

  const pokeRows = CatchEmAll.reduce<number[][]>((all, one, i) => {
    const ch = Math.floor(i / 3);
    all[ch] = ([] as number[]).concat(all[ch] || [], one);
    return all;
  }, []);

  const types = useTypedSelector((state) => state.pokemon.types);

  const renderPokeRows = ({item}: {item: number[]}) => {
    const Fila = item.map((num) => {
      const Pokemon = capturedPokemons.find(({id}) => id === num);
      if (Pokemon) {
        const pokemonType = types.find(
          (type) => Pokemon.type[0].type.name === type.name,
        );
        return (
          <TouchableOpacity
            key={num}
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
            <IdBadge text={String(num)} />
            <PokeNameBadge
              backgroundColor={pokemonType?.color || '#999'}
              text={Pokemon.name}
            />
          </TouchableOpacity>
        );
      } else {
        return (
          <View key={num} style={pokeContainerStyle}>
            <Image style={unknownImageStyle} source={unknownPokemon} />
            <IdBadge text={String(num)} />
          </View>
        );
      }
    });
    return <View style={pokeRowStyle}>{Fila}</View>;
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <PokedexLayout BigButtonOnPress={navigateToHome}>
      <View style={container}>
        <FlatList<number[]>
          keyExtractor={(_, index) => 'key' + index}
          style={flatListStyle}
          ListHeaderComponent={() => <View style={headerHeight} />}
          data={pokeRows}
          renderItem={renderPokeRows}
        />
      </View>
      <InternetWarning />
    </PokedexLayout>
  );
};

const {
  pokemonImageStyle,
  unknownImageStyle,
  pokeContainerStyle,
  pokeRowStyle,
  container,
  flatListStyle,
  headerHeight,
}: {
  headerHeight: ViewStyle;
  pokemonImageStyle: ImageStyle;
  unknownImageStyle: ImageStyle;
  pokeContainerStyle: ViewStyle;
  pokeRowStyle: ViewStyle;
  container: ViewStyle;
  flatListStyle: ViewStyle;
} = {
  headerHeight: {height: 20},
  pokemonImageStyle: {
    height: 70,
    width: 70,
  },
  unknownImageStyle: {
    height: 30,
    width: 30,
  },
  pokeContainerStyle: {
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  flatListStyle: {
    width: '100%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
  },
};
