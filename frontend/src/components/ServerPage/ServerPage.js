import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import ChannelBar from '../ChannelBar/ChannelBar';
import ServerToolBar from '../ServersContent/ServerToolBar';
import ServerContent from '../ServersContent/ServerContent';
import { fetchChannels } from '../../store/channels';
import consumer from '../../consumer';
import { useParams } from 'react-router-dom';
import { receiveChannel, fetchChannel, deleteChannel, updateChannel } from '../../store/channels';
import { receiveServerChannel, removeServerChannel } from '../../store/servers';
import './ServerPage.css';

function ServerPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { serverId, channelId } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);
    const [refreshState, setRefreshState] = useState(false);
    const server = useSelector(state => state.servers[serverId]);
    const [count, setCount] = useState(0);

    useEffect(() => {

        const channelSubscription = consumer.subscriptions.create(
            { channel: "ServersChannel", id: serverId },
            {
                received: (channel) => {
                    switch (channel.type) {
                        case "RECEIVE_CHANNEL":
                            dispatch(receiveServerChannel(channel));
                            break;
                        case "DESTROY_CHANNEL":
                            dispatch(removeServerChannel(channel.id));
                            if (+channelId === channel.id) { history.push(`/channels/${serverId}/${server.defaultChannel}`)} 
                            break;
                        case "UPDATE_CHANNEL":
                            dispatch(receiveServerChannel(channel));
                            break;
                        default:
                            break;
                    }
                    setRefreshState(!refreshState);
                }

            }
        );
        return () => {
            channelSubscription?.unsubscribe();
        }



    }, [dispatch, serverId, channelId, refreshState])

    return (
        <div className="server-page">
            <NavBar />
            <ChannelBar refreshState={refreshState}/>
            <div className="server-page-content">
                <ServerToolBar refreshState={refreshState}/>
                <ServerContent />
            </div>
        </div>
    )
}

export default ServerPage;