import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import ChannelBar from '../ChannelBar/ChannelBar';
import ServerToolBar from '../ServersContent/ServerToolBar';
import ServerContent from '../ServersContent/ServerContent';
import { fetchChannels } from '../../store/channels';
import './ServerPage.css';

function ServerPage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="server-page">
            <NavBar />
            <ChannelBar/>
            {/* <ServerToolBar/> */}
            <div className="server-page-content">
                <ServerToolBar />
                <ServerContent />
            </div> 
        </div>
    )
}

export default ServerPage;