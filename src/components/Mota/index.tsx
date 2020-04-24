import { model, binding } from "mota";
import React from "react";
import User from "./user";

@model(User)
@binding
export default class App extends React.Component {
  model: User;
  render() {
    const {fullName} = this.model
    return (
      <div>
        <p>{fullName}</p>
        <p>
          <input data-bind="firstName"/>
          <br />
          <input data-bind="lastName"/>
        </p>
      </div>
    );
  }
}
