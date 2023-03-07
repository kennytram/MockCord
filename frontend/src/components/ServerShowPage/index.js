import NavBar from '../NavBar';
import LeftSideBar from '../LeftSideBar';
import { getChannels, fetchChannels } from '../../store/channels';
import { getServer, fetchServer } from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, Redirect } from 'react';
import { useParams } from 'react-router-dom';

export default function ServerShowPage() {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);
    const {serverId} = useParams();
    const server = useSelector(getServer(serverId)); //can acccess when we did fetchServer correctly
    const channels = useSelector(getChannels);
    const [channel, setChannel] = useState(null);

    console.log(channels);


    useEffect(() => {
        // dispatch(fetchChannels());
        // debugger;
        dispatch(fetchServer(serverId));
      }, [dispatch, sessionUser, serverId])

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <div className = "wrapper">
            <div className="navbar-wrapper">
              <NavBar/>
            </div> 
            <div className="left-sidebar-wrapper">
                <LeftSideBar/>
            </div>
            <div className="top-navbar">
                {/* {channel ? channel.name : "nonexistent channel"} */}
            </div>
        </div>
    )
}
    