import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: ""
  });

  if (sessionUser) return <Redirect to="/channels/@me" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameTrim = user.username.trim();
    const emailTrim = user.email.trim();
    const newUser = {email: emailTrim, username: usernameTrim, password: user.password}
    if (user.password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup(newUser))
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data) {
            const errorData = {
              username: "",
              email: "",
              password: ""
            };
            data.forEach(error => {
              console.log(error)
              if (error.toLowerCase().includes("email")) {
                errorData.email = " - " + error.replace("Email", "");
              }
              if (error.toLowerCase().includes("username")) {
                errorData.username = " - " + error.replace("Username", "");
              }
              if (error.toLowerCase().includes("password")) {
                errorData.password = " - " + error.replace("Password", "");
              }
            })
            setErrors(errorData);
          }
          else if (data) {
            setErrors([data]);
          }
          else {
            setErrors([res.statusText]);
          }

        });
    }
    return setErrors({ password: ' - Confirm Password must be the same as the Password' });
  };

  return (
    <>
      <div id="register-box">
        <div id="register-form-box">
          <form id="register-form" onSubmit={handleSubmit}>
            <div id="header-register-form">
              <div id="create-account-message"><label>Create an account</label></div>
            </div>
            <div id="register-input-fields">
              <label className={errors.email ? "error" : ""}>EMAIL <span>{errors.email}</span></label>
              <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
              <label className={errors.username ? "error" : ""}>USERNAME <span>{errors.username}</span> </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
              <label className={errors.password ? "error" : ""}>PASSWORD <span>{errors.password}</span> </label>

              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                value={user.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div id="register-button-box">
              <button id='register-button' type="submit">Register</button>
            </div>
            <div id="register-form-account-box">
              <NavLink to="/login">Already have an account?</NavLink>
            </div>
            <div id="register-form-bottom-box">
              By registering, you agree to MockCord's&nbsp;
              <span id="tos">Terms of Service</span>&nbsp;and&nbsp;<span id="privacy-policy">Privacy Policy</span>.
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;