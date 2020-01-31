import React, { Component } from "react";
import "./Add.css";
import axios from "axios";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      contect: "הכנס את הארוחה",
      meal: "ארוחת בוקר"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "textarea") {
      this.setState({ contect: event.target.value });
    } else {
      this.setState({ meal: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const d = new Date();
    axios
      .post("http://localhost:5000/", {
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        hour: d.getHours(),
        min: d.getMinutes(),
        meal: this.state.meal,
        content: this.state.contect
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {}
  render() {
    return (
      <div className="add-continer">
        <form onSubmit={this.handleSubmit}>
          <label>
            בחר את הארוחה
            <select onChange={this.handleChange}>
              <option defaultValue value="ארוחת בוקר">
                ארוחת בוקר
              </option>
              <option value="ארוחת עשר">ארוחת עשר</option>
              <option value="ארוחת צהריים">ארוחת צהריים</option>
              <option value="ארוחת ארבע">ארוחת ארבע</option>
              <option value="ארוחת ערב">ארוחת ערב</option>
              <option value="ארוחת לילה">ארוחת לילה</option>
            </select>
          </label>
          <br />
          <label>
            הכנס את האוכל
            <textarea
              value={this.state.contect}
              onChange={this.handleChange}
              name="textarea"
            />
          </label>
          <br />
          <input type="submit" />
          <br />
        </form>
      </div>
    );
  }
}
export default Add;
