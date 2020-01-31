import React, { Component } from "react";
import "./Eat.css";
import axios from "axios";

class Eat extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          hour: "hour",
          min: "min",
          day: "day",
          month: "month",
          year: "year",
          meal: "breakfast",
          content: "content"
        }
      ]
    };
  }

  handleInputChange(event) {}

  handleSubmit(event) {}

  componentDidMount() {
    async function getData(url) {
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
    getData("http://localhost:5000/")
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="main-meal-continer">
        {this.state.data.map((data, i) => {
          return (
            <div key={i} className="meal-continer">
              <div className="date">
                <h3>{this.state.data[i].day}/</h3>
                <h3>{this.state.data[i].month + 1}/</h3>
                <h3>{this.state.data[i].year}</h3>
              </div>
              <div className="time">
                <h4>{data.hour}:</h4>
                <h4>{data.min}</h4>
              </div>
              <div className="meal">
                <h5>{this.state.data[i].meal}</h5>
                <p>{data.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Eat;
