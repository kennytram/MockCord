import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import PushPinIcon from '@mui/icons-material/PushPin';
import NumbersIcon from '@mui/icons-material/Numbers';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import ChannelUpdate from '../ChannelUpdateModal/ChannelUpdate';
import ChannelDelete from '../ChannelDeleteModal/ChannelDelete';
import { getServer, fetchServer } from '../../store/servers';
import { fetchChannel } from '../../store/channels';
import './ServerToolBar.css'

function ServerToolBar({refreshState}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const url = location.pathname;
    const { serverId, channelId } = useParams();
    const server = useSelector(getServer(serverId));
    const dataServerName = useState[server?.name];
    const sessionUser = useSelector(state => state.session.user);

    const users = useSelector(state => state.users);

    useEffect(() => {}, [dispatch, channelId, serverId, refreshState]);
    
    if(!channelId) return null;
    return (
        <div className="top-bar">

            <ul className="top-left-side">
                <li>
                    <div className="top-main-header">
                        <NumbersIcon className="top-main-icon" />
                        {server && Object.keys(server?.channels).length > 0 && channelId && server.channels[channelId]?.name ? server?.channels[channelId].name : "general"}
                    </div>
                </li>
            </ul>
            {/* <ul className="top-right-side channel-tools">
                <li><NotificationsIcon /></li>
                <li><PushPinIcon sx={{ rotate: '45deg', translate: '0 3px' }} /></li>
                <li><PeopleAltIcon /></li>
                <li>
                    <input className="searchbar-mini" type="text" disabled value="Search" />
                </li>
                <li><InboxIcon /></li>
                <li><HelpIcon /></li>
            </ul> */}
        </div>
    );
}

export default ServerToolBar;