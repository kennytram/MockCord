import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { getServer } from '../../store/servers';
import './ContentPage.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import ExploreIcon from "@mui/icons-material/Explore";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ContentPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname;
    const { serverId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);
    const addFriendRef = useRef(null);
    const [buttonStates, setButtonStates] = useState([false, false, 
        false, false, true]);



    useEffect(() => {
    },[dispatch, sessionUser, serverId]);

    if(!sessionUser) return <Redirect to="/login" />;

    const handleButtonClick = (e, index) => {
        const newButtonStates = buttonStates.map((buttonState, i) => i === index);
        setButtonStates(newButtonStates);
        if(index === 4) addFriendRef.current.classList.add('active');
        else addFriendRef.current.classList.remove('active');
    };
    
    if(!isNaN(serverId)) {
        return (
            <div className="content">
                <div className="message-show-container">
                    <ul className="messages">
                        <li className="welcome-channel">
                            <li className="welcome-channel-wrapper">
                                <div className="welcome-channel-heading">Welcome to <br/>Channel</div>
                                <div className="welcome-channel-desc">This is the beginning of this server.</div>
                            </li>
                        </li>
                        
                        <li className="timeline-dividier">
                            <span>February 29, 9001</span>
                        </li>
                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>

                        <li className="message">
                            <div className="message-header">
                                <div className="message-user-icon">
                                    <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                                </div>
                                <div className="message-topping">
                                    <span className="message-username">
                                        User
                                    </span>
                                    <span className="message-date">
                                        03/02/2023 3:13 PM
                                    </span>
                                </div>
                            </div>
                            <div className="message-content">
                                Hello World
                            </div>
                            <div className="message-button-container">
                                
                            </div>
                        </li>
                    </ul>
                <form className="message-input-form">
                    <input className="message-input" type="text" placeholder="Message here"/>
                </form>
                </div>
                <div className="members-container">
                    <div className="members-wrapper">
                        <ul className="members">
                            <li className="online-category">
                                ONLINE
                            </li>

                            <li className="member-container">
                                <div className="member-layout">
                                    <div className="user-icon">
                                        <span className="material-icons icon" style={{color: "white", fontSize: 22.5}}>discord</span>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;User
                                </div>
                            </li>


                            

                        </ul>
                    </div>
                </div>  
            </div>
        );
    }
    else if(serverId==='@me') {
        return(
        <> 
           <div className="top-bar">
                <ul className = "top-left-side">
                    <li>
                        <div className= "top-main-header">
                            <PeopleAltIcon className="top-main-icon"/>
                            Friends
                        </div>
                    </li>
                    <li className = "top-bar-divider"/>
                    <ul className ="top-left-interactions">
                        <li onClick={(e)=>handleButtonClick(e, 0)}>
                            Online
                        </li>
                        <li onClick={(e)=>handleButtonClick(e, 1)}>
                            All
                        </li>
                        <li onClick={(e)=>handleButtonClick(e, 2)}>
                            Pending
                        </li>
                        <li onClick={(e)=>handleButtonClick(e, 3)}>
                            Blocked
                        </li>
                        <li id="add_friend_button" ref={addFriendRef} onClick={(e)=>handleButtonClick(e,4)}>
                            Add Friend
                        </li>
                    </ul>
                </ul>
                <ul className ="top-right-side">
                    <li><ChatBubbleIcon/></li>
                    <li className = "top-bar-divider"/>
                    <li><InboxIcon/></li>
                    <li><HelpIcon/></li>
                </ul>
            </div>    
            <div className="content">
                {!buttonStates.at(-1) ? (
                    <div className="friends-show-container">
                        <div className="friend-show-box">
                            {buttonStates.at(0) ? (<>
                               <div id="online-wumpus-image"/>
                               <div className="wumpus-desc">
                                   No one's around to play with Wumpus.
                               </div> 
                               </>) : buttonStates.at(1) ? (<>
                                <div className="all-wumpus-image"/>
                                <div className="wumpus-desc">
                                    Wumpus is waiting on friends. You don't have to though!
                                    
                                </div>
                                
                                <div id="wumpus-button"><button onClick={(e)=>handleButtonClick(e,4)} className='brand-button'>Add Friend</button></div>
                            </>) : buttonStates.at(2) ? (<>
                            <div id="pending-wumpus-image"/>
                            <div className="wumpus-desc">
                                There are no pending friend requests. Here's Wumpus for now.
                            </div>
                            </>) :  (<>
                                <div id="blocked-wumpus-image"/>
                                <div className="wumpus-desc">
                                    You can't unblock the Wumpus.
                                </div>
                            </>)}
                        </div>
                    </div>
                ) : (<><div id="add-friend-container"><div id="add-friend-header">
                <div id="add-friend-title">ADD FRIEND</div>
                <div className="add-friend-input">
                    <div id="add-friend-desc">You can add a friend with their username. It's cAsE sEnSitIvE!</div>
                    <input className="searchbar friend" type="text" disabled value="Enter a Username"/>
                </div>
            </div>
            <div id="other-places-header">
                OTHER PLACES TO MAKE FRIENDS
            </div>
            <div className="explore-box">
                <button className="explore-button">
                    <div id="left-explore-buttonside"><ExploreIcon className="public-server-friend-icon"/><span>
                    &nbsp;&nbsp;Explore Public Servers</span></div>
                    <div></div>
                    <div id="right-explore-buttonside"><KeyboardArrowRightIcon/></div>
                </button>
            </div>
            <div id="add-friend-wumpus">
            <div className="all-wumpus-image"/>
            <div className="wumpus-desc">
                Wumpus is waiting on friends. You don't have to though!
            </div></div>
            </div></>) }
                <div className="activity-bar">
                    <div className="activity-bar-container">
                        <div className ="activity-bar-wrapper">
                            <div className="activity-heading">
                            Active Now</div>
                            <div id="activity-lonely">
                                <div className="activity-heading">
                                    It's quiet for now...
                                </div>
                                <div id="activity-desc">
                                    When a friend starts an activity-like playing a game or
                                    <br/> hanging out on voice-we'll show it here!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
    else if(serverId==='@me') {
        return(
            <>
            <div className="top-bar">
                <ul className = "top-left-side">
                    <li>
                        <div className= "top-main-header">
                            <PeopleAltIcon className="top-main-icon"/>
                            Friends
                        </div>
                    </li>
                    <li className = "top-bar-divider"/>
                    <ul className ="top-left-interactions">
                        <li onClick={(e)=>handleButtonClick(e, 0)}>
                            Online
                        </li>
                        <li onClick={(e)=>handleButtonClick(e, 1)}>
                            All
                        </li>
                        <li onClick={(e)=>handleButtonClick(e, 2)}>
                            Pending
                        </li>
                        <li onClick={(e)=>handleButtonClick(e, 3)}>
                            Blocked
                        </li>
                        <li id="add_friend_button" ref={addFriendRef} onClick={(e)=>handleButtonClick(e,4)}>
                            Add Friend
                        </li>
                    </ul>
                </ul>
                <ul className ="top-right-side">
                    <li><ChatBubbleIcon/></li>
                    <li className = "top-bar-divider"/>
                    <li><InboxIcon/></li>
                    <li><HelpIcon/></li>
                </ul>
            </div> 
        <div className="content">
            <div className="message-show-container">
                <ul className="messages">
                    <li className="welcome-dm">
                        <span className="material-icons user-icon profile-icon" style={{color: "white", fontSize: 60}}>discord</span>
                        <div className="welcome-dm-heading">Testing</div>
                                
                        <div className="welcome-dm-desc">This is the beginning of your direct message history with <span className="highlighted-user">@Testing</span>.</div>
                    </li>
                    
                    <li className="timeline-dividier server">
                        <span>February 29, 9001</span>
                    </li>
                    <li className="message">
                        <div className="message-header">
                            <div className="message-user-icon">
                                <span className="material-icons user-icon messenger-icon" style={{color: "white", fontSize: 30}}>discord</span>
                            </div>
                            <div className="message-topping">
                                <span className="message-username">
                                    User
                                </span>
                                <span className="message-date">
                                    03/02/2023 3:13 PM
                                </span>
                            </div>
                        </div>
                        <div className="message-content">
                            Hello World
                        </div>
                        <div className="message-button-container">
                            
                        </div>
                    </li>
                    
                </ul>
                <form className="message-input-form">
                    <input className="message-input" type="text" placeholder="Message here"/>
                </form>
            </div>
        </div>
       </> );
    }
    else return <div className="content"/>
}