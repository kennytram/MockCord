import csrfFetch from "./csrf";

export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const REMOVE_SERVER = 'REMOVE_SERVER';



const receiveServer = (payload) => {

    return {
        type: RECEIVE_SERVER,
        payload
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

export const destroyServer = (serverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        
        dispatch(removeServer(serverId));
    }
}

export default function serversReducer(state = {}, action) {
    const newState = { ...state };

    switch (action.type) {
        case RECEIVE_SERVERS:
            return action.servers;
        case RECEIVE_SERVER:

            newState[action.payload.server.id] = action.payload.server;
            return newState;
        case REMOVE_SERVER:
            const serverId = action.serverId;
            delete newState[serverId];
            return newState;
        default:
            return state;
    }
};