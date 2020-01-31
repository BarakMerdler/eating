import React, { Component } from "react";
import "./App.css";
import Add from "./componets/Add";
import Eat from "./componets/Eat";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Add />
        <Eat />
      </div>
    );
  }
}

export default App;
