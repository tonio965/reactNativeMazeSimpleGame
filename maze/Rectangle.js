import React, {useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Rectangle({colorProps}) {
    const [color, setColor] = useState(colorProps);
    const styles = StyleSheet.create({
        square: {
            width: 100,
            height: 100,
            backgroundColor: color,
        },
      });
    function changeColor(){
        const newColor = "yellow";
        setColor(newColor);
    }
    return (
    <View>
      <View style={styles.square} />
      <Button
          title="press"
          onPress={() => {
            changeColor();
            console.log(color);
          }}/>
    </View>
  );
}
