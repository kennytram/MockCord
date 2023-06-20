import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getFriendRequests, updateFriendRequest, deleteFriendRequest } from "../../../store/FriendRequests";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


function FriendsPending() {
    const dispatch = useDispatch();
    const friendRequests = useSelector(getFriendRequests);
    const pendingRequests = friendRequests.filter(friendRequest => friendRequest.status === "pending");
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [errors, setErrors] = useState([]);
    const [friendRequest, setFriendRequest] = useState(null);

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

    const handleAddFriendRequest = (e) => {
        e.preventDefault();
        setErrors([]);
        const friendId = friendRequest.senderId === sessionUser.id ? friendRequest.receiverId : friendRequest.senderId;
        friendRequest.status = "accepted";
        // return dispatch(updateFriendRequest(friendRequest)).then(() => {
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
        updateFriendRequest(friendRequest);
        setFriendRequest(null);
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

    return (
        <>
            {pendingRequests.length > 0 && Object.keys(users).length && sessionUser ? (
                <div className="friends-show-box">
                    {/* <div className="searchbar-friendrequests-container">
                        <div className="searchbar-friendrequests">
                            <input disabled className="searchbar-friendrequests-input" placeholder="Search" />
                            <div className="searchbar-friendrequests-icon"><SearchIcon /></div>
                        </div>
                    </div> */}

                    <div className="friendrequests-count-container">Pending - {pendingRequests.length}</div>
                    <ul className="friend-request-list" onScroll={handleScroll}>
                        {pendingRequests && pendingRequests.map(pendingRequest => {
                            return (
                                <div key={pendingRequest.id} className="friend-request" onMouseOver={() => setFriendRequest(pendingRequest)}>
                                    <div className="friend-request-info">
                                        <div className="friend-request-info-left">
                                            <div className="user-icon dm-user-icon"
                                                style={
                                                    pendingRequest && sessionUser && pendingRequest.senderId === sessionUser.id
                                                        ? { backgroundColor: colorById(pendingRequest.receiverId) }
                                                        : { backgroundColor: colorById(pendingRequest.senderId) }
                                                }
                                            >
                                                {pendingRequest.senderId === sessionUser.id ? (
                                                        users[pendingRequest.receiverId].photoUrl ? (
                                                            <img
                                                                src={users[pendingRequest.receiverId].photoUrl}
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
                                                    ) : users[pendingRequest.senderId].photoUrl ? (
                                                        <img
                                                            src={users[pendingRequest.senderId].photoUrl}
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
                                                ${pendingRequest && sessionUser && pendingRequest.senderId === sessionUser.id ?
                                                        users[pendingRequest.receiverId].isOnline ? users[pendingRequest.receiverId].status : "invisible"
                                                        :
                                                        users[pendingRequest.senderId].isOnline ? users[pendingRequest.senderId].status : "invisible"} 
                                                friends-status-bubble`}>
                                                    <div className={`user-status-bubble-inner 
                                                    ${pendingRequest && sessionUser && pendingRequest.senderId === sessionUser.id ?
                                                            users[pendingRequest.receiverId].isOnline ? users[pendingRequest.receiverId].status : "invisible"
                                                            :
                                                            users[pendingRequest.senderId].isOnline ? users[pendingRequest.senderId].status : "invisible"} 
                                                    friends-status-bubble`}></div>
                                                </div>
                                            </div>
                                            <div className="friend-request-info-left-text">
                                                <div className="friend-request-info-left-text-username">
                                                <div className="friend-request-info-name">{pendingRequest && sessionUser && pendingRequest.senderId === sessionUser.id ? users[pendingRequest.receiverId].username : users[pendingRequest.senderId].username}
                                                    </div>
                                                    <span className="friend-request-info-left-text-tag">
                                                        {/* #{blockedRequest.sender.tag} */}
                                                        #{pendingRequest && sessionUser && pendingRequest.senderId === sessionUser.id ? users[pendingRequest.receiverId].tag : users[pendingRequest.senderId].tag}
                                                    </span>
                                                </div>
                                                <div className="friend-request-info-left-text-status">
                                                    {/* Outgoing Friend Request */}
                                                    {/* Incoming Friend Request */}
                                                    {pendingRequest && sessionUser && pendingRequest.senderId === sessionUser.id ? "Outgoing Friend Request" : "Incoming Friend Request"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="friend-request-info-right">
                                            {pendingRequest && sessionUser && pendingRequest.senderId !== sessionUser.id &&
                                                <button onClick={handleAddFriendRequest} className="friend-request-info-right-button accepted accept" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                                    <CheckIcon />
                                                    {showTooltip && <div className="friend-request-tooltip"
                                                        style={{ top: tooltipPosition.top }}>
                                                        <div className="tooltip-text">
                                                            Accept
                                                        </div>
                                                    </div>}
                                                </button>}
                                            <button className="friend-request-info-right-button blocked decline" onClick={handleDeclineFriendRequest} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                                <CloseIcon/>
                                                {showTooltip && <div className="friend-request-tooltip"
                                                    style={{ top: tooltipPosition.top }}>
                                                    <div className="tooltip-text">
                                                        Decline
                                                    </div>
                                                </div>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ul></div>) : (<div className="empty-friends-container">
                        <div id="pending-wumpus-image" />
                        <div className="wumpus-desc">
                            There are no pending friend requests. Here's Wumpus for now.
                        </div>
                    </div>)}
        </>
    )
}

export default FriendsPending;