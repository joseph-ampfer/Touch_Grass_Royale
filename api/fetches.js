const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMyLCJpYXQiOjE3MTE1NzIxNDYsIm5iZiI6MTcxMTU3MjE0NiwianRpIjoiZWY0MWNhMTktOWMzZi00NWFjLTgzOWUtMTEyYjBjODdmNzU2IiwiZXhwIjoxNzEyMTc2OTQ2LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.Z16SvYu3XISWbPx9alt0oEvsMwKjEnTkMuwsNV7WFmQ'
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

export const getSomeOneElsesFriendsList = async (id) => {
    const url = `${base_url}/friends-list/others/${id}`;
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