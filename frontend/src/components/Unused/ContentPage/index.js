import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import { fetchMessages, createMessage, getMessages, updateMessage } from '../../../store/messages';
import { getServer } from '../../../store/servers';
import { getChannel, fetchChannels, fetchChannel, resetChannels } from '../../../store/channels';
// import './ContentPage.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import ExploreIcon from "@mui/icons-material/Explore";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../../context/Modal';
import MessageDelete from '../../MessageDeleteModal/MessageDelete';
import { getUsers, resetUsers } from '../../../store/users';
import {
    createDirectMessage, fetchDirectMessages, fetchDirectMessage,
    getDirectMessage, getDirectMessages
} from '../../../store/dms';

export default function ContentPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const chatMessagesRef = useRef(null);
    const { serverId, channelId, dmId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);
    const addFriendRef = useRef(null);
    const [buttonStates, setButtonStates] = useState([false, false,
        false, false, true]);
    const [errors, setErrors] = useState([]);
    const members = useSelector(getUsers);
    const dms = useSelector(getDirectMessages);
    const dm = useSelector(getDirectMessage(dmId));
    const channel = useSelector(getChannel(channelId));
    const [text, setText] = useState("");
    const [showEditor, setShowEditor] = useState(false);
    const messages = useSelector(getMessages);
    const users = useSelector(state => state.users);
    const dmSetUsers = useSelector(state => state.dms.users)

    const colors = {
        brand: "#5865F2",
        grey: "rgb(116, 124, 139)",
        green: "rgb(61, 164, 92)",
        yellow: "rgb(252, 163, 29)",
        red: "rgb(237, 69, 69)",
    }

   function colorById(id) {
        const num = id % 10;
        switch (num) {
            case 0:
            case 5:
                return colors.brand;
            case 1:
            case 6:
                return colors.grey;
            case 2:
            case 7:
                return colors.green;
            case 3:
            case 8:
                return colors.yellow;
            case 4:
            case 9:
                return colors.red;
            default:
                return colors.brand;
        }
    }

    useEffect(() => {
        if (dmId) {
            // dispatch(resetUsers());
            // dispatch(resetChannels());
            dispatch(fetchDirectMessage(dmId));
        }
        if (channelId) {
            // dispatch(resetUsers());
            // dispatch(resetChannels());
            dispatch(fetchChannel(channelId));
        }
        if (chatMessagesRef) chatMessagesRef.scrollTop = chatMessagesRef.scrollHeight;
    }, [dispatch, sessionUser, serverId, channelId, dmId])

    const handleTime = (time) => {
        const date = new Date(time);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year} 
        ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`;
        return formattedDate;
    }


    const handleCreateTimeDivider = (time) => {
        const createdAt = new Date(time);
        const currentDate = new Date();
        const createdAtYear = createdAt.getFullYear();
        const createdAtMonth = createdAt.getMonth();
        const createdAtDay = createdAt.getDate();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        if (createdAtYear === currentYear && createdAtMonth === currentMonth && createdAtDay === currentDay) {
            return false;
        }
        return true;
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const msgId = channelId;
        const message = {
            text: text,
            messageableId: msgId,
            messageableType: "Channel"
        }
        setText("");
        return dispatch(createMessage(message)).then(() => {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        })
            .catch(async (res) => {
                let data;
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

    const handleDMSubmit = (e) => {
        e.preventDefault();
        const msgId = dmId;
        const message = {
            text: text,
            messageableId: msgId,
            messageableType: "DirectMessage"
        }
        setText("");
        return dispatch(createMessage(message)).then(() => {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        })
            .catch(async (res) => {
                let data;
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


    const [showEditForm, setShowEditForm] = useState(false)
    const [editMessage, setEditMessage] = useState(null);
    const [editMessageText, setEditMessageText] = useState("");
    const handleShowEditForm = (message) => {
        setEditMessage(message);
        setEditMessageText(message.text);
        setShowEditForm(true);
    };

    const handleEditClose = (e) => {
        if (e.keyCode === 27) {
            setShowEditForm(false);
            setEditMessage(null);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        editMessage.text = editMessageText;
        return dispatch(updateMessage(editMessage))
            .catch(async (res) => {
                let data;
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


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMessageId, setDeleteMessageId] = useState(null);
    const handleShowDeleteModal = (messageId) => {
        setDeleteMessageId(messageId);
        setShowDeleteModal(true);
    };


    const [otherUser, setOtherUser] = useState(null);
    const [otherUserId, setOtherUserId] = useState("");
    const [addButton, showAddButton] = useState(false);
    const handleShowAdd = (otherUser) => {
        if (sessionUser !== otherUser) {
            setOtherUserId(otherUser.id);
            setOtherUser(otherUser);
            if (dms.every(dm => dm.otherUserId !== otherUser.id)) {
                showAddButton(true);
            }
            else {
                setOtherUserId("");
                setOtherUser(null);
                showAddButton(false);
            }
        }
        else {
            setOtherUserId("");
            setOtherUser(null);
            showAddButton(false);
        }
    }

    const handleAddConversation = (e) => {
        e.preventDefault();
        setErrors([]);
        const dm = {
            name: "dm",
            otherUserId: otherUserId,
            userId: sessionUser.id
        }
        return dispatch(createDirectMessage(dm))
            .catch(async (res) => {
                let data;
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

    const displayModal = (e) => {
        const modal = e.currentTarget.querySelector('.modal-container');
        modal.classList.add('show');
    };

    const hideModal = (e) => {
        const modal = e.currentTarget.querySelector('.modal-container');
        modal.classList.remove('show');
    };

    if (!sessionUser) return <Redirect to="/login" />;

    const handleButtonClick = (e, index) => {
        const newButtonStates = buttonStates.map((buttonState, i) => i === index);
        setButtonStates(newButtonStates);
        if (index === 4) addFriendRef.current.classList.add('active');
        else addFriendRef.current.classList.remove('active');
    };

    if (!isNaN(serverId) && server && !channelId) {
        return (
            <div className="content-error">
                <div className="text-channel-svg" />
                <div className="text-channel-desc">
                    <div className="no-text-channel-here">
                        NO TEXT CHANNEL HERE
                    </div>
                    <div className="no-text-channel-desc">
                        You find yourself in a strange place. There is no text channel at this location <br />
                        Or maybe there are none in this server.
                    </div>
                </div>
            </div>


        );
    }

    else
        if (!isNaN(serverId) && server) {
            return (
                <div className="content">
                    <div className="message-show-container" >
                        <ul className="messages" ref={chatMessagesRef}>
                            <li className="welcome-channel">
                                <div className="welcome-channel-wrapper">
                                    <div className="welcome-channel-heading">Welcome to <br />{channel ? channel.name : "general"}</div>
                                    <div className="welcome-channel-desc">This is the beginning of this server.</div>
                                </div>
                            </li>

                            <li className="timeline-dividier">
                                <span>February 29, 9004</span>
                            </li>

                            {messages.map(message => (
                                <li className={showEditForm && editMessage === message ?
                                    "message editing" : "message"} key={message.id}
                                    onMouseEnter={showEditForm && editMessage === message ? null : displayModal}
                                    onMouseLeave={showEditForm && editMessage === message ? null : hideModal}>
                                    <div className="message-header">
                                        <div className="message-user-icon" style={{backgroundColor: `${colorById(message.authorId)}`}}>
                                            <span className="material-icons user-icon messenger-icon" style={{ color: "white", fontSize: 30 }}>discord</span>
                                        </div>
                                        <div className="message-topping">
                                            <span className="message-username">
                                                {message && Object.keys(users).length 
                                                && message.authorId ? users[message.authorId].username : "User"}
                                            </span>
                                            <span className="message-date">
                                                {handleTime(message.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    {showEditForm && editMessage === message ? (
                                        <form className="edit-message-form" onSubmit={handleEditSubmit}>
                                            <div className="message-editor">
                                                <input className="message-update-input"
                                                    onChange={(e) => setEditMessageText(e.target.value)}
                                                    onKeyDown={handleEditClose}
                                                    value={editMessageText}>

                                                </input>
                                                <div className="message-editor-tooltip">
                                                    escape to <span className="fake-light-blue-links"
                                                        onClick={() => {
                                                            setEditMessageText(message.text);
                                                            setShowEditForm(false);
                                                            setEditMessage(null);
                                                        }}> cancel </span> • enter to
                                                    <span className="fake-light-blue-links" onClick={handleEditSubmit}> save</span>
                                                </div>
                                            </div></form>) : (
                                        <><div className="message-content">
                                            {message.text}
                                        </div><div className="modal-container">
                                                <div className="message-edit-form">
                                                    <div className="edit-button-message" onClick={() => handleShowEditForm(message)}>
                                                        <EditIcon />
                                                    </div>
                                                    <div className="edit-button-message" onClick={() => handleShowDeleteModal(message.id)}>
                                                        <DeleteForeverIcon />
                                                    </div>{showDeleteModal && (
                                                        <Modal onClose={() => setShowDeleteModal(false)} className="create-server">
                                                            <MessageDelete messageId={deleteMessageId} onClose={() => setShowDeleteModal(false)} />
                                                        </Modal>
                                                    )}
                                                </div>
                                            </div></>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <form className="message-input-form" onSubmit={handleMessageSubmit}>
                            <input className="message-input" type="text" value={text}
                                onChange={(e) => setText(e.target.value)} placeholder="Message here" />
                        </form>
                    </div>
                    <div className="members-container">
                        <div className="members-wrapper">
                            <ul className="members">
                                <li className="online-category">
                                    ONLINE - {Object.values(members).length}
                                </li>

                                {members.map(member => (
                                    <li className="member-container" onClick={
                                        sessionUser.id !== member.id ?
                                            () => {
                                                handleShowAdd(member);
                                            } : null}>
                                        <div className="member-layout">
                                            <div className="user-icon" style={{backgroundColor: `${colorById(member.id)}`}}>
                                                <span className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</span>
                                            </div>
                                            &nbsp;&nbsp;&nbsp;{member.username}
                                        </div>
                                        {otherUser === member && otherUserId === member.id && addButton ? (
                                            <div className="add-button-conversation" onClick={handleAddConversation}>
                                                <PersonAddAlt1Icon />
                                            </div>) : null}
                                    </li>
                                ))}


                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        else if (serverId === '@me') {
            return (
                <>
                    <div className="top-bar">
                        <ul className="top-left-side">
                            <li>
                                <div className="top-main-header">
                                    <PeopleAltIcon className="top-main-icon" />
                                    Friends
                                </div>
                            </li>
                            <li className="top-bar-divider" />
                            <ul className="top-left-interactions">
                                <li onClick={(e) => handleButtonClick(e, 0)}>
                                    Online
                                </li>
                                <li onClick={(e) => handleButtonClick(e, 1)}>
                                    All
                                </li>
                                <li onClick={(e) => handleButtonClick(e, 2)}>
                                    Pending
                                </li>
                                <li onClick={(e) => handleButtonClick(e, 3)}>
                                    Blocked
                                </li>
                                <li id="add_friend_button" ref={addFriendRef} onClick={(e) => handleButtonClick(e, 4)}>
                                    Add Friend
                                </li>
                            </ul>
                        </ul>
                        <ul className="top-right-side">
                            <li><ChatBubbleIcon /></li>
                            <li className="top-bar-divider" />
                            <li><InboxIcon /></li>
                            <li><HelpIcon /></li>
                        </ul>
                    </div>
                    <div className="content">
                        {!buttonStates.at(-1) ? (
                            <div className="friends-show-container">
                                <div className="friend-show-box">
                                    {buttonStates.at(0) ? (<>
                                        <div id="online-wumpus-image" />
                                        <div className="wumpus-desc">
                                            No one's around to play with Wumpus.
                                        </div>
                                    </>) : buttonStates.at(1) ? (<>
                                        <div className="all-wumpus-image" />
                                        <div className="wumpus-desc">
                                            Wumpus is waiting on friends. You don't have to though!

                                        </div>

                                        <div id="wumpus-button"><button onClick={(e) => handleButtonClick(e, 4)} className='brand-button'>Add Friend</button></div>
                                    </>) : buttonStates.at(2) ? (<>
                                        <div id="pending-wumpus-image" />
                                        <div className="wumpus-desc">
                                            There are no pending friend requests. Here's Wumpus for now.
                                        </div>
                                    </>) : (<>
                                        <div id="blocked-wumpus-image" />
                                        <div className="wumpus-desc">
                                            You can't unblock the Wumpus.
                                        </div>
                                    </>)}
                                </div>
                            </div>
                        ) : (<><div id="add-friend-container"><div id="add-friend-header">
                            <div id="add-friend-title">ADD FRIEND</div>
                            <div className="add-friend-input">
                                <div id="add-friend-desc">You can add a friend with their username. It's cAsE sEnSitIvE!</div>
                                <input className="searchbar friend" type="text" disabled value="Enter a Username" />
                            </div>
                        </div>
                            <div id="other-places-header">
                                OTHER PLACES TO MAKE FRIENDS
                            </div>
                            <div className="explore-box">
                                <button className="explore-button">
                                    <div id="left-explore-buttonside"><ExploreIcon className="public-server-friend-icon" /><span>
                                        &nbsp;&nbsp;Explore Public Servers</span></div>
                                    <div></div>
                                    <div id="right-explore-buttonside"><KeyboardArrowRightIcon /></div>
                                </button>
                            </div>
                            <div id="add-friend-wumpus">
                                <div className="all-wumpus-image" />
                                <div className="wumpus-desc">
                                    Wumpus is waiting on friends. You don't have to though!
                                </div></div>
                        </div></>)}
                        <div className="activity-bar">
                            <div className="activity-bar-container">
                                <div className="activity-bar-wrapper">
                                    <div className="activity-heading">
                                        Active Now</div>
                                    <div id="activity-lonely">
                                        <div className="activity-heading">
                                            It's quiet for now...
                                        </div>
                                        <div id="activity-desc">
                                            When a friend starts an activity-like playing a game or
                                            <br /> hanging out on voice-we'll show it here!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        else if (dmId) {
            return (
                <>
                    <div className="content">
                        <div className="message-show-container" >
                            <ul className="messages" ref={chatMessagesRef}>
                                <li className="welcome-dm">
                                    <span className="material-icons user-icon profile-icon" style={{ color: "white", fontSize: 60 }}>discord</span>
                                    <div className="welcome-dm-wrapper">
                                        <div className="welcome-dm-heading">
                                            {dm && dm.otherUserId && Object.keys(users).length ?
                                                users[dm.otherUserId] ? users[dm.otherUserId].username : "User" : "User"}

                                        </div>
                                        <div className="welcome-dm-desc">
                                            This is the beginning of your direct message history with <span className="highlighted-user">@
                                                {dm && dm.otherUserId && Object.keys(users).length ?
                                                    users[dm.otherUserId] ? users[dm.otherUserId].username : "User" : "User"}
                                            </span>.
                                        </div>
                                    </div>
                                </li>

                                <li className="timeline-dividier server">
                                    <span>February 29, 9004</span>
                                </li>

                                {messages.map(message => (
                                    <li className={showEditForm && editMessage === message ?
                                        "message editing" : "message"} key={message.id}
                                        onMouseEnter={showEditForm && editMessage === message ? null : displayModal}
                                        onMouseLeave={showEditForm && editMessage === message ? null : hideModal}>
                                        <div className="message-header">
                                            <div className="message-user-icon">
                                                <span className="material-icons user-icon messenger-icon" style={{ color: "white", fontSize: 30 }}>discord</span>
                                            </div>
                                            <div className="message-topping">
                                                <span className="message-username">
                                                    {users ? users[message.authorId] ? users[message.authorId].username : "" : ""}
                                                    { }
                                                </span>
                                                <span className="message-date">
                                                    {handleTime(message.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        {showEditForm && editMessage === message ? (
                                            <form className="edit-message-form" onSubmit={handleEditSubmit}>
                                                <div className="message-editor">
                                                    <input className="message-update-input"
                                                        onChange={(e) => setEditMessageText(e.target.value)}
                                                        onKeyDown={handleEditClose}
                                                        value={editMessageText}>

                                                    </input>
                                                    <div className="message-editor-tooltip">
                                                        escape to <span className="fake-light-blue-links"
                                                            onClick={() => {
                                                                setEditMessageText(message.text);
                                                                setShowEditForm(false);
                                                                setEditMessage(null);
                                                            }}> cancel </span> • enter to
                                                        <span className="fake-light-blue-links" onClick={handleEditSubmit}> save</span>
                                                    </div>
                                                </div></form>) : (
                                            <><div className="message-content">
                                                {message.text}
                                            </div><div className="modal-container dm">
                                                    <div className="message-edit-form">
                                                        <div className="edit-button-message" onClick={() => handleShowEditForm(message)}>
                                                            <EditIcon />
                                                        </div>
                                                        <div className="edit-button-message" onClick={() => handleShowDeleteModal(message.id)}>
                                                            <DeleteForeverIcon />
                                                        </div>{showDeleteModal && (
                                                            <Modal onClose={() => setShowDeleteModal(false)} className="create-server">
                                                                <MessageDelete messageId={deleteMessageId} onClose={() => setShowDeleteModal(false)} />
                                                            </Modal>
                                                        )}
                                                    </div>
                                                </div></>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <form className="message-input-form" onSubmit={handleDMSubmit}>
                                <input className="message-input" type="text" value={text}
                                    onChange={(e) => setText(e.target.value)} placeholder="Message here" />
                            </form>
                        </div>
                    </div>
                </>);
        }
        else return <div className="content"></div>
}