import csrfFetch from "./csrf";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const REMOVE_USER = "REMOVE_USER";

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId
    }
}

export const fetchUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);

    if(response.ok) {
        const data = await response.json();
        dispatch(receiveUser(data));
    }
}

export const fetchUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');

    if(response.ok) {
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

export default function usersReducer(state = {}, action) {
    const newState = {...state};
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;
        case RECEIVE_USER:
            const user = action.user;
            newState[user.id] = user;
            return newState;
        case REMOVE_USER:
            const userId= action.userId;
            delete newState[userId];
            return newState;
        default:
            return state;
    }
};