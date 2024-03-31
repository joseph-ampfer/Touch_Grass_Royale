const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMyLCJpYXQiOjE3MTE1NzIxNDYsIm5iZiI6MTcxMTU3MjE0NiwianRpIjoiZWY0MWNhMTktOWMzZi00NWFjLTgzOWUtMTEyYjBjODdmNzU2IiwiZXhwIjoxNzEyMTc2OTQ2LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.Z16SvYu3XISWbPx9alt0oEvsMwKjEnTkMuwsNV7WFmQ'

export const fetchLeaderboard = async () => {
    const url = 'https://d476-50-5-95-80.ngrok-free.app/friends-list/leaderboard';
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
};


export const fetchFriendRequests = async () => {
    const url = 'https://d476-50-5-95-80.ngrok-free.app/friend-requests/list';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        },
    };

    const res = await fetch(url, options);
    const json = await res.json()

    if(!res.ok) {
        const error = new Error("An error occured");
        error.response = res;
        throw error;
    }
    return json
};