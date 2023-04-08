import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import { fetchMessages, createMessage, getMessages, updateMessage, deleteMessage } from '../../store/messages';
import { receiveMessage, removeMessage } from '../../store/messages';
import { fetchChannel } from '../../store/channels';
import { getServer } from '../../store/servers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { Modal } from '../../context/Modal';
import MessageDelete from '../MessageDeleteModal/MessageDelete';
import { getUsers, resetUsers } from '../../store/users';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { getFriendRequests, fetchFriendRequests, createFriendRequest } from '../../store/FriendRequests';
import { kickMemberServer } from '../../store/servers';
import {receiveServerChannel, removeServerChannel} from '../../store/servers';
import {receiveFriendRequest, removeFriendRequest} from '../../store/FriendRequests';
import consumer from '../../consumer';
import './ServerContent.css';

function ServerContent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const chatMessagesRef = useRef(null);
    const { serverId, channelId } = useParams();
    const server = useSelector(getServer(serverId));
    const friendRequests = useSelector(state => state.friendRequests);
    const sessionUser = useSelector(state => state.session.user);
    const addFriendRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const users = useSelector(state => state.users);
    const [text, setText] = useState("");
    const messages = useSelector(getMessages);

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

    const [showEditForm, setShowEditForm] = useState(false)
    const [editMessage, setEditMessage] = useState(null);
    const [editMessageText, setEditMessageText] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMessageId, setDeleteMessageId] = useState(null);

    const [otherUser, setOtherUser] = useState(null);
    const [otherUserId, setOtherUserId] = useState("");
    const [addButton, showAddButton] = useState(false);
    const [kickButton, showKickButton] = useState(false);

    const [rows, setRows] = useState(1);
    const textareaRef = useRef(null);


    const serverOwnerSVG = <svg aria-label="Server Owner" aria-hidden="false" role="img" width="16" height="16" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M13.6572 5.42868C13.8879 5.29002 14.1806 5.30402 14.3973 5.46468C14.6133 5.62602 14.7119 5.90068 14.6473 6.16202L13.3139 11.4954C13.2393 11.7927 12.9726 12.0007 12.6666 12.0007H3.33325C3.02725 12.0007 2.76058 11.792 2.68592 11.4954L1.35258 6.16202C1.28792 5.90068 1.38658 5.62602 1.60258 5.46468C1.81992 5.30468 2.11192 5.29068 2.34325 5.42868L5.13192 7.10202L7.44592 3.63068C7.46173 3.60697 7.48377 3.5913 7.50588 3.57559C7.5192 3.56612 7.53255 3.55663 7.54458 3.54535L6.90258 2.90268C6.77325 2.77335 6.77325 2.56068 6.90258 2.43135L7.76458 1.56935C7.89392 1.44002 8.10658 1.44002 8.23592 1.56935L9.09792 2.43135C9.22725 2.56068 9.22725 2.77335 9.09792 2.90268L8.45592 3.54535C8.46794 3.55686 8.48154 3.56651 8.49516 3.57618C8.51703 3.5917 8.53897 3.60727 8.55458 3.63068L10.8686 7.10202L13.6572 5.42868ZM2.66667 12.6673H13.3333V14.0007H2.66667V12.6673Z" fill="var(--text-warning)" aria-hidden="true"></path></svg>

    useEffect(() => {
        if (channelId) {
            dispatch(fetchChannel(channelId)).then(() => {
                if (chatMessagesRef) chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }).catch(() => { history.push(`/channels/@me`) })

        }
        const messageSubscription = consumer.subscriptions.create(
            { channel: "ChannelsChannel", id: channelId },
            {
                received: (message) => {
                    switch(message.type) {
                        case "RECEIVE_MESSAGE":
                            dispatch(receiveMessage(message));
                            break;
                        case "DELETE_MESSAGE": 
                            dispatch(removeMessage(message.id));
                            break;
                        case "UPDATE_MESSAGE":
                            dispatch(receiveMessage(message));
                            break;
                        default:
                            break;
                    }
                    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
                }
            }
        );

        
        return () => {
            messageSubscription?.unsubscribe();
        }
    }, [dispatch, channelId]);

    useEffect(() => {
        dispatch(fetchFriendRequests());
        
        // const friendRequestsSubscription = consumer.subscriptions.create(
        //     { channel: "FriendRequestsChannel", id: sessionUser.id },
        //     {
        //         received: (friendRequest) => {
        //             switch(friendRequest.type) {
        //                 case "RECEIVE_FRIEND_REQUEST":
        //                     dispatch(receiveFriendRequest(friendRequest));
        //                     break;
        //                 case "DESTROY_FRIEND_REQUEST": 
        //                     dispatch(removeFriendRequest(friendRequest.id));
        //                     break;
        //                 case "UPDATE_FRIEND_REQUEST":
        //                     dispatch(receiveFriendRequest(friendRequest));
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         }
        //     }
        // );

        
        // return () => {
        //     friendRequestsSubscription?.unsubscribe();
        // }

    }, [dispatch])

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
        if(!text) return;
        const msgId = channelId;
        const message = {
            text: text,
            messageableId: msgId,
            messageableType: "Channel"
        }
        setText("");
        setRows(1);
        createMessage(message);
        
        // return dispatch(createMessage(message)).then(() => {
        //     chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        // })
        //     .catch(async (res) => {
        //         let data;
        //         try {
        //             data = await res.clone().json();
        //         } catch {
        //             data = await res.text();
        //         }
        //         if (data?.errors) setErrors(data.errors);
        //         else if (data) setErrors([data]);
        //         else setErrors([res.statusText]);
        //     });
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
        if(!editMessageText) return;
        setErrors([]);
        editMessage.text = editMessageText;
        updateMessage(editMessage);
        // return dispatch(updateMessage(editMessage))
        //     .catch(async (res) => {
        //         let data;
        //         try {
        //             data = await res.clone().json();
        //         } catch {
        //             data = await res.text();
        //         }
        //         if (data?.errors) setErrors(data.errors);
        //         else if (data) setErrors([data]);
        //         else setErrors([res.statusText]);
        //     });
    };

    const handleShowDeleteModal = (messageId) => {
        setDeleteMessageId(messageId);
        setShowDeleteModal(true);
    };

    const handleMouseOver = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({ left: left, top: top - 42 });
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleScroll = () => {
        setShowTooltip(false);
    };


    const handleShowAdd = (user) => {
        setOtherUser(user);
        setOtherUserId(user.id);
        if (user.id !== sessionUser.id) {
            if (!friendRequests.hasOwnProperty(user.id)) {
                showAddButton(true);
            }
            if (sessionUser.id === server.ownerId) {
                showKickButton(true);
            }
        }
    }

    const handleAddFriend = (e) => {
        e.preventDefault();
        setErrors([]);
        const friendRequest = {
            receiverId: otherUserId,
        }
        // createFriendRequest(friendRequest);
        // showAddButton(false);
        return dispatch(createFriendRequest(friendRequest)).then(() => {
            showAddButton(false);
        }).catch(async (res) => {
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

    const handleKickMember = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(kickMemberServer(serverId, otherUserId)).then(() => {
            showKickButton(false);
            showAddButton(false);
        }).catch(async (res) => {
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

    const handleInput = (e) => {
        const textareaLineHeight = 24; // adjust this value to match the line-height of your textarea
        const previousRows = e.target.rows;
        e.target.rows = 1; // reset the rows to 1 in order to calculate the new height

        const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);
        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }
        setRows(currentRows);
        setText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleMessageSubmit(e);
        }
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
                                <div className="welcome-channel-heading">Welcome to <br />
                                    {server && Object.keys(server?.channels).length > 0 && channelId && server.channels[channelId]?.name ? server?.channels[channelId].name : "general"}
                                </div>
                                <div className="welcome-channel-desc">This is the beginning of this server.</div>
                            </div>
                        </li>

                        <li className="timeline-dividier">
                            <span>Chat in Real-time!</span>
                        </li>

                        {messages.map(message => (
                            message.messageableId === parseInt(channelId) && message.messageableType === "Channel" && (
                                <li className={showEditForm && editMessage === message ? "message editing" : "message"} key={message.id}>
                                    <div className="message-header">
                                        <div className="message-user-icon" style={{ backgroundColor: `${colorById(message.authorId)}` }}>
                                            <span className="material-icons user-icon messenger-icon" style={{ color: "white", fontSize: 30 }}>discord</span>
                                        </div>
                                        <div className="message-topping">
                                            <span className="message-username">
                                                {message && Object.keys(users).length && message.authorId ? users[message.authorId].username : "User"}
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
                                                    escape to <span className="fake-light-blue-links" onClick={() => {
                                                        setEditMessageText(message.text);
                                                        setShowEditForm(false);
                                                        setEditMessage(null);
                                                    }}> cancel </span> • enter to
                                                    <span className="fake-light-blue-links" onClick={handleEditSubmit}> save</span>
                                                </div>
                                            </div>
                                        </form>) : (
                                        <>
                                            <div className="message-content">
                                                {`${message.text}`}
                                            </div>
                                            {sessionUser && message.authorId === sessionUser.id && (
                                                <div className="modal-container">
                                                    <div className="message-edit-form">
                                                        <div className="edit-button-message" onClick={() => handleShowEditForm(message)}>
                                                            <EditIcon />
                                                        </div>
                                                        <div className="edit-button-message" onClick={() => {
                                                            setEditMessage(message);
                                                            setShowEditForm(false);
                                                            handleShowDeleteModal(message.id)
                                                        }
                                                        }>
                                                            <DeleteForeverIcon />
                                                        </div>
                                                        {showDeleteModal && editMessage === message && (
                                                            <Modal onClose={() => setShowDeleteModal(false)} className="create-server delete">
                                                                <MessageDelete messageId={deleteMessageId} onClose={() => setShowDeleteModal(false)} />
                                                            </Modal>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </li>
                            )
                        ))}
                    </ul>
                    <form className="message-input-form" onSubmit={handleMessageSubmit}>
                        <textarea className="message-input" type="text" value={text} ref={textareaRef} rows={rows} onInput={handleInput} onKeyDown={handleKeyDown}
                            onChange={(e) => setText(e.target.value)} placeholder="Message here" />
                    </form>
                </div>
                <div className="members-container">
                    <div className="members-wrapper">
                        <ul className="members" onScroll={handleScroll}>
                            <li className="online-category">
                                All Members - {server && server?.members ? Object.values(server.members).length : 0}
                            </li>

                            {sessionUser && sessionUser.id && Object.keys(users).length && Object.values(users).map(member => (
                                server && sessionUser.id && member.id && server.members && server.members[member.id] && (
                                    <li key={member.id} className="member-container" onMouseOver={
                                        sessionUser && sessionUser.id && sessionUser.id !== member.id ?
                                            () => { handleShowAdd(member) } : null} onMouseLeave={() => {
                                                showAddButton(false);
                                                showKickButton(false);
                                            }}>
                                        <div className="member-layout">
                                            <div className="user-icon" style={{ backgroundColor: `${colorById(member.id)}` }}>
                                                <span className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</span>
                                                <div className={member.isOnline ? `user-status-bubble ${member.status}` : `user-status-bubble invisible`}>
                                                    <div className={member.isOnline ? `user-status-bubble-inner ${member.status}` : `user-status-bubble-inner invisible`}></div>
                                                </div>
                                            </div>
                                            <div className="member-username">&nbsp;&nbsp;&nbsp;{member.username}&nbsp;</div>
                                            <span className="server-crown" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                                {server && server.ownerId === member.id ? serverOwnerSVG : null}</span>
                                            {showTooltip && (
                                                <div className="add-channel-symbol-tooltip" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                                                    <div className="tooltip-text">
                                                        Server Owner
                                                    </div>
                                                </div>

                                            )}
                                            {member.id && otherUser === member && otherUserId === member.id && addButton ? (
                                                <div className="add-friend-button" onClick={(e) => {
                                                    e.currentTarget.nextSibling.children[0].innerText = "Friend Request Sent";
                                                    handleAddFriend(e);
                                                }}>
                                                    <PersonAddAlt1Icon onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
                                                </div>) : null}
                                            {showTooltip && (
                                                <div className="add-channel-symbol-tooltip" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                                                    <div className="tooltip-text">
                                                        Send Friend Request
                                                    </div>
                                                </div>
                                            )}

                                            {otherUser === member && otherUserId === member.id && server.ownerId === sessionUser.id && kickButton ? (
                                                <div className="kick-member-button" onClick={(e) => {
                                                    handleKickMember(e);
                                                }}>
                                                    <GroupRemoveIcon onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
                                                </div>) : null}
                                            {showTooltip && (
                                                <div className="add-channel-symbol-tooltip" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                                                    <div className="tooltip-text">
                                                        Kick Member
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </li>
                                )))}


                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default ServerContent;