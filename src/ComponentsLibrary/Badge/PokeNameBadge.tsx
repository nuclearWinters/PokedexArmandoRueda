import React, {FC} from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import {BaseBadge} from './BaseBadge';

interface IProps {
  text: string;
  backgroundColor: string;
}

export const PokeNameBadge: FC<IProps> = ({text, backgroundColor}) => {
  return (
    <BaseBadge
      text={text}
      style={[style, {backgroundColor}]}
      textStyle={textStyle}
    />
  );
};

const {style, textStyle}: {style: ViewStyle; textStyle: TextStyle} = {
  style: {
    position: 'absolute',
    bottom: 6,
    borderRadius: 100,
    width: 80,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '700',
    letterSpacing: 0.6,
    paddingVertical: 2,
    paddingBottom: 3,
    color: 'white',
  },
};
