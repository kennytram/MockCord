import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Redirect, NavLink, useLocation, useHistory } from "react-router-dom";
import { fetchServer, fetchServers, getServers, joinServer } from '../../store/servers';
import { getChannels } from '../../store/channels';
import ExploreIcon from "@mui/icons-material/Explore";
import { DownloadSimple } from 'phosphor-react';
import LogoutIcon from '@mui/icons-material/Logout';
import * as sessionActions from '../../store/session';
import * as serverActions from '../../store/servers';
import './NavBar.css';
import { Modal } from '../../context/Modal';
import ServerForm from '../ServerFormModal/ServerForm';
import { fetchUsers, getUsers } from '../../store/users';
import consumer from '../../consumer';

export default function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { serverId, inviteToken } = useParams();
  const selectorRef = useRef(null);
  const url = location.pathname;
  const sessionUser = useSelector(state => state.session.user);
  const servers = useSelector(getServers);
  // const currentUser = useSelector(state => state.users[sessionUser.id]);
  const users = useSelector(getUsers);
  const addServerElement = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showServerModal, setShowServerModal] = useState(false);
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  //   import consumer from '../channels/consumer';

  // consumer.subscriptions.create(
  //   { channel: 'ChatChannel', room_id: 123 },
  //   {
  //     received: data => {
  //       console.log('Received data:', data);
  //     }
  //   }
  // );


  useEffect(() => {
    if (selectorRef.current) {
      const navLink = selectorRef.current.querySelector('a.active');
      if (navLink) {
        navLink.parentElement.parentElement.classList.add('current');
      }
    }
    
    Promise.all([
      inviteToken ? dispatch(joinServer(serverId, inviteToken)) : null,
      dispatch(fetchServers()),
    ]).then(() => {
      setLoaded(true);
      if (selectorRef.current) {
        const navLink = selectorRef.current.querySelector('a.active');
        if (navLink) {
          navLink.parentElement.parentElement.classList.add('current');
        }
      }
    });
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => {
      history.push('/login');
    });
  };

  const addSelected = (e) => {
    const child = e.currentTarget.querySelector(".icon-wrapper");
    child.classList.add("selected");
  }

  const removeSelected = (e) => {
    const child = e.currentTarget.querySelector(".icon-wrapper");
    child.classList.remove("selected");
  }

  const removePrevCurrent = () => {

    const currents = selectorRef.current.querySelectorAll('.current');
    if (currents) {
      currents.forEach(current => {
        current.classList.remove('current');
      });
    }
  }

  const addCurrent = (e) => {
    removePrevCurrent();
    e.currentTarget.parentElement.classList.add('current');
  }

  const handleMouseEnter = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({ left: 80, top: top + 5 });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleScroll = () => {
    setShowTooltip(false);
  };

  if (!sessionUser) return <Redirect to="/login" />;

  // if (!url.includes('/channels')
  //   && !url.includes('/guild-discovery')
  //   && !url.includes('/store')) return null;
  return (
    <nav id="navbar">
      <ul id="server-list" ref={selectorRef} onScroll={handleScroll}>
        <li key="@me">
          <div className="icon-box-wrapper" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="icon-box" onClick={addCurrent} onMouseOver={addSelected} onMouseLeave={removeSelected}>
              <NavLink to={{
                pathname: "/channels/@me"
              }}>
                <div className="icon-wrapper">
                  <div className="server-icon">
                    <span className="material-icons icon" style={{ color: "white", fontSize: 29 }}>discord</span>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          {showTooltip && (
            <div
              className="navbar-tooltip"
              style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
            >
              <div className="tooltip-text">
                Direct Messages
              </div>
            </div>
          )}
        </li>

        <div className="nav-separator">
          <div className="nav-line-separator" />
        </div>

        <ul id="servers">
          {servers.map(server => (
            server && sessionUser && server.members[sessionUser.id] ? (
              <li key={server.id} >
                <div className="icon-box-wrapper" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="icon-box" onClick={addCurrent} onMouseOver={addSelected} onMouseLeave={removeSelected}>
                    <NavLink to={{
                      pathname: `/channels/${server.id}/${server.defaultChannel}`
                    }}>
                      <div className="icon-wrapper">
                        <div className="server-icon">
                          {server.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 3)}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
                {showTooltip && (
                  <div
                    className="navbar-tooltip"
                    style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
                  >
                    <div className="tooltip-text">
                      {server?.name ? server.name : null}
                    </div>
                  </div>
                )}
              </li>
            ) : null
          ))}
        </ul>

        <li key="add-server" ref={addServerElement}>
          <div className="icon-box-wrapper-alt" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div
              className="icon-box green"
              onMouseOver={addSelected}
              onMouseLeave={showServerModal ? null : removeSelected}
              onClick={() => {
                setShowServerModal(true);
                document.body.style.overflow = "hidden";
                addServerElement.current.querySelector(".icon-wrapper").classList.add("selected");
              }}>
              <div
                className="icon-wrapper">
                <div className="server-icon">
                  +
                </div>
              </div>
            </div>{showServerModal && (
              <Modal onClose={() => {
                setShowServerModal(false);
                document.body.style.overflow = "unset";
                addServerElement.current.querySelector(".icon-wrapper").classList.remove("selected");
              }} className="create-server">
                <ServerForm onClose={() => {
                  setShowServerModal(false);
                  document.body.style.overflow = "unset";
                  addServerElement.current.querySelector(".icon-wrapper").classList.remove("selected");
                }} />
              </Modal>
            )}
          </div>
          {showTooltip && (
            <div
              className="navbar-tooltip"
              style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
            >
              <div className="tooltip-text">
                Add a Server
              </div>
            </div>
          )}
        </li >

        {/* <li key="explore-servers">
            <div className="icon-box-wrapper">
              <div className="icon-box green" onMouseOver={addSelected} onMouseLeave={removeSelected}>
                <div className="icon-wrapper">
                  <div className="server-icon">
                    <ExploreIcon />
                  </div>
                </div>
              </div>
            </div>
          </li> */}

        <div className="nav-separator">
          <div className="nav-line-separator" />
        </div>

        <li key="logout" >
          <div className="icon-box-wrapper" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="icon-box red" onMouseOver={addSelected} onMouseLeave={removeSelected}>
              <div onClick={logout}>
                <div className="icon-wrapper">
                  <div className="server-icon">
                    {/* <DownloadSimple font={"true"} size={28} fontWeight={700} /> */}
                    <LogoutIcon style={{ marginLeft: "4px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showTooltip && (
            <div
              className="navbar-tooltip"
              style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
            >
              <div className="tooltip-text">
                Logout
              </div>
            </div>
          )}
        </li>

      </ul>
    </nav>
  )
}