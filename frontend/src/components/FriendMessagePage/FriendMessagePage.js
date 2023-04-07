import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import UserBar from '../UserBar/UserBar';
import FriendMessageToolBar from '../FriendMessageContent/FriendMessageToolBar';
import FriendMessageContent from '../FriendMessageContent/FriendMessageContent';
import { fetchChannels } from '../../store/channels';
import './FriendMessagePage.css';
import { fetchFriendRequests } from '../../store/FriendRequests';
import { fetchUsers } from '../../store/users';

function FriendMessagePage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            dispatch(fetchFriendRequests()),
            dispatch(fetchUsers())
        ]).then(() => setLoaded(true));
    }, [dispatch]);

    return (
        <div className="friend-message-page">
            <NavBar />
            <UserBar/>
            <div className="friend-message-page-content">
                <FriendMessageToolBar/>
                <FriendMessageContent/>
            </div> 
        </div>
    )
}

export default FriendMessagePage;