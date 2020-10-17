import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {BaseButton} from './BaseButton';
import {MainScreensNavigationProp} from '../../../App';
import {TextStyle, ViewStyle, Platform} from 'react-native';

export const BackButton: FC = () => {
  const navigation = useNavigation<MainScreensNavigationProp>();
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <BaseButton
      text="Back"
      onPress={navigateBack}
      style={style.style}
      textStyle={style.textStyle}
    />
  );
};

const style: {textStyle: TextStyle; style: ViewStyle} = {
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002bb8',
  },
  style: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#999',
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 60 : 20,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
};
