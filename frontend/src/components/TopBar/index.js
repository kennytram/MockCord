import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { getServer } from '../../store/servers';
import './TopBar.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import VideocamIcon from '@mui/icons-material/Videocam';
import PushPinIcon from '@mui/icons-material/PushPin';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NumbersIcon from '@mui/icons-material/Numbers';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';

export default function TopBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname;
    const { serverId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {

    },[dispatch, sessionUser, serverId]);

    if(!sessionUser) return <Redirect to="/login" />;

    if (!url.includes('/channels')
    && !url.includes('/guild-discovery')
    && !url.includes('/store')) return null;
    

    if(!isNaN(serverId)) {
        return (
            <div className="top-bar">
                <ul className = "top-left-side">
                    <li>
                        <div className= "top-main-header">
                            <NumbersIcon className="top-main-icon"/>
                            Channel
                        </div>
                    </li>
                </ul>
                <ul className ="top-right-side channel-tools">
                    <li><EditIcon/></li>
                    <li><NotificationsIcon/></li>
                    <li><PushPinIcon sx={{rotate: '45deg', translate: '0 3px'}}/></li>
                    <li><PeopleAltIcon/></li>
                    <li>
                        <input className="searchbar-mini" type="text" disabled value="Search"/>
                    </li>
                    <li><InboxIcon/></li>
                    <li><HelpIcon/></li>
                </ul>
            </div>
        );
    }
    else if(serverId === "@me") {
        return (
        <div className="top-bar">
            <ul className = "top-left-side">
                <li>
                    <div className= "top-main-header">
                        <PeopleAltIcon className="top-main-icon"/>
                        Friends
                    </div>
                </li>
                <li className = "top-bar-divider"/>
                <ul className ="top-left-interactions">
                    <li>Online</li>
                    <li>All</li>
                    <li>Pending</li>
                    <li>Blocked</li>
                    <li id="add_friend_button">Add Friend</li>
                </ul>
                
            </ul>
            <ul className ="top-right-side">
                <li><ChatBubbleIcon/></li>
                <li className = "top-bar-divider"/>
                <li><InboxIcon/></li>
                <li><HelpIcon/></li>
            </ul>
        </div>
        )
    }
    else if(serverId === "test") {
        return (
            <div className="top-bar">
                <ul className = "top-left-side">
                    <li>
                        <div className= "top-main-header">
                            <AlternateEmailIcon className="top-main-icon email"/>
                            User
                        </div>
                    </li>
                    <li className = "top-bar-divider"/>
                </ul>
                <ul className ="top-right-side tooltips">
                    <li><PhoneInTalkIcon/></li>
                    <li><VideocamIcon/></li>
                    <li><PushPinIcon sx={{rotate: '45deg', translate: '0 3px'}}/></li>
                    <li><PersonAddAlt1Icon/></li>
                    <li><AccountCircleIcon/></li>
                    <li>
                        <input className="searchbar-mini" type="text" disabled value="Search"/>
                    </li>
                    <li><InboxIcon/></li>
                    <li><HelpIcon/></li>
                </ul>
            </div>
        )
    }

    else return null;
}