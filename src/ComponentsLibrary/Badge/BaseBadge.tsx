import React, {FC} from 'react';
import {View, Text, ViewStyle, TextStyle, StyleProp} from 'react-native';

interface IProps {
  text: string;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

export const BaseBadge: FC<IProps> = ({text, style, textStyle}) => {
  return (
    <View style={style}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};
