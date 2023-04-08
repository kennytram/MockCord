import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import { fetchMessages, createMessage, getMessages, updateMessage, receiveMessage, removeMessage } from '../../store/messages';
import { fetchChannel } from '../../store/channels';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import MessageDelete from '../MessageDeleteModal/MessageDelete';
import consumer from '../../consumer';
import { getFriendRequests, fetchFriendRequests, createFriendRequest } from '../../store/FriendRequests';

function FriendMessageContent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const users = useSelector(state => state.users);
    const chatMessagesRef = useRef(null);
    const { channelId } = useParams();
    const [text, setText] = useState("");
    const messages = useSelector(getMessages);
    const sessionUser = useSelector(state => state.session.user);
    const dmChannel = useSelector(state => state.channels[channelId]);
    const [showEditForm, setShowEditForm] = useState(false)
    const [editMessage, setEditMessage] = useState(null);
    const [editMessageText, setEditMessageText] = useState("");
    const [errors, setErrors] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMessageId, setDeleteMessageId] = useState(null);

    const [rows, setRows] = useState(1);
    const textareaRef = useRef(null);

    const dmChannelName = dmChannel && dmChannel.name ? dmChannel.name.split('/') : null;

    useEffect(() => {
        if (channelId) {
            dispatch(fetchChannel(channelId)).then(() => {
                if (chatMessagesRef) chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }).catch(() => { history.push(`/channels/@me`) })

        }
        const subscription = consumer.subscriptions.create(
            { channel: "ChannelsChannel", id: channelId },
            {
                received: (message) => {
                    switch(message.type) {
                        case "RECEIVE_MESSAGE":
                            dispatch(receiveMessage(message)).catch(async (res) => { history.push(`/channels/@me`) });
                            break;
                        case "DELETE_MESSAGE": 
                            dispatch(removeMessage(message.id)).catch(() => { history.push(`/channels/@me`) });
                            break;
                        case "UPDATE_MESSAGE":
                            dispatch(receiveMessage(message)).catch(() => { history.push(`/channels/@me`) });
                            break;
                        default:
                            break;
                    }
                    if (chatMessagesRef) chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
                    
                },
                error: () => {
                    history.push("/channels/@me");
                }
            }
        );
        return () => {
            subscription.unsubscribe();
        }

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

    const handleInput = (event) => {
        const textareaLineHeight = 24; // adjust this value to match the line-height of your textarea
        const previousRows = event.target.rows;
        event.target.rows = 1; // reset the rows to 1 in order to calculate the new height

        const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }
        setRows(currentRows);
        setText(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessageSubmit(event);
        }
    };

    {/* <li className="welcome-dm">
        <span className="material-icons user-icon profile-icon" style={{ color: "white", fontSize: 60 }}>discord</span>
        <div className="welcome-dm-wrapper">
            <div className="welcome-dm-heading">
                {dm && dm.otherUserId && Object.keys(users).length ?
                    users[dm.otherUserId] ? users[dm.otherUserId].username : "User" : "User"}
                { }
                { }

            </div>
            <div className="welcome-dm-desc">
                This is the beginning of your direct message history with <span className="highlighted-user">@
                    { }
                    { }
                    {dm && dm.otherUserId && Object.keys(users).length ?
                        users[dm.otherUserId] ? users[dm.otherUserId].username : "User" : "User"}
                </span>.
            </div>
        </div>
    </li> */}
    return (
        <div className="content">
            <div className="message-show-container" >
                <ul className="messages" ref={chatMessagesRef}>
                    {/* <li className="welcome-channel">
                        <div className="welcome-channel-wrapper">
                            <div className="welcome-channel-heading">Welcome to <br />
                                {dmChannel && Object.keys(server?.channels).length > 0 && channelId && server.channels[channelId]?.name ? server?.channels[channelId].name : "general"}
                            </div>
                            <div className="welcome-channel-desc">This is the beginning of this server.</div>
                        </div>
                    </li> */}
                    <li className="welcome-dm">

                        <div className="welcome-dm-wrapper">
                            {Object.keys(dmChannel).length && Object.keys(dmChannel.dmMembers).length && Object.keys(users).length && sessionUser && sessionUser.id && Object.values(dmChannel.dmMembers).map(member => {
                                if (member.id !== sessionUser.id) {
                                    return (
                                        <div key={member.id} className="message-user-icon" style={{ backgroundColor: `${colorById(member.id)}` }}>
                                            <span className="material-icons user-icon profile-icon" style={{ color: "white", fontSize: 60 }}>discord</span>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            }
                            )}
                            <div className="welcome-dm-heading">
                                {dmChannelName && sessionUser ? sessionUser.username === dmChannelName[0] ? dmChannelName[1] : dmChannelName[0] : ""}
                            </div>
                            <div className="welcome-dm-desc">
                                This is the beginning of your direct message history with <span className="highlighted-user">
                                    {dmChannelName && sessionUser ? sessionUser.username === dmChannelName[0] ? dmChannelName[1] : dmChannelName[0] : ""}
                                </span>.
                            </div>
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
                                                        <Modal onClose={() => setShowDeleteModal(false)} className="create-server">
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
                        onChange={(e) => setText(e.target.value)} placeholder={dmChannelName && sessionUser ? sessionUser.username === dmChannelName[0] ? `Message @${dmChannelName[1]}` : `Message @${dmChannelName[0]}` : "Message here"} />
                </form>
            </div>
        </div >
    )
}

export default FriendMessageContent;