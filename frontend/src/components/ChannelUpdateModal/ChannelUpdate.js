import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getChannel, updateChannel } from '../../store/channels';
import "./ServerUpdate.css"
function ChannelUpdate({ onClose }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState("");
    const location = useLocation();
    const url = location.pathname;
    const { serverId, channelId } = useParams();
    const [errors, setErrors] = useState([]);
    const channel = useSelector(getChannel(channelId));

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        channel.name = channelName;
        onClose();
        return dispatch(updateChannel(channel))
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
                <div className="server-create-title">Edit your channel</div>
                <div className="server-create-desc">
                    Give your new channel a personality with a name and an <br />
                    icon. You can always change it later.
                </div>
            </div>
            <ul>
            </ul>
            <form className="server-create-content" onSubmit={handleSubmit}>
                <div className="server-form-content">
                    <div className="server-create-name">CHANNEL NAME</div>
                    <input type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="Edit channel name here"
                        required
                    />
                    <div className="create-note">
                        You agree to
                        MockCord's <label className="fake-blue-links">Community Guidelines</label>.
                    </div>
                </div>
                <div className="server-create-buttons">
                    <div className="back-button button" onClick={onClose}>Back</div>
                    <button className="brand button" type="submit" onClick={handleSubmit}>Update</button>
                </div>

            </form>
        </div>
    );
}

export default ChannelUpdate;