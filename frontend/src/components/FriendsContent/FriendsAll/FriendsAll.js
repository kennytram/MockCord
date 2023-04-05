import { useSelector } from "react-redux";
import { useState } from "react";
import { getFriendRequests } from "../../../store/FriendRequests";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


function FriendsAll() {
    const friendRequests = useSelector(getFriendRequests);
    const acceptedRequests = friendRequests.filter(friendRequest => friendRequest.status === "accepted");
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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

                    <div className="friendrequests-count-container">All Friends - 1</div>
                    <ul className="friend-request-list" onScroll={handleScroll}>
                        <div className="friend-request">
                            <div className="friend-request-info">
                                <div className="friend-request-info-left">
                                    <div className="user-icon dm-user-icon" style={{ backgroundColor: `var(--brand)` }}>
                                        <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                        <div className={`user-status-bubble invisible friends-status-bubble`}>
                                            <div className={`user-status-bubble-inner invisible friends-status-bubble`}></div>
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
                                        {/* <ChatBubbleIcon /> */}
                                        {messageSVG}
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