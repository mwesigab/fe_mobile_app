import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Button,
  TextInput
} from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoItemDetails from './components/todoDetails';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: 'coral' },
            headerTintColor: '#fff'
          }}
          name="ItemDetails"
          component={TodoItemDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function HomeScreen({ navigation }) {
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editkey, setEditKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getTodos();
  }, [todos]);

  const deleteTodo = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key !== key);
    });
  };

  const editTodo = (item) => {
    setEditKey(item.key);
    setModalVisible(true);
    setEditText(todos.find((value) => value.key === item.key)?.text);
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos];
      });
      storeTodos([{ text: text, key: Math.random().toString() }, ...todos]);
    } else {
      Alert.alert('OOPS!', 'To dos must be over 3 chars long.', [
        {
          text: 'Understood'
        }
      ]);
    }
  };

  const updateTodo = () => {
    let temp = {
      ...todos.find((value) => value.key === editkey),
      text: editText
    };
    setTodos([temp, ...todos.filter((value) => value.key !== editkey)]);
    storeTodos([temp, ...todos.filter((value) => value.key !== editkey)]);

    setModalVisible(false);
  };

  const storeTodos = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('todos', jsonValue);
    } catch (e) {
      throw new Error(e);
    }
  };

  const getTodos = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        setTodos(JSON.parse(value));
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              padding: 30,
              flexDirection: 'row',
              backgroundColor: 'coral'
            }}
          >
            <Icon
              style={{ paddingRight: 10, width: '25%' }}
              name="arrow-left"
              size={20}
              color="#fff"
              onPress={() => setModalVisible(false)}
            />
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 25, color: '#fff' }}>Edit To Do</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <TextInput
              style={styles.input}
              placeholder="Edit Todo..."
              onChangeText={(value) => setEditText(value)}
              value={editText}
            />
            <Button
              onPress={() => updateTodo()}
              title="Update Todo"
              color="coral"
            />
          </View>
        </Modal>
        <Header />
        <View style={styles.content}>
          <AddTodo
            text={text}
            setText={setText}
            submitHandler={submitHandler}
          />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem
                  navigation={navigation}
                  item={item}
                  editTodo={() => editTodo(item)}
                  deleteTodo={deleteTodo}
                />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20,
    flex: 1
  },
  list: {
    marginTop: 20,
    flex: 1
  },
  input: {
    color: 'black',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});
