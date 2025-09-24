import { AgentInfo } from "@/model/model-user";
import RequestMessage from "@/requests/messages/getMessages";
import { Button, Flex, Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface GetNode {
  agent: AgentInfo | null;
}

const MensagensTeam: React.FC<GetNode | any> = ({ agent, ...props }) => {
  const [getmessage, setMessage] = useState<any[]>([]);
  const { getTeamMessage } = RequestMessage();

  useEffect(() => {
  if (!agent) return;

  // Chama imediatamente
  getTeamMessage(agent.account_id, agent.acces_token, agent.team_id, setMessage);

  // Chama a cada 10 segundos
  const interval = setInterval(() => {
    getTeamMessage(agent.account_id, agent.acces_token, agent.team_id, setMessage);
  }, 10000); // 10000ms = 10s

  return () => clearInterval(interval); // limpa ao desmontar ou mudar agent
}, [agent, props.conversation]);

  return (
    <Flex direction="column" gap="3" width={'280px'}>
      <Card style={{textAlign: 'center', backgroundColor:"white"}}>
        <Text style={{color:"black"}}>Caixa de Entrada</Text>
      </Card>

      {getmessage.length > 0 ? (
        <Flex direction="column" gap="2">
          {getmessage
            .slice()
            .sort((a, b) => a.conversation_id - b.conversation_id)
            .map((msg) => (
              <Card
                key={msg.conversation_id}
                variant="classic"
                style={{ cursor: "pointer" }}
                onClick={() => props.setConversation(Number(msg.conversation_id))}
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
          Mensagens Time
        </Text>
      )}
    </Flex>
  );
};

export default MensagensTeam;
