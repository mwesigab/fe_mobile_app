import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

export default function TodoItem({item, pressHandler}) {
  const deleteItem = () => {
    Alert.alert ('Deleted');
  };
  return (
    <TouchableOpacity onPress={() => pressHandler (item.key)}>
      <View style={styles.item}>
        <Icon name="trash" size={30} color="coral" />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create ({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10
  }
});
