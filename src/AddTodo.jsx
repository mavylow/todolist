import React from "react";
import { generateTodos } from "./utils";
import "./AddTodo.css";

export default class AddTodo extends React.PureComponent {
  state = {
    main: "",
    description: "",
    severity: "",
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangePriority = (e) => {
    this.setState({ severity: e.target.name });
  };
  handleButtonAdd = () => {
    const { main, description, severity } = this.state;
    if (main.trim()) {
      const todo = {
        id: new Date().toLocaleString(),
        main: main.trim(),
        description,
        severity,
        done: false,
      };

      this.props.onAddTodo(todo);
      this.setState({
        main: "",
        description: "",
        severity: "",
      });
    }
  };
  handleGenerateTodos = () => {
    const todos = generateTodos();
    this.props.onGenerateTodos(todos);
  };

  render() {
    const { main, description, severity } = this.state;

    return (
      <div className="AddTodo">
        <div className="TodoInputs">
          <span>Название</span>
          <input
            className="main"
            placeholder="Введите название задачи"
            name="main"
            value={main}
            onChange={this.handleInputChange}
          ></input>
        </div>

        <div className="TodoInputs">
          <span>Описание</span>
          <input
            className="description"
            placeholder="Введите описание задачи"
            name="description"
            value={description}
            onChange={this.handleInputChange}
          ></input>
        </div>
        <div className="choosePriority">
          <span>Важность</span>
          <div className="priorityButtons">
            <button
              className={
                severity === "high" ? "active" : ""
              }
              name="high"
              onClick={this.handleChangePriority}
            >
              Срочно
            </button>
            <button
              className={
                severity === "middle" ? "active" : ""
              }
              name="middle"
              onClick={this.handleChangePriority}
            >
              Средне
            </button>
            <button
              className={severity === "low" ? "active" : ""}
              name="low"
              onClick={this.handleChangePriority}
            >
              Не срочно
            </button>
          </div>
        </div>
        <div className="addButtons">
          <button onClick={this.handleGenerateTodos}>
            Сгенирировать 1000 задач
          </button>
          <button
            className="Add"
            onClick={this.handleButtonAdd}
          >
            Добавить
          </button>
        </div>
      </div>
    );
  }
}
