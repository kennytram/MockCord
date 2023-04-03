import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import { fetchMessages, createMessage, getMessages, updateMessage } from '../../store/messages';
import { getServer } from '../../store/servers';
import { getChannel, fetchChannels, fetchChannel, resetChannels } from '../../store/channels';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import ExploreIcon from "@mui/icons-material/Explore";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import MessageDelete from '../MessageDeleteModal/MessageDelete';
import { getUsers, resetUsers } from '../../store/users';
import './HomePage.css';
import {
    createDirectMessage, fetchDirectMessages, fetchDirectMessage,
    getDirectMessage, getDirectMessages
} from '../../store/dms';
import NavBar from '../NavBar/NavBar';
import { fetchUsers } from '../../store/users';
import { fetchServers } from '../../store/servers';

function HomePage() {
    const dispatch = useDispatch();
    const [buttonStates, setButtonStates] = useState([false, false,
        false, false, true]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        Promise.all([
            dispatch(fetchUsers()),
        ]).then(() => setLoaded(true));
    }, [dispatch]);
    return (
        <div className="home-page">
            <NavBar />
            
        </div>
    )
}

export default HomePage;