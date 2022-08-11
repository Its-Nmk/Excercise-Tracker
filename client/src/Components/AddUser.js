import React, { Component } from "react";
import axios from "axios";
import UserComponent from "./UserComponent";

export class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      success: undefined,
      users: [],
      deleted: false,
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
    };
    console.log(user);
    await axios
      .post("http://localhost:4000/users/add", user)
      .then((res) => {
        console.log(res.data);
        this.setState({ success: true, users: [...this.state.users] });

        // alert("User Added Successfully");
      })
      .catch((e) => {
        console.log(e);
        this.setState({ success: false });
      });

    this.setState({
      userName: "",
    });
  };

  componentDidMount() {
    axios.get("http://localhost:4000/users").then((res) => {
      // console.log(res.data);
      if (res.data.length > 0) {
        this.setState({ users: res.data });
      }
    });
  }

  deleteUser = (id) => {
    axios.delete(`http://localhost:4000/users/delete/${id}`).then((res) => {
      // console.log(res.data);
      // console.log(res);
      if (res.status === 200) {
        this.setState({
          users: this.state.users.filter((ele) => {
            return ele._id !== id;
          }),
          deleted: true,
        });
        // alert("User is Deleted !!");
      }
    });
  };

  render() {
    return (
      <>
        {" "}
        <form onSubmit={this.submitHandler} className="p-3">
          {/* <p className="text-center">
            userName: {this.state.userName} <br />
          </p> */}

          {this.state.success ? (
            <div className="alert alert-success" role="alert">
              User Added !!!
            </div>
          ) : null}

          {this.state.success === false ? (
            <div class="alert alert-danger" role="alert">
              User Not added, Please try Again !!
            </div>
          ) : null}

          {this.state.deleted === true ? (
            <div className="alert alert-danger" role="alert">
              User is Deleted !!
            </div>
          ) : null}

          <div className="form-group">
            <label htmlFor="userName">UserName</label>
            <input
              required={true}
              onChange={this.onChangeHandler}
              type="text"
              className="form-control m-2"
              id="userName"
              aria-describedby="emailHelp"
              placeholder="Enter User Name"
              value={this.state.userName}
            />
          </div>

          <button
            disabled={!this.state.userName.trim()}
            type="submit"
            className="btn btn-primary mt-2"
          >
            Add User
          </button>
        </form>
        <table className="table table-success text-center">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">UserName</th>
              <th scope="col">Created</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => {
              return (
                <UserComponent
                  index={index}
                  key={index}
                  deleteHandler={this.deleteUser}
                  user={user}
                />
              );
            })}
          </tbody>
        </table>{" "}
      </>
    );
  }
}

export default AddUser;
