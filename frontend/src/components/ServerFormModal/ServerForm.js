import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServer } from '../../store/servers';
import "./ServerForm.css"
function ServerForm({ onClose }) {
    const dispatch = useDispatch();
    const [server, setServer] = useState({
        name: ""
    });
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (!server.name.trim()) {
            setError(true);
            return;
        }
        onClose();
        return dispatch(createServer(server))
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
                <div className="server-create-title">Customize your server</div>
                <div className="server-create-desc">
                    Give your new server a personality with a name and an <br />
                    icon. You can always change it later.
                </div>
            </div>
            <form className="server-create-content" onSubmit={handleSubmit}>
                <div className="server-form-content">
                    <div className="server-create-name">SERVER NAME{error && <span className="error"> - Please enter a name</span>}</div>
                    <input type="text"
                        required
                        value={server.name}
                        onChange={(e) => setServer({ ...server, name: e.target.value })}
                        placeholder="Create a server name here"
                    />
                    <div className="create-note">
                        By creating a server, you agree to
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

export default ServerForm;