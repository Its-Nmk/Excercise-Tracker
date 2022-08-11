import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EditExercise = (props) => {
  const { id } = useParams();
  // console.log(id);
  const [userName, setUserName] = useState(undefined);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [success, setSuccess] = useState(undefined);
  const [users, setUsers] = useState([]);

  // ! Functions :

  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        setUsers(res.data);
      }
    });

    // console.log(id);
    axios.get(`http://localhost:4000/exercises/${id}`).then((res) => {
      console.log(res.data);
      setUserName(res.data.userName);
      setDescription(res.data.description);
      setDuration(res.data.duration);
      setDate(new Date(res.data.date));
      setSuccess(undefined);
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("Submit");
    const exercise = {
      userName: userName,
      description: description,
      duration: duration,
      date: date,
    };

    // console.log(exercise);
    axios
      .post("http://localhost:4000/exercises/update/" + id, exercise)
      .then((res) => {
        // console.log(res.data);
        // console.log("exe");
        setSuccess(true);
        setTimeout(() => {
          window.location = "/";
        }, 1800);

        // alert("Exercise Added!!");
      })
      .catch((e) => {
        setSuccess(false);
        console.log(e);
      });
  };

  const onChangeUserNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const onChangeDescHandler = (e) => {
    setDescription(e.target.value);
    // console.log(e.target);
  };

  const onChangeDurationHandler = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDateHandler = (date) => {
    // console.log(Date.parse(date));
    console.log(date);
    setDate(date);
  };

  return (
    <>
      {" "}
      {success ? (
        <div className="alert alert-success" role="alert">
          Excercise has been updated !!!!{" "}
        </div>
      ) : null}
      {success === false ? (
        <div className="alert alert-danger" role="alert">
          Please try Again !!!!
        </div>
      ) : null}
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="p-3"
      >
        {/* <p className="text-center">
          userName: {userName} <br />
          description: {description} <br />
          duration: {duration} <br />
         
        </p> */}

        <div className="form-group">
          <label htmlFor="userName">UserName</label>
          <select
            required={true}
            id="userName"
            className="form-control m-2"
            onChange={(e) => {
              onChangeUserNameHandler(e);
            }}
            value={userName}
          >
            {users.length > 0
              ? users.map((user, index) => {
                  return <option key={index}>{user.userName}</option>;
                })
              : null}
          </select>

          <label htmlFor="exampleInputEmail1">Description</label>
          <input
            onChange={(e) => {
              onChangeDescHandler(e);
            }}
            type="text"
            className="form-control m-2"
            id="description"
            aria-describedby="emailHelp"
            placeholder="description"
            required={true}
            value={description}
          />
          {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in Minutes )</label>
          <input
            type="number"
            className="form-control m-2"
            id="duration"
            placeholder="duration"
            onChange={(e) => {
              onChangeDurationHandler(e);
            }}
            value={duration}
            required={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Date : </label>

          <DatePicker
            selected={date}
            onChange={(date) => {
              onChangeDateHandler(date);
            }}
          />
        </div>

        <button
          disabled={description === "" || duration <= 0 || userName === ""}
          type="submit"
          className="btn btn-primary mt-2"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default EditExercise;
