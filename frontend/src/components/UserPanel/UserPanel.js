import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { updateUser, fetchUser } from '../../store/users';
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import * as sessionActions from '../../store/session';
import {getUser} from '../../store/users';
import './UserPanel.css';


export default function UserPanel() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const url = location.pathname;
    const sessionUser = useSelector(state => state.session.user);

    const [muteToggle, setMuteToggle] = useState(true);
    const [deafenToggle, setDeafenToggle] = useState(true);

    const mutedMicSVG = <svg aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z" fill="currentColor"></path><path d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z" fill="currentColor"></path><path d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z" fill="currentColor"></path><path d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z" fill="var(--danger)"></path></svg>;
    const deafenSVG = <svg aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path d="M6.16204 15.0065C6.10859 15.0022 6.05455 15 6 15H4V12C4 7.588 7.589 4 12 4C13.4809 4 14.8691 4.40439 16.0599 5.10859L17.5102 3.65835C15.9292 2.61064 14.0346 2 12 2C6.486 2 2 6.485 2 12V19.1685L6.16204 15.0065Z" fill="currentColor"></path><path d="M19.725 9.91686C19.9043 10.5813 20 11.2796 20 12V15H18C16.896 15 16 15.896 16 17V20C16 21.104 16.896 22 18 22H20C21.105 22 22 21.104 22 20V12C22 10.7075 21.7536 9.47149 21.3053 8.33658L19.725 9.91686Z" fill="currentColor"></path><path d="M3.20101 23.6243L1.7868 22.2101L21.5858 2.41113L23 3.82535L3.20101 23.6243Z" fill="var(--danger)"></path></svg>
    const undeafenSVG = <svg aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z" fill="currentColor"></path></svg></svg>
    // if (!sessionUser) return <Redirect to="/login" />;

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
        dispatch(sessionActions.logout()).then(() => {
            history.push('/login');
        });
    };

    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = reader.result;
            dispatch(updateUser({ id: sessionUser.id, photo: img })).then((res) => {
                console.log(sessionUser.id);
                dispatch(sessionActions.restoreSession());
                dispatch(fetchUser(sessionUser.id));
            });
        };
    };

    // if (!url.includes('/channels')
    //     && !url.includes('/guild-discovery')
    //     && !url.includes('/store')) return null;

    return (
        <div id="user-panel">
            <div id="user-box-wrapper">
                <div id="user-box">
                    {sessionUser && (<>
                        <div className="user-icon" style={sessionUser ? { backgroundColor: `${colorById(sessionUser.id)}` } : { backgroundColor: `var(--brand)` }}>
                            {sessionUser && sessionUser.photoUrl ? <img className="user-image icon" src={sessionUser.photoUrl} alt="user-icon" /> 
                            : <span className="material-icons icon" style={{ color: "white", fontSize: 22.5 }}>discord</span>}
                            
                            {/* <rect x="0" y="0" rx="3" ry="3" width="70" height="70" /> */}
                            <div className={`user-status-bubble ${sessionUser.status}`}>
                                <div className={`user-status-bubble-inner ${sessionUser.status}`}></div>
                            </div>
                            <input type="file" title=" " accept=".jpg, .jpeg, .png" max="5MB" id="user-panel-img-upload" onChange={handleImgUpload}/>
                        </div>
                        <div id="user-panel-info">
                            <div id="user-panel-username">{sessionUser.username}</div>
                            <div id="user-panel-tag">#{sessionUser.tag}</div>
                        </div>
                    </>)}
                </div>
            </div>
            <div id="setting-buttons">
                <div className="user-panel-mute" onClick={() => setMuteToggle(!muteToggle)}>
                    {muteToggle ? <MicIcon /> :
                        <>{mutedMicSVG}</>
                    }
                    <div className="user-panel-tooltip">
                        <div className="tooltip-text">
                            {muteToggle ? "Mute" : "Unmute"}
                        </div>
                    </div>
                </div>
                <div className="user-panel-deafen" onClick={() => setDeafenToggle(!deafenToggle)}>
                    {deafenToggle ? <>{undeafenSVG}</>
                        // <HeadsetIcon
                        //     sx={{
                        //         scale: "1.08",
                        //         translate: "0px 1px"
                        //     }} /> 
                        : <>{deafenSVG}</>
                        // <HeadsetOffIcon
                        // sx={{
                        //     transform: "rotateY(180deg)",
                        //     scale: "1.08"
                        // }} />
                    }
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