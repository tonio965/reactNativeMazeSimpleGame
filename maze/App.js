import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, FlatList, Dimensions, Alert} from 'react-native';
import Rectangle from './Rectangle';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  let [data, setData] = useState({});
  const { width, height } = Dimensions.get('window');
  // console.log("width:"+width+" heig:"+height);
  let [sumaX, setSumaX] = useState(250);
  let [sumaY, setSumaY] = useState(150);

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  _checkIfOnRed = () => {
    let verticalCounter=0;
    let i=80;
    while (i< 800){
      if(sumaY+15 < i){
        break;
      }
      else{
        verticalCounter++;
      }
      i+=80;
    }

    let horizontalCounter=0;
    let j=80;
    while (j< 400){
      if(sumaX+15 < j){
        break;
      }
      else{
        horizontalCounter++;
      }
      j+=80;
    }
    let currentBox = tableList[verticalCounter*5+horizontalCounter];
    if(currentBox.colorProps=="red")
      console.log(currentBox.colorProps);
  }


  let _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      let currX=Number(JSON.stringify(accelerometerData.x))*10;
      let currY=Number(JSON.stringify(accelerometerData.y))*10;
      setSumaX(sumaX += currX);
      setSumaY(sumaY += currY);
      _checkIfOnRed();
    });
  };

  let _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  
  let tableList = [];
  let { x, y, z } = data;
  let i;
  for (i = 0; i < 50; i++) {
  let rnd = Math.floor(Math.random() * (2 - 0)) + 0;
  let color=(rnd == 1) ? "green" : "red";
  tableList.push({key: i, colorProps:color})
  }
  
  return (
      <View>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
        <FlatList
          numColumns={5}
          data={tableList}
          renderItem={({ item }) => (
            <Rectangle colorProps={item.colorProps} idProp={item.key}/>
          )}
        />
        <View 
          style={{
            position: 'absolute',
            left: sumaX,
            top: sumaY,
            width: 30,
            height: 30,
            backgroundColor: "orange",
          }}>
        </View>
      </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});