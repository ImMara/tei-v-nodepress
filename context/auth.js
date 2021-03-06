import {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');

const AuthContext = createContext(undefined);
const UpdateAuthContext = createContext(undefined);

export function AuthWrapper(props){

    const [token,setToken] = useState(Cookies.get('jwt'));

    let user = jwt.decode(token)

    return(
        <AuthContext.Provider value={user}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}
export function useUpdateAuthContext() {
    return useContext(UpdateAuthContext)
}