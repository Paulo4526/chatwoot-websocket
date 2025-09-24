'use client'

import { getConnection } from "@/handlers/websocket/webSocket";
import { AgentInfo } from "@/model/model-user";
import { ScrollArea, Flex, Card, Text } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import "plyr-react/plyr.css"
import PlayButton from "./play-buton";
import ImagePreview from "./image-chato";
import RequestMessage from "@/requests/messages/getMessages";

interface GetAgent {
  agent: AgentInfo | null;
}

const Chat: React.FC<GetAgent | any> = ({ agent, ...props }) => {
  
  const [connectionStatus, setConnectionStatus] = useState<string>("Conectando...");
  const { getUserMessages } = RequestMessage();
  const { connection } = getConnection();
  const url = "wss://maxchat.moobz.com.br/cable";
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.setMessage([]);
    let closeConnection: (() => void) | undefined;

    const timer = setTimeout(() => {
      if (!agent) {
        setConnectionStatus("Erro na conexão!");
        return;
      } else {
        getUserMessages(
          agent.account_id,
          agent.acces_token,
          props.conversation,
          props.setMessage
        );
        return (closeConnection = connection(
          url,
          agent.pubsub_token,
          String(agent.account_id),
          String(agent.agent_id),
          props.conversation,
          setConnectionStatus,
          props.setMessage
        ));
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (closeConnection) closeConnection();
    };
  }, [agent, props.conversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [props.getMessage, props.conversation]);

  return (
    <Flex direction="column" style={{ width: props.width }}>
      {/* Status da conexão */}
      <Card
        variant="surface"
        style={{
          marginBottom: 20,
          backgroundColor:
            connectionStatus === "Conectado" ? "#3bf366e1" : "#ce3f4bff",
          border: `1px solid ${
            connectionStatus === "Conectado" ? "black" : "white"
          }`,
        }}
      >
        <Text
          size="2"
          style={{color: connectionStatus === "Conectado" ? "black" : "white"}}
        >
          Status: {connectionStatus}
        </Text>
      </Card>

      {/* Área de mensagens */}
      <ScrollArea
        type="always"
        scrollbars="vertical"
        style={{ height: props.height }}
      >
        <Flex
          ref={scrollRef}
          direction="column"
          justify="end"
          gap="2"
          style={{ minHeight: "100%", padding: 8 }}
        >
          {props.getMessage.length === 0 ? (
            <Text size="2" color="gray" style={{ fontStyle: "italic" }}>
              Aguardando mensagens com "content"... Verifique o console para
              logs detalhados.
            </Text>
          ) : (
            props.getMessage.map((msg: any) => (
              <Flex
                key={msg.id}
                justify={
                  msg.sender?.type?.toLowerCase() === "contact"
                    ? "start"
                    : "end"
                }
                style={{ padding: "0 10px" }}
              >
                <Card
                  variant="classic"
                  style={{
                    backgroundColor: msg.attachments
                      ? "transparent"
                      : msg.sender?.type?.toLowerCase() === "contact"
                      ? "#118dd4ad"
                      : "#5be41cb7",
                    maxWidth: "40%",
                  }}
                >
                  <Flex direction="column" gap="1">
                    {msg.attachments ? (
                      <>
                        {msg.attachments.map((url: any) => (
                          <React.Fragment key={url.data_url}>
                            {url.file_type === "audio" ? (
                              <PlayButton url={url.data_url} />
                              
                            ) : (
                              <ImagePreview url={url.data_url} />
                            )}
                          </React.Fragment>
                        ))}
                        <Text size="1" color="gray" align="right">
                          {new Date(msg.created_at * 1000).toLocaleString(
                            "pt-BR",
                            { timeZone: "America/Sao_Paulo" }
                          )}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text size="2">{msg.content}</Text>
                        <Text size="1" color="gray" align="right">
                          {new Date(msg.created_at * 1000).toLocaleString(
                            "pt-BR",
                            { timeZone: "America/Sao_Paulo" }
                          )}
                        </Text>
                      </>
                    )}
                  </Flex>
                </Card>
              </Flex>
            ))
          )}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default Chat;
