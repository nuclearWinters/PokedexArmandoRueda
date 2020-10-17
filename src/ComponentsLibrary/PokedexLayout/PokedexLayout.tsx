import React, {FC} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import button from '../../imgs/button.png';
import buttonRed from '../../imgs/buttonRed.png';
import buttonYellow from '../../imgs/buttonYellow.png';
import buttonGreen from '../../imgs/buttonGreen.png';
import pressme from '../../imgs/pressme.png';
import {useNavigation} from '@react-navigation/native';
import {MainScreensNavigationProp} from '../../../App';

interface IProps {
  BigButtonOnPress: () => void;
}

export const PokedexLayout: FC<IProps> = ({children, BigButtonOnPress}) => {
  const navigation = useNavigation<MainScreensNavigationProp>();
  const navigateToPrison = () => {
    navigation.navigate('Prison');
  };
  return (
    <SafeAreaView style={style.container}>
      <StatusBar backgroundColor="#dd0b2e" />
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={BigButtonOnPress}>
          <Image source={button} style={style.bigButtonStyle} />
          <View style={style.pressMeContainer}>
            <ImageBackground
              source={pressme}
              resizeMode="contain"
              style={{height: 50}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPrison}>
          <Image
            source={buttonRed}
            style={[style.smallButton, {marginLeft: 30}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPrison}>
          <Image source={buttonYellow} style={style.smallButton} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToPrison}>
          <Image source={buttonGreen} style={style.smallButton} />
        </TouchableOpacity>
      </View>
      {children}
    </SafeAreaView>
  );
};

const style: {
  container: ViewStyle;
  buttonContainer: ViewStyle;
  pressMeContainer: ViewStyle;
  bigButtonStyle: ImageStyle;
  smallButton: ImageStyle;
} = {
  container: {
    backgroundColor: '#dd0b2e',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  pressMeContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    bottom: -24,
    left: 8,
    alignSelf: 'center',
    borderWidth: 0,
  },
  bigButtonStyle: {height: 60, width: 60},
  smallButton: {
    height: 30,
    width: 30,
    marginLeft: 14,
    marginTop: 6,
  },
};
