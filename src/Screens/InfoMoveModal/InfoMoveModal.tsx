import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextStyle,
  ViewStyle,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {InfoMoveModalScreenRouteProp} from '../../../App';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Info} from './InfoMoveModalTypes';
import {useTypedSelector} from '../../Redux';
import {InternetWarning} from '../../ComponentsLibrary/InternetWarning';
import {ErrorRetry} from '../../ComponentsLibrary/ErrorRetry';
import {BackButton} from '../../ComponentsLibrary/Button/BackButton';
import {BoardRow} from '../../ComponentsLibrary/BoardRow';
import {TableRow} from '../../ComponentsLibrary/TableRow';

const {width} = Dimensions.get('screen');

export const InfoMoveModal: FC = () => {
  const categories = useTypedSelector((state) => state.pokemon.categories);
  const types = useTypedSelector((state) => state.pokemon.types);
  const route = useRoute<InfoMoveModalScreenRouteProp>();
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);
  const url = route.params.move.url;
  const fetchInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<Info>(url);
      if (mounted.current) {
        setInfo(response.data);
        setLoading(false);
      }
    } catch (e) {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [url]);
  useEffect(() => {
    fetchInfo();
    return () => {
      mounted.current = false;
    };
  }, [fetchInfo]);
  const typeBackgroundColor = types.find(
    (type) => type.name === info?.type.name,
  )?.color;
  const categoryBackgroundColor = categories.find(
    (category) => category.name === info?.damage_class.name,
  )?.color;
  const shortDesc = info?.effect_entries.find(
    (item) => item.language.name === 'en',
  )?.short_effect;
  const description = info?.effect_entries.find(
    (item) => item.language.name === 'en',
  )?.effect;
  return (
    <SafeAreaView style={style.container}>
      <BackButton />
      {loading ? (
        <ActivityIndicator size="large" color="forestgreen" />
      ) : info ? (
        <ScrollView
          style={style.flex1}
          contentContainerStyle={style.scrollStyle}>
          <Text style={style.abilityNameTextStyle}>
            {info.name.replace('-', ' ')}
          </Text>
          <Text style={style.japTextStyle}>
            {info.names.find((item) => item.language.name === 'ja')?.name}
          </Text>
          <Text style={style.shorDescriptionTextStyle}>{shortDesc}</Text>
          <View style={style.separator} />
          <Text style={style.description}>{description}</Text>
          <View style={style.statsContainer}>
            <Text style={style.infoText}>Info</Text>
            <TableRow
              title={'Type'}
              backgroundColor={typeBackgroundColor || '#666'}
              description={info.type.name}
            />
            <TableRow
              title={'Category'}
              backgroundColor={categoryBackgroundColor || '#666'}
              description={info.damage_class.name}
            />
            <View>
              <BoardRow
                title={'PP'}
                leftStyle={style.rowLeftStyle}
                rightStyle={style.rowRightStyle}
                description={String(info.pp)}
              />
              <BoardRow title={'Power'} description={String(info.power)} />
              <BoardRow title={'Accuracy'} description={info.accuracy + '%'} />
              <BoardRow
                title={'Healing'}
                description={String(info.meta.healing)}
              />
              <BoardRow title={'Drain'} description={String(info.meta.drain)} />
              <BoardRow
                title={'Crit Rate'}
                description={String(info.meta.crit_rate)}
              />
              <BoardRow
                title={'Flich %'}
                description={info.meta.flinch_chance + '%'}
              />
              <BoardRow
                title={'Ailment %'}
                leftStyle={style.boardLeftStyle}
                rightStyle={style.boardRightStyle}
                description={info.meta.ailment_chance + '%'}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ErrorRetry onPress={fetchInfo} />
      )}
      <InternetWarning />
    </SafeAreaView>
  );
};

const style: {
  abilityNameTextStyle: TextStyle;
  shorDescriptionTextStyle: TextStyle;
  separator: ViewStyle;
  description: TextStyle;
  statsContainer: ViewStyle;
  infoText: TextStyle;
  container: ViewStyle;
  boardLeftStyle: ViewStyle;
  boardRightStyle: ViewStyle;
  rowLeftStyle: ViewStyle;
  rowRightStyle: ViewStyle;
  flex1: ViewStyle;
  scrollStyle: ViewStyle;
  japTextStyle: TextStyle;
} = {
  japTextStyle: {lineHeight: 24},
  scrollStyle: {alignItems: 'center'},
  flex1: {flex: 1},
  rowLeftStyle: {borderTopStartRadius: 20},
  rowRightStyle: {borderTopEndRadius: 20},
  boardLeftStyle: {borderBottomStartRadius: 20},
  boardRightStyle: {borderBottomEndRadius: 20},
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  statsContainer: {
    marginTop: 30,
    width: width - 90,
    backgroundColor: '#999',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
  },
  description: {
    marginHorizontal: 60,
    fontSize: 20,
  },
  separator: {
    height: 1,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: '#999',
    width: width - 120,
  },
  shorDescriptionTextStyle: {
    marginHorizontal: 60,
    marginTop: 20,
    fontSize: 24,
  },
  abilityNameTextStyle: {
    fontSize: 30,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginTop: 30,
  },
  infoText: {
    alignSelf: 'center',
    color: 'black',
    letterSpacing: 0.5,
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
};
