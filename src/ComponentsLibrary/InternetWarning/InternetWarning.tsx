import React, {FC, useEffect, useState} from 'react';
import {View, Text, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import {useTypedSelector} from '../../Redux';

export const InternetWarning: FC = () => {
  const hasInternet = useTypedSelector((state) => state.device.hasInternet);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!hasInternet) {
      setShow(true);
    }
  }, [hasInternet]);
  const setIsShowing = () => {
    setShow(false);
  };
  if (!show) {
    return null;
  }
  return (
    <View style={container}>
      <TouchableOpacity style={closeContainer} onPress={setIsShowing}>
        <Text style={iconTextStyle}>X</Text>
      </TouchableOpacity>
      <Text style={title}>No tienes conexión a internet</Text>
      <Text style={description}>
        Es posible que la app no funcione correctamente
      </Text>
    </View>
  );
};

const {
  container,
  title,
  description,
  closeContainer,
  iconTextStyle,
}: {
  container: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  closeContainer: ViewStyle;
  iconTextStyle: TextStyle;
} = {
  closeContainer: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 100,
    right: 14,
    top: 14,
    zIndex: 10,
  },
  iconTextStyle: {
    fontSize: 20,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 30,
    backgroundColor: 'white',
  },
  title: {fontSize: 20, fontWeight: '700', color: '#de0004'},
  description: {fontSize: 18},
};
