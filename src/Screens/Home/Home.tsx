import React, {FC, useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  ViewStyle,
  Dimensions,
  ImageBackground,
  PanResponder,
  Animated,
  ImageStyle,
  ActivityIndicator,
  Platform,
} from 'react-native';
import whosthatpokemon from '../../imgs/turtle.jpg';
import {useTypedSelector, Ducks} from '../../Redux';
import {IPokemon} from '../../Redux/Ducks/Pokemon/PokemonTypes';
import pokeball from '../../imgs/pokeball.png';
import {WildPokemon} from '../../ComponentsLibrary/WildPokemon';
import {AnimatedText} from '../../ComponentsLibrary/AnimatedText';
import {Database} from '../../Database';
import {useDispatch} from 'react-redux';
import {PokedexLayout} from '../../ComponentsLibrary/PokedexLayout';
import {InternetWarning} from '../../ComponentsLibrary/InternetWarning';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const widthScreen = Dimensions.get('screen').width;

export const Home: FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const pokemones = useTypedSelector((state) => state.pokemon.pokemons);
  const [index, setIndex] = useState(152);
  const currentPokemon = pokemones[index];
  const [isLoading, setIsLoading] = useState(false);
  const [
    wildOrCapturedPokemon,
    setWildOrCapturedPokemon,
  ] = useState<IPokemon | null>(null);
  useEffect(() => {
    let mounted = true;
    if (index === 152 || !mounted) {
    } else {
      const wildPokemon = async () => {
        try {
          setIsLoading(true);
          const wildOrCapturedPokemon = await Ducks.Pokemon.getPokemon(
            currentPokemon,
          );
          setWildOrCapturedPokemon(wildOrCapturedPokemon.payload);
          setIsLoading(false);
        } catch (e) {
          setWildOrCapturedPokemon(null);
          setIsLoading(false);
        }
      };
      wildPokemon();
    }
    return () => {
      mounted = false;
    };
  }, [index]);
  const [hitten, setHitten] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const size = useRef(new Animated.Value(1)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        size.setValue(1);
      },
      onPanResponderMove: (_, {x0, y0, dx, dy}) => {
        pan.setValue({x: x0 + dx, y: y0 + dy});
      },
      onPanResponderRelease: (_, {x0, y0, dx, dy, vx, vy}) => {
        Animated.parallel([
          Animated.timing(pan, {
            toValue: {
              x: dx + x0 + 50 * vx,
              y: dy + y0 + 50 * vy,
            },
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(size, {
            toValue: 0.4,
            useNativeDriver: false,
            duration: 500,
          }),
        ]).start(() => {
          const isIOS = Platform.OS === 'ios' ? insets.top : 0;
          const xPokeball = areaPokeball.current.x + 12;
          const yPokeball = areaPokeball.current.y + 12;
          const xPokemon = areaWildPokemon.current.x + 30;
          const yPokemon = areaWildPokemon.current.y + 120 + isIOS;
          const point1 = {x: xPokeball, y: yPokeball};
          const point2 = {
            x: xPokeball,
            y: yPokeball + 16,
          };
          const point3 = {
            x: xPokeball + 16,
            y: yPokeball,
          };
          const point4 = {
            x: xPokeball + 16,
            y: yPokeball + 16,
          };
          const points = [point1, point2, point3, point4];
          for (const point of points) {
            if (
              point.x >= xPokemon &&
              point.x <= xPokemon + 90 &&
              point.y >= yPokemon &&
              point.y <= yPokemon + 90
            ) {
              setHitten(true);
              break;
            }
          }
        });
      },
    }),
  ).current;

  const heightCanvas = useRef(0);
  const widthCanvas = useRef(0);

  const areaWildPokemon = useRef({x: 0, y: 0});

  const areaPokeball = useRef({x: 0, y: 0});

  const changeIndex = () => {
    setIndex(Math.round(Math.random() * 151));
  };

  const onCapturePokemon = async () => {
    if (!wildOrCapturedPokemon) return;
    const captured = await Database.savePokemon(wildOrCapturedPokemon);
    dispatch(Ducks.Pokemon.savePokemon(captured));
    setHitten(false);
    setIndex(Math.round(Math.random() * 151));
  };

  return (
    <PokedexLayout BigButtonOnPress={changeIndex}>
      <View
        {...panResponder.panHandlers}
        style={container}
        onLayout={(event) => {
          widthCanvas.current = event.nativeEvent.layout.width;
          heightCanvas.current = event.nativeEvent.layout.height;
        }}>
        {wildOrCapturedPokemon && !isLoading && (
          <WildPokemon
            hitten={hitten}
            areaWildPokemon={areaWildPokemon}
            heightCanvas={heightCanvas}
            widthCanvas={widthCanvas}
            url={wildOrCapturedPokemon.sprites.front_default}
            height={90}
            speed={1}
            onCapture={onCapturePokemon}
          />
        )}
        {!wildOrCapturedPokemon && !isLoading && (
          <Image
            source={whosthatpokemon}
            style={{height: widthScreen - 120}}
            resizeMode="contain"
          />
        )}
        {wildOrCapturedPokemon && !isLoading && (
          <AnimatedText name={wildOrCapturedPokemon.name} />
        )}
        {isLoading && <ActivityIndicator size="large" color="forestgreen" />}
      </View>
      <Animated.View
        onLayout={(event) => {
          areaPokeball.current = {
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
          };
        }}
        style={[
          pokeballContainer,
          {
            top: pan.y,
            left: pan.x,
            transform: [{scale: size}],
          },
        ]}>
        <ImageBackground source={pokeball} style={pokeballImage} />
      </Animated.View>
      <InternetWarning />
    </PokedexLayout>
  );
};

const {
  container,
  pokeballImage,
  pokeballContainer,
}: {
  container: ViewStyle;
  pokeballImage: ImageStyle;
  pokeballContainer: ViewStyle;
} = {
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  pokeballImage: {height: 40, width: 40},
  pokeballContainer: {
    zIndex: 10,
    position: 'absolute',
  },
};
