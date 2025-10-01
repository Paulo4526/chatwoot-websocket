export const Assignee = () => {

    const getTeams = async (
        account_id: number,
        acess_token: string | undefined,
        setTeams: (setValue: (prev: any[]) => any[]) => void
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/63e77d9f-9648-4178-a0e6-46b962e76be6', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token})
        })

        const data = await res.json()
        const newMessages: Record<string, any>[] = [];
        data.data.forEach((event: any) => {
            newMessages.push(event)
        })

        setTeams(prev => [
            ...prev,
            ...newMessages.filter(msg => !prev.some(p => p.id === msg.id))
        ])
    }


    const assignTeam = async (
        account_id: number,
        acess_token: string | undefined,
        team_id : number,
        conversation_id: number
    ) => {

        const res = await fetch('https://maxn8n.moobz.com.br/webhook/440e0045-6e2e-4c80-bb13-b5d980b27335', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token, team_id, conversation_id})
        })

        const data = await res.json()
        console.log(data)
        
    }

    const assignAgent = async (
        account_id: number,
        acess_token: string | undefined,
        agent_id : number,
        conversation_id: number
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/e1079047-8c23-4fcb-81be-211f44892d90', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token, agent_id, conversation_id})
        })

        const data = await res.json()
        console.log(data)
    }

    const getAgent = async (
        account_id: number,
        acess_token: string | undefined,
        setAgents: (setValue: (prev: any[]) => any[]) => void
    ) => {
        
        const res = await fetch("https://maxn8n.moobz.com.br/webhook/749ea7a9-05aa-4919-9276-607ece962559", {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token})
        })

        const data = await res.json()
        const newMessages: Record<string, any>[] = [];
        data.data.forEach((event: any) => {
            newMessages.push(event)
        })

        setAgents(prev => [
            ...prev,
            ...newMessages.filter(msg => !prev.some(p => p.id === msg.id))
        ])
        
    }

    return({getTeams, assignTeam, assignAgent, getAgent})
}