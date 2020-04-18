import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet, FlatList} from 'react-native';
import Rectangle from './Rectangle';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({});
  const [xAcceler, setxAcceler] = useState(0);
  const [yAcceler, setyAcceler] = useState(0);
  const [currentX, setCurrentX] = useState(200);
  const [currentY, setCurrentY] = useState(700);

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

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      let currX=Number(JSON.stringify(accelerometerData.x));
      let currY=Number(JSON.stringify(accelerometerData.y));
      // console.log("current x change: "+Math.round(currX*10));
      // console.log("current y change: "+Math.round(currY*10));
      setCurrentX(currentX+Math.round(currX*10));
      setCurrentY(currentY+Math.round(currY*10));
      console.log(currentX);
      console.log(currentY);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  



  // const tableList= [ {key:'1', colorProps:"red"},{key:'2', colorProps: "red"},{key:'3', colorProps: "red"},
  //                   {key:'4', colorProps:"red"},{key:'5', colorProps: "green"},{key:'6', colorProps: "green"},
  //                   {key:'7', colorProps:"green"},{key:'8', colorProps: "red"},{key:'9', colorProps: "red"},
  //                   {key:'10', colorProps:"red"},{key:'11', colorProps: "red"},{key:'12', colorProps: "red"},
  //                   {key:'13', colorProps:"red"},{key:'14', colorProps: "green"},{key:'15', colorProps: "green"},
  //                   {key:'16', colorProps:"green"},{key:'17', colorProps: "red"},{key:'18', colorProps: "red"},
  //                   {key:'19', colorProps:"red"},{key:'20', colorProps: "red"},{key:'21', colorProps: "red"},
  //                   {key:'22', colorProps:"red"},{key:'23', colorProps: "green"},{key:'24', colorProps: "green"},
  //                   {key:'25', colorProps:"green"},{key:'26', colorProps: "red"},{key:'27', colorProps: "red"},
  //                   {key:'28', colorProps:"red"},{key:'29', colorProps: "red"},{key:'30', colorProps: "red"},
  //                   {key:'31', colorProps:"red"},{key:'32', colorProps: "green"},{key:'33', colorProps: "green"},
  //                   {key:'34', colorProps:"green"},{key:'35', colorProps: "red"},
  // ];
  const tableList = [];
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
              left: currentX,
              top: currentY,
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