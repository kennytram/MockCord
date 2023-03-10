import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import { getServer, fetchServer } from '../../store/servers';
import { fetchChannel, getChannel, getChannels, resetChannels } from '../../store/channels';
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
import DeleteForever from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import ChannelEdit from '../ChannelEditModal/ChannelEdit';
import ChannelUpdate from '../ChannelUpdateModal/ChannelUpdate';
import ChannelDelete from '../ChannelDeleteModal/ChannelDelete';
import { getDirectMessage } from '../../store/dms';

export default function TopBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const url = location.pathname;
    const { serverId, channelId, dmId } = useParams();
    const server = useSelector(getServer(serverId));
    const channels = useSelector(getChannels);
    const sessionUser = useSelector(state => state.session.user);

    const channel = useSelector(getChannel(channelId));
    const dm = useSelector(getDirectMessage(dmId));
    const [showUpdateChannelModal, setUpdateChannelModal] = useState(false);
    const [showDeleteChannelModal, setDeleteChannelModal] = useState(false);

    const users = useSelector(state => state.users);



    if (!sessionUser) return <Redirect to="/login" />;
    if (!url.includes('/servers')
        && !url.includes('/guild-discovery')
        && !url.includes('/store')) return null;




    if (!isNaN(serverId)) {
        return (
            <div className="top-bar">

                <ul className="top-left-side">
                    <li>
                        <div className="top-main-header">

                            <NumbersIcon className="top-main-icon" />
                            { }
                            {channel ? channel.name : "general"}
                        </div>
                    </li>
                </ul>
                <ul className="top-right-side channel-tools">
                    <li><EditIcon onClick={channelId ?
                        () => {
                            document.body.style.overflow = 'hidden';
                            setUpdateChannelModal(true);
                        } : null} />{showUpdateChannelModal && (
                            <Modal onClose={() => setUpdateChannelModal(false)} className="create-server">
                                <ChannelUpdate onClose={() => setUpdateChannelModal(false)} />
                            </Modal>
                        )}</li>

                    <li><DeleteForever onClick={channelId ?
                        () => {
                            document.body.style.overflow = 'hidden';
                            setDeleteChannelModal(true);
                        } : null} />{showDeleteChannelModal && (
                            <Modal onClose={() => setDeleteChannelModal(false)} className="create-server">
                                <ChannelDelete onClose={() => setDeleteChannelModal(false)} />
                            </Modal>
                        )}</li>

                    <li><NotificationsIcon /></li>
                    <li><PushPinIcon sx={{ rotate: '45deg', translate: '0 3px' }} /></li>
                    <li><PeopleAltIcon /></li>
                    <li>
                        <input className="searchbar-mini" type="text" disabled value="Search" />
                    </li>
                    <li><InboxIcon /></li>
                    <li><HelpIcon /></li>
                </ul>
            </div>
        );
    }


    else if (dmId) {
        return (
            <div className="top-bar">
                <ul className="top-left-side">
                    <li>
                        <div className="top-main-header">
                            <AlternateEmailIcon className="top-main-icon email" />
                            { }
                            {dm ? users[dm.otherUserId] ? users[dm.otherUserId].username : "User" : "User"}
                        </div>
                    </li>
                    <li className="top-bar-divider" />
                </ul>
                <ul className="top-right-side tooltips">
                    <li><PhoneInTalkIcon /></li>
                    <li><VideocamIcon /></li>
                    <li><PushPinIcon sx={{ rotate: '45deg', translate: '0 3px' }} /></li>
                    <li><PersonAddAlt1Icon /></li>
                    <li><AccountCircleIcon /></li>
                    <li>
                        <input className="searchbar-mini" type="text" disabled value="Search" />
                    </li>
                    <li><InboxIcon /></li>
                    <li><HelpIcon /></li>
                </ul>
            </div>
        )
    }

    else return null;
}