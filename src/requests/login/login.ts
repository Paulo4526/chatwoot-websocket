import { AgentInfo } from "@/model/model-user";
import { redirect } from "next/navigation";

export const agentLogin = async (
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