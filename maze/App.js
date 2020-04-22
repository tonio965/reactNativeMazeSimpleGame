import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, FlatList, Dimensions, Alert, ImageBackground, Image} from 'react-native';
import Rectangle from './Rectangle';
import { Accelerometer } from 'expo-sensors';
import useForceUpdate from 'use-force-update';

export default function App() {
  let [data, setData] = useState({});
  const { width, height } = Dimensions.get('window');
  // console.log("width:"+width+" heig:"+height);
  let [sumaX, setSumaX] = useState(50);
  let [sumaY, setSumaY] = useState(750);
  let [tableList,setTableList] = useState([]);
  let [myColor, setMyColor]= useState("green");
  let [isLive, setIsLive] =useState("true");
  let [currentTile, setCurrentTile] = useState(45);

  useEffect(() => {
    let tempArr=[{key: 0, colorProps:"yellow"},{key: 1, colorProps:"green"},{key: 2, colorProps:"green"},{key: 3, colorProps:"red"},{key: 4, colorProps:"red"},
                  {key: 5, colorProps:"red"},{key: 6, colorProps:"red"},{key: 7, colorProps:"green"},{key: 8, colorProps:"red"},{key: 9, colorProps:"red"},
                  {key: 10, colorProps:"red"},{key: 11, colorProps:"red"},{key: 12, colorProps:"green"},{key: 13, colorProps:"red"},{key: 14, colorProps:"red"},
                  {key: 15, colorProps:"red"},{key: 16, colorProps:"red"},{key: 17, colorProps:"green"},{key: 18, colorProps:"green"},{key: 19, colorProps:"green"},
                  {key: 20, colorProps:"red"},{key: 21, colorProps:"red"},{key: 22, colorProps:"red"},{key: 23, colorProps:"red"},{key: 24, colorProps:"green"},
                  {key: 25, colorProps:"red"},{key: 26, colorProps:"red"},{key: 27, colorProps:"red"},{key: 28, colorProps:"red"},{key: 29, colorProps:"green"},
                  {key: 30, colorProps:"red"},{key: 31, colorProps:"red"},{key: 32, colorProps:"red"},{key: 33, colorProps:"red"},{key: 34, colorProps:"green"},
                  {key: 35, colorProps:"red"},{key: 36, colorProps:"green"},{key: 37, colorProps:"green"},{key: 38, colorProps:"green"},{key: 39, colorProps:"green"},
                  {key: 40, colorProps:"red"},{key: 41, colorProps:"green"},{key: 42, colorProps:"red"},{key: 43, colorProps:"red"},{key: 44, colorProps:"red"},
                  {key: 45, colorProps:"green"},{key: 46, colorProps:"green"},{key: 47, colorProps:"red"},{key: 48, colorProps:"red"},{key: 49, colorProps:"red"},];
    setTableList(tempArr);

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
    if(isLive=="true"){
      let verticalCounter=0;
      let i=80;
      while (i< 800){
        if(sumaY+20 < i){
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
        if(sumaX+20 < j){
          break;
        }
        else{
          horizontalCounter++;
        }
        j+=80;
      }
      let currentBox = tableList[verticalCounter*5+horizontalCounter];
      setCurrentTile(verticalCounter*5+horizontalCounter);
      if(currentBox.key==0){
        _toggle();
        Alert.alert(
          "koniec",
          "elo",
          [ ],
        )
      }
      if(currentBox.colorProps=="green"){
        setTableList(previousList=> {

          let newList = previousList;
          for( let i=0; i<newList.length; i++){
            if(newList[i].colorProps!== "green" && newList[i].colorProps!== "red" &&  newList[i].colorProps!== "yellow")
              newList[i].colorProps= "green";
          }
          newList[currentTile].colorProps="aquamarine";
          return newList;

        })
      }
      if(currentBox.colorProps=="red"){
        _toggle();
        Alert.alert(
          "out of bounds",
          "elo",
          [ ],
        )
      }



  }
}


  let _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      if(isLive=="true")
        setData(accelerometerData);
        let currX=Number(JSON.stringify(accelerometerData.x))*10;
        let currY=Number(JSON.stringify(accelerometerData.y))*10;
        setSumaX(sumaX -= currX);
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
        <Image 
          source = { require('./assets/jajo.gif')}
          style={{
            position: 'absolute',
            left: sumaX,
            top: sumaY,
            width: 40,
            height: 40,
            // backgroundColor: "orange",
          }}>
        </Image>
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