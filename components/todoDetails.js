import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoItemDetails({ route }) {
  const { itemId } = route.params;
  const [item, setItem] = useState({});

  useEffect(() => {
    getTodos();
  }, [item]);

  const getTodos = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        setItem(JSON.parse(value).find((item) => item.key === itemId));
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginHorizontal: 10,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemText: {
    marginLeft: 5
  }
});
