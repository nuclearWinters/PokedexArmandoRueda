import React, {FC, useState} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {PokemonMovesScreenRouteProp} from '../../../App';
import {Move2} from '../../Redux/Ducks/Pokemon/PokemonTypes';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {InfoMoveModalScreensNavigationProp} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {InternetWarning} from '../../ComponentsLibrary/InternetWarning';
import {BackButton} from '../../ComponentsLibrary/Button/BackButton';

export const PokemonMoves: FC = () => {
  const navigation = useNavigation<InfoMoveModalScreensNavigationProp>();

  const route = useRoute<PokemonMovesScreenRouteProp>();

  const [value, setValue] = useState('');

  const listaFiltrada = route.params.pokemon.moves.filter((move) =>
    move.name.replace('-', ' ').toLowerCase().includes(value.toLowerCase()),
  );

  const moveRows = listaFiltrada.reduce<Move2[][]>((all, one, i) => {
    const ch = Math.floor(i / 2);
    all[ch] = ([] as Move2[]).concat(all[ch] || [], one);
    return all;
  }, []);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <SafeAreaView style={style.container}>
      <BackButton />
      <Text style={style.titleTextStyle}>{route.params.pokemon.name}</Text>
      <View style={style.imageRowContainer}>
        <Image
          source={{uri: route.params.pokemon.sprites.front_default}}
          style={style.backFrontImageStyle}
        />
        <Image
          source={{uri: route.params.pokemon.sprites.back_default}}
          style={style.backFrontImageStyle}
        />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Filtra la lista de abilidades"
        style={style.textInputStyle}
      />
      <FlatList
        keyExtractor={(_, index) => 'index' + index}
        data={moveRows}
        renderItem={({item}) => {
          const Row = item.map((move, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={style.moveContainer}
                onPress={() => {
                  navigation.navigate('InfoMoveModal', {
                    move,
                  });
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={style.moveText}>
                  {move.name.replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            );
          });
          return <View style={style.moveRowContainer}>{Row}</View>;
        }}
      />
      <InternetWarning />
    </SafeAreaView>
  );
};

const style: {
  moveContainer: ViewStyle;
  moveText: TextStyle;
  moveRowContainer: ViewStyle;
  textInputStyle: TextStyle;
  backFrontImageStyle: ImageStyle;
  container: ViewStyle;
  titleTextStyle: TextStyle;
  imageRowContainer: ViewStyle;
} = {
  moveContainer: {
    borderRadius: 6,
    width: 140,
    backgroundColor: '#rgba(0,0,0,0.15)',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  moveText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  moveRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  textInputStyle: {
    borderWidth: 1,
    marginHorizontal: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    borderRadius: 6,
    borderColor: '#999',
  },
  backFrontImageStyle: {height: 150, width: 150},
  container: {flex: 1, backgroundColor: 'rgb(245,245,245)'},
  titleTextStyle: {
    alignSelf: 'center',
    fontSize: 34,
    textTransform: 'capitalize',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 10,
  },
  imageRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};
