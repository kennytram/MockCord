import csrfFetch from './csrf';

export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
export const RECEIVE_FRIEND_REQUESTS = 'RECEIVE_FRIEND_REQUESTS';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';

export const receiveFriendRequest = (payload) => {
    return {
        type: RECEIVE_FRIEND_REQUEST,
        payload
    };
}

export const receiveFriendRequests = (friendRequests) => {
    return {
        type: RECEIVE_FRIEND_REQUESTS,
        friendRequests
    };
}

export const removeFriendRequest = (friendRequestId, friendId) => {
    return {
        type: REMOVE_FRIEND_REQUEST,
        friendRequestId, friendId
    };
}

export const getFriendRequest = (friendRequestId) => (state) => (
    state.friendRequests ? state.friendRequests[friendRequestId] : null
)

export const getFriendRequests = (state) => (
    state.friendRequests ? Object.values(state.friendRequests) : []
)

export const fetchFriendRequest = (friendRequestId) => async (dispatch) => {
    const response = await csrfFetch(`/api/friend_requests/${friendRequestId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriendRequest(data));
    }
}

export const fetchFriendRequests = () => async (dispatch) => {
    const response = await csrfFetch('/api/friend_requests');
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriendRequests(data));
    }
}

// export const createFriendRequest = (friendRequest) => async (dispatch) => {
//     const response = await csrfFetch('/api/friend_requests', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({friendRequest : friendRequest})
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(receiveFriendRequest(data));
//     }
// }

export const createFriendRequest = (friendRequest) => {
    csrfFetch('/api/friend_requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendRequest: friendRequest })
    });
}


// export const createSearchFriendRequest = (searchFriend) => async (dispatch) => {
//     const response = await csrfFetch('/api/friend_requests/search', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ user: searchFriend })
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(receiveFriendRequest(data));
//     }
// }

export const createSearchFriendRequest = (searchFriend) => {
    const response = csrfFetch('/api/friend_requests/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: searchFriend })
    });
    return response;
}

// export const deleteFriendRequest = (friendRequestId, friendId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/friend_requests/${friendRequestId}`, {
//         method: 'DELETE'
//     })
//     if (response.ok) {
//         dispatch(removeFriendRequest(friendRequestId, friendId));
//     }
// }

export const deleteFriendRequest = (friendRequestId, friendId) => {
    csrfFetch(`/api/friend_requests/${friendRequestId}`, {
        method: 'DELETE'
    })
}

// export const updateFriendRequest = (friendRequest) => async (dispatch) => {
//     const response = await csrfFetch(`/api/friend_requests/${friendRequest.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ friendRequest })
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(receiveFriendRequest(data));
//         return response;
//     }
// }

export const updateFriendRequest = (friendRequest) => {
    csrfFetch(`/api/friend_requests/${friendRequest.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ friendRequest })
    });
}

const initialState = {};

const friendRequestsReducer = (state = initialState, action) => {
    let newState = { ...state };
    // debugger
    switch (action.type) {
        case RECEIVE_FRIEND_REQUEST:
            const friendId = action.payload.friendRequest.friendId;
            newState[friendId] = action.payload.friendRequest[friendId]
            return newState;
        case RECEIVE_FRIEND_REQUESTS:
            return action.friendRequests;
        case REMOVE_FRIEND_REQUEST:
            delete newState[action.friendRequestId];
            return newState;
        default:
            return state;
    }
}

export default friendRequestsReducer;