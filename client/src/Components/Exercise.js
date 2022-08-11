import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalComponent from "./ModalComponent";

export class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      checked: false,
    };

    // let exercise = props.exercise;
  }

  render() {
    const { checked } = this.state;
    const exercise = this.props.exercise;
    return (
      <>
        <tr className="table-light">
          <th scope="row">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={this.state.checked}
                name={exercise._id}
                id={exercise._id}
                onChange={(e) => {
                  console.log(e.target);
                  if (!this.state.checked) {
                    this.setState({ checked: true });
                  } else {
                    this.setState({ checked: false });
                  }
                  this.props.onSelectHandler(exercise._id, checked);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={exercise._id}
              ></label>
            </div>
          </th>
          <th scope="row">{this.props.index + 1}</th>
          <td>{exercise.userName}</td>
          <td>{exercise.description}</td>
          <td>{exercise.duration}</td>
          <td>{exercise.date.split("T")[0]}</td>
          <td>
            <Link to={`/edit/${exercise._id}`}>
              <i className="fa fa-pencil text-primary" aria-hidden="true"></i>
            </Link>{" "}
            |{" "}
            <a
              href="#"
              onClick={() => {
                this.props.deleteHandler(exercise._id);
                // this.setState({ showModal: true });
              }}
            >
              <i className="fa fa-trash text-danger" aria-hidden="true"></i>
            </a>
          </td>
        </tr>
      </>
    );
  }
}

export default Exercise;
