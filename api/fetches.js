

export const fetchLeaderboard = async () => {
    const url = 'https://d476-50-5-95-80.ngrok-free.app/friends-list/leaderboard';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMyLCJpYXQiOjE3MTE1NzIxNDYsIm5iZiI6MTcxMTU3MjE0NiwianRpIjoiZWY0MWNhMTktOWMzZi00NWFjLTgzOWUtMTEyYjBjODdmNzU2IiwiZXhwIjoxNzEyMTc2OTQ2LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.Z16SvYu3XISWbPx9alt0oEvsMwKjEnTkMuwsNV7WFmQ'
        },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        const json = await res.json()
        throw new Error(json.detail)
    }

    const json = await res.json()
    return json

};