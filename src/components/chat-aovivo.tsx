'use client'

import { getConnection } from "@/handlers/websocket/webSocket";
import { AgentInfo } from "@/model/model-user";
import { ScrollArea } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
interface GetAgent{
    agent: AgentInfo | null;
}

const Chat:React.FC<GetAgent | any> = ({agent, ...props}) => {
    const [getmessage, setmessage] = useState<any[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<string>("Conectando...");
    const {connection} = getConnection()
    const url = "wss://maxchat.moobz.com.br/cable";
    const conversation_id = 61;
    const scrollRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!agent){
                    setConnectionStatus("Erro na conexão!")
                    return;
            }else{
                return connection(url, agent.pubsub_token, String(agent.account_id), String(agent.agent_id), String(conversation_id), setConnectionStatus, setmessage);
            }
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [agent]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block:"end",
            inline: "nearest"
        })
        
    }, [getmessage]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: props.width}}>
            <div style={{ 
                padding: '10px', 
                marginBottom: '20px', 
                borderRadius: '8px',
                backgroundColor: connectionStatus === 'Conectado' ? '#d4edda' : '#f8d7da',
                border: `1px solid ${connectionStatus === 'Conectado' ? '#c3e6cb' : '#f5c6cb'}`,
                color: connectionStatus === 'Conectado' ? '#155724' : '#721c24'
            }}>
                <strong>Status:</strong> {connectionStatus}
                </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                </div>
                
                <div style={{ marginTop: '20px' }}>
                <ScrollArea type="always" scrollbars="vertical" style={{ height: props.height, padding: '0px'}}>
                    <div ref={scrollRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end", gap: 10, padding: 5, minHeight: '100%' }}>
                        {getmessage.length === 0 ? (
                            <p style={{ color: '#666', fontStyle: 'italic', padding:'0px 20px' }}>
                                Aguardando mensagens com "content"... Verifique o console do navegador para logs detalhados.
                            </p>
                        ) : (
                            getmessage.map((msg, index) => (
                                <div key={msg._messageId || index} style={{ display: 'flex', justifyContent: msg.sender_type === 'Contact' ? 'flex-start' : 'flex-end', padding: '0px 20px' }}>
                                    <div style={{
                                        backgroundColor: msg.sender_type === 'Contact' ? '#118dd4ad' : '#5be41cb7',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 5,
                                        padding: '5px',
                                        maxWidth: '40%',
                                        wordBreak: 'break-word'
                                    }}>
                                        <p style={{ fontSize: 12, margin:'0px' }}>{msg.content}</p>
                                        <p style={{ fontSize: 7, margin:'0px' }}>{msg.updated_at}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default Chat