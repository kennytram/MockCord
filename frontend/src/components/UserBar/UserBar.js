import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { getChannels, resetChannels, fetchChannels } from '../../store/channels';
import { getServer, fetchServer } from '../../store/servers';
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
import DirectMessageDelete from '../DirectMessageDeleteModal/DirectMessageDelete';
import UserPanel from '../UserPanel/UserPanel';
import './UserBar.css';

function UserBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname;
    const { serverId, channelId } = useParams();
    const server = useSelector(getServer(serverId));
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(getChannels);
    // const dms = useSelector(getDirectMessages);
    const users = useSelector(state => state.users);
    // const dmSetUsers = useSelector(state => state.dms.users);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            dispatch(fetchChannels()),
        ]).then(() => setLoaded(true));
    }, [dispatch, serverId]);

    return (
        <div className="user-bar">
            <nav id="left-navbar">
                <div id="left-navbar-header-alt">
                    <div id="left-navbar-header-box-alt">
                        <button className="searchbar">
                            <div id="conversation-text">Find or start a conversation</div>
                        </button>
                    </div>
                </div>

                <ul id="dm-header-sections">
                    <li className="dm-header-section">
                        <div className="header-section-box">
                            <PeopleAltIcon />
                            <div className="header-name">Friends</div>
                        </div>
                    </li>

                    <li className="dm-header-section">
                        <div className="header-section-box">
                            <div id="nitro-box">
                                <CatchingPokemonIcon sx={{ rotate: '180deg' }} className="nitro" />
                                <div className="header-name">Nitro</div>
                            </div>
                        </div>
                    </li>

                </ul>

                <div id="dm-box">
                    <div id="dm-title">
                        DIRECT MESSAGES
                    </div>
                    <div className="add-symbol">+</div>
                </div>
                
                <ul id="direct-messages">
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    <li className="dm">
                        <div className="dm-wrapper">
                            <div className="dm-user-info">
                                <div className="user-icon dm-user-icon">
                                    <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                                </div>
                                <div id="user-panel-info">
                                    test
                                </div>
                            </div>
                            <CloseIcon className="dm-exit" />
                        </div>
                    </li>
                    {/* {dms.map((dm, i) => i === Object.keys(dms).length - 1 ? null : (
                <li className="dm">
                <NavLink key={dm.id} className="dm-navlink" to={`/servers/@me/dms/${dm.id}`}>
                    <div className="dm-wrapper">
                    <div className="dm-user-info">
                        <div className="user-icon dm-user-icon">
                        <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                        </div>
                        <div id="user-panel-info">
                        {users ? users[dm.otherUserId] ? users[dm.otherUserId].username : "" : ""}
                        </div>
                    </div>
                    <CloseIcon className="dm-exit" />
                    </div>
                </NavLink>
                </li>
            ))} */}
                </ul>
                
            </nav>
            <UserPanel />
        </div >
    )
}

export default UserBar;