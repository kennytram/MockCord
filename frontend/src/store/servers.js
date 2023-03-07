import csrfFetch from "./csrf";

export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const REMOVE_SERVER = 'REMOVE_SERVER';

//fetchServer -> Server Controller -> show server Jbuilder -> receiverServer function (payload has keys from jbuilder)
//check each reducer for teh same action type -> purpose of reducer is to populate slice of state (populat state)


const receiveServer = (payload) => { //bc it has more than 1 thing (channels and server)
    // debugger;
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
    // debugger;
    const response = await csrfFetch(`/api/servers/${serverId}`); //show Jbuilder response
    //response has two keys: server. channels response {}
    if(response.ok) {
        // debugger;
        const data = await response.json(); //readable {server:{name:, id:}, channels: {1: {}, 2:{}, 3:{}}
        dispatch(receiveServer(data)); //sends to the store
        // dispatch(receiveUsers(users));
    }
}

export const fetchServers = () => async (dispatch) => {
    const response = await csrfFetch('/api/servers');
    
    if(response.ok) {
        const data = await response.json();
        dispatch(receiveServers(data));
    }
}

export const createServer = (server) => async (dispatch) => {
    const response = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify(server)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveServer(data));
    }
    
}

export const updateServer = (server) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${server.id}`, {
        method: 'PATCH',
        body: JSON.stringify(server)
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
    const newState = {...state};
    // debugger;
    switch (action.type) {
        case RECEIVE_SERVERS:
            return action.servers;
        case RECEIVE_SERVER:
            // debugger
            newState[action.payload.server.id] = action.payload.server;
            return newState;
        case REMOVE_SERVER:
            const serverId= action.serverId;
            delete newState[serverId];
            return newState;
        default:
            return state;
    }
};