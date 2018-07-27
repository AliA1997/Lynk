const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const RESET_PASSWORD = 'RESET_PASSWORD';
const RESET_PASSWORD_UNMOUNT = 'RESET_PASSWORD_UNMOUNT';


let initialState = {
    user: null,
    resetPasswordUsername: null
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
        }
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