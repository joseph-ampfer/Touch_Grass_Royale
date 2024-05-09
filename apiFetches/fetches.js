import { storage } from "../Storage";
import { base_url } from "../secrets";


const short_tokenexpired = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJpYXQiOjE3MTM1NjU2MzEsIm5iZiI6MTcxMzU2NTYzMSwianRpIjoiZGExODdhZGMtMDlmNS00ZWY3LWE3OTgtZGEwOTVhODU0MDVjIiwiZXhwIjoxNzEzNTY2NTMxLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.TIa2ULgXY5d4ZS_mOrwIXioJbnMtnJLNF7dcHj8DGQE'

export const fetchLeaderboard = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friends-list/leaderboard`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured");
        error.detail = json.detail;
        throw error;
    }
    return json
};


export const fetchFriendRequests = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friend-requests/list`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if(!res.ok) {
        const error = new Error("An error occured");
        error.response = res;
        throw error;
    }
    return json
};


export const acceptFriendRequest = async (friendID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friend-requests/accept/${friendID}`
    const options = {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured");
        error.response = res;
        throw error;
    };
    return json
}


export const denyFriendRequest = async (friendID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friend-requests/deny/${friendID}`
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured");
        error.response = res;
        throw error;
    };
    return json
}


export const undoIgnoreRequest = async (friendID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friend-requests/undo/ignore/${friendID}`
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured");
        error.response = res;
        throw error;
    };
    return json
}

export const getSelf = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/user`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json()

    if (!res.ok) {
        const error = new Error("An error occured");
        error.res = res;
        throw error;
    }
    return json
}

export const getCurrentUserFriendsList = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friends-list`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured in getCurrentUserFriendsList");
        error.res = res;
        throw error;
    }
    return json
}

export const getSomeOneElsesFriendsList = async (otherID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friends-list/others/${otherID}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured in getCurrentUserFriendsList");
        error.res = res;
        throw error;
    }
    return json
}

export const removeFriend = async (friendID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friends-list/remove/${friendID}`;
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("An error occured in removeFriend");
        error.detail = json.detail;
        throw error;
    };
    return json
}

export const sendFriendRequest = async (friendID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friend-requests/send/${friendID}`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error("e");
        error.detail = json.detail;
        throw error;
    };
    return json
}

export const unsendFriendRequest = async (friendID) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/friend-requests/unsend/${friendID}`;
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json()

    if (!res.ok) {
        const error = new Error("e");
        error.detail = json.detail;
        throw error
    };
    return json
}

export const searchForUsers = async (username) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/search/${username}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('e');
        error.detial = json.detail;
        throw error
    };
    return json
}


export const updateProfile = async (changes) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/account/update-profile`;
    const options = {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(changes)
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('updateProfile');
        error.detail = json.detail;
        throw error
    };
    return json
}


export const changePassword = async (passwords) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/account/change-password`;
    const options = {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(passwords)
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('changePassword');
        error.detail = json.detail;
        throw error
    }
    return json
}

export const loginFetch = async (creds) => {
    const url = `${base_url}/login`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(creds)
    };
    const res = await fetch(url, options);
    const json = await res.json()

    if (!res.ok) {
        const error = new Error('loginFetch');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const sendRecoverCode = async (input) => {
    const url = `${base_url}/recover/code/${input}`
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('getRecoverCode');
        error.detail = json.detail;
        throw error
    }
    return json
}

export const validateCode = async (data) => {
    const url = `${base_url}/recover/validate`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('validateCode');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const resetPassword = async (passwords) => {
    const short_token = storage.getString('short_token');
    const url = `${base_url}/recover/reset-password`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${short_token}`
        },
        body: JSON.stringify(passwords)
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('resetPassword');
        error.detail = json.detail;
        throw error
    }
    return json
}

export const checkUsername = async (username) => {
    const url = `${base_url}/username-check/${username}`
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('checkUsername');
        error.detail = json.detail;
        throw error
    }
    return json
}

export const checkEmail = async (email) => {
    const url = `${base_url}/email-check/${email}`
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('checkEmail');
        error.detail = json.detail;
        throw error
    }
    return json
}

export const register = async (data) => {
    const url = `${base_url}/register`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('register');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const updatePoints = async (data) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/points/update/today`;
    const options = {
        method: 'PATCH',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(data)
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('register');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const sendPushTokenToServer = async (push_token) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/notifications/store`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({ 'push_token': push_token })
    };
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('sendPushTokenToServer');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const pointsCheckWinner = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/points/check-winner`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    };
    const res = await fetch(url, options);
    const json = await res.json()

    if (!res.ok) {
        const error = new Error('pointsCheckWinner');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const getTenDayRank = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/user/10-day`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    };
    const res = await fetch(url, options);
    const json = await res.json()

    if (!res.ok) {
        const error = new Error('pointsCheckWinner');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const getAllAnimations = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/lottie/animations`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    };
    const res = await fetch(url, options);
    const json = await res.json()

    if (!res.ok) {
        const error = new Error('pointsCheckWinner');
        error.detail = json.detail;
        throw error
    }
    return json
}


export const getOwnedLottie = async () => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/lottie/all-unlocked`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('getOwnedLottie');
        error.detail = json.detail;
        throw error
    };
    return json
}

export const buyLottie = async (name, price) => {
    const access_token = storage.getString('access_token');
    const url = `${base_url}/lottie/buy`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({
            name: name,
            price: price,
        })
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
        const error = new Error('buyLottie');
        error.detail = json.detail;
        throw error
    };
    return json
}