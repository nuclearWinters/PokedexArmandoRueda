import React, {FC} from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface IProps {
  text: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

export const BaseButton: FC<IProps> = ({onPress, text, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
