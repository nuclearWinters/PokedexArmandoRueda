import React, {FC, useEffect, useRef} from 'react';
import {Animated, Image, ViewStyle} from 'react-native';

interface IProps {
  heightCanvas: React.MutableRefObject<number>;
  widthCanvas: React.MutableRefObject<number>;
  height: number;
  url: string;
  speed: number;
  hitten: boolean;
  areaWildPokemon: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
  onCapture: () => void;
}

export const WildPokemon: FC<IProps> = ({
  heightCanvas,
  widthCanvas,
  url,
  height,
  speed,
  areaWildPokemon,
  hitten,
  onCapture,
}) => {
  const getRangeFromMinToMax = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const xyAnim = useRef(
    new Animated.ValueXY({
      x: getRangeFromMinToMax(0, widthCanvas.current - height),
      y: getRangeFromMinToMax(0, heightCanvas.current - height),
    }),
  ).current;

  const multiplierX = useRef(1);
  const multiplierY = useRef(1);

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (hitten) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        onCapture();
      });
    }
  }, [hitten]);

  useEffect(() => {
    let mounted = true;
    const updateScreen = () => {
      if ((xyAnim.x as any)._value >= widthCanvas.current - height) {
        multiplierX.current = -1;
      }
      if ((xyAnim.y as any)._value >= heightCanvas.current - height) {
        multiplierY.current = -1;
      }
      if ((xyAnim.x as any)._value <= 0) {
        multiplierX.current = 1;
      }
      if ((xyAnim.y as any)._value <= 0) {
        multiplierY.current = 1;
      }
      xyAnim.setValue({
        x: (xyAnim.x as any)._value + 1 * multiplierX.current * speed,
        y: (xyAnim.y as any)._value + 1 * multiplierY.current * speed,
      });
      if (mounted) {
        requestAnimationFrame(updateScreen);
      }
    };
    requestAnimationFrame(updateScreen);
    return () => {
      mounted = false;
    };
  }, [speed]);

  return (
    <Animated.View
      style={[
        style.wildPokemon,
        {
          bottom: xyAnim.y,
          left: xyAnim.x,
          height: height,
          width: height,
          opacity,
        },
      ]}
      onLayout={(event) => {
        areaWildPokemon.current = {
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y,
        };
      }}>
      <Image
        source={{uri: url}}
        height={height}
        width={height}
        style={{height, width: height}}
      />
    </Animated.View>
  );
};

const style: {wildPokemon: ViewStyle} = {
  wildPokemon: {
    backgroundColor: 'white',
    zIndex: 30,
    elevation: 10,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
};
