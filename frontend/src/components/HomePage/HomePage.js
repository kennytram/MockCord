import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import UserBar from '../UserBar/UserBar';
import FriendsContent from '../FriendsContent/FriendsContent';
import { fetchUsers } from '../../store/users';
import { fetchServers, joinServer, receiveServer, removeServer } from '../../store/servers';
import { receiveFriendRequest, removeFriendRequest } from '../../store/FriendRequests';
import consumer from '../../consumer';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [refreshState, setRefreshState] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const { serverId } = useParams();
    const history = useHistory();


    useEffect(() => {
        Promise.all([
            dispatch(fetchUsers())
        ]).then(() => {
            setLoaded(true);
        });
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
                    switch (friendRequest.type) {
                        case "RECEIVE_FRIEND_REQUEST":
                            dispatch(receiveFriendRequest(friendRequest));
                            break;
                        case "DESTROY_FRIEND_REQUEST":
                            dispatch(removeFriendRequest(friendRequest.id, friendId));
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

        // const subscription = consumer.subscriptions.create(
        //     { channel: "ServersChannel", id: serverId },
        //     {

        //         received: (server) => {
        //             switch (server.type) {
        //                 case "JOIN_SERVER":
        //                     dispatch(receiveServer(server));
        //                     break;
        //                 case "LEAVE_SERVER":
        //                     dispatch(removeServer(server.id));
        //                     break;
        //                 case "KICK_SERVER":
        //                     dispatch(removeServer(server));
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         }
        //         // setRefreshState(!refreshServerState);
        //     },
        // );

    return () => {
        friendRequestsSubscription?.unsubscribe();
        // subscription?.unsubscribe();
    }

}, [dispatch, refreshState]);

return (
    <div className="home-page">
        <NavBar refreshState={refreshState} />
        <UserBar refreshState={refreshState} />
        <FriendsContent className="friends-content" refreshState={refreshState} />
    </div>
)
}

export default HomePage;