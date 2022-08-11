import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Exercise from "./Exercise";
import ModalComponent from "./ModalComponent";
import loading from "../Assets/animation.mp4";

export class ExcerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      excercises: [],
      deleteId: "",
      showModal: false,
      deleteIds: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("http://localhost:4000/exercises")
      .then((res) => {
        console.log(res.data);
        this.setState({ excercises: res.data });
        this.setState({ loading: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
  }

  showModalwithID = (id) => {
    console.log(id);
    this.setState({ deleteId: id });
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  deleteHandler = (id) => {
    if (id === undefined) {
      this.deleteMultipleExercises();
    } else {
      this.deleteExercise(id);
    }
  };

  deleteExercise = (id) => {
    axios.delete(`http://localhost:4000/exercises/delete/${id}`).then((res) => {
      console.log(res.data);
      console.log(res);
      if (res.status === 200) {
        this.setState({
          excercises: this.state.excercises.filter((ele) => {
            return ele._id !== id;
          }),
          showModal: false,
        });
      }
    });
  };

  showModalForMultiple = () => {
    this.setState({ showModal: true });
  };

  deleteMultipleExercises = () => {
    axios
      .delete(`http://localhost:4000/exercises/delete/many/`, {
        data: this.state.deleteIds,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        if (res.status === 200) {
          this.setState({
            excercises: this.state.excercises.filter((ele) => {
              // return ele._id !== id;
              return !this.state.deleteIds.includes(ele._id);
            }),
            showModal: false,
          });
        }
      });
  };

  addIdToDelete = (id, checked) => {
    console.log(id, checked);
    if (!checked) {
      this.setState({ deleteIds: [...this.state.deleteIds, id] });
    } else {
      this.setState({
        deleteIds: this.state.deleteIds.filter((stateId) => {
          return stateId !== id;
        }),
      });
    }
  };

  render() {
    return (
      <>
        {/* <p>
          {this.state.deleteIds.map((id) => {
            return (
              <>
                <em>{id}</em> <br />
              </>
            );
          })}
        </p> */}

        <table className="table table-success">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Sr.No.</th>
              <th scope="col">UserName</th>
              <th scope="col">Description</th>
              <th scope="col">Duration (in Min)</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.excercises.map((exercise, index) => {
              return (
                <Exercise
                  onSelectHandler={this.addIdToDelete}
                  key={exercise._id}
                  exercise={exercise}
                  index={index}
                  deleteHandler={this.showModalwithID}
                />
              );
            })}
          </tbody>
        </table>

        {this.state.loading === true ? (
          <div className="text-center">
            {/* <Spinner
              animation="border"
              variant="success"
              children={<Spinner animation="grow" variant="danger" />}
            /> */}
            <video
              width={300}
              height={200}
              muted={true}
              autoPlay={true}
              src={loading}
            ></video>
          </div>
        ) : null}

        {this.state.excercises.length === 0 && this.state.loading === false ? (
          <h5 className="text-center">No exercises found</h5>
        ) : null}

        {this.state.excercises.length === 0 ? null : (
          <button
            className=" btn btn-danger"
            onClick={this.showModalForMultiple}
            disabled={this.state.deleteIds.length === 0}
          >
            Delete
          </button>
        )}

        {this.state.showModal ? (
          <ModalComponent
            closeHandle={this.closeModal}
            id={this.state.deleteId}
            showModal={this.state.showModal}
            button1Label={"Delete"}
            button1Variant={"danger"}
            bodyText="Are you sure you want to delete selected records ?"
            btn1Function={this.deleteHandler}
            btn2Function={this.closeModal}
          />
        ) : null}
      </>
    );
  }
}

export default ExcerciseList;
