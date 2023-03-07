import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import './UserPanel.css';


export default function UserPanel() {
    const location = useLocation();
    const url = location.pathname;
    const sessionUser = useSelector(state => state.session.user);

    const [muteToggle, setMuteToggle] = useState(false);
    const [deafenToggle, setDeafenToggle] = useState(false);
    
    if(!sessionUser) return <Redirect to="/login" />;
    
    if (!url.includes('/channels')
    && !url.includes('/guild-discovery')
    && !url.includes('/store')) return null;

    return (
        <div id="user-panel">
            <div id="user-box-wrapper">
                <div id="user-box">
                    <div className="user-icon">
                        <span className="material-icons icon" style={{color: "white", fontSize: 22.5}}>discord</span>
                    </div>
                    <div id="user-panel-info">
                        {sessionUser.username}
                    </div>
                </div>
            </div>
            <div id="setting-buttons">
                <div onClick={()=> setMuteToggle(!muteToggle)}>
                    {muteToggle ? <MicIcon /> : <MicOffIcon 
                    sx={{transform: "rotateY(180deg)"}}/>}
                </div>
                <div onClick={()=> setDeafenToggle(!deafenToggle)}>
                    {deafenToggle ? <HeadsetIcon
                    sx={{scale: "1.08",
                    translate: "0px 1px"}}/> : <HeadsetOffIcon 
                    sx={{transform: "rotateY(180deg)",
                    scale: "1.08"
                    }}/>}
                </div>
                <div>
                    <SettingsIcon/>
                </div>
            </div>
        </div>
    )
}