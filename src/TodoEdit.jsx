import React from "react";
import { Save, Cancel } from "./icons";
import "./TodoEdit.css";
export default class TodoEdit extends React.PureComponent {
  state = {
    main: this.props.main,
    description: this.props.description,
    severity: this.props.severity,
  };

  render() {
    const { main, description } = this.state;

    return (
      <div className="TodoEdit">
        <input
          name="main"
          value={main}
          placeholder="Новое название задачи"
          onChange={this.handleInputChange}
        />
        <input
          name="description"
          value={description}
          placeholder="Новое описание задачи"
          onChange={this.handleInputChange}
        />
        <div className="buttons">
          <div className="choosePriority">
            <span>Важность</span>
            <button
              name="high"
              onClick={this.handleChangePriority}
            >
              Срочно
            </button>
            <button
              name="middle"
              onClick={this.handleChangePriority}
            >
              Средне
            </button>
            <button
              name="low"
              onClick={this.handleChangePriority}
            >
              Не срочно
            </button>
          </div>
          <button onClick={this.props.onCancel}>
            <Cancel></Cancel>
          </button>
          <button onClick={this.handleTodoEdit}>
            <Save></Save>
          </button>
        </div>
      </div>
    );
  }
  handleChangePriority = (e) => {
    this.setState({ severity: e.target.name });
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTodoEdit = () => {
    const { id, done } = this.props;
    const { main, description, severity } = this.state;
    if (main.trim()) {
      const todo = {
        id,
        main: main.trim(),
        description,
        severity,
        done,
      };
      this.props.onEdit(id, todo);
      this.props.onCancel();
    }
  };
}
