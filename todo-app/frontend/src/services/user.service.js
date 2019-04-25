import { BehaviorSubject } from 'rxjs';

const authTokenSubject = new BehaviorSubject(localStorage.getItem('token'));

export const userService = {
    login,
    logout,
    register,
    getAuthHeaders,
    authUserToken: authTokenSubject.asObservable(),
}

function getAuthHeaders() {
    const token = authTokenSubject.value;
    if (token) {
        return {
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }
    return {};
}

function login (username, password) {
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
    }

    return fetch('/api/user/login/', requestOptions)
        .then(response => response.json())
        .then(response => {
            const token = response['token'];
            if (token) {
                localStorage.setItem("token", token);
                authTokenSubject.next(token);
            }
            return response;
        })
        .catch(error => {
            return {}; // todo: fix
        });
}

function logout () {
    localStorage.removeItem('token');
    authTokenSubject.next(null);
    // @TODO: do I need to call real logout method?
}

function register(username, password, email) {
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password, email })
    }

    return fetch('/api/user/register/', requestOptions)
        .then(response => response.json())
        .catch(error => {
            return {}; // todo: fix
        });
}