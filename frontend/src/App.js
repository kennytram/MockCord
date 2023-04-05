import React, { useState } from "react";
import { Route, Redirect, useLocation, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginForm";
import SignupFormPage from "./components/SignupFormPage/SignUpForm";
import SplashPage from "./components/SplashPage";
import LeftSideBar from "./components/LeftSideBar";
import NavBar from "./components/NavBar/NavBar";
import UserPanel from "./components/UserPanel/UserPanel";
import TopBar from "./components/TopBar";
import ContentPage from "./components/ContentPage";
import { Modal } from "./context/Modal";
import ServerForm from "./components/ServerFormModal/ServerForm";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";
import ServerPage from "./components/ServerPage/ServerPage";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = location.pathname;
  const [showServerModal, setShowServerModal] = useState(false);


  return (
    <>
      <Switch>
        {/* <Route exact path="/servers/@me/dms/:dmId" >
          <NavBar />
          <LeftSideBar />
          <UserPanel />
          <TopBar />
          <ContentPage />
        </Route> */}
        <Route exact path="/servers/:serverId/channels/:channelId" component={ServerPage}>
          {/* <NavBar />
          <LeftSideBar />
          <UserPanel />
          <TopBar />
          <ContentPage /> */}
        </Route>

        <Route exact path="/servers/:serverId/invite/:inviteToken" component={HomePage}>
          {/* <Redirect to="/servers/@me" /> */}
        </Route>

        <Route exact path="/servers/:serverId" component={HomePage}/>

        <Route exact strict path="/servers/">
          <Redirect to="/servers/@me" />
        </Route>

        <Route path="/login" component={LoginFormPage}/>

        <Route path="/register" component={SignupFormPage}/>

        <Route exact path="/" component={SplashPage}/>
        <Route component={ErrorPage}/>
      </Switch>
    </>
  );
}

export default App;