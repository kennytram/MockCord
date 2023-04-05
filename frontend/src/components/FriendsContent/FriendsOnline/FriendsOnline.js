import { useSelector } from "react-redux";
import { useState } from "react";
import { getFriendRequests } from "../../../store/FriendRequests";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


function FriendsOnline() {
    const friendRequests = useSelector(getFriendRequests);
    const acceptedRequests = friendRequests.filter(friendRequest => friendRequest.status === "accepted");

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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

    return (
        <>
            {acceptedRequests.length === 0 ? (
                <div className="friends-show-box">
                    <div className="searchbar-friendrequests-container">
                        <div className="searchbar-friendrequests">
                            <input disabled className="searchbar-friendrequests-input" placeholder="Search" />
                            <div className="searchbar-friendrequests-icon"><SearchIcon /></div>
                        </div>
                    </div>

                    {/* {blockedRequests.map(blockedRequest => {
                        return ( */}

                    <div className="friendrequests-count-container">Online - 1</div>
                    <ul className="friend-request-list" onScroll={handleScroll}>
                        <div className="friend-request">
                            <div className="friend-request-info">
                                <div className="friend-request-info-left">
                                    <div className="user-icon dm-user-icon" style={{backgroundColor: `var(--brand)`}}>
                                        <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                        <div className={`user-status-bubble online friends-status-bubble`}>
                                            <div className={`user-status-bubble-inner online friends-status-bubble`}></div>
                                        </div>
                                    </div>
                                    <div className="friend-request-info-left-text">
                                        <div className="friend-request-info-left-text-username">
                                            {/* {blockedRequest.sender.username} */}
                                            test<span className="friend-request-info-left-text-tag">
                                                {/* #{blockedRequest.sender.discriminator} */}
                                                #6969
                                            </span>
                                        </div>
                                        <div className="friend-request-info-left-text-status">
                                            Online
                                            {/* Idle Offline */}
                                        </div>
                                    </div>
                                </div>
                                <div className="friend-request-info-right">
                                    <button className="friend-request-info-right-button" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                        <ChatBubbleIcon />
                                        {showTooltip && <div className="friend-request-tooltip"
                                        style={{ top: tooltipPosition.top }}>
                                            <div className="tooltip-text">
                                                Message
                                            </div>
                                        </div>}
                                    </button>
                                    <button className="friend-request-info-right-button blocked" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                        <CloseIcon />
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
                        {/* ) */}
                        {/* })} */}
                    </ul></div>) : (<div className="empty-friends-container">
                        <div id="online-wumpus-image" />
                        <div className="wumpus-desc">
                            No one's around to play with Wumpus.
                        </div>
                    </div>)}
        </>
    )
}

export default FriendsOnline;