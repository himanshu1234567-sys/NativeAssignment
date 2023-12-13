import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, PanResponder } from 'react-native';
import Cards from './src/component/Cards';

export default function App() {
  const [data, setData] = useState([
    { image: require('../cardSwipe/images/8c0327.png'), id: 1, title: 'Megenta' },
    { image: require('../cardSwipe/images/ea1d2c.png'), id: 2, title: 'Red' },
    { image: require('../cardSwipe/images/f778a1.png'), id: 3, title: 'Pink' },
    { image: require('../cardSwipe/images/fad4c0.png'), id: 4, title: 'White' },
    { image: require('../cardSwipe/images/ea1d2c.png'), id: 5, title: 'Red' },
    { image: require('../cardSwipe/images/f778a1.png'), id: 6, title: 'Pink' },
    { image: require('../cardSwipe/images/fad4c0.png'), id: 7, title: 'White' },

  ]);
  // useEffect(() => {
  //   if (data.length) {
  //     setData([
  //       { image: require('../cardSwipe/images/8c0327.png'), id: 1, title: 'Megenta' },
  //       { image: require('../cardSwipe/images/ea1d2c.png'), id: 2, title: 'Red' },
  //       { image: require('../cardSwipe/images/f778a1.png'), id: 3, title: 'Pink' },
  //       { image: require('../cardSwipe/images/fad4c0.png'), id: 4, title: 'White' },
    
  //     ]);
  //   }
  // }, [])
  const swipe = useRef(new Animated.ValueXY()).current
  const panRes = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      // console.log("dx: " + dx, "dy :" + dy)
      swipe.setValue({ x: dx, y: dy })
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      // console.log("rl::" + 'dx: ' + dx + ' dy: ' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {

        Animated.spring(swipe, {
          toValue: { x: 500 * dx, y: dy },
          useNativeDriver: true,
          duration: 300,

        }).start(removeCaRD);
      }
      else {

        Animated.timing(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          // duration: 300
          friction: 5,
        }).start();
      }
    }
  })
  const removeCaRD = useCallback(() => {
    setData(prepState => prepState.slice(1));
    swipe.setValue({ x: 0, y: 0 })
  }, [swipe])
  return (

    <View styles={{ flex: 1 }}>
      {data.map((item, index) => {
        let isfirstCard = index === 0;
        let dragHandler = isfirstCard ? panRes.panHandlers : {}
        return <View>
          <Cards item={item} isfirstCard={isfirstCard} swipe={swipe}
            {...dragHandler} />

        </View>
      }).reverse()}
    </View>
  );
}

;
