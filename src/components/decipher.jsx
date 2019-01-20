import React, { Component } from "react";
import decipherURLContent from "../utils/decipherURLContent";

class Decipher extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", deciphered: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    //alert("A name was submitted: " + this.state.value);
    decipherURLContent(this.state.value).then(res =>
      this.setState({ deciphered: res })
    );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="basic-url">
          Your URL from gambit quiz that needs deciphering
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
        <input type="submit" value="Decipher" />
        <div>Your deciphered text is : {this.state.deciphered}</div>
      </form>
    );
  }
}

export default Decipher;
