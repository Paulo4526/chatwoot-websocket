'use client'

import Chat from "@/components/chat-aovivo";
import ChatCaixa from "@/components/chat-caixa";
import MensagensAgent from "@/components/mensagens-agent";
import MensagensTeam from "@/components/mensagens-team";
import { GetAgentContext } from "@/context/agent/agentContext";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function Home() {
  const {agent} = GetAgentContext()
  const [getLoad, setLoad] = useState<boolean>(false)
  const [getConversation, setConversation] = useState<number>(0);
  const [getmessage, setmessage] = useState<any[]>([]);
  const [getAgentMessage, setAgentMessage] = useState<any[]>([]);
  const [getTeamMessage, setTeamMessage] = useState<any[]>([]);
  const [getAssignee, setAssignee] = useState<number>(0);
  const [getContact, setContact] = useState<string>("");

  useEffect(() => {
      setTimeout(() => {
        setLoad(true)
      }, 1000)
  }, [getConversation, getmessage, getAgentMessage, getTeamMessage])

  return (
    <>
      {getLoad ? (
        <Flex gap={"2"}>
          <MensagensTeam 
            agent={agent} 
            setConversation={setConversation} 
            conversation={getConversation} 
            getMessage={getTeamMessage} 
            setMessage={setTeamMessage}
            assignee={setAssignee}
            contact={setContact}
          />
          <MensagensAgent 
            agent={agent} 
            setConversation={setConversation} 
            conversation={getConversation} 
            getMessage={getAgentMessage} 
            setMessage={setAgentMessage}
            assignee={setAssignee}
            contact={setContact}
          />
          {getConversation <= 0 ? (
            <>
              <Flex>Carregando</Flex>
            </>
          ) : (
            <Flex direction={"column"} width={'500px'} align={"center"} px={"3"}>
              <Chat 
                width = '100%' 
                height= '50vh' 
                agent={agent} 
                conversation={getConversation} 
                getMessage={getmessage} 
                setMessage={setmessage}
                contact={getContact}
              />
              {getAssignee === Number(agent?.agent_id) ? (
                <ChatCaixa 
                width = '100%' 
                padding= '0px'
                height='15vh' 
                borderStyle= 'none' 
                agent={agent} 
                conversation={getConversation}
              />
              ) : (null)}
            </Flex>
          )}
        </Flex>
      ) : (
        <>
          Carregando a tela!
        </>
      )}
    </>
  );
}