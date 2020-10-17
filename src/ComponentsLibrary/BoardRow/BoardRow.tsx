import React, {FC} from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';

interface IProps {
  title: string;
  description: string;
  leftStyle?: ViewStyle;
  rightStyle?: ViewStyle;
}

export const BoardRow: FC<IProps> = ({
  title,
  description,
  leftStyle,
  rightStyle,
}) => {
  return (
    <View style={style.row}>
      <View style={[style.leftBoardContainer, leftStyle]}>
        <Text style={style.titleBoard}>{title}</Text>
      </View>
      <View style={[style.rightBoardContainer, rightStyle]}>
        <Text style={style.statBoard}>{description}</Text>
      </View>
    </View>
  );
};

const style: {
  row: ViewStyle;
  leftBoardContainer: ViewStyle;
  rightBoardContainer: ViewStyle;
  titleBoard: TextStyle;
  statBoard: TextStyle;
} = {
  leftBoardContainer: {
    width: 100,
    backgroundColor: 'white',
    margin: 2,
    alignItems: 'center',
    paddingVertical: 3,
  },
  rightBoardContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 2,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  titleBoard: {fontSize: 18, fontWeight: '700'},
  statBoard: {fontSize: 16},
};
