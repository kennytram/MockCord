import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useLocation, useHistory } from "react-router-dom";
import { fetchServer, fetchServers, getServers } from '../../store/servers';
import { getChannels } from '../../store/channels';
import ExploreIcon from "@mui/icons-material/Explore";
import { DownloadSimple } from 'phosphor-react';
import * as sessionActions from '../../store/session';
import * as serverActions from '../../store/servers';
import './NavBar.css';
import { Modal } from '../../context/Modal';
import ServerForm from '../ServerFormModal/ServerForm';


export default function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectorRef = useRef(null);
  const url = location.pathname;
  const sessionUser = useSelector(state => state.session.user);
  const servers = useSelector(getServers);
  const channels = useSelector(state => state.channels);

  const [showServerModal, setShowServerModal] = useState(false);

  useEffect(() => {
    if (selectorRef.current) {
      const navLink = selectorRef.current.querySelector('a.active');
      if (navLink) {
        selectorRef.current.classList.add('current');
      }
    }
    if (sessionUser) {

      dispatch(fetchServers());
    };
  }, [dispatch, sessionUser]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const addSelected = (e) => {
    const child = e.currentTarget.querySelector(".icon-wrapper");
    child.classList.add("selected");
  }

  const removeSelected = (e) => {
    const child = e.currentTarget.querySelector(".icon-wrapper");
    child.classList.remove("selected");
  }

  const removePrevCurrent = (e) => {
    const navLink = e.currentTarget.querySelector('a.active');

    if (navLink) {
      const grandFather = navLink.parentElement.parentElement;
      if (e.currentTarget.querySelectorAll('.current').length > 1) {
        grandFather.classList.remove('current');
      }
    }
  }

  const addCurrent = (e) => {
    e.currentTarget.parentElement.classList.add('current');
  }

  if (!sessionUser) return <Redirect to="/login" />;
  if (!url.includes('/servers')
    && !url.includes('/guild-discovery')
    && !url.includes('/store')) return null;

  return (
    <nav id="navbar">

      <ul id="server-list" onClick={removePrevCurrent}>
        <li key="@me">
          <div className="icon-box-wrapper" ref={selectorRef}>
            <div className="icon-box" onClick={addCurrent} onMouseOver={addSelected} onMouseLeave={removeSelected}>
              <NavLink to={{
                pathname: "/servers/@me"
              }}>
                <div className="icon-wrapper">
                  <div className="server-icon">
                    <span className="material-icons icon" style={{ color: "white", fontSize: 29 }}>discord</span>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </li>

        <div className="nav-separator">
          <div className="nav-line-separator" />
        </div>

        <ul id="servers">
          {servers.map(server => (
            <li key={server.id}>
              <div className="icon-box-wrapper">
                <div className="icon-box" onClick={addCurrent} onMouseOver={addSelected} onMouseLeave={removeSelected}>
                  <NavLink to={{
                    pathname: `/servers/${server.id}/channels/${server.defaultChannel}`
                  }}>
                    <div className="icon-wrapper">
                      <div className="server-icon">
                        {server.name[0].toUpperCase()}
                      </div>
                    </div>
                  </NavLink>
                  { }
                </div>
              </div>
            </li>
          ))}
        </ul>

        <li key="add-server">
          <div className="icon-box-wrapper-alt">
            <div className="icon-box green"
              onMouseOver={addSelected}
              onMouseLeave={removeSelected}>
              <div className="icon-wrapper">
                <div className="server-icon" onClick={() => setShowServerModal(true)}>
                  +
                </div>{showServerModal && (
                  <Modal onClose={() => setShowServerModal(false)} className="create-server">
                    <ServerForm onClose={() => setShowServerModal(false)} />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </li >

        <li key="explore-servers">
          <div className="icon-box-wrapper">
            <div className="icon-box green" onMouseOver={addSelected} onMouseLeave={removeSelected}>
              <div className="icon-wrapper">
                <div className="server-icon">
                  <ExploreIcon />
                </div>
              </div>
            </div>
          </div>
        </li>

        <div className="nav-separator">
          <div className="nav-line-separator" />
        </div>

        <li key="logout">
          <div className="icon-box-wrapper">
            <div className="icon-box green" onMouseOver={addSelected} onMouseLeave={removeSelected}>
              <div onClick={logout}>
                <div className="icon-wrapper">
                  <div className="server-icon">
                    <DownloadSimple font={"true"} size={28} fontWeight={700} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

      </ul>
    </nav>
  )
}