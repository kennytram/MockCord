import csrfFetch from "./csrf";
import { RECEIVE_SERVER } from "./servers";
import { RECEIVE_CHANNEL } from "./channels";
import { RECEIVE_DM, RECEIVE_DMS } from "./dms";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const REMOVE_USER = "REMOVE_USER";
export const RESET_USERS = "RESET_USERS";

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

const receiveUsers = (payload) => {
    return {
        type: RECEIVE_USERS,
        payload
    }
}

const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId
    }
}

export const resetUsers = () => {
    return {
        type: RESET_USERS
    }
}

export const getUser = (userId) => (state) => (
    state.users ? state.users[userId] : null
)

export const getUsers = (state) => (
    state.users ? Object.values(state.users) : []
)

export const fetchUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(receiveUser(data));
    }
}

export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');

    if (response.ok) {
        const data = await response.json();
        dispatch(receiveUsers(data));
    }
}

export const updateUser = (user) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveUser(data));
    }
}

export const destroyUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeUser(userId));
    }
}

export const joinVoice = (data) => {
    csrfFetch("/api/users/joinCall", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export default function usersReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_USERS:
            return action.payload.users;
        case RECEIVE_USER:
            const user = action.user;
            newState[user.id] = user;
            return newState;
        case REMOVE_USER:
            const userId = action.userId;
            delete newState[userId];
            return newState;
        case RECEIVE_SERVER:
            const users = action.payload.users
            if(users) {
                Object.values(users).forEach(user => {
                    newState[user.id] = user;
                })
            }
            return newState;
        case RECEIVE_DMS:

            return action.payload.users;
        case RECEIVE_DM:

            return action.payload.users;
        case RESET_USERS:
            return {};
        default:
            return state;
    }
};