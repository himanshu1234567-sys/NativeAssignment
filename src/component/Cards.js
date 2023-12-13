import { StyleSheet, Text, View, Image, Dimensions, } from 'react-native'
import React, { useCallback } from 'react'

import { Animated } from 'react-native'
import SwipeSelection from './SwipeSelection'
// import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window')
const Cards = ({ item, isfirstCard, swipe, ...rest }) => {
    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-8deg', '0deg', '8deg'],

    });
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });
    const selection = useCallback(() => {
        return <>
            <Animated.View style={{ position: 'absolute', top: 50, left: 20, opacity: nopeOpacity, transform: [{ rotate: '-30deg' }] }}>
                <SwipeSelection type={'Nope'} />
            </Animated.View>
            <Animated.View style={{ position: 'absolute', top: 50, right: 20, opacity: likeOpacity, transform: [{ rotate: '30deg' }] }}>
                <SwipeSelection type={'Like'} />
            </Animated.View>
        </>
    }, []);
    return (
        <Animated.View style={[{ width: width -20, height: height - 120, alignSelf: 'center', position: 'absolute', top: 50, borderRadius: 10, }, isfirstCard && { transform: [...swipe.getTranslateTransform(), { rotate: rotate }] }]}{...rest}>
            
            <Image source={item.image} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            {/* <LinearGradient  colors={['transparent','rgba(0,0,0,0.5']}style={{
                width:'100%',height:'100%',borderRadius:10,
                position:'absolute'
            }}></LinearGradient> */}
            <Text style={{
                position: 'absolute',
                bottom: 20, left: 20, color: 'white', fontSize: 40
            }}> {item.title}</Text>
            {isfirstCard && selection()}
        </Animated.View>
    )
}

export default Cards

const styles = StyleSheet.create({})