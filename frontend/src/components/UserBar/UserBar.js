import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams, useHistory, Link } from "react-router-dom";
import { getChannels, resetChannels, fetchChannels, updateChannel, receiveChannel } from '../../store/channels';
import { getServer, fetchServer } from '../../store/servers';
import { getFriendRequests } from '../../store/FriendRequests';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditIcon from '@mui/icons-material/Edit';
import { Modal } from '../../context/Modal';
import ServerEdit from '../ServerEditModal/ServerEdit';
import ChannelForm from '../ChannelFormModal/ChannelForm';
import { fetchUsers } from '../../store/users';
import UserPanel from '../UserPanel/UserPanel';
import './UserBar.css';
import consumer from '../../consumer';

function UserBar({ refreshState }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const url = location.pathname;
    const { serverId, channelId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(state => state.channels);
    // const channels = useSelector(getChannels);
    const [currentChannel, setCurrentChannel] = useState(null);
    // const dms = useSelector(getDirectMessages);
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState([]);
    const friendRequests = useSelector(getFriendRequests);
    const acceptedRequests = friendRequests.filter(friendRequest => friendRequest.status === "accepted");
    // const friendList = acceptedRequests.map(friendRequest => friendRequest && friendRequest.senderId === sessionUser.id ? users[friendRequest.receiverId] : users[friendRequest.senderId]);
    // const dmList = channels.filter(channel => !channel.channelType.includes('hidden'));
    // // const dmUsers = dmList.map(channel => channel.dmMembers?.filter(user => user.id !== sessionUser.id)[0]);
    // const dmUsers = acceptedRequests.map(friendRequest => {
    //     const membersArray = friendRequest.dmChannel.dmMembers ? Object.values(friendRequest.dmChannel.dmMembers) : [];
    //     const filteredMembers = membersArray.filter((user) => user.id !== sessionUser.id);
    //     return filteredMembers.length > 0 ? filteredMembers[0] : null;
    // });
    // const dmSetUsers = useSelector(state => state.dms.users);

    const [loaded, setLoaded] = useState(false);

    const friendSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>;
    const nitroSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.98966977,9.35789159 C2.98966977,9.77582472 2.63442946,10.1240466 2.20807287,10.1240466 L1.78171628,10.1240466 C1.35535969,10.1240466 0.999948837,9.77582472 0.999948837,9.35789159 C0.999948837,8.93995846 1.35535969,8.59173658 1.78171628,8.59173658 L2.20807287,8.59173658 C2.63442946,8.59173658 2.98966977,8.93995846 2.98966977,9.35789159 Z M22.2467643,9.14892503 C24.0942527,12.9800344 22.3888264,17.5772989 18.3384388,19.3882867 C14.4302837,21.1297305 9.74036124,19.457998 7.9638186,15.6268886 C7.60857829,14.8607335 7.3954,14.0248673 7.32428372,13.189001 L5.76091938,13.189001 C5.33456279,13.189001 4.97932248,12.840612 4.97932248,12.4226788 C4.97932248,12.0047457 5.33456279,11.6565238 5.76091938,11.6565238 L8.03493488,11.6565238 C8.46129147,11.6565238 8.81653178,11.3083019 8.81653178,10.8903688 C8.81653178,10.4724357 8.46129147,10.1240466 8.03493488,10.1240466 L4.41090388,10.1240466 C3.98454729,10.1240466 3.62913643,9.77582472 3.62913643,9.35789159 C3.62913643,8.93995846 3.98454729,8.59173658 4.41090388,8.59173658 L9.45606667,8.59173658 C9.88242326,8.59173658 10.2376636,8.24334752 10.2376636,7.82541439 C10.2376636,7.40748126 9.88242326,7.05925937 9.45606667,7.05925937 L7.3954,7.05925937 C6.75586512,7.05925937 6.18727597,6.57161499 6.18727597,5.87517123 C6.18727597,5.24827153 6.68474884,4.69091591 7.3954,4.69091591 L15.4250589,4.69091591 C18.267493,4.8303384 20.9676946,6.43235968 22.2467643,9.14892503 Z M13.2662961,8.38056332 C11.0193969,9.3919615 10.0341721,11.9973566 11.065955,14.1998642 C12.097738,16.4023718 14.755645,17.3681317 17.0025442,16.3567335 C19.249614,15.3453354 20.2346682,12.7399402 19.2028853,10.5374326 C18.1711023,8.33492503 15.5131953,7.36916515 13.2662961,8.38056332 Z M16.8462589,9.84548582 L18.2673907,12.2138293 C18.338507,12.3530846 18.338507,12.4227958 18.2673907,12.5620512 L16.8462589,14.9303946 C16.7751426,15.0696499 16.6330806,15.0696499 16.5619643,15.0696499 L13.7906465,15.0696499 C13.6485845,15.0696499 13.5774682,14.9999387 13.5065225,14.9303946 L12.0852202,12.5620512 C12.0142744,12.4227958 12.0142744,12.3530846 12.0852202,12.2138293 L13.5065225,9.84548582 C13.5774682,9.7062305 13.7197008,9.7062305 13.7906465,9.7062305 L16.5619643,9.7062305 C16.7041969,9.63651925 16.7751426,9.7062305 16.8462589,9.84548582 Z"></path></svg>;

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

    const handleHideChannel = (e) => {
        e.preventDefault();
        setErrors([]);
        const newChannel = { ...currentChannel, channelType: currentChannel.channelType + ` hidden/${sessionUser.id}` };
        // return dispatch(updateChannel(newChannel)).then(() => {
        //     setCurrentChannel(null);
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
        updateChannel(newChannel);
        setCurrentChannel(null);
    }

    useEffect(() => {
        Promise.all([
            dispatch(fetchChannels()),
        ]).then(() => setLoaded(true));

        const subscription = consumer.subscriptions.create(
            { channel: "UsersChannel", id: sessionUser.id },
            {
                received: (channel) => {
                    switch (channel.type) {
                        case "UPDATE_CHANNEL":
                            dispatch(receiveChannel(channel));
                            break;
                        default:
                            break;
                    }
                },
                error: () => {
                    history.push("/channels/@me");
                }
            }
        );
        return () => {
            subscription.unsubscribe();
        }

    }, [dispatch, serverId, channelId, channels.length, refreshState]);


    return (
        <div className="user-bar">
            <nav id="left-navbar">
                <div id="left-navbar-header-alt">
                    <div id="left-navbar-header-box-alt">
                        <button className="searchbar">
                            <a href="https://www.linkedin.com/in/kennytram/" target="_blank" rel="noreferrer"><div id="conversation-text">Created by Kenny Tram</div></a>
                        </button>
                    </div>
                </div>

                <ul id="dm-header-sections">
                    <li className="dm-header-section" onClick={() => { history.push("/channels/@me") }}>
                        <div className="header-section-box" >
                            {/* <PeopleAltIcon /> */}
                            {friendSVG}
                            <div className="header-name">Friends</div>
                        </div>
                    </li>

                    <a href="https://github.com/kennytram" target="_blank" rel="noreferrer">
                        <li className="dm-header-section">
                            <div className="header-section-box">
                                <div id="nitro-box">
                                    {/* <CatchingPokemonIcon sx={{ rotate: '180deg' }} className="nitro" /> */}
                                    {nitroSVG}
                                    <div className="header-name">Github</div>
                                </div>
                            </div>

                        </li>
                    </a>

                </ul>

                <div id="dm-box">
                    <div id="dm-title">
                        DIRECT MESSAGES
                    </div>
                    <div className="add-symbol">
                        {/* <div className="add-dm">+</div>
                        <div className="add-symbol-tooltip">
                            <div className="tooltip-text">
                                Create DM
                            </div>
                        </div> */}
                    </div>
                </div>

                <ul id="direct-messages">
                    {/* {loaded && dmList.length && (
                        dmList.map((dm, index) => {
                            <li className="dm" key={dm.id}>
                                <Link to={`/channels/@me/${dm.id}`} className="dm-link">
                                    <div className="dm-wrapper" onMouseOver={() => setCurrentChannel(channels[dm.id])}>
                                        <div className="dm-user-info">
                                            <div
                                                className="user-icon dm-user-icon"
                                                style={
                                                    { backgroundColor: colorById(dmUsers[index].id) }
                                                }
                                            >
                                                {dmUsers[index].photoUrl ? (
                                                    <img
                                                        src={dmUsers[index].photoUrl}
                                                        className="user-icon dm-user-icon"
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
                                                <div className={`user-status-bubble ${dmUsers[index].isOnline ? dmUsers[index].status : "invisible"}`}>
                                                    <div className={`user-status-bubble-inner  ${dmUsers[index].isOnline ? dmUsers[index].status : "invisible"}`}></div>
                                                </div>
                                            </div>
                                            <div id="user-panel-info">{dmUsers[index].username}</div>
                                        </div>
                                        <CloseIcon className="dm-exit" onClick={handleHideChannel} />
                                    </div>
                                </Link>
                            </li>
                        })
                    )} */}
                    {loaded && acceptedRequests.length > 0 && Object.keys(users).length > 0 && Object.keys(channels).length > 0 && sessionUser && acceptedRequests.map(acceptedRequest => {
                        if (acceptedRequest && acceptedRequest.dmChannel && channels[acceptedRequest.dmChannel.id] && !channels[acceptedRequest.dmChannel.id].channelType.includes(`hidden/${sessionUser.id}`)) {
                            return (
                                <li className="dm" key={acceptedRequest.id}>
                                    <Link to={`/channels/@me/${acceptedRequest.dmChannel.id}`} className="dm-link">
                                        <div className="dm-wrapper" onMouseOver={() => setCurrentChannel(channels[acceptedRequest.dmChannel.id])}>
                                            <div className="dm-user-info">
                                                <div
                                                    className="user-icon dm-user-icon"
                                                    style={
                                                        acceptedRequest && sessionUser && acceptedRequest.senderId === sessionUser.id
                                                            ? { backgroundColor: colorById(acceptedRequest.receiverId) }
                                                            : { backgroundColor: colorById(acceptedRequest.senderId) }
                                                    }
                                                >
                                                    {acceptedRequest.senderId === sessionUser.id ? (
                                                        users[acceptedRequest.receiverId] && users[acceptedRequest.receiverId].photoUrl ? (
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
                                                    ) : users[acceptedRequest.senderId] && users[acceptedRequest.senderId].photoUrl ? (
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
                                    ${acceptedRequest && acceptedRequest.senderId === sessionUser.id && Object.keys(users).length && users[acceptedRequest.receiverId] && users[acceptedRequest.receiverId].isOnline && users[acceptedRequest.senderId] && users[acceptedRequest.senderId].isOnline ?
                                                            users[acceptedRequest.receiverId].isOnline ? users[acceptedRequest.receiverId].status : "invisible"
                                                            : users[acceptedRequest.senderId].isOnline ? users[acceptedRequest.senderId].status : "invisible"}
                                    friends-status-bubble`}>
                                                        <div className={`user-status-bubble-inner 
                                        ${acceptedRequest && acceptedRequest.senderId === sessionUser.id && Object.keys(users).length && users[acceptedRequest.receiverId] && users[acceptedRequest.receiverId].isOnline && users[acceptedRequest.senderId] && users[acceptedRequest.senderId].isOnline ?
                                                                users[acceptedRequest.receiverId].isOnline ? users[acceptedRequest.receiverId].status : "invisible"
                                                                :
                                                                users[acceptedRequest.senderId].isOnline ? users[acceptedRequest.senderId].status : "invisible"} 
                                        friends-status-bubble`}></div>
                                                    </div>
                                                </div>
                                                <div id="user-panel-info">
                                                    {acceptedRequest && acceptedRequest.senderId === sessionUser.id ? users[acceptedRequest.receiverId].username : users[acceptedRequest.senderId].username}
                                                </div>
                                            </div>
                                            <CloseIcon className="dm-exit" onClick={handleHideChannel} />
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    })}
                </ul>

            </nav>
            <UserPanel />
        </div >
    )
}

export default UserBar;