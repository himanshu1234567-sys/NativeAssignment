import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'


const SwipeSelection = ({ type }) => {
    console.log(type);

    return (
        <View>
            <Text style={{
                color: type == 'Like' ? 'green' : 'red',
                fontSize: 40,
                borderWidth: 4,
                borderColor: type == 'Like' ? 'green' : 'red',
                paddingLeft: 10,
                paddingRight:10,
            }}> {type}</Text>
        </View>
    )
}

export default SwipeSelection
    ;
const styles = StyleSheet.create({})