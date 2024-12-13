import React from "react";
import AddTodo from "./AddTodo";
import Filters from "./Filters";
import "./App.css";
import TodoList from "./TodoList";

export default class App extends React.Component {
  state = {
    todos: [],
    filters: {
      search: {
        value: "",
        filter: function (todos) {
          return this.value
            ? todos.filter(
                (todo) =>
                  todo.main
                    .toLowerCase()
                    .includes(this.value.toLowerCase()) ||
                  todo.description
                    .toLowerCase()
                    .includes(this.value.toLowerCase())
              )
            : todos;
        },
      },
      toggle: {
        value: false,
        filter: function (todos) {
          return this.value
            ? todos.filter((todo) => !todo.done)
            : todos;
        },
      },
      severity: {
        value: { high: false, middle: false, low: false },
        filter: function (todos) {
          const values = Object.values(this.value);
          return values.includes(true)
            ? todos.filter(
                (todo) => this.value[todo.severity]
              )
            : todos;
        },
      },
    },
  };

  render() {
    const { filters } = this.state;

    const filteredTodos = this.getFilteredTodos();
    return (
      <div className="container">
        <Filters
          {...filters}
          onFilterChange={this.handleFilterChange}
        ></Filters>
        <TodoList
          todos={filteredTodos}
          onDelete={this.handleDeleteTodo}
          onChecked={this.handleTodoChecked}
          onEdit={this.handleTodoEdit}
        ></TodoList>
        <AddTodo
          onAddTodo={this.handleAddTodo}
          onGenerateTodos={this.handleGenerateTodos}
        ></AddTodo>
      </div>
    );
  }
  handleGenerateTodos = (generateTodos) => {
    this.setState({ todos: generateTodos });
  };
  handleAddTodo = (todo) => {
    const { todos } = this.state;
    this.setState({
      todos: [todo, ...todos],
    });
    console.log(todo);
  };
  handleTodoEdit = (id, editTodo) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) =>
        todo.id === id ? editTodo : todo
      ),
    });
  };
  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(
        (todo) => todo.id !== id
      ),
    });
  };

  handleTodoChecked = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      ),
    });
  };

  handleFilterChange = (filterName, value) => {
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [filterName]: {
          ...filters[filterName],
          value,
        },
      },
    });
  };

  getFilteredTodos = () => {
    const { search, toggle, severity } = this.state.filters;
    let filteredTodos = [...this.state.todos];

    filteredTodos = search.filter(filteredTodos);

    filteredTodos = toggle.filter(filteredTodos);

    filteredTodos = severity.filter(filteredTodos);

    return filteredTodos.sort((a, b) => a.done - b.done);
  };
}
