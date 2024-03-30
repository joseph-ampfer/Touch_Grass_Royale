import { useQuery } from "@tanstack/react-query";

export const getLeaderboard = () => {
    return useQuery('posts', async () => {
        const response = await fetch('https://4340-50-5-95-80.ngrok-free.app/users/list-all');
        return response
    })
}


useQuery({
    queryKey: ['todos'], todoId,
    queryFn: async () => {
        const response = await fetch('/todos/' + todoId)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    },
})