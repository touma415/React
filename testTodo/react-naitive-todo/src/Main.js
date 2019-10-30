import * as React from "react";
import { StatusBar, View, TextInput, StyleSheet, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo";
import { styles as GlobalStyles } from "./utils/styles";
import { Header } from "./components/Header";
import Todos from "./components/Todos/Todos";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: "",
      loading: true,
      todos: []
    };
    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      this.setState({
        todos: JSON.parse(todos) || [],
        loading: false
      });
    } catch (e) {
      console.log("Error getting Todo Items >", e);
    }
  };

  save = async () => {
    try {
      AsyncStorage.setItem("todos", JSON.stringify(this.state.todos));
    } catch (e) {
      console.log("Error while storing Todo Items >", e);
    }
  };

  addTodo = () => {
    if (this.state.todo.length === 0) {
      this.setState({ inputError: true });
      return;
    }
    const todos = this.state.todos;
    const todo = {
      title: this.state.todo,
      completed: false,
      createdOn: Date.now(),
      notes: "",
      dueDate: null,
      remindMe: false,
      completedOn: null
    };
    todos.push(todo);
    this.setState({ todos, todo: "" });
  };

  checkBoxToggle = i => {
    const todos = this.state.todos;
    const todo = todos[i];
    todo.completed = !todo.completed;
    todo.completedOn = todo.completed ? Date.now() : null;
    todos[i] = todo;
    this.setState({ todos });
  };

  onDeleteAction = i => {
    const todos = this.state.todos;
    todos.splice(i, 1);
    this.setState({ todos });
  };

  render() {
    return (
      <LinearGradient style={{ flex: 1 }} colors={GlobalStyles.appBackgroundColors}>
        <StatusBar barStyle="light-content" />
        <Header title="Todo App" />
        <View style={styles.container}>
          <TextInput style={styles.textInput} autoCapitalize="sentences" placeholder="What needs to be done?" placeholderTextColor={"rgba(255, 255, 255, 0.7)"} onChangeText={todo => this.setState({ todo })} blurOnSubmit={false} onSubmitEditing={this.addTodo} value={this.state.todo} />
          <View style={styles.todosWrp}>
            <View style={styles.listHeaderWrp}>
              <Text style={styles.listHeader}>Your Todos</Text>
            </View>
            <ScrollView>
              <Todos todos={this.state.todos} checkBoxToggle={this.checkBoxToggle} onDelete={this.onDeleteAction} />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  textInput: {
    color: GlobalStyles.fontColor,
    fontSize: 28,
    fontStyle: "italic"
  },
  noTodo: {
    fontSize: GlobalStyles.fontSize,
    color: GlobalStyles.fontColor,
    fontWeight: "bold"
  }
});
