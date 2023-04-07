import csrfFetch from "./csrf";
import { RECEIVE_SERVER } from './servers';
import { RECEIVE_CHANNEL } from './channels';
import { RECEIVE_DM } from './dms';


export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const RESET_MESSAGES = 'RESET_MESSAGES';


const receiveMessage = (payload) => {

    return {
        type: RECEIVE_MESSAGE,
        payload
    };
};

const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    };
};

const removeMessage = (messageId) => {
    return {
        type: REMOVE_MESSAGE,
        messageId
    };
}

export const getMessages = (state) => (
    state.messages ? Object.values(state.messages) : []
)


export const fetchMessages = () => async (dispatch) => {
    const response = await csrfFetch('/api/messages');
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveMessages(data));
    }
}

export const createMessage = (message) => async (dispatch) => {
    const response = await csrfFetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ message: message })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveMessage(data));
        return response;
    }
}

export const updateMessage = (message) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/${message.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ message: message })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveMessage(data));
    }
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeMessage(messageId));
    }
}

export default function messagesReducer(state = {}, action) {
    const newState = { ...state };

    switch (action.type) {
        case RECEIVE_MESSAGES:
            const messages = action.messages
            if(messages) {
                Object.values(messages).forEach(message => {
                    newState[message.id] = message;
                })
            }
            return newState;
        case RECEIVE_MESSAGE:

            newState[action.payload.id] = action.payload;
            return newState;
        case REMOVE_MESSAGE:
            const messageId = action.messageId;
            delete newState[messageId];
            return newState;
        case RECEIVE_CHANNEL:
            const channelMessages = action.payload.messages
            if (channelMessages) {
                Object.values(channelMessages).forEach(message => {
                    newState[message.id] = message;
                })
            }
            return newState;
        case RESET_MESSAGES:
            return {};
        case RECEIVE_DM:
            if (action.payload.messages) return action.payload.messages
            else return {}
        default:
            return state;
    }
};