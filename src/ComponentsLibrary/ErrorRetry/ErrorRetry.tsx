import React, {FC} from 'react';
import {View, Button, Text, TextStyle, ViewStyle} from 'react-native';

interface IProps {
  onPress: () => void;
}

export const ErrorRetry: FC<IProps> = ({onPress}) => {
  return (
    <View style={style.container}>
      <Text style={style.errorText}>
        Ha ocurrido un error. Intenta de nuevo
      </Text>
      <Button title="Intentar de nuevo" onPress={onPress} />
    </View>
  );
};

const style: {
  errorText: TextStyle;
  container: ViewStyle;
} = {
  container: {alignItems: 'center'},
  errorText: {
    marginBottom: 20,
    fontSize: 20,
    marginHorizontal: 30,
    textAlign: 'center',
  },
};
