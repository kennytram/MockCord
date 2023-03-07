import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import LeftSideBar from "./components/LeftSideBar";
import NavBar from "./components/NavBar";
import UserPanel from "./components/UserPanel";
import TopBar from "./components/TopBar";
import ContentPage from "./components/ContentPage";

function App() {
  const location = useLocation();
  const url = location.pathname;
  return (
    <>
      <Route path ="/channels/:serverId/:id" >
        {/*Show the DMShowPage or ChannelShowPage */} 
        {/* {url.includes("@me") ? <HomePage /> : <ServerShowPage/>} */}
      </Route>

      <Route path ={["/channels/:serverId", 
      "/guild-discovery", "/store"]}>
        <NavBar/>
        <LeftSideBar/>
        <UserPanel/>
        
        {url !== "/channels/@me" ? <TopBar/> : null}
        <ContentPage/>
      </Route>
      
      <Route exact strict path = "/channels/">
        <Redirect to="/channels/@me"/>
      </Route>
        
      <Route path="/login">
        <LoginFormPage />
      </Route>

      <Route path="/register">
        <SignupFormPage />
      </Route>

      <Route exact path ="/" >
        <SplashPage />
      </Route>
    </>
  );
}

export default App;