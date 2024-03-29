import React, { useState } from "react";
import * as sessionActions from "../../store/session";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/channels/@me" />;

  const demoUser = () => {
    // setCredential('Demo-lition@user.io')
    // setPassword('password')
    setCredential('Demo-lition@user.io')
    setPassword('password')
  };

  const demoUserTwo = () => {
    setCredential('Demo-nstration@user.io')
    setPassword('password')
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        setLoading(false);
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);

      });
  };
  return (
    <>
      <div id="login-box">
        <div id="login-form-box">

          <div className="loading-session">
            {loading &&
              <img className="loading-wumpus login" src="loading-wumpus.gif" />}
          </div>
          <form id="login-form" onSubmit={handleSubmit}>
            <div id="header-login-form">
              <div id="welcome-message"><label>Welcome back!</label></div>
              <div id="welcome-content"><label>We're so excited to see you again!</label></div>
              <div id="spacer-header"></div>
            </div>
            <div id="username-login-form">
              {errors.length !== 0 ? (
                <label className="error">EMAIL
                  <span id="error-message"> - Login or passsword is invalid.</span>
                </label>
              ) : (
                <label>EMAIL&nbsp;
                  <span id="input-required">*</span>
                </label>
              )}
              <input required type="text" autoComplete="off" value={credential} onChange={(e) => setCredential(e.target.value)} id="input-username" name="username" />
              <div id="spacer-input"></div>
            </div>
            <div id="password-login-form">
              {errors.length !== 0 ? (
                <label className='error'>PASSWORD
                  <span id="error-message"> - Login or passsword is invalid.</span>
                </label>
              ) : (
                <label>PASSWORD&nbsp;<span id="input-required">*</span></label>
              )}
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="input-password" />
            </div>
            <div id="forgot-password-box">
              <div><NavLink to="/">Take me back to the Splash Page</NavLink></div>
            </div>
            <div id="login-button-box">
              <button type="submit" id="login-button">Log In</button>
            </div>
            <div id="login-form-bottom-box">
              <span>Need an account?&nbsp;<NavLink to="/register">Register</NavLink></span>
              <button className="demo-login" type='submit' onClick={demoUser}>Login as Demo User</button>
              <button className="demo-login" type='submit' onClick={demoUserTwo}>Login as Demo User #2</button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default LoginFormPage;