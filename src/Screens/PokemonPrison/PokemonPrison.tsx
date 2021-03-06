import React, {FC} from 'react';
import {View, FlatList, ViewStyle} from 'react-native';
import {useTypedSelector} from '../../Redux';
import {PokedexLayout} from '../../ComponentsLibrary/PokedexLayout';
import {useNavigation} from '@react-navigation/native';
import {PrisonScreensNavigationProp} from '../../../App';
import {InternetWarning} from '../../ComponentsLibrary/InternetWarning';
import {PokemonCard} from './PokemonCard';

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
      const pokemonType = types.find(
        (type) => Pokemon?.type[0].type.name === type.name,
      );
      return (
        <PokemonCard
          id={String(num)}
          key={String(num)}
          backgroundColor={pokemonType?.color || '#999'}
          Pokemon={Pokemon}
          navigation={navigation}
        />
      );
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
  pokeRowStyle,
  container,
  flatListStyle,
  headerHeight,
}: {
  headerHeight: ViewStyle;
  pokeRowStyle: ViewStyle;
  container: ViewStyle;
  flatListStyle: ViewStyle;
} = {
  headerHeight: {height: 20},
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
