import React, {useRef, FC} from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {WildPokemon} from './WildPokemon';
import {View} from 'react-native';

const mock = jest.fn();

const Wrapper: FC<{hitten: boolean}> = ({hitten}) => {
  const widthCanvas = useRef(100);
  const heightCanvas = useRef(100);
  const areaWildPokemon = useRef({x: 0, y: 0});
  return (
    <View style={{height: 100}}>
      <WildPokemon
        onCapture={mock}
        areaWildPokemon={areaWildPokemon}
        hitten={hitten}
        speed={1}
        url=""
        height={50}
        widthCanvas={widthCanvas}
        heightCanvas={heightCanvas}
      />
    </View>
  );
};

test('WildPokemon test', async () => {
  const {getByTestId, update} = render(<Wrapper hitten={false} />);
  const wildPokemonRender = getByTestId('WildPokemon');
  expect(wildPokemonRender.props.style.bottom).toBeGreaterThanOrEqual(0);
  expect(wildPokemonRender.props.style.left).toBeGreaterThanOrEqual(0);
  expect(wildPokemonRender.props.style.bottom).toBeLessThan(100);
  expect(wildPokemonRender.props.style.left).toBeLessThanOrEqual(100);
  update(<Wrapper hitten={true} />);
  await waitFor(() => expect(wildPokemonRender.props.style.opacity).toBe(0));
  expect(mock).toBeCalledTimes(1);
});
