import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import { getChannels, resetChannels, fetchChannels } from '../../store/channels';
import { getServer, fetchServer } from '../../store/servers';
import './LeftSideBar.css';
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
import { fetchDirectMessages, getDirectMessages } from '../../store/dms';
import { fetchUsers } from '../../store/users';
import DirectMessageDelete from '../DirectMessageDeleteModal/DirectMessageDelete';
export default function LeftSideBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = location.pathname;
  const { serverId, channelId, dmId } = useParams();
  const server = useSelector(getServer(serverId));
  const sessionUser = useSelector(state => state.session.user);
  const channels = useSelector(getChannels);
  const dms = useSelector(getDirectMessages);
  const users = useSelector(state => state.users);
  const dmSetUsers = useSelector(state => state.dms.users);

  const [showEditServerModal, setEditServerModal] = useState(false);
  const [showCreateChannelModal, setCreateChannelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    if (serverId) {

      if (!isNaN(serverId)) {
        dispatch(fetchServer(serverId));
      }
      else if (sessionUser && serverId === "@me" || dmId) {
        dispatch(fetchDirectMessages());
      }

    }
  }, [dispatch, sessionUser, serverId, dmId]);

  if (!sessionUser) return <Redirect to="/login" />;
  if (!url.includes('/servers')) return null;

  if (!isNaN(serverId)) {
    return (
      <nav id="left-navbar">
        <div id="left-navbar-header">
          <div id="left-navbar-header-box">
            {server ? `${server.name}` : 'Placeholder Name'}
            <EditIcon onClick={() => {
              document.body.style.overflow = 'hidden';
              setEditServerModal(true);
            }
            } />{showEditServerModal && (
              <Modal onClose={() => setEditServerModal(false)} className="edit-server">
                <ServerEdit onClose={() => setEditServerModal(false)} />
              </Modal>
            )}
          </div>
        </div>
        <ul id="channel-categories">
          <li key="first-category">
            <div>
              <ExpandMoreIcon fontSize="4px" className="down-category-symbol" />
              TEXT CHANNELS
            </div>
            <span className="add-symbol" onClick={() => {
              document.body.style.overflow = 'hidden';
              setCreateChannelModal(true);
            }}>+</span>{showCreateChannelModal && (
              <Modal onClose={() => setCreateChannelModal(false)} className="create-server">
                <ChannelForm onClose={() => setCreateChannelModal(false)} />
              </Modal>
            )}
          </li>
          <ul id="channels">
            {channels.map(channel => (
              <NavLink key={channel.id} className="channel-navlink" to={`/servers/${serverId}/channels/${channel.id}`}>
                <div className="channel-wrapper">
                  <li >
                    <NumbersIcon className="tag-icon" />&nbsp; <span>
                      <div className="channel">{channel.name}</div>
                    </span>
                  </li>
                </div>
              </NavLink>
            ))}
          </ul>
        </ul>
      </nav>
    )
  }
  else if (serverId === "@me") {
    return (
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
          {dms.map((dm, i) => i === Object.keys(dms).length - 1 ? null : (
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
          ))}
        </ul>
      </nav>
    )

  }
  else if (dmId) {
    return (
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
          {dms.map((dm, i) => i === Object.keys(dms).length - 1 ? null : (
            <li className="dm">
              <NavLink key={dm.id} className="dm-navlink" to={`/servers/@me/dms/${dm.id}`}>
                <div className="dm-wrapper">
                  <div className="dm-user-info">
                    <div className="user-icon dm-user-icon">
                      <div className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</div>
                    </div>
                    <div id="user-panel-info">
                      {dmSetUsers ? dmSetUsers[dm.otherUserId] ? dmSetUsers[dm.otherUserId].username : "" : ""}
                    </div>
                  </div>
                  <CloseIcon className="dm-exit" onClick={() => setShowDeleteModal(true)} />{showDeleteModal && (
                    <Modal onClose={() => setShowDeleteModal(false)} className="create-server">
                      <DirectMessageDelete onClose={() => setShowDeleteModal(false)} />
                    </Modal>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  else return <nav id="left-navbar" />;
}