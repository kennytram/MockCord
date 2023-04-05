import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import ChannelBar from '../ChannelBar/ChannelBar';
import FriendsContent from '../FriendsContent/FriendsContent';
import { fetchChannels } from '../../store/channels';
import './ServerPage.css';

function ServerPage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    // useEffect(() => {
    //     Promise.all([
    //         dispatch(fetchChannels()),
    //     ]).then(() => setLoaded(true));
    // }, [dispatch]);
    return (
        <div className="server-page">
            <NavBar />
            <ChannelBar/>
            {/* <FriendsContent/> */}
        </div>
    )
}

export default ServerPage;