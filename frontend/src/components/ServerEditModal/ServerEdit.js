import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateServer, leaveServer, destroyServer, fetchServerInvite, getServer } from '../../store/servers';
import "./ServerEdit.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../../context/Modal';
import ServerUpdate from '../ServerUpdateModal/ServerUpdate';
import ServerDelete from '../ServerDeleteModal/ServerDelete';


function ServerEdit({ onClose, ...props }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const { serverId, channelId } = useParams();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const server = useSelector(getServer(serverId));
  const sessionUser = useSelector(state => state.session.user);

  const handleCloseFirstModal = (e) => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    onClose();
  };

  const handleOpenSecondModal = (e) => {
    setShowUpdateModal(true);
    document.querySelector(".server-edit-form").style.display = "none";
  };

  const handleOpenThirdModal = (e) => {
    setShowDeleteModal(true);
    document.querySelector(".server-edit-form").style.display = "none";
  };

  const inviteSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z"></path><path fill="currentColor" d="M6.5 8.00667C7.88 8.00667 9 6.88667 9 5.50667C9 4.12667 7.88 3.00667 6.5 3.00667C5.12 3.00667 4 4.12667 4 5.50667C4 6.88667 5.12 8.00667 6.5 8.00667Z"></path><path fill="currentColor" d="M6.5 8.34C3.26 8.34 1 9.98666 1 12.34V13.0067H12V12.34C12 9.98 9.74 8.34 6.5 8.34Z"></path></svg>
  const leaveSVG = <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"></path></svg>


  return (<>
    <div className="server-edit-form">
      <div className="update-server" onClick={()=> {
        dispatch(fetchServerInvite(serverId))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          navigator.clipboard.writeText(`${data.invite_link}`);
        });
        onClose();
      }}>
        <div>Copy Invite Link</div>
        {inviteSVG}
      </div>
      <div className="update-server" onClick={() => {
        handleOpenSecondModal();
      }}>
        <div>Update Server</div>
        <EditIcon />
      </div>
      {/* {showUpdateModal && (
        <Modal onClose={handleCloseFirstModal} className="create-server">
          <ServerUpdate onClose={handleCloseFirstModal}/>
        </Modal>
      )} */}
      <div className="edit-seperator" />
      {server && server?.ownerId === sessionUser.id ? (
      <div className="delete-server" onClick={handleOpenThirdModal}>
        <div>Delete Server</div>
        <DeleteForeverIcon />
      </div>) : <div className="delete-server" onClick={()=> {
        // dispatch(leaveServer(serverId));
        leaveServer(serverId);
        history.push(`/channels/@me`);
        onClose();
      }}>
        <div>Leave Server</div>
        {leaveSVG}
      </div>}
    </div>
    {showUpdateModal && (
      <Modal onClose={handleCloseFirstModal} className="create-server">
        <ServerUpdate onClose={handleCloseFirstModal}  />
      </Modal>
    )}
    {showDeleteModal && (
      <Modal onClose={handleCloseFirstModal} className="create-server delete">
        <ServerDelete onClose={handleCloseFirstModal} />
      </Modal>
    )}
  </>);
}

export default ServerEdit;