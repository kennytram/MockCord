import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { getServer, fetchServer } from '../../store/servers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '../../context/Modal';
import ServerEdit from '../ServerEditModal/ServerEdit';
import ChannelForm from '../ChannelFormModal/ChannelForm';
import UserPanel from '../UserPanel/UserPanel';
import ChannelDelete from '../ChannelDeleteModal/ChannelDelete';
import ChannelUpdate from '../ChannelUpdateModal/ChannelUpdate';
import './ChannelBar.css';

function ChannelBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname;
    const { serverId, channelId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);
    // const dms = useSelector(getDirectMessages);
    const users = useSelector(state => state.users);
    // const dmSetUsers = useSelector(state => state.dms.users);

    const [loaded, setLoaded] = useState(false);
    const [showEditServerModal, setEditServerModal] = useState(false);
    const [showCreateChannelModal, setCreateChannelModal] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
    const [showUpdateChannelModal, setShowUpdateChannelModal] = useState(false);
    const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
    const [editChannel, setEditChannel] = useState(null);

    const leaveSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"></path></svg>

    
    useEffect(() => {
        Promise.all(
            [dispatch(fetchServer(serverId))]
        ).then(() => setLoaded(true));
    }, [dispatch, serverId]);

    const handleMouseOver = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({ left: 225, top: top - 42 });
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleScroll = () => {
        setShowTooltip(false);
    };

    return (
        <div className="channel-bar">
            <nav id="left-navbar">
                <div id="left-navbar-header">
                    <div id="left-navbar-header-box">
                        <div className="server-name-header">{server ? `${server.name}` : 'Placeholder Name'}</div>
                        <ExpandMoreIcon onClick={() => {
                            document.body.style.overflow = 'hidden';
                            setEditServerModal(true);
                        }
                        } />{showEditServerModal && (
                            <Modal onClose={() => setEditServerModal(false)} className="edit-server">
                                <ServerEdit onClose={() => setEditServerModal(false)} />
                            </Modal>
                        )}
                    </div>
                </div>
                <ul id="channel-categories" onScroll={handleScroll}>
                    <li key="first-category">
                        <div>
                            <ExpandMoreIcon fontSize="4px" className="down-category-symbol" />
                            TEXT CHANNELS
                        </div>
                        <div className="add-symbol"
                            onClick={() => {
                                document.body.style.overflow = 'hidden';
                                setCreateChannelModal(true);
                            }} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                            +
                        </div>

                        {showCreateChannelModal && (
                            <Modal onClose={() => {
                                setCreateChannelModal(false);
                                document.body.style.overflow = 'visible';
                            }} className="create-server">
                                <ChannelForm onClose={() => {
                                    setCreateChannelModal(false);
                                    document.body.style.overflow = 'visible';
                                }} />
                            </Modal>
                        )}
                        {showTooltip && (
                            <div className="add-channel-symbol-tooltip" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                                <div className="tooltip-text">
                                    Create Channel
                                </div>
                            </div>
                        )}
                    </li>
                    <ul id="channels" >
                        {server && server.channels ? Object.values(server.channels).map(channel => (

                            <NavLink key={channel.id} className="channel-navlink" to={`/servers/${serverId}/channels/${channel.id}`}>
                                <div className="channel-wrapper">
                                    <li >
                                        <div className="channel-item">
                                            <NumbersIcon className="tag-icon" />&nbsp; <div>
                                                <div className="channel">{channel.name}</div>
                                            </div>
                                        </div>
                                        <div className="channel-edit-delete">
                                            <div className="channel-edit" >
                                                <EditIcon onClick={() => {
                                                    setEditChannel(channel);
                                                    setShowUpdateChannelModal(true);
                                                }} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
                                                {showUpdateChannelModal && editChannel === channel && (
                                                    <Modal onClose={() => setShowUpdateChannelModal(false)} className="create-server">
                                                        <ChannelUpdate onClose={() => setShowUpdateChannelModal(false)} />
                                                    </Modal>
                                                )}
                                                {showTooltip && (
                                                    <div className="add-channel-symbol-tooltip" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                                                        <div className="tooltip-text">
                                                            Edit Channel
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {channel.id !== server.defaultChannel ? (
                                            <div className="channel-delete" >
                                                <CloseIcon onClick={() => {
                                                    setEditChannel(channel);
                                                    setShowDeleteChannelModal(true);
                                                }} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
                                                {showDeleteChannelModal && editChannel === channel && (
                                                    <Modal onClose={() => setShowDeleteChannelModal(false)} className="create-server">
                                                        <ChannelDelete onClose={() => setShowDeleteChannelModal(false)} />
                                                    </Modal>
                                                )}
                                                {showTooltip && (
                                                    <div className="add-channel-symbol-tooltip" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                                                        <div className="tooltip-text">
                                                            Delete Channel
                                                        </div>
                                                    </div>
                                                )} 
                                            </div>) : <><div className='channel-delete'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></>}
                                        </div>
                                    </li>
                                </div>
                            </NavLink>
                        )) : null}
                    </ul>
                </ul>
            </nav>
            <UserPanel />
        </div >
    )
}

export default ChannelBar;