import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { deleteMessage } from '../../store/messages';
import "./ServerDelete.css"
function MessageDelete({ onClose, messageId }) {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        deleteMessage(messageId);
        onClose();
        // return dispatch(deleteMessage(messageId)).then(() => {
        //     onClose();
        // })
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
        <div className="server-create-form delete">
            <div className="server-create-header">
                <div className="server-create-title">Delete your message</div>
                <div className="server-create-desc">
                    Confirm that you want to delete this message.
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

export default MessageDelete;