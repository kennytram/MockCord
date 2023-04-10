import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import ExploreIcon from "@mui/icons-material/Explore";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getChannels } from '../../store/channels';
import { fetchFriendRequests, createSearchFriendRequest,receiveFriendRequest } from '../../store/FriendRequests';
import FriendsOnline from './FriendsOnline/FriendsOnline';
import FriendsAll from './FriendsAll/FriendsAll';
import FriendsPending from './FriendsPending/FriendsPending';
import FriendsBlocked from './FriendsBlocked/FriendsBlocked';
import consumer from '../../consumer';

import './FriendsContent.css';

function FriendsContent({ refreshState }) {
    const dispatch = useDispatch();
    const [buttonStates, setButtonStates] = useState([false, false,
        false, false, true]);
    const [loaded, setLoaded] = useState(false);
    const addFriendRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(getChannels);
    const users = useSelector(state => state.users);
    const friendRequests = useSelector(state => state.friendRequests);
    const [otherUser, setOtherUser] = useState("");
    const [successFriendRequest, setSuccessFriendRequest] = useState(false);
    const [successFriend, setSuccessFriend] = useState("");
    const searchInputRef = useRef(null);

    const friendSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>;


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

    useEffect(() => {
        Promise.all([
            dispatch(fetchFriendRequests()),
        ]).then(() => setLoaded(true));
        
        const friendRequestsSubscription = consumer.subscriptions.create(
            { channel: "FriendRequestsChannel", id: sessionUser.id },
            {
                received: (friendRequest) => {
                    switch (friendRequest.type) {
                        case "RECEIVE_FRIEND_REQUEST":
                            dispatch(receiveFriendRequest(friendRequest));
                            break;
                        default:
                            break;
                    }
                }
            }
        );

        return () => {
            friendRequestsSubscription?.unsubscribe();
        }

    }, [dispatch, refreshState]);


    const handleButtonClick = (e, index) => {
        const newButtonStates = buttonStates.map((buttonState, i) => i === index);
        setButtonStates(newButtonStates);
        if (index === 4) addFriendRef.current.classList.add('active');
        else addFriendRef.current.classList.remove('active');
    };


    const handleAddFriend = (e) => {
        e.preventDefault();
        if (!otherUser) return;
        setErrors([]);
        setSuccessFriendRequest(false);
        if (!otherUser.includes('#')) {
            setErrors([`We need ${otherUser}'s four digit tag so we know which one they are.`]);
            searchInputRef.current.classList.add('search-error');
            return;
        }
        const lastHashIndex = otherUser.lastIndexOf('#');
        const username = otherUser.slice(0, lastHashIndex);
        const tag = otherUser.slice(lastHashIndex + 1);
        if (/^\d+$/.test(tag)) {
        } else {
            setErrors(['Tag must be digits only']);
            searchInputRef.current.classList.add('search-error');
            return;
        }
        const friend = {
            username: username,
            tag: tag,
        }
        createSearchFriendRequest(friend).then(() => {
            setSuccessFriendRequest(true);
            setSuccessFriend(otherUser);
            setOtherUser("");
            searchInputRef.current.classList.remove('search-error');
            searchInputRef.current.classList.add('search-success');
        }).catch(function(error) {
            let errorArr = [];
            error.json().then(errorData=> {
                errorArr.push(errorData);
                searchInputRef.current.classList.add('search-error');
                setErrors(errorArr);
            }) 
        });
        // searchInputRef.current.clasasList.remove('search-success');
        // searchInputRef.current.classList.add('search-success');
        // searchInputRef.current.classList.add('search-error');

        // return dispatch(createSearchFriendRequest(friend)).then(() => {
        //     setSuccessFriendRequest(true);
        //     setSuccessFriend(otherUser);
        //     setOtherUser("");
        //     searchInputRef.current.classList.remove('search-error');
        //     searchInputRef.current.classList.add('search-success');
        // }).catch(async (res) => {
        //     let data;

        //     searchInputRef.current.classList.add('search-error');
        //     try {
        //         data = await res.clone().json();
        //     } catch {
        //         data = await res.text();
        //     }
        //     if (data?.errors) setErrors(data.errors);
        //     else if (data) setErrors([data]);
        //     else setErrors([res.statusText]);
        // });
    };

    const checkValidInput = (e) => {
        const userInput = e.target.value;
        const pattern = /^[^\s]{1,30}#[0-9]{4}$/;
        const isValidInput = pattern.test(userInput);

        return isValidInput;
    };

    const handleKeyDown = (e) => {
        searchInputRef.current.classList.remove('search-error');
        searchInputRef.current.classList.remove('search-success');
        const input = e.target;
        const value = input.value;
        const cursorPosition = input.selectionStart;

        if (value.length < 30) {
            return;
        }

        if (value.length === 30 && e.key === '#') {
            return;
        }

        if (value.length >= 31 && value.length <= 34 && /[0-9]/.test(e.key)) {
            return;
        }

        if (value.length >= 30 && e.key !== 'Backspace' && !(e.ctrlKey && (e.key === 'a' || e.key === 'c')) && e.key !== 'Delete') {
            e.preventDefault();
        }

        if (value.length >= 34 && cursorPosition >= 34 && !(e.ctrlKey && (e.key === 'a' || e.key === 'c')) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    }

    const handlePaste = (e) => {
        searchInputRef.current.classList.remove('search-error');
        searchInputRef.current.classList.remove('search-success');
        const input = e.target;
        const pastedData = e.clipboardData.getData('text');
        const value = input.value;

        if (value.length < 30) {
            return;
        }

        if (value.length === 30 && pastedData.startsWith('#')) {
            return;
        }

        if (value.length === 30 && !pastedData.startsWith('#')) {
            e.preventDefault();
            return;
        }

        if (value.length === 31 && pastedData.startsWith('#') && /^\d{0,3}$/.test(pastedData.slice(1))) {
            return;
        }

        if (value.length >= 32 && value.length <= 35 && /^\d{0,4}$/.test(pastedData)) {
            return;
        }

        if (value.length > 35) {
            e.preventDefault();
            return;
        }

        if (value.length >= 31 && !pastedData.startsWith('#')) {
            e.preventDefault();
        }
    }

    return (
        <div className="friends-content">
            <div className="top-bar">
                <ul className="top-left-side">
                    <li>
                        <div className="top-main-header">
                            {/* <PeopleAltIcon className="top-main-icon" style={{ color: `rgb(152, 154, 162)` }} /> */}
                            <div className="top-main-icon">{friendSVG}</div>
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
                    {/* <li>
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
                    </li> */}
                </ul>
            </div>
            <div className="content">
                {!buttonStates.at(-1) ? (
                    <div className="friends-show-container">
                        {
                            buttonStates.at(0) ? (<FriendsOnline />) : buttonStates.at(1) ? (<FriendsAll />) : buttonStates.at(2) ? (<FriendsPending />) : (<FriendsBlocked />)
                        }
                    </div>
                ) : (<>
                    <div id="add-friend-container">
                        <div id="add-friend-header">
                            <div id="add-friend-title">ADD FRIEND</div>
                            <form className="add-friend-input" onSubmit={handleAddFriend}>
                                <div id="add-friend-desc">You can add a friend with their username. It's cAsE sEnSitIvE!</div>
                                <input ref={searchInputRef} className="searchbar friend" type="text" placeholder="Enter a Username#0000"
                                    onKeyDown={handleKeyDown}
                                    onPaste={handlePaste}
                                    onChange={(e) => { setOtherUser(e.target.value) }}
                                    value={otherUser} />
                            </form>

                            <div className={`add-friend${errors ? ' error' : ''}`}>
                                {errors && errors.map((error, i) => <div key={i}>{error}</div>)}
                            </div>
                            {successFriendRequest ? (<div className="add-friend success">
                                Success! Your friend request to {successFriend} was sent.
                            </div>) : null}
                        </div>

                        <div id="other-places-header">
                            OTHER PLACES TO MAKE FRIENDS
                        </div>
                        {/* <div className="explore-box">
                        <button className="explore-button">
                            <div id="left-explore-buttonside"><ExploreIcon className="public-server-friend-icon" /><span>
                                &nbsp;&nbsp;Explore Public Servers</span></div>
                            <div></div>
                            <div id="right-explore-buttonside"><KeyboardArrowRightIcon /></div>
                        </button>
                    </div> */}
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
                                    {"When a friend starts an activity-like playing a game \n or hanging out on voice-we'll show it here!"}
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