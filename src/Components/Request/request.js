import React from "react";
import { useState, useEffect } from "react";

import { addRequest } from "./newRequest";
import "./App.css";
import { useHistory } from "react-router-dom";
import { addRec } from "./newRecieve.js";

function RequestComponent(props) {
  const { formValues } = props;
  const { email } = formValues;
  const initialValues = {
    useremail: email,
    user_activity: "",
    request_type: "",
  };

  const [formNewValues, setFormNewValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [dataResponse, setdataResponse] = useState("");
  const history = useHistory();

  const handleRoute = (e) => {
    history.push(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === "username") {
    //   setFormErrors({ ...formErrors, username: "" });
    // }

    if (name === "user_activity") {
      setFormErrors({ ...formErrors, user_activity: "" });
    }
    if (name === "request_type") {
      setFormErrors({ ...formErrors, request_type: "" });
    }
    setFormNewValues({ ...formNewValues, [name]: value });
  };

  const push = async () => {
    let response = await addRequest(formNewValues);

    if (response === "User Request CREATED!") {
      setdataResponse(response);
      setIsSubmit(true);
      setFormNewValues({
        // username: "",

        user_activity: "",
        request_type: "",
      });
      setTimeout(() => {
        setdataResponse("");
        handleRoute("/");
      }, 1000);
      // add();
    }
  };
  // const add = async () => {
  //   console.log("hew");
  //   let response1 = await addRec(formNewValues);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validate(formNewValues);
    if (Object.keys(result).length === 0) {
      push();
    }
    setFormErrors(result);
  };

  const validate = (values) => {
    var numbers = /[0-9]/g;

    const errors = {};

    // if (!values.username) {
    //   errors.username = "Username is required!";
    // } else if (values.username.length < 3) {
    //   errors.username = "username must be more than 4 characters";
    // } else if (values.username.length > 10) {
    //   errors.username = "username cannot exceed more than 15 characters";
    // }

    if (!values.user_activity) {
      errors.user_activity = "department is required";
    }

    if (!values.request_type) {
      errors.request_type = "type is required";
    }

    return errors;
  };

  return (
    <div className="mainWrapper">
      <div className="mainWrapper-Image"></div>
      <div className="mainWrapper-container">
        <div className="container">
          <h2>CREATE A NEW REQUEST</h2>
          {dataResponse.length > 0 && isSubmit ? (
            <div className="ui message success">{dataResponse}</div>
          ) : (
            <pre></pre>
          )}
          <form>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <div className="field">
                  <label>UserEmail</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="UserEmail"
                    value={email}
                  />
                </div>
              </div>

              <div className="field">
                <label>Raised To:</label>
                {email === "manager123@digi.com" ? (
                  <select name="user_activity" onChange={handleChange}>
                    <option value="">CHOOSE</option>
                    <option value="superadmin">superAdmin</option>
                  </select>
                ) : (
                  <select name="user_activity" onChange={handleChange}>
                    <option value="">CHOOSE</option>
                    <option value="manager">manager</option>
                    <option value="superadmin">superAdmin</option>
                  </select>
                )}
              </div>
              <p>{formErrors.user_activity}</p>
              <div className="field">
                <label>Request Type</label>
                <input
                  type="text"
                  name="request_type"
                  placeholder="Request Type"
                  value={formValues.request_type}
                  onChange={handleChange}
                />
                <p>{formErrors.request_type}</p>
                <button className="fluid ui button blue" onClick={handleSubmit}>
                  Submit Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestComponent;
