import { MinhaMsg } from "@/model/minhas-msg";
import { AgentInfo } from "@/model/model-user";
import RequestMessage from "@/requests/requests";
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface GetNode{
    agent: AgentInfo | null;
    minhaMsg: MinhaMsg[] | null
}


const Mensagens:React.FC<GetNode | any> = ({agent, minhaMsg, ...props}) => {
    const [getmessage, setMessage] = useState<any[]>([]);
    const { getMessage } = RequestMessage();
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(!agent){
                setLoad(false)
            }else{
                setLoad(true)
            }
        }, 1000)

        return () => {
            clearTimeout(timer)
            setLoad(true)
        }
    },[agent])
    return (
        <>
            <Button onClick={() => {getMessage(agent.account_id, agent.acces_token, agent.team_id, setMessage)}}>Pegar menssagens</Button>
            {getmessage.length > 0 ? (
                <div>
                    <div>
                        {getmessage
                            .slice() // cria uma cópia para não alterar o state
                            .sort((a, b) => a.conversation_id - b.conversation_id) // menor → maior
                            .map((msg) => (
                            <div
                                key={msg.conversation_id}
                                style={{
                                background: '#dcf8c6',
                                borderRadius: '5px',
                                padding: '6px 10px',
                                marginBottom: '6px',
                                maxWidth: '250px',
                                color: '#111',
                                fontFamily: 'sans-serif',
                                alignSelf: 'flex-start',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                wordBreak: 'break-word',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                }}
                                onClick={() => alert(`Mensagem de ${msg.name ?? 'Anônimo'} clicada!`)}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#c3e6b0')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = '#dcf8c6')}
                            >
                                <p style={{ fontWeight: 600, marginBottom: '2px', fontSize: '12px' }}>
                                {msg.name ?? 'Anônimo'}
                                </p>
                                <p style={{ marginBottom: '2px', fontSize: '13px' }}>{msg.content}</p>
                                <p style={{ fontSize: '10px', color: '#555', textAlign: 'right' }}>
                                {new Date(msg.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            ) : (
                <div>
                    Sem menssagens!
                </div>
            )}
        </>
    )
}

export default Mensagens;