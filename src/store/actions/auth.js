import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut = (tokenExpiryTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        },tokenExpiryTime * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLABSaWd1gBMS2qxBfyd2BFKs7r0MFtZY';
        if (!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLABSaWd1gBMS2qxBfyd2BFKs7r0MFtZY';
        }
        axios.post(url,authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error.response.data.error);
            dispatch(authFail(error.response.data.error));
        })

    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()){
                dispatch(authLogout());
            }
            else {
                const userId = localStorage.getItem('userId');
                const expiryTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut(expiryTime));
            }
        }
    }

}

