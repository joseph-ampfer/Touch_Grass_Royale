const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMyLCJpYXQiOjE3MTIxNzc3MDcsIm5iZiI6MTcxMjE3NzcwNywianRpIjoiNjBlNmJmYTgtYjk3Mi00NDMxLTkzZTgtZDM1NjYyMmQ0MzMzIiwiZXhwIjoxNzEyNzgyNTA3LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.uRDJsPDoF_bW0q1RGMKwWeOyz29VDw0ykjeC9zavBic'
const base_url = 'https://1704-50-5-95-80.ngrok-free.app';

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


export const undoIgnoreRequest = async (friendID) => {
    const url = `${base_url}/friend-requests/undo/${friendID}`
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