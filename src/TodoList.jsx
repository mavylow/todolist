import React from "react";
import TodoEdit from "./TodoEdit.jsx";
import { Trash, Edit } from "./icons.jsx";
import "./TodoList.css";

class Todo extends React.PureComponent {
  state = {
    edit: false,
  };

  render() {
    const { main, description, severity, done } =
      this.props.todo;

    const priority = {
      high: "Срочно",
      middle: "Средне",
      low: "Не срочно",
    };

    return (
      <div>
        {!this.state.edit ? (
          <div className={done ? "doneTodo" : "Todo"}>
            <input
              type="checkbox"
              checked={done}
              onChange={this.handleTodoCheck}
            />
            <div className="Info">
              <span className="main">{main}</span>
              <span className="description">
                {description}
              </span>
              <div className="addInfo">
                <span className={severity}>
                  {priority[severity]}
                </span>
                <span className="date">
                  {this.props.todo.id}
                </span>
              </div>
            </div>
            <div className="buttons">
              <button onClick={this.handleTodoDelete}>
                <Trash />
              </button>
              <button onClick={this.handleTodoEdit}>
                <Edit />
              </button>
            </div>
          </div>
        ) : (
          <TodoEdit
            id={this.props.todo.id}
            main={main}
            description={description}
            severity={severity}
            done={done}
            onEdit={this.props.onEdit}
            onCancel={this.handleCancelEdit}
          />
        )}
      </div>
    );
  }
  handleTodoDelete = () => {
    this.props.onDelete(this.props.todo.id);
  };

  handleTodoCheck = () => {
    this.props.onChecked(this.props.todo.id);
  };

  handleTodoEdit = () => {
    this.setState({ edit: true });
  };

  handleCancelEdit = () => {
    this.setState({ edit: false });
  };
}

export default class TodoList extends React.Component {
  render() {
    return (
      <div className="TodoList">
        {this.props.todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={this.props.onDelete}
            onChecked={this.props.onChecked}
            onEdit={this.props.onEdit}
          />
        ))}
      </div>
    );
  }
}
