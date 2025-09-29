import { AgentInfo } from "@/model/model-user";
import RequestMessage from "@/requests/messages/getMessages";
import { Button, Flex, Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface GetNode {
  agent: AgentInfo | null;
}

const MensagensAgent: React.FC<GetNode | any> = ({ agent, ...props }) => {
  const { getAgentMessage } = RequestMessage();

  useEffect(() => {
  if (!agent) return;

  // Chama imediatamente
  getAgentMessage(agent.account_id, agent.acces_token, agent.team_id, props.setMessage);

  // Chama a cada 10 segundos
  const interval = setInterval(() => {
    getAgentMessage(agent.account_id, agent.acces_token, agent.team_id, props.setMessage);
  }, 5000); // 5000ms = 5s

  return () => clearInterval(interval); // limpa ao desmontar ou mudar agent
}, [agent]);

  return (
    <Flex direction="column" gap="3" width={'280px'}>
      <Card style={{textAlign: 'center', backgroundColor:"white"}}>
        <Text style={{color:"black"}}>Minhas Menssagens</Text>
      </Card>
      {props.getMessage !== null ? (
        <Flex direction="column" gap="2">
          {props.getMessage
            .slice()
            .sort((a: any, b: any) => a.conversation_id - b.conversation_id)
            .map((msg: any) => (
              <Card
                key={msg.conversation_id}
                variant="classic"
                style={{ cursor: "pointer", height: '100px' }}
                onClick={() => {
                  props.setConversation(Number(msg.conversation_id))
                  props.assignee(Number(msg.assignee_id))
                  if(msg.name === null){
                    props.contact(msg.telefone)
                  }else{
                    props.contact(msg.name)
                  }
                }}
              >
                <Flex direction="column" gap="1">
                  <Text size="1" weight="bold">
                    {msg.name ?? "Anônimo"}
                  </Text>

                  <Text size="2">
                    {msg.content.length > 30
                      ? msg.content.slice(0, 30) + "..."
                      : msg.content}
                  </Text>

                  <Text
                    size="1"
                    color="gray"
                    style={{ textAlign: "right" }}
                  >
                    {new Date(msg.updated_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Flex>
              </Card>
            ))}
        </Flex>
      ) : (
        <Text size="2" color="gray">
          Mensagem agent
        </Text>
      )}
    </Flex>
  );
};

export default MensagensAgent;
