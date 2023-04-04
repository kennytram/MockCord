import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import * as sessionActions from '../../store/session';
import './UserPanel.css';


export default function UserPanel() {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname;
    const sessionUser = useSelector(state => state.session.user);

    const [muteToggle, setMuteToggle] = useState(false);
    const [deafenToggle, setDeafenToggle] = useState(false);

    if (!sessionUser) return <Redirect to="/login" />;

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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    if (!url.includes('/servers')
        && !url.includes('/guild-discovery')
        && !url.includes('/store')) return null;

    return (
        <div id="user-panel">
            <div id="user-box-wrapper">
                <div id="user-box">
                    <div className="user-icon" style={{ backgroundColor: `${colorById(sessionUser.id)}` }}>
                        <span className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</span>
                        {/* <rect x="0" y="0" rx="3" ry="3" width="70" height="70" /> */}
                        <div className={`user-status-bubble ${sessionUser.status}`}>
                            <div className={`user-status-bubble-inner ${sessionUser.status}`}></div>
                        </div>
                    </div>
                    <div id="user-panel-info">
                        <div id="user-panel-username">{sessionUser.username}</div>
                        <div id="user-panel-tag">#{sessionUser.tag}</div>
                    </div>
                </div>
            </div>
            <div id="setting-buttons">
                <div className="user-panel-mute" onClick={() => setMuteToggle(!muteToggle)}>
                    {muteToggle ? <MicIcon /> : <MicOffIcon
                        sx={{ transform: "rotateY(180deg)" }} />}
                    <div className="user-panel-tooltip">
                        <div className="tooltip-text">
                            {muteToggle ? "Mute" : "Unmute"}
                        </div>
                    </div>
                </div>
                <div className="user-panel-deafen" onClick={() => setDeafenToggle(!deafenToggle)}>
                    {deafenToggle ? <HeadsetIcon
                        sx={{
                            scale: "1.08",
                            translate: "0px 1px"
                        }} /> : <HeadsetOffIcon
                        sx={{
                            transform: "rotateY(180deg)",
                            scale: "1.08"
                        }} />}
                    <div className="user-panel-tooltip">
                        <div className="tooltip-text">
                            {deafenToggle ? "Deafen" : "Undeafen"}
                        </div>
                    </div>
                </div>
                <div className="user-panel-logout" onClick={logout}>
                    <LogoutIcon style={{ color: "var(--danger)" }} />
                    {/* <SettingsIcon /> */}
                    <div className="user-panel-tooltip">
                        <div className="tooltip-text">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}