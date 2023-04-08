import csrfFetch from './csrf';
import { RECEIVE_SERVER } from './servers';
import { RECEIVE_DMS } from './dms';
import { RECEIVE_FRIEND_REQUEST } from './FriendRequests';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RESET_CHANNELS = 'RESET_CHANNELS';

export const receiveChannel = (payload) => {
    return {
        type: RECEIVE_CHANNEL,
        payload
    };
};

const receiveChannels = (channels) => {
    return {
        type: RECEIVE_CHANNELS,
        channels
    };
};

export const removeChannel = (channelId) => {
    return {
        type: REMOVE_CHANNEL,
        channelId
    };
}

export const resetChannels = () => {
    return {
        type: RESET_CHANNELS
    }
}

export const getChannel = (channelId) => (state) => (
    state.channels ? state.channels[channelId] : null
)

export const getChannels = (state) => (
    state.channels ? Object.values(state.channels) : []
)

export const fetchChannel = (channelId) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${channelId}`);
    if (response.ok) {
        const data = await response.json();

        dispatch(receiveChannel(data));
    }
}

export const fetchChannels = () => async (dispatch) => {
    const response = await csrfFetch('/api/channels');
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveChannels(data));
    }
}

export const createChannel = (channel) => async (dispatch) => {
    const response = await csrfFetch('/api/channels', {
        method: 'POST',
        body: JSON.stringify({ channel })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveChannel(data));
    }

}

// export const createChannel = (channel) => {
//     csrfFetch('/api/channels', {
//         method: 'POST',
//         data: { channel }
//     })
// }

export const updateChannel = (channel) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${channel.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ channel: channel })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveChannel(data));
    }
}

// export const updateChannel = (channel) => {
//     csrfFetch(`/api/channels/${channel.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ channel: channel })
//     })
// }


export const deleteChannel = (channelId) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeChannel(channelId));
    }
}

// export const deleteChannel = (channelId) => {
//     csrfFetch(`/api/channels/${channelId}`, {
//         method: 'DELETE'
//     })
// }

export const joinChannel = (channel, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/channels/${channel.id}/subscribe`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveChannel(data));
    }
}

// export const joinChannel = (channel, userId) => {
//     csrfFetch(`/api/channels/${channel.id}/subscribe`, {
//         method: 'POST',
//         body: JSON.stringify({ userId })
//     })
// }

export default function channelsReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return action.channels;
        case RECEIVE_CHANNEL:
            newState[action.payload.channel.id] = action.payload.channel;
            return newState;
        case RECEIVE_FRIEND_REQUEST:
            if (action.payload.channel) {
                newState[action.payload.channel.id] = action.payload.channel;
            }
            return newState;
        case REMOVE_CHANNEL:
            const channelId = action.channelId;
            delete newState[channelId];
            return newState;
        // case RECEIVE_SERVER:
        //     return action.payload.channels;
        case RESET_CHANNELS:
            return {};
        default:
            return state;
    }
};