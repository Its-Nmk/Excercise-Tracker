import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import axios from "axios";

export class AddExcercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      success: undefined,
      visited: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    // console.log("mounted");
    axios.get("/users").then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        this.setState({ users: res.data });
      }
    });

    // console.log(this.state.date);
  }

  onChangeHandler = (e) => {
    const { id, value } = e.target;
    // console.log(id, value);
    this.setState({
      ...this.state,
      [id]: value,
    });
  };

  onChangeDateHandler = (date) => {
    // console.log(Date.parse(date));
    console.log(Date.parse(date));
    this.setState({
      date: date,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    // alert("Submit");
    this.setState({ success: undefined });
    const { userName, description, duration, date } = this.state;
    const exercise = {
      userName: userName,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);
    await axios
      .post("/exercises/add", exercise)
      .then((res) => {
        console.log(res.data);
        this.setState({ success: true });
        // alert("Exercise Added!!");
      })
      .catch((e) => {
        this.setState({ success: false });
      });

    this.setState({
      userName: "--None--",
      description: "",
      duration: 0,
      date: new Date(),
      // success: undefined,
      visited: [],
    });
  };

  renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  render() {
    const { userName, description, duration, users, success, visited } =
      this.state;

    return (
      <>
        {success === true ? (
          <div className="alert alert-success" role="alert">
            Excercise Added !!!!{" "}
          </div>
        ) : null}

        {success === false ? (
          <div className="alert alert-danger" role="alert">
            Excercise Not added, Please try Again !!
          </div>
        ) : null}

        <form onSubmit={this.submitHandler} className="p-3">
          {/* <p className="text-center">
            userName: {userName} <br />
            description: {description} <br />
            duration: {duration} <br />
            visited: {visited} <br />
            
          </p> */}
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="userName">UserName</label>
              <select
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Select Users"
                required={true}
                id="userName"
                className="form-control m-2"
                onChange={this.onChangeHandler}
                value={userName}
                disabled={users.length == 0}
              >
                <option value={""}>{"--None--"}</option>
                {users.length == 0 ? <option>{"No User Found"}</option> : null}
                {users.length > 0
                  ? users.map((user, index) => {
                      return <option key={index}>{user.userName}</option>;
                    })
                  : null}
              </select>

              <label htmlFor="exampleInputEmail1">Description</label>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip}
              >
                <input
                  onChange={this.onChangeHandler}
                  type="text"
                  className="form-control m-2"
                  id="description"
                  aria-describedby="emailHelp"
                  placeholder="description"
                  required={true}
                  value={description}
                />
              </OverlayTrigger>

              {!description.trim() ? (
                <small id="emailHelp" className="form-text text-danger">
                  Description is Mandatory!!
                </small>
              ) : null}
            </div>

            {/* <h2>{document.activeElement.id}</h2> */}

            <div className="form-group col-md-6">
              <label htmlFor="duration">Duration (in Minutes )</label>
              <input
                type="number"
                className="form-control m-2"
                id="duration"
                placeholder="duration"
                onChange={this.onChangeHandler}
                value={duration}
                required={true}
              />
              <div className="p-2">
                <label htmlFor="date">Date : </label>
                <DatePicker
                  id="date"
                  selected={this.state.date}
                  onChange={this.onChangeDateHandler}
                />
              </div>
            </div>
          </div>

          <button
            disabled={description === "" || duration <= 0 || userName === ""}
            type="submit"
            className="btn btn-primary mt-2"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default AddExcercise;
