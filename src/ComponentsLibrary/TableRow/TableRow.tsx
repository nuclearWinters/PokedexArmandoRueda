import React, {FC} from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';

interface IProps {
  title: string;
  description: string;
  backgroundColor: string;
}

export const TableRow: FC<IProps> = ({backgroundColor, title, description}) => {
  return (
    <View style={style.row}>
      <View style={[{backgroundColor}, style.leftBorderContainer]}>
        <Text style={style.typeTextStyle}>{title}</Text>
      </View>
      <View style={[{backgroundColor}, style.rightBorderContainer]}>
        <Text style={style.typeTextStyle}>{description}</Text>
      </View>
    </View>
  );
};

const style: {
  row: ViewStyle;
  typeTextStyle: TextStyle;
  rightBorderContainer: ViewStyle;
  leftBorderContainer: ViewStyle;
} = {
  typeTextStyle: {
    fontWeight: '700',
    fontSize: 18,
    color: 'rgb(237,237,237)',
    textTransform: 'capitalize',
  },
  rightBorderContainer: {
    paddingLeft: 10,
    flex: 1,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    margin: 2,
    paddingVertical: 2,
  },
  leftBorderContainer: {
    width: 100,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    margin: 2,
    alignItems: 'center',
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
  },
};
