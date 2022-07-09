import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TodoItem({ item, deleteTodo, editTodo, navigation }) {
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            onPress={() =>
              navigation.navigate('ItemDetails', { itemId: item.key })
            }
            style={{ paddingRight: 10 }}
            name="info-circle"
            size={30}
            color="coral"
          />
          <Icon
            onPress={() => editTodo(item.key)}
            style={{ paddingRight: 10 }}
            name="edit"
            size={30}
            color="coral"
          />
          <Icon
            name="trash"
            onPress={() => deleteTodo(item.key)}
            size={30}
            color="coral"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 16,
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
