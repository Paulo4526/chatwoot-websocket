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
    return({sendMessage, agentLogin})
}

export default RequestMessage