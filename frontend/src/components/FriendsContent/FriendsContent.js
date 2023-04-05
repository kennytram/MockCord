import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import ExploreIcon from "@mui/icons-material/Explore";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getChannels } from '../../store/channels';
import { fetchFriendRequests } from '../../store/FriendRequests';
import FriendsOnline from './FriendsOnline/FriendsOnline';
import FriendsAll from './FriendsAll/FriendsAll';
import FriendsPending from './FriendsPending/FriendsPending';
import FriendsBlocked from './FriendsBlocked/FriendsBlocked';
import './FriendsContent.css';

function FriendsContent() {
    const dispatch = useDispatch();
    const [buttonStates, setButtonStates] = useState([false, false,
        false, false, true]);
    const [loaded, setLoaded] = useState(false);
    const addFriendRef = useRef(null);
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(getChannels);
    const users = useSelector(state => state.users);

    const groupDMSVG = <svg x="0" y="0" class="icon-2xnN2Y" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z"></path>
    </svg>

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

    const handleButtonClick = (e, index) => {
        const newButtonStates = buttonStates.map((buttonState, i) => i === index);
        setButtonStates(newButtonStates);
        if (index === 4) addFriendRef.current.classList.add('active');
        else addFriendRef.current.classList.remove('active');
    };

    useEffect(() => {
        Promise.all([
            dispatch(fetchFriendRequests()),
        ]).then(() => setLoaded(true));
    }, [dispatch, sessionUser]);


    return (
        <div className="friends-content">
            <div className="top-bar">
                <ul className="top-left-side">
                    <li>
                        <div className="top-main-header">
                            <PeopleAltIcon className="top-main-icon" style={{ color: `rgb(152, 154, 162)` }} />
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
                        <li id="add_friend_button" className="active" ref={addFriendRef} onClick={(e) => handleButtonClick(e, 4)}>
                            Add Friend
                        </li>
                    </ul>
                </ul>
                <ul className="top-right-side">
                    <li>
                        {groupDMSVG}
                        <div className="toolbar-tooltip">
                            <div className="tooltip-text">
                                New Group DM
                            </div>
                        </div>
                    </li>
                    <li className="top-bar-divider" />
                    <li>
                        <InboxIcon />
                        <div className="toolbar-tooltip">
                            <div className="tooltip-text">
                                Inbox
                            </div>
                        </div>
                    </li>
                    <li>
                        <HelpIcon />
                        <div className="toolbar-tooltip">
                            <div className="tooltip-text">
                                Help
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="content">
                {!buttonStates.at(-1) ? (
                    <div className="friends-show-container">
                        {
                            buttonStates.at(0) ? (<FriendsOnline />) : buttonStates.at(1) ? (<FriendsAll />) : buttonStates.at(2) ? (<FriendsPending />) : (<FriendsBlocked />)
                        }
                    </div>
                ) : (<><div id="add-friend-container"><div id="add-friend-header">
                    <div id="add-friend-title">ADD FRIEND</div>
                    <div className="add-friend-input">
                        <div id="add-friend-desc">You can add a friend with their username. It's cAsE sEnSitIvE!</div>
                        <input className="searchbar friend" type="text" disabled value="Enter a Username#0000" />
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
                                    hanging out on voice-we'll show it here!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsContent;