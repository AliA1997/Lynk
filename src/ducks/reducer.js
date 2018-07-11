const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';


let initialState = {
    user: null
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