'use client'

import Chat from "@/components/chat-aovivo";
import ChatCaixa from "@/components/chat-caixa";
import Mensagens from "@/components/mensagens-entrada";
import { GetAgentContext } from "@/context/agent/agentContext";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function Home() {
  const {agent} = GetAgentContext()
  const [getLoad, setLoad] = useState<boolean>(false)
  const [getConversation, setConversation] = useState<number>(0);

  useEffect(() => {
    if(agent){
      setLoad(true)
    }
  }, [agent])

  return (
    <>
      {getLoad ? (
        <Flex>
          {getConversation <= 0 ? (
            <>
              <Mensagens agent={agent} setConversation={setConversation}/>
            </>
          ) : (
            <Flex direction={"column"} width={'500px'} align={"center"} px={"3"}>
              <Chat width = '100%' height= '50vh' agent={agent}/>
              <ChatCaixa width = '100%' padding= '0px' height='15vh' borderStyle= 'none' agent={agent} conversation={70}/>
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