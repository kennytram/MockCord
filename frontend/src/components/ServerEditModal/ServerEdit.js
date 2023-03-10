import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateServer, destroyServer } from '../../store/servers';
import "./ServerEdit.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import ServerUpdate from '../ServerUpdateModal/ServerUpdate';
import ServerDelete from '../ServerDeleteModal/ServerDelete';

function ServerEdit({ onClose, ...props }) {
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
  return (
    <div className="server-edit-form">
      <div className="update-server" onClick={handleOpenSecondModal}>
        <div>Update Server</div>
        <EditIcon />
      </div>
      {showUpdateModal && (
        <Modal onClose={handleCloseFirstModal} className="create-server">
          <ServerUpdate onClose={handleCloseFirstModal} />
        </Modal>
      )}
      <div className="edit-seperator" />
      <div className="delete-server" onClick={handleOpenThirdModal}>
        <div>Delete Server</div>
        <DeleteForeverIcon />{showDeleteModal && (
          <Modal onClose={handleCloseFirstModal} className="create-server">
            <ServerDelete onClose={handleCloseFirstModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ServerEdit;