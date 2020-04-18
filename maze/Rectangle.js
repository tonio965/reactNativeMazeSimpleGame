import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function Rectangle({colorProps, idProp}) {
    const [color, setColor] = useState(colorProps);
    const [idp, setId]= useState(idProp)
    const styles = StyleSheet.create({
        square: {
            width: 80,
            height: 80,
            backgroundColor: color,
            padding: 0
        },
      });
    function changeColor(){
        const newColor = "yellow";
        setColor(newColor);
    }
    return (
    <View>
    <TouchableOpacity
        onPress={() => {
            changeColor();
            console.log(color, idp);
        }}>
        <View style={styles.square} />
    </TouchableOpacity>

    </View>
  );
}
