import React from "react";
import { useState, useEffect } from "react";

import { addRequest } from "./newUser.js";
import "./App.css";
import { useHistory } from "react-router-dom";

function AddComponent(props) {
  const initialValues = {
    username: "",
    email: "",
    userole: "",
    password: "",
    confirm: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [dataResponse, setdataResponse] = useState("");
  const history = useHistory();

  const handleRoute = (e) => {
    history.push(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormErrors({ ...formErrors, username: "" });
    }

    if (name === "userrole") {
      setFormErrors({ ...formErrors, userrole: "" });
    }
    if (name === "email") {
      setFormErrors({ ...formErrors, email: "" });
    }
    if (name === "password") {
      setFormErrors({ ...formErrors, password: "" });
    }
    if (name === "confirm") {
      setFormErrors({ ...formErrors, confirm: "" });
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const push = async () => {
    let response = await addRequest(formValues);

    if (response === "USER CREATED") {
      setdataResponse(response);
      setIsSubmit(true);
      setFormValues({
        // username: "",
        username: "",
        email: "",
        userrole: "",
        password: "",
        confirm: "",
      });
      setTimeout(() => {
        setdataResponse("");
        handleRoute("/");
      }, 1000);
    }
  };
  // const add = async () => {
  //   console.log("hew");
  //   let response1 = await addRec(formNewValues);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validate(formValues);
    if (Object.keys(result).length === 0) {
      push();
    }
    setFormErrors(result);
  };

  const validate = (values) => {
    const errors = {};

    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 3) {
      errors.username = "username must be more than 4 characters";
    } else if (values.username.length > 10) {
      errors.username = "username cannot exceed more than 15 characters";
    }

    if (!values.userrole) {
      errors.userrole = "department is required";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 50) {
      errors.password =
        "INVALID PASSWORD: Password cannot exceed more than 10 characters";
    } else if (!values.password.match(upperCaseLetters)) {
      errors.password =
        "INVALID PASSWORD: Password must contain atleast one upper case character";
    } else if (!values.password.match(numbers)) {
      errors.password =
        "INVALID PASSWORD: Password must contain atleast one number digit";
    }

    if (!values.confirm) {
      errors.confirm = "Password is required";
    }
    if (values.password !== values.confirm) {
      errors.confirm = "INVALID PASSWORD: Password must match";
    }
    return errors;
  };

  return (
    <div className="mainWrapper">
      <div className="mainWrapper-Image"></div>
      <div className="mainWrapper-container">
        <div className="container">
          <h2>CREATE A NEW USER</h2>
          {dataResponse.length > 0 && isSubmit ? (
            <div className="ui message success">{dataResponse}</div>
          ) : (
            <pre></pre>
          )}
          <form>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>USERNAME</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.username}</p>
              <div className="field">
                <label>UserEmail</label>
                <input
                  type="text"
                  name="email"
                  placeholder="UserEmail"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.email}</p>
              <div className="field">
                <label>UserRole</label>
                <input
                  type="text"
                  name="userrole"
                  placeholder="Assign Role"
                  value={formValues.userrole}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.userrole}</p>

              <div className="field">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.password}</p>

              <div className="field">
                <label> Confirm password</label>
                <input
                  type="password"
                  name="confirm"
                  placeholder="confirm password"
                  value={formValues.confirm}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.confirm}</p>

              <button className="fluid ui button blue" onClick={handleSubmit}>
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddComponent;
