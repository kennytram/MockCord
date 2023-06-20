import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getFriendRequests, updateFriendRequest, deleteFriendRequest } from "../../../store/FriendRequests";
import { updateChannel } from '../../../store/channels';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


function FriendsAll() {
    const dispatch = useDispatch();
    const history = useHistory();
    const friendRequests = useSelector(getFriendRequests);
    const acceptedRequests = friendRequests.filter(friendRequest => friendRequest.status === "accepted");
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const channels = useSelector(state => state.channels);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [friendRequest, setFriendRequest] = useState(null);
    const [errors, setErrors] = useState([]);

    const messageSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>;

    const handleMouseOver = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({ left: 1040, top: top - 45 });
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleScroll = () => {
        setShowTooltip(false);
    };

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

    const handleDeclineFriendRequest = (e) => {
        e.preventDefault();
        setErrors([]);
        const friendId = friendRequest.senderId === sessionUser.id ? friendRequest.receiverId : friendRequest.senderId;
        // return dispatch(deleteFriendRequest(friendRequest.id, friendId)).then(() => {
        //     setFriendRequest(null);
        // }).catch(async (res) => {
        //     let data;
        //     try {
        //         data = await res.clone().json();
        //     } catch {
        //         data = await res.text();
        //     }
        //     if (data?.errors) setErrors(data.errors);
        //     else if (data) setErrors([data]);
        //     else setErrors([res.statusText]);
        // });
        deleteFriendRequest(friendRequest.id, friendId);
        setFriendRequest(null);
    }

    const handleMessageFriend = (e) => {
        e.preventDefault();
        setErrors([]);
        const dmChannelId = friendRequest.dmChannel.id;
        const dmChannel = channels[dmChannelId];
        if(dmChannel.channelType.includes(`hidden/${sessionUser.id}`))  {
            dmChannel.channelType = dmChannel.channelType.replace(`hidden/${sessionUser.id}`, "").trim();
            // return dispatch(updateChannel(dmChannel)).then(() => {
            //     history.push('/channels/@me/' + dmChannelId);
            // }).catch(async (res) => {
            //     let data;
            //     try {
            //         data = await res.clone().json();
            //     } catch {
            //         data = await res.text();
            //     }
            //     if (data?.errors) setErrors(data.errors);
            //     else if (data) setErrors([data]);
            //     else setErrors([res.statusText]);
            // });
            updateChannel(dmChannel);
        }
        history.push('/channels/@me/' + dmChannelId);
    }
    
    return (
        <>
            {acceptedRequests.length > 0 && sessionUser && Object.keys(users).length > 0 ? (
                <div className="friends-show-box">
                    {/* <div className="searchbar-friendrequests-container">
                        <div className="searchbar-friendrequests">
                            <input disabled className="searchbar-friendrequests-input" placeholder="Search" />
                            <div className="searchbar-friendrequests-icon"><SearchIcon /></div>
                        </div>
                    </div> */}

                    <div className="friendrequests-count-container">All Friends - {acceptedRequests.length}</div>
                    <ul className="friend-request-list" onScroll={handleScroll}>
                        {acceptedRequests && acceptedRequests.map(acceptedRequest => {
                            return (
                            <div key={acceptedRequest.id} className="friend-request" onMouseOver={() => setFriendRequest(acceptedRequest)}>
                                <div className="friend-request-info">
                                    <div className="friend-request-info-left">
                                        <div className="user-icon dm-user-icon"
                                            style={
                                                acceptedRequest && sessionUser && acceptedRequest.senderId === sessionUser.id
                                                    ? { backgroundColor: colorById(acceptedRequest.receiverId) }
                                                    : { backgroundColor: colorById(acceptedRequest.senderId) }
                                            }
                                        >
                                            {acceptedRequest.senderId === sessionUser.id ? (
                                                        users[acceptedRequest.receiverId].photoUrl ? (
                                                            <img
                                                                src={users[acceptedRequest.receiverId].photoUrl}
                                                                className="user-icon dm-user-icon"
                                                                style={{ position: "absolute", inset: 0 }}
                                                                alt="user-icon"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="material-icons icon"
                                                                style={{ color: "white", fontSize: 22.5 }}
                                                            >
                                                                discord
                                                            </div>
                                                        )
                                                    ) : users[acceptedRequest.senderId].photoUrl ? (
                                                        <img
                                                            src={users[acceptedRequest.senderId].photoUrl}
                                                            className="user-icon dm-user-icon"
                                                            style={{ position: "absolute", inset: 0 }}
                                                            alt="user-icon"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="material-icons icon"
                                                            style={{ color: "white", fontSize: 22.5 }}
                                                        >
                                                            discord
                                                        </div>
                                                    )}
                                            <div className={`user-status-bubble 
                                    ${acceptedRequest && sessionUser && acceptedRequest.senderId === sessionUser.id ?
                                                    users[acceptedRequest.receiverId].isOnline ? users[acceptedRequest.receiverId].status : "invisible"
                                                    :
                                                    users[acceptedRequest.senderId].isOnline ? users[acceptedRequest.senderId].status : "invisible"} 
                                    friends-status-bubble`}>
                                                <div className={`user-status-bubble-inner 
                                        ${acceptedRequest && acceptedRequest.senderId === sessionUser.id ?
                                                        users[acceptedRequest.receiverId].isOnline ? users[acceptedRequest.receiverId].status : "invisible"
                                                        :
                                                        users[acceptedRequest.senderId].isOnline ? users[acceptedRequest.senderId].status : "invisible"} 
                                        friends-status-bubble`}></div>
                                            </div>
                                        </div>
                                        <div className="friend-request-info-left-text">
                                            <div className="friend-request-info-left-text-username">
                                                <div className="friend-request-info-name">{acceptedRequest && acceptedRequest.senderId === sessionUser.id ? users[acceptedRequest.receiverId].username : users[acceptedRequest.senderId].username}
                                                </div>
                                                <span className="friend-request-info-left-text-tag">
                                                    #{acceptedRequest && acceptedRequest.senderId === sessionUser.id ? users[acceptedRequest.receiverId].tag : users[acceptedRequest.senderId].tag}
                                                </span>
                                            </div>
                                            <div className="friend-request-info-left-text-status">
                                                {acceptedRequest && acceptedRequest.senderId === sessionUser.id ? 
                                                users[acceptedRequest.receiverId].status === "invisible" || !users[acceptedRequest.receiverId].isOnline ? "Offline" : users[acceptedRequest.receiverId].status
                                                : 
                                                users[acceptedRequest.senderId].status === "invisible" || !users[acceptedRequest.senderId].isOnline ? "Offline" : users[acceptedRequest.receiverId].status
                                                }
                                                {/* Idle Offline */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="friend-request-info-right">
                                        <button className="friend-request-info-right-button" onClick={handleMessageFriend} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                            {/* <ChatBubbleIcon /> */}
                                            {messageSVG}
                                            {showTooltip && <div className="friend-request-tooltip"
                                                style={{ top: tooltipPosition.top }}>
                                                <div className="tooltip-text">
                                                    Message
                                                </div>
                                            </div>}
                                        </button>
                                        <button className="friend-request-info-right-button blocked"  onClick={handleDeclineFriendRequest}  onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                            <CloseIcon/>
                                            {showTooltip && <div className="friend-request-tooltip"
                                                style={{ top: tooltipPosition.top }}>
                                                <div className="tooltip-text">
                                                    Remove Friend
                                                </div>
                                            </div>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </ul></div>) : (<div className="empty-friends-container">
                        <div className="all-wumpus-image" />
                        <div className="wumpus-desc">
                            Wumpus is waiting on friends. You don't have to though!
                        </div>
                    </div>)}
        </>
    )
}

export default FriendsAll;