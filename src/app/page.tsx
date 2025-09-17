'use client'
import { getConnection } from "@/handlers/websocket/webSocket";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [getmessage, setmessage] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>("Conectando...");
  const {connection} = getConnection()
  const url = "wss://<seu-dominio>/cable";
  const pubsub = "WM3DQweHyTHZ5v728FeTUc5X";
  const account_id = 19;
  const user_id = 6;
  const agent_role = "agent"

  useEffect(() => {

    return connection(url, pubsub, account_id, user_id, agent_role, setConnectionStatus, setmessage);

  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
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
        {getmessage.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Aguardando mensagens com "content"... Verifique o console do navegador para logs detalhados.
          </p>
        ) : (
          getmessage.map((msg, index) => (
            <div 
              key={msg._messageId || index} 
              style={{ 
                padding: '5px', 
                marginBottom: '10px',
              }}
            >
              
              <div style={{
                  
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender_type ==='Contact' ? 'flex-start' : 'flex-end'
                }}>
                  <div
                    style={{
                      backgroundColor: msg.sender_type ==='Contact' ? '#118dd4ad' : '#5be41cb7',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '5px',
                      padding: '5px'
                    }}
                  >
                    <p style={{fontSize: '12px', marginBottom: '3px'}}>{msg.content}</p>
                    <p style={{fontSize: '7px'}}>{msg.updated_at}</p>
                  </div>
              </div>
              
              <pre style={{ 
                backgroundColor: '#fff', 
                padding: '10px', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                border: '1px solid #eee'
              }}>
                {JSON.stringify(msg, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
