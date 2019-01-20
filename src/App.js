import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Decipher from "./components/decipher";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Decipher />
      </div>
    );
  }
}

export default App;
