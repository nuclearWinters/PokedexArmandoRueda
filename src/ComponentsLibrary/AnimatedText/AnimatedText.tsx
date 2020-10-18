import React, {FC, useEffect, useRef} from 'react';
import {Animated, TextStyle} from 'react-native';

interface IProps {
  name: string;
}

export const AnimatedText: FC<IProps> = ({name}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [opacity]);
  return (
    <Animated.Text
      style={[
        style.textStyle,
        {
          opacity,
        },
      ]}>
      {name}
    </Animated.Text>
  );
};

const style: {textStyle: TextStyle} = {
  textStyle: {
    fontSize: 30,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
};
