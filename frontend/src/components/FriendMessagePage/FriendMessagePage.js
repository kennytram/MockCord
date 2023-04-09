import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import UserBar from '../UserBar/UserBar';
import FriendMessageToolBar from '../FriendMessageContent/FriendMessageToolBar';
import FriendMessageContent from '../FriendMessageContent/FriendMessageContent';
import { fetchChannels } from '../../store/channels';
import './FriendMessagePage.css';
import { fetchFriendRequests, receiveFriendRequest, removeFriendRequest, getFriendRequest } from '../../store/FriendRequests';
import { fetchUsers } from '../../store/users';
import consumer from '../../consumer';

function FriendMessagePage() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [refreshState, setRefreshState] = useState(false);
    const {channelId} = useParams();
    const friendRequests = useSelector(state => state.friendRequests);
    const history = useHistory();

    useEffect(() => {
        Promise.all([
            dispatch(fetchFriendRequests()),
            dispatch(fetchUsers())
        ]).then(() => setLoaded(true));

        const friendRequestsSubscription = consumer.subscriptions.create(
            { channel: "FriendRequestsChannel", id: sessionUser.id },
            {
                received: (friendRequest) => {
                    let friendId = null;
                    if (friendRequest.sender_id === sessionUser.id) {
                        friendId = friendRequest.receiver_id;
                    } else {
                        friendId = friendRequest.sender_id;
                    }
                    switch(friendRequest.type) {
                        case "RECEIVE_FRIEND_REQUEST":
                            dispatch(receiveFriendRequest(friendRequest));
                            break;
                        case "DESTROY_FRIEND_REQUEST": 
                            dispatch(removeFriendRequest(friendRequest.id, friendId));
                            if (+channelId === friendRequests[friendRequest.id].dmChannel.id) { history.push(`/channels/@me`)} 
                            break;
                        case "UPDATE_FRIEND_REQUEST":
                            dispatch(receiveFriendRequest(friendRequest));
                            break;
                        default:
                            break;
                    }
                    // setRefreshState(!refreshState);
                }
            }
        );

        return () => {
            friendRequestsSubscription?.unsubscribe();
        }

    }, [dispatch, refreshState]);


    return (
        <div className="friend-message-page">
            <NavBar />
            <UserBar refreshStage={refreshState}/>
            <div className="friend-message-page-content">
                <FriendMessageToolBar refreshStage={refreshState} loaded={loaded}/>
                <FriendMessageContent refreshStage={refreshState} loaded={loaded}/>
            </div> 
        </div>
    )
}

export default FriendMessagePage;