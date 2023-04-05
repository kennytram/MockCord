import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { deleteChannel } from '../../store/channels';
import { getServer, fetchServer } from '../../store/servers';
// import "./ServerDelete.css"
function ChannelDelete({ onClose }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname;
    const { serverId, channelId } = useParams();
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const server = useSelector(getServer(serverId));
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteChannel(channelId)).then(() => {
            onClose();
            if (url.includes(`channels/${channelId}`)) history.push(`/servers/${serverId}/channels/${server.defaultChannel}`);
            dispatch(fetchServer(serverId));
        })
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    };

    return (
        <div className="server-create-form">
            <div className="server-create-header">
                <div className="server-create-title">Delete your channel</div>
                <div className="server-create-desc">
                    Confirm that you want to delete this channel.
                </div>
            </div>
            <ul>
            </ul>
            <form className="server-create-content" onSubmit={handleSubmit}>
                <div className="server-create-buttons">
                    <div className="back-button button" onClick={onClose}>Back</div>
                    <button className="brand button" type="submit" onClick={handleSubmit}>Delete</button>
                </div>

            </form>
        </div>
    );
}

export default ChannelDelete;