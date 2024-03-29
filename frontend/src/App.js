import React, { useState } from "react";
import { Route, Redirect, useLocation, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginForm";
import SignupFormPage from "./components/SignupFormPage/SignUpForm";
import SplashPage from "./components/SplashPage";
import { Modal } from "./context/Modal";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";
import ServerPage from "./components/ServerPage/ServerPage";
import FriendMessagePage from "./components/FriendMessagePage/FriendMessagePage";
import VoiceChannelPage from "./components/VoiceChannelPage/VoiceChannelPage";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = location.pathname;
  const [showServerModal, setShowServerModal] = useState(false);


  return (
    <>
      <Switch>
        <Route exact path="/channels/@me/:channelId(\d+)" component={FriendMessagePage}/>
        {/* <Route exact path="/channels/:serverId(\d+)/chat" component={VoiceChannelPage}/> */}
        <Route exact path="/channels/:serverId(\d+)/:channelId(\d+)" component={ServerPage}/>

        <Route exact path="/channels/:serverId(\d+)/:inviteToken" component={HomePage}/>

        <Route exact path="/channels/:serverId(\d+)" component={ServerPage}/>

        <Route exact path="/channels/@me" component={HomePage}/>

        <Route exact strict path="/channels/">
          <Redirect to="/channels/@me" />
        </Route>

        <Route exact path="/login" component={LoginFormPage}/>

        <Route exact path="/register" component={SignupFormPage}/>

        <Route exact path="/" component={SplashPage}/>
        <Route component={ErrorPage}/>
      </Switch>
    </>
  );
}

export default App;