import React, {FC} from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import {BaseBadge} from './BaseBadge';

interface IProps {
  text: string;
}

export const IdBadge: FC<IProps> = ({text}) => {
  return <BaseBadge text={text} style={style} textStyle={textStyle} />;
};

const {style, textStyle}: {style: ViewStyle; textStyle: TextStyle} = {
  style: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 100,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
};
