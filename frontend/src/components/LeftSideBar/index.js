import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { getChannels, resetChannels } from '../../store/channels';
import { getServer, fetchServer } from '../../store/servers';
import './LeftSideBar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditIcon from '@mui/icons-material/Edit';

export default function LeftSideBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = location.pathname;
  const { serverId } = useParams();
  const server = useSelector(getServer(serverId));
  const sessionUser = useSelector(state => state.session.user);
  const channels = useSelector(getChannels);
  console.log(url);
  //do modal here
  
  // var browser = require("webextension-polyfill");
  useEffect(() => {
    if(serverId) {
      dispatch(resetChannels());
      if(!isNaN(serverId)) {
        dispatch(fetchServer(serverId));
      }
      else if(serverId === "@me") {
        //render friends here
      }
      // dispatch(fetchChannels()); dont even need this
    }
  }, [dispatch, sessionUser, serverId]);

  if(!sessionUser) return <Redirect to="/login" />;
  if (!url.includes('/channels')
    && !url.includes('/guild-discovery')
    && !url.includes('/store')) return null;
  
  if(!isNaN(serverId)) {
    return (
      <nav id="left-navbar">
        <div id="left-navbar-header">
          <div id="left-navbar-header-box">
            {server ? `${server.name}` : 'Placeholder Name'}
            <EditIcon/>
          </div>
        </div>
        <ul id="channel-categories">
         <li key="first-category">
           <div>
              <ExpandMoreIcon fontSize="4px" className="down-category-symbol"/>
               TEXT CHANNELS
            </div>
            <span className="add-symbol">+</span>
          </li>
          <ul id="channels">
            {channels.map(channel => (
            <NavLink className="channel-navlink" to={`/channels/${serverId}/${channel.id}`}>
              <div className="channel-wrapper">
                  <li key={channel.id}>
                  <NumbersIcon className="tag-icon"/>&nbsp; <span>
                      <div className="channel">{channel.name}</div>
                    </span>
                  </li>
              </div>
            </NavLink>
            ))}
          </ul>
        </ul>
      </nav>
    )
  }
  else if(serverId === "@me") {
    return (
      <nav id="left-navbar">
        <div id="left-navbar-header-alt">
          <div id="left-navbar-header-box-alt">
            <button className="searchbar">
              <div id="conversation-text">Find or start a conversation</div>
            </button>
          </div>
        </div>
        <ul id="dm-header-sections">
          <li className="dm-header-section">
            <div className = "header-section-box">
              <PeopleAltIcon/>
              <div className="header-name">Friends</div>
            </div>
          </li>

          <li className="dm-header-section">
            <div className = "header-section-box">
              <div id="nitro-box">
                <CatchingPokemonIcon sx={{rotate:'180deg'}}className="nitro"/>
                <div className="header-name">Nitro</div>
              </div>
            </div>
          </li>
          
        </ul>

        <div id="dm-box">
          <div id="dm-title">
            DIRECT MESSAGES
          </div>
          <div className="add-symbol">+</div>
        </div>

        <ul id="direct-messages">
          <li className="dm">
            <div className="dm-wrapper">
              <div className="dm-user-info">
                <div className="user-icon dm-user-icon">
                  <div className="material-icons icon" style={{color: "white", fontSize: 22.5}}>discord</div>
                </div>
                <div id="user-panel-info">
                Leviathan
                </div>
              </div>
              <CloseIcon className="dm-exit"/>
            </div>
          </li>

          <li className="dm">
            <div className="dm-wrapper">
              <div className="dm-user-info">
                <div className="user-icon dm-user-icon">
                  <div className="material-icons icon" style={{color: "white", fontSize: 22.5}}>discord</div>
                </div>
                <div id="user-panel-info">
                  User2
                </div>
              </div>
              <CloseIcon className="dm-exit"/>
            </div>
          </li>

        </ul>
      </nav>
    )
    
  }
  else return <nav id="left-navbar"/>;
}