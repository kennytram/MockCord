import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteDirectMessage } from '../../store/dms';
import "./ServerDelete.css"
function DirectMessageDelete({ onClose }) {
    const dispatch = useDispatch();
    const { dmId } = useParams();
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteDirectMessage(dmId)).then(() => {
            onClose();
            history.push("/servers/@me");

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
                <div className="server-create-title">Delete this DM</div>
                <div className="server-create-desc">
                    Confirm that you want to delete this DM.
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

export default DirectMessageDelete;