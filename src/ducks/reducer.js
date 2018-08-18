const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const RESET_PASSWORD = 'RESET_PASSWORD';
const RESET_PASSWORD_UNMOUNT = 'RESET_PASSWORD_UNMOUNT';
const GET_USER_LOCATION = 'GET_USER_LOCATION';


let initialState = {
    user: null,
    resetPasswordUsername: null,
    userCoords: null
};


export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN: 
        return{
            ...state,
            user:action.payload
        };

        case LOGOUT:
        return{
            ...state,
            user: null
        };
        case RESET_PASSWORD:
        return {
            ...state,
            resetPasswordUsername: action.payload
        };
        case RESET_PASSWORD_UNMOUNT:
        return {
            ...state,
            resetPasswordUsername: null
        };
        case GET_USER_LOCATION:
        return {
            ...state,
            userCoords: action.payload
        };
        default:
        return state;
    }
}

export function login(user){
    return{
        type: LOGIN,
        payload: user
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}

export function resetPassword(username) {
    return {
        type: RESET_PASSWORD,
        payload: username
    }
}

export function resetPasswordUnmount() {
    return {
        type: RESET_PASSWORD_UNMOUNT
    }
}

export function getUserCoordinates(coords) {
    return {
        type: GET_USER_LOCATION,
        payload: coords
    }
}