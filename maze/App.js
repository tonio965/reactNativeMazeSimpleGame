import React from 'react';
import { Text, View,StyleSheet, FlatList } from 'react-native';
import Rectangle from './Rectangle';

export default function App() {
  const tableList= [ {key:1, colorProps:"red"},{key:2, colorProps: "red"},{key:3, colorProps: "red"},
                    {key:4, colorProps:"red"},{key:5, colorProps: "green"},{key:6, colorProps: "green"},
                    {key:7, colorProps:"green"},{key:8, colorProps: "red"},{key:9, colorProps: "red"},
  ];
  return (
      <View>
        <Text>Hello, world!</Text>
        <FlatList
          numColumns={3}
          data={tableList}
          renderItem={({ item }) => <Rectangle key={item.keyProps} colorProps={item.colorProps}/>}
        />

      </View>
  );
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