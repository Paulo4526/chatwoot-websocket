'use client'

import Chat from "@/components/chat-aovivo";
import ChatCaixa from "@/components/chat-caixa";
import { GetAgentContext } from "@/context/agent/agentContext";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function Home() {
  const {agent} = GetAgentContext()
  const [getLoad, setLoad] = useState<boolean>(false)

  useEffect(() => {
    if(agent){
      setLoad(true)
    }
  }, [agent])

  return (
    <>
      {getLoad ? (
        <Flex direction={"column"} width={'500px'} align={"center"} px={"3"}>
        <Chat width = '100%' height= '50vh' agent={agent}/>
        <ChatCaixa width = '100%' padding= '0px' height='15vh' borderStyle= 'none' agent={agent} conversation={61}/>
      </Flex>
      ) : (
        <>
          Carregando a tela!
        </>
      )}
    </>
  );
}