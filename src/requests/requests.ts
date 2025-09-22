import { AgentInfo } from "@/model/model-user";

const RequestMessage = () => {

    const sendMessage = async (
        message: string,
        user_id: number,
        conversation_id: number,
        account_id: number,
        acess_token: string,
        setMessage: (setValue: string) => void,
        setMessageLoad: (load: boolean) => void
    ) => {
        setMessageLoad(false)
        setMessage("")
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/7663a32f-424e-4d52-b258-4cf16e2a014c', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ message, user_id, conversation_id, account_id, acess_token })
        });

        if (res.status == 200){
            console.log("Menssagem enviada com sucesso!")
            setMessageLoad(true)
        }else{
            setMessageLoad(true)
            alert("Erro ao Enviar a menssagem!")
        }
    }

    const agentLogin = async (
        email: string,
        password: string,
        setAgent: (agent: AgentInfo | null) => void,
        setLogin: (login: boolean) => void
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/f5fe2194-c723-49ca-b79a-a572dedab782', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        if (res.status == 200){
            const data = await res.json()
            console.log(data)
            setAgent(data)
            setLogin(true)
            
        }else{
            console.error('Erro ao fazer login!')
        }
    }

    const getMessage = async (
        account_id: number,
        acess_token: string,
        team_id: number,
        setMessage: (setValue: (prev: any[]) => any[]) => void
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/c21d6da0-b991-4553-bf8d-76c8412c619c', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token, team_id })
        });

        if (res.status == 200){
            console.log("Menssagem enviada com sucesso!")
            const data = await res.json()
            const payload = data.payloads
            payload.map((event: any) => {
                console.log("messages: ", event.messages)
                const message = event.messages[0]
                const object: any = {
                    "content": `${message.content}`,
                    "sender_type": `${message.sender_type}`,
                    "conversation_id" : `${message.conversation_id}`,
                    "updated_at": `${message.updated_at}`,
                    // "telefone": `${message.sender.phone_number}`
                }
                if(message?.sender){
                    object.name = `${message.sender.name}`;
                    object.telefone = `${message.sender.phone_number}`;
                }
                setMessage(prev => [...prev, {...object}]);
            })
        }else{
            alert("Erro ao Enviar a menssagem!")
        }
    }
    return({sendMessage, agentLogin, getMessage})
}

export default RequestMessage