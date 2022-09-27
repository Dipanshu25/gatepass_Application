import React, { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { addUser } from "./userRequest";
export default function LoginPage(props) {
  const { setIsLoggedIn, setTime, formValues, setFormValues } = props;
  let history = useHistory();
  const [dataResponse, setdataResponse] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name === "user_activity") {
      setFormErrors({ ...formErrors, user_activity: "" });
    }
    if (name === "request_type") {
      setFormErrors({ ...formErrors, request_type: "" });
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let response = validate(formValues);
    if (Object.keys(response).length === 0) {
      push();
    }
    setFormErrors(response);
    let today = new Date();
    var t =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setTime(t);
  };
  const push = async () => {
    let response = await addUser(formValues);
    if (response === "User doesnt exist!") {
      setdataResponse("USER DOESNT EXIST");
      setIsLoggedIn(false);
      setIsSubmit(false);
    } else if (response === "User login Successfully!") {
      setIsLoggedIn(true);
    }
  };

  const validate = (values) => {
    const errors = {};

    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    return errors;
  };

  return (
    <div className="main-Image">
      <div className="login_div">
        <div className="login_content">
          {dataResponse.length > 0 && !isSubmit ? (
            <div className="ui_msg">{dataResponse}</div>
          ) : (
            <pre> </pre>
          )}
          <form name="login_form">
            <div className="spacer">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="user-input"
                placeholder="Enter Usermail"
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="spacer">
              <label> Password </label>
              <input
                type="password"
                name="password"
                className="pass-input"
                placeholder="Enter your Password"
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="spacer-2">
              <button className="signin-button" onClick={handleSubmit}>
                Login
              </button>
            </div>
            <div className="spacer-2">
              <div className="forgot_pass">
                Forgot your{" "}
                <a href="" className="link-color">
                  PASSWORD ?
                </a>
              </div>
            </div>
          </form>
          <hr className="login_divider" />
          <div className="spacer-2 forgot_pass">
            Don't have an account?
            <a href="" className="link-color">
              {" "}
              Sign Up
            </a>{" "}
            for free!
          </div>
        </div>
      </div>
    </div>
  );
}
