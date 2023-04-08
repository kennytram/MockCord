import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import ChannelBar from '../ChannelBar/ChannelBar';
import ServerToolBar from '../ServersContent/ServerToolBar';
import ServerContent from '../ServersContent/ServerContent';
import { fetchChannels } from '../../store/channels';
import consumer from '../../consumer';
import { useParams } from 'react-router-dom';
import { receiveChannel, fetchChannel, deleteChannel, updateChannel } from '../../store/channels';
import {receiveServerChannel, removeServerChannel} from '../../store/servers';
import './ServerPage.css';

function ServerPage() {
    const dispatch = useDispatch();
    const {serverId, channelId} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);

    // useEffect (() => {
        
    //     const channelSubscription = consumer.subscriptions.create(
    //         { channel: "ServersChannel", id: serverId },
    //         {
    //             received: (channel) => {
    //                 switch (channel.type) {
    //                     case "RECEIVE_CHANNEL":
    //                         dispatch(receiveServerChannel(channel));
    //                         break;
    //                     case "DESTROY_CHANNEL":
    //                         dispatch(removeServerChannel(channel.id));
    //                         setData("");
    //                         break;
    //                     case "UPDATE_CHANNEL":
    //                         dispatch(receiveServerChannel(channel));
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //                 // console.log(channel);
    //                 setData(channel);
    //             }
                
    //         }
    //     );
    //     return () => {
    //         channelSubscription?.unsubscribe();
    //     }



    // }, [dispatch, serverId, channelId])

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