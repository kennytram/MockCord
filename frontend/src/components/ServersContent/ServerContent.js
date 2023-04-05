import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import { fetchMessages, createMessage, getMessages, updateMessage } from '../../store/messages';
import { getServer } from '../../store/servers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import MessageDelete from '../MessageDeleteModal/MessageDelete';
import { getUsers, resetUsers } from '../../store/users';
import './ServerContent.css';

function ServerContent() {
    const dispatch = useDispatch();
    const chatMessagesRef = useRef(null);
    const { serverId, channelId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);
    const addFriendRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const users = useSelector(getUsers);
    const [text, setText] = useState("");
    const messages = useSelector(getMessages);

    const [showEditForm, setShowEditForm] = useState(false)
    const [editMessage, setEditMessage] = useState(null);
    const [editMessageText, setEditMessageText] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMessageId, setDeleteMessageId] = useState(null);

    useEffect(() => {
        if(channelId) dispatch(fetchMessages(channelId));
        if (chatMessagesRef) chatMessagesRef.scrollTop = chatMessagesRef.scrollHeight;
    }, [dispatch, channelId]);

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

    const handleShowDeleteModal = (messageId) => {
        setDeleteMessageId(messageId);
        setShowDeleteModal(true);
    };

    // const [otherUser, setOtherUser] = useState(null);
    // const [otherUserId, setOtherUserId] = useState("");
    // const [addButton, showAddButton] = useState(false);
    // const handleShowAdd = (otherUser) => {
    //     if (sessionUser !== otherUser) {
    //         setOtherUserId(otherUser.id);
    //         setOtherUser(otherUser);
    //         if (dms.every(dm => dm.otherUserId !== otherUser.id)) {
    //             showAddButton(true);
    //         }
    //         else {
    //             console.log(otherUser);
    //             setOtherUserId("");
    //             setOtherUser(null);
    //             showAddButton(false);
    //         }
    //     }
    //     else {
    //         setOtherUserId("");
    //         setOtherUser(null);
    //         showAddButton(false);
    //     }
    // }

    // const handleAddConversation = (e) => {
    //     e.preventDefault();
    //     setErrors([]);
    //     const dm = {
    //         name: "dm",
    //         otherUserId: otherUserId,
    //         userId: sessionUser.id
    //     }
    //     return dispatch(createDirectMessage(dm))
    //         .catch(async (res) => {
    //             let data;
    //             try {
    //                 data = await res.clone().json();
    //             } catch {
    //                 data = await res.text();
    //             }
    //             if (data?.errors) setErrors(data.errors);
    //             else if (data) setErrors([data]);
    //             else setErrors([res.statusText]);
    //         });
    // };

    const displayModal = (e) => {
        const modal = e.currentTarget.querySelector('.modal-container');
        modal.classList.add('show');
    };

    const hideModal = (e) => {
        const modal = e.currentTarget.querySelector('.modal-container');
        modal.classList.remove('show');
    };

    if (!channelId) {
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
        )
    }
    else {
        return (
            <div className="content">
                <div className="message-show-container" >
                    <ul className="messages" ref={chatMessagesRef}>
                        <li className="welcome-channel">
                            <div className="welcome-channel-wrapper">
                                <div className="welcome-channel-heading">Welcome to <br />{server && server?.channels ? server?.channels[channelId].name : "general"}</div>
                                <div className="welcome-channel-desc">This is the beginning of this server.</div>
                            </div>
                        </li>

                        <li className="timeline-dividier">
                            <span>Chatting in Real-time!</span>
                        </li>

                        {messages.map(message => (
                            <li className={showEditForm && editMessage === message ?
                                "message editing" : "message"} key={message.id}
                                onMouseEnter={showEditForm && editMessage === message ? null : displayModal}
                                onMouseLeave={showEditForm && editMessage === message ? null : hideModal}>
                                <div className="message-header">
                                    <div className="message-user-icon" style={{ backgroundColor: `${colorById(message.authorId)}` }}>
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
                {/* <div className="members-container">
                    <div className="members-wrapper">
                        <ul className="members">
                            <li className="online-category">
                                All Members - {Object.values(members).length}
                            </li>

                            {members.map(member => (
                                <li className="member-container" onClick={
                                    sessionUser.id !== member.id ?
                                        () => {
                                            handleShowAdd(member);
                                        } : null}>
                                    <div className="member-layout">
                                        <div className="user-icon" style={{ backgroundColor: `${colorById(member.id)}` }}>
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
                </div> */}
            </div>
        )
    }

}

export default ServerContent;