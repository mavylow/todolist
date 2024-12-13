import React from "react";
import "./Filters.css";
import { debounce } from "./utils";

class Search extends React.PureComponent {
  handleSearchChange = (e) => {
    this.props.onFilterChange(
      "search",
      e.target.value.toLowerCase()
    );
  };
  render() {
    const handleSearchChange = debounce(
      this.handleSearchChange,
      500
    );
    return (
      <div className="isSearch">
        <input
          type="search"
          onChange={handleSearchChange}
        ></input>
      </div>
    );
  }
}
class Done extends React.PureComponent {
  handleToggleChange = (e) => [
    this.props.onFilterChange("toggle", e.target.checked),
  ];

  render() {
    const handleToggleChange = debounce(
      this.handleToggleChange,
      500
    );
    return (
      <div className="isDone">
        <input
          type="checkbox"
          onChange={handleToggleChange}
        ></input>
        <span>Скрыть выполненные</span>
      </div>
    );
  }
}
class Priority extends React.PureComponent {
  handleChooseSeverity = (e) => {
    const { severity, onFilterChange } = this.props;
    const value = severity.value;
    const keys = Object.keys(value);
    keys.forEach((key) =>
      key === e.target.value
        ? (value[key] = !value[key])
        : value[key]
    );

    onFilterChange("severity", value);
  };

  render() {
    const { value } = this.props.severity;

    return (
      <div className="isPriority">
        <span>Важность</span>
        <div className="option">
          <input
            type="checkbox"
            value="high"
            checked={value["high"]}
            onChange={this.handleChooseSeverity}
          ></input>
          <span>Срочно</span>
        </div>
        <div className="option">
          <input
            type="checkbox"
            value="middle"
            checked={value["middle"]}
            onChange={this.handleChooseSeverity}
          ></input>
          <span>Средне</span>
        </div>
        <div className="option">
          <input
            type="checkbox"
            value="low"
            checked={value["low"]}
            onChange={this.handleChooseSeverity}
          ></input>
          <span>Не срочно</span>
        </div>
      </div>
    );
  }
}
export default class Filters extends React.PureComponent {
  render() {
    const { search, toggle, severity, onFilterChange } =
      this.props;
    return (
      <div className="Filters">
        <Search
          search={search}
          onFilterChange={onFilterChange}
        ></Search>
        <Done
          toggle={toggle}
          onFilterChange={onFilterChange}
        ></Done>
        <Priority
          severity={severity}
          onFilterChange={onFilterChange}
        ></Priority>
      </div>
    );
  }
}
