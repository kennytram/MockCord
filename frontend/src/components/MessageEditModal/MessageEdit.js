import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateServer, destroyServer } from '../../store/servers';
import "./ServerEdit.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import ChannelUpdate from '../ChannelUpdateModal/ChannelUpdate';
import ChannelDelete from '../ChannelDeleteModal/ChannelDelete';

function MessageEdit({ onClose, onUpdate, messageId }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCloseFirstModal = (e) => {
        setShowDeleteModal(false);
        onClose();
    };

    const handleEdit = (e) => {
        onUpdate(true);
        onClose();
    }

    const handleOpenDeleteModal = (e) => {
        setShowDeleteModal(true);
    };

    return (
        <div className="message-edit-form">
            <div className="edit-button-message" onClick={handleEdit}>
                <EditIcon />
            </div>
            <div className="edit-button-message" onClick={handleOpenDeleteModal}>
                <DeleteForeverIcon />{showDeleteModal && (
                    <Modal messageId={messageId} onClose={handleCloseDeleteModal} className="create-server">
                        <MessageDelete onClose={handleCloseDeleteModal} />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default ChannelEdit;