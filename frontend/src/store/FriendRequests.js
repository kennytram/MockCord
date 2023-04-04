import csrfFetch from './csrf';

export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
export const RECEIVE_FRIEND_REQUESTS = 'RECEIVE_FRIEND_REQUESTS';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';

const receiveFriendRequest = (payload) => {
    return {
        type: RECEIVE_FRIEND_REQUEST,
        payload
    };
}

const receiveFriendRequests = (friendRequests) => {
    return {
        type: RECEIVE_FRIEND_REQUESTS,
        friendRequests
    };
}

const removeFriendRequest = (friendRequestId) => {
    return {
        type: REMOVE_FRIEND_REQUEST,
        friendRequestId
    };
}

export const getFriendRequest = (friendRequestId) => (state) => (
    state.friendRequests ? state.friendRequests[friendRequestId] : null
)

export const getFriendRequests = (state) => (
    state.friendRequests ? Object.values(state.friendRequests) : []
)

export const fetchFriendRequest = (friendRequestId) => async (dispatch) => {
    const response = await csrfFetch(`/api/friendRequests/${friendRequestId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriendRequest(data));
    }
}

export const fetchFriendRequests = () => async (dispatch) => {
    const response = await csrfFetch('/api/friendRequests');
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriendRequests(data));
    }
}

export const createFriendRequest = (friendRequestId) => async (dispatch) => {
    const response = await csrfFetch('/api/friendRequests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(friendRequestId)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriendRequest(data));
    }
}

export const deleteFriendRequest = (friendRequestId) => async (dispatch) => {
    const response = await csrfFetch(`/api/friendRequests/${friendRequestId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeFriendRequest(friendRequestId));
    }
}

export const updateFriendRequest = (friendRequestId) => async (dispatch) => {
    const response = await csrfFetch(`/api/friendRequests/${friendRequestId}`, {
        method: 'PUT'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriendRequest(data));
    }
}

const initialState = {};

const friendRequestsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case RECEIVE_FRIEND_REQUEST:
            newState = Object.assign({}, state, { [action.payload.id]: action.payload });
            return newState;
        case RECEIVE_FRIEND_REQUESTS:
            newState = Object.assign({}, state, action.friendRequests);
            return newState;
        case REMOVE_FRIEND_REQUEST:
            newState = Object.assign({}, state);
            delete newState[action.friendRequestId];
            return newState;
        default:
            return state;
    }
}

export default friendRequestsReducer;