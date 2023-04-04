import { useSelector } from "react-redux";
import { getFriendRequests } from "../../../store/FriendRequests";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


function FriendsPending() {
    const friendRequests = useSelector(getFriendRequests);
    const pendingRequests = friendRequests.filter(friendRequest => friendRequest.status === "pending");

    return (
        <>
            {pendingRequests.length === 0 ? (
                <div className="friends-show-box">
                    <div className="searchbar-friendrequests-container">
                        <div className="searchbar-friendrequests">
                            <input disabled className="searchbar-friendrequests-input" placeholder="Search" />
                            <div className="searchbar-friendrequests-icon"><SearchIcon /></div>
                        </div>
                    </div>

                    {/* {blockedRequests.map(blockedRequest => {
                        return ( */}

                    <div className="friendrequests-count-container">Pending - 1</div>
                    <ul className="friend-request-list">
                        <div className="friend-request">
                            <div className="friend-request-info">
                                <div className="friend-request-info-left">
                                    <div className="user-icon dm-user-icon" style={{backgroundColor: `var(--brand)`}}>
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
                                            Outgoing Friend Request
                                            {/* Incoming Friend Request */}
                                        </div>
                                    </div>
                                </div>
                                <div className="friend-request-info-right">
                                    <button className="friend-request-info-right-button accepted">
                                        <CheckIcon/>
                                    </button>
                                    <button className="friend-request-info-right-button blocked">
                                        <CloseIcon/>
                                        {/* <div className="friend-request-tooltip">
                                            <div className="tooltip-text">
                                                Unblock
                                            </div>
                                        </div> */}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* ) */}
                        {/* })} */}
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