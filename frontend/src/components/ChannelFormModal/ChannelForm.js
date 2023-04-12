import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createChannel } from '../../store/channels';
import { createServerChannel } from '../../store/servers';
import { useParams, useHistory } from 'react-router-dom';
import { fetchServer } from '../../store/servers';
// import "./ChannelForm.css"
function ChannelForm({ onSuccess, onClose }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [channel, setChannel] = useState({
        name: ""
    });
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const { serverId } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        channel.serverId = serverId;
        if (!channel.name.trim()) {
            setError(true);
            return;
        }
        onClose();
        // return dispatch(createServerChannel(channel))
        //     .then((res) => {
        //         if (res.ok) {
        //             dispatch(fetchServer(serverId));
        //         }
        //     })
        //     .catch(async (res) => {
        //         let data;
        //         try {
        //             data = await res.clone().json();
        //         } catch {
        //             data = await res.text();
        //         }
        //         if (data?.errors) setErrors(data.errors);
        //         else if (data) setErrors([data]);
        //         else setErrors([res.statusText]);
        //     });
        createServerChannel(channel);
        dispatch(fetchServer(serverId));
    };

    

    return (
        <div className="server-create-form">
            <div className="server-create-header">
                <div className="server-create-title">Customize your channel</div>
                <div className="server-create-desc">
                    Give your new channel a personality with a name and an <br />
                    icon. You can always change it later.
                </div>
            </div>
            <ul>
            </ul>
            <form className="server-create-content" onSubmit={handleSubmit}>
                <div className="server-form-content">
                    <div className="server-create-name">CHANNEL NAME{error && <span className="error"> - Please enter a name</span>}</div>
                    <input type="text"
                        required
                        value={channel.name}
                        onChange={(e) => setChannel({ ...channel, name: e.target.value })}
                        placeholder="Create a channel name here"
                    />
                    <div className="create-note">
                        By creating a channel, you agree to
                        MockCord's Community Guidelines.
                    </div>
                </div>
                <div className="server-create-buttons">
                    <div className="back-button button" onClick={onClose}>Back</div>
                    <button className="brand button" type="submit" onClick={handleSubmit}>Create</button>
                </div>

            </form>
        </div>
    );
}

export default ChannelForm;