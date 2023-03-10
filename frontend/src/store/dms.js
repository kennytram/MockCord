import csrfFetch from './csrf';
import { RECEIVE_USERS } from './users';

export const RECEIVE_DM = 'RECEIVE_DM';
export const RECEIVE_DMS = 'RECEIVE_DMS';
export const REMOVE_DM = 'REMOVE_DM';
export const RESET_DMS = 'RESET_DMS';

const receiveDirectMessage = (payload) => {
    return {
        type: RECEIVE_DM,
        payload
    };
};

const receiveDirectMessages = (payload) => {
    return {
        type: RECEIVE_DMS,
        payload
    };
};

const removeDirectMessage = (directMessageId) => {
    return {
        type: REMOVE_DM,
        directMessageId
    };
}



export const resetDirectMessages = () => {
    return {
        type: RESET_DMS
    }
}


export const getDirectMessage = (directMessageId) => (state) => (
    state.dms ? state.dms[directMessageId] : null
)

export const getDirectMessages = (state) => (
    state.dms ? Object.values(state.dms) : []
)

export const fetchDirectMessage = (directMessageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/direct_messages/${directMessageId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveDirectMessage(data));
    }
}

export const fetchDirectMessages = () => async (dispatch) => {
    const response = await csrfFetch('/api/direct_messages');
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveDirectMessages(data));
    }
}

export const createDirectMessage = (dm) => async (dispatch) => {
    const response = await csrfFetch('/api/direct_messages', {
        method: 'POST',
        body: JSON.stringify({ direct_message: dm })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveDirectMessage(data));
    }

}

export const updateDirectMessage = (dm) => async (dispatch) => {
    const response = await csrfFetch(`/api/direct_messages/${dm.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ dm: dm })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveDirectMessage(data));
    }
}

export const deleteDirectMessage = (dmId) => async (dispatch) => {
    const response = await csrfFetch(`/api/direct_messages/${dmId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeDirectMessage(dmId));
    }
}

export default function dmsReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_DMS:
            return action.payload;
        case RECEIVE_DM:
            newState[action.payload.dm.id] = action.payload.dm;
            return newState;
        case REMOVE_DM:
            const dmId = action.dmId;
            delete newState[dmId];
            return newState;
        case RESET_DMS:
            return {};
        case RECEIVE_USERS:
            return action.payload.dms;
        default:
            return state;
    }
};