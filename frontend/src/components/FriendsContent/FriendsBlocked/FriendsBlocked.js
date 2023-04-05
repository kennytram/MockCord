import { useSelector } from "react-redux";
import { useState } from "react";
import { getFriendRequests } from "../../../store/FriendRequests";
import SearchIcon from '@mui/icons-material/Search';

function FriendsBlocked() {
    const friendRequests = useSelector(getFriendRequests);
    const blockedRequests = friendRequests.filter(friendRequest => friendRequest.status === "blocked");

    const blockedSVG = <svg class="icon-1WVg4I" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M20.2949 0.298996L21.7089 1.713L19.4169 4.006L21.7089 6.299L20.2949 7.713L18.0019 5.42L15.7099 7.713L14.2949 6.299L16.5879 4.006L14.2949 1.713L15.7099 0.298996L18.0019 2.592L20.2949 0.298996ZM8.00195 13.006C10.207 13.006 12.002 11.211 12.002 9.006C12.002 6.801 10.207 5.006 8.00195 5.006C5.79695 5.006 4.00195 6.801 4.00195 9.006C4.00195 11.211 5.79695 13.006 8.00195 13.006ZM8.00195 14.006C3.29095 14.006 0.00195312 16.473 0.00195312 20.006V21.006H16.002V20.006C16.002 16.473 12.713 14.006 8.00195 14.006Z"></path>
    </svg>;

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
            {blockedRequests.length === 0 ? (
                <div className="friends-show-box">
                    <div className="searchbar-friendrequests-container">
                        <div className="searchbar-friendrequests">
                            <input disabled className="searchbar-friendrequests-input" placeholder="Search" />
                            <div className="searchbar-friendrequests-icon"><SearchIcon /></div>
                        </div>
                    </div>

                    {/* {blockedRequests.map(blockedRequest => {
                        return ( */}

                    <div className="friendrequests-count-container">Blocked - 1</div>
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
                                            Blocked
                                        </div>
                                    </div>
                                </div>
                                <div className="friend-request-info-right">
                                    <button className="friend-request-info-right-button blocked unblock" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                        {blockedSVG}
                                        {showTooltip && <div className="friend-request-tooltip"
                                            style={{ top: tooltipPosition.top }}>
                                            <div className="tooltip-text">
                                                Unblock
                                            </div>
                                        </div>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ul></div>) : (<div className="empty-friends-container">
                        <div id="blocked-wumpus-image" />
                        <div className="wumpus-desc">
                            You can't unblock the Wumpus.
                        </div>
                    </div>)}
        </>
    )
}

export default FriendsBlocked;