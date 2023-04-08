import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchServer, getServer, updateServer } from '../../store/servers';
import "./ServerUpdate.css"
function ServerUpdate({ onClose }) {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState("");
    const { serverId } = useParams();
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);
    const server = useSelector(getServer(serverId));
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (!serverName.trim()) {
            setError(true);
            return;
        }
        server.name = serverName;
        onClose();
        updateServer(server);
        // return dispatch(updateServer(server))
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
    };

    return (
        <div className="server-create-form">
            <div className="server-create-header">
                <div className="server-create-title">Edit your server</div>
                <div className="server-create-desc">
                    Give your new server a personality with a name and an <br />
                    icon. You can always change it later.
                </div>
            </div>
            <ul>
            </ul>
            <form className="server-create-content" onSubmit={handleSubmit}>
                <div className="server-form-content">
                    <div className="server-create-name">SERVER NAME{error && <span className="error"> - Please enter a name</span>}</div>
                    <input type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        placeholder="Edit server name here"
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

export default ServerUpdate;