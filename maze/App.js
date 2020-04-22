import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, FlatList, Dimensions, Alert} from 'react-native';
import Rectangle from './Rectangle';
import { Accelerometer } from 'expo-sensors';
import useForceUpdate from 'use-force-update';

export default function App() {
  let [data, setData] = useState({});
  const { width, height } = Dimensions.get('window');
  // console.log("width:"+width+" heig:"+height);
  let [sumaX, setSumaX] = useState(250);
  let [sumaY, setSumaY] = useState(150);
  let [tableList,setTableList] = useState([]);
  let [myColor, setMyColor]= useState("green");
  const forceUpdate = useForceUpdate();



  useEffect(() => {
    let tempArr=[];
    let i;
    for (i = 0; i < 50; i++) {
    let rnd = Math.floor(Math.random() * (2 - 0)) + 0;
    let color=(rnd == 1) ? "green" : "red";
    tempArr.push({key: i, colorProps:color});
    }
    setTableList(tempArr);
    // console.log(tableList.toString());

    _toggle();
  }, []);

  useEffect(() => {

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
    if(currentBox.colorProps=="green"){
      currentBox.colorProps="yellow";
      console.log("change to blue");
      setTableList((previousList)=> {
        let newList = previousList;
        newList[verticalCounter*5+horizontalCounter].colorProps="blue";
        setMyColor="yellow";
        forceUpdate();
        return newList;
      })
      console.log(JSON.stringify(tableList));
      // [verticalCounter*5+horizontalCounter]=currentBox; // o ten index chce 
    }



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
  let { x, y, z } = data;

  
  return (
      <View>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
        <FlatList
          style={{
            backgroundColor: {myColor},
          }}
          numColumns={5}
          data={tableList}
          extraData={tableList}
          renderItem={({ item }) => (
            // <Rectangle colorProps={item.colorProps} idProp={item.key}/>
          <View key={item.key}
            style={{
              width: 80,
              height: 80,
              padding: 0,
              backgroundColor: item.colorProps,
            }}>
          </View>
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