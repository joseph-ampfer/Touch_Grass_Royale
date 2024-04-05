import { access_token, base_url } from "../secrets";


export const fetchLeaderboard = async () => {
    const url = `${base_url}/friends-list/leaderboard`;
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
        error.detail = json.detail;
        throw error;
    }
    return json
};


export const fetchFriendRequests = async () => {
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