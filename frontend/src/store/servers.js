import csrfFetch from "./csrf";

export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const REMOVE_SERVER = 'REMOVE_SERVER';

export const RECEIVE_SERVER_CHANNEL = 'RECEIVE_SERVER_CHANNEL';
export const DELETE_SERVER_CHANNEL = 'DELETE_SERVER_CHANNEL';

const receiveServer = (payload) => {

    return {
        type: RECEIVE_SERVER,
        payload
    };
};

export const receiveServerChannel = (payload) => {
    return {
        type: RECEIVE_SERVER_CHANNEL,
        payload
    };
};

export const removeServerChannel = (serverId, channelId) => {
    return {
        type: DELETE_SERVER_CHANNEL,
        serverId, channelId
    };
};

const receiveServers = (servers) => {
    return {
        type: RECEIVE_SERVERS,
        servers
    };
};

const removeServer = (serverId) => {
    return {
        type: REMOVE_SERVER,
        serverId
    };
}

export const getServer = (serverId) => (state) => (
    state.servers ? state.servers[serverId] : null
)

export const getServers = (state) => (
    state.servers ? Object.values(state.servers) : []
)

export const fetchServer = (serverId) => async (dispatch) => {

    const response = await csrfFetch(`/api/servers/${serverId}`);

    if (response.ok) {
        const data = await response.json();

        dispatch(receiveServer(data));
    }
}

export const fetchServers = () => async (dispatch) => {
    const response = await csrfFetch('/api/servers');
    if (response.ok) {
        const data = await response.json();

        dispatch(receiveServers(data));
    }
}

export const fetchServerInvite = (serverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}/invite`);
    if (response.ok) {
        // const data = await response.json();
        // console.log(data.invite_link);
        return response;
    }
}

export const joinServer = (serverId, inviteToken) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}/invite/${inviteToken}`, {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();

        // dispatch(receiveServer(data));
        return response;
    }
}

export const leaveServer = (serverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}/leave`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeServer(serverId));
    }
}

export const kickMemberServer = (serverId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}/leave/${userId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(fetchServer(serverId));
    }
}


export const createServer = (server) => async (dispatch) => {

    const response = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify({ server: server })
    })
    if (response.ok) {
        const data = await response.json();

        dispatch(receiveServer(data));
        return response;
    }
}

export const createServerChannel = (channel) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels`, {
        method: 'POST',
        body: JSON.stringify({ channel: channel })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveServerChannel(data));
        return response;
    }
}

// export const createServerChannel = (channel) => {
//     csrfFetch(`/api/channels`, {
//         method: 'POST',
//         body: JSON.stringify({ channel: channel })
//     })
// }

export const updateServer = (server) => async (dispatch) => {

    const response = await csrfFetch(`/api/servers/${server.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ server: server })
    })

    if (response.ok) {

        const data = await response.json();

        dispatch(receiveServer(data));
    }
}

export const updateServerChannel = (channel) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${channel.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ channel })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveServerChannel(data));
        return response;
    }
}

// export const updateServerChannel = (channel) => {
//     csrfFetch(`/api/channels/${channel.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ channel: channel })
//     })
// }

export const destroyServer = (serverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        
        dispatch(removeServer(serverId));
    }
}

export const destroyServerChannel = (serverId, channelId) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeServerChannel(serverId, channelId));
    }
}

// export const destroyServerChannel = (serverId, channelId) => {
//     csrfFetch(`/api/channels/${channelId}`, {
//         method: 'DELETE'
//     })
// }

const initialState = {
    
};

export default function serversReducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_SERVERS:
            return action.servers;
        case RECEIVE_SERVER:

            newState[action.payload.server.id] = action.payload.server;
            return newState;
        case RECEIVE_SERVER_CHANNEL:
            // debugger
            newState[action.payload.channel.serverId].channels[action.payload.channel.id] = action.payload.channel;
            return newState;
        case DELETE_SERVER_CHANNEL:
            // debugger
            // const channelId = action.channelId;
            delete newState[action.serverId]?.channels[action.channelId];
            return newState;
        case REMOVE_SERVER:
            const serverId = action.serverId;
            delete newState[serverId];
            return newState;
        default:
            return state;
    }
};