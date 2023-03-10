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

function ChannelEdit({ onClose }) {
  const [errors, setErrors] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseFirstModal = (e) => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    onClose();
  };

  const handleOpenSecondModal = (e) => {
    setShowUpdateModal(true);
  };

  const handleOpenThirdModal = (e) => {
    setShowDeleteModal(true);
  };

  const handleCloseSecondModal = (e) => {
    setShowUpdateModal(false);
  };

  const handleCloseThirdModal = (e) => {
    setShowDeleteModal(false);
  };

  return (
    <div className="server-edit-form">
      <div className="update-server" onClick={handleOpenSecondModal}>
        <div>Update Channel</div>
        <EditIcon />
      </div>
      {showUpdateModal && (
        <Modal onClose={handleCloseFirstModal} className="create-server">
          <ChannelUpdate onClose={handleCloseFirstModal} />
        </Modal>
      )}
      <div className="edit-seperator" />
      <div className="delete-server" onClick={handleOpenThirdModal}>
        <div>Delete Channel</div>
        <DeleteForeverIcon />{showDeleteModal && (
          <Modal onClick={onClose} onClose={onClose()} className="create-server">
            <ChannelDelete onClick={onClose} onClose={onClose()} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ChannelEdit;