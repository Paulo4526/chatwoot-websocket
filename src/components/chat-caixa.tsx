import { AgentInfo } from "@/model/model-user";
import { sendMessage } from "@/requests/messages/sendMessage";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Flex, Spinner, TextArea } from "@radix-ui/themes";
import { useState } from "react";

interface GetAgent{
    agent: AgentInfo | null;
}

const ChatCaixa:React.FC<GetAgent | any> = ({agent, ...props}) => {
    const [getMessage, setMessage] = useState<string>("");
    const [MessageLoad, setMessageLoad] = useState<boolean>(true)

    return(
        <Flex direction={"column"} align={"center"} width={props.width} gap={"2"}>
            <TextArea 
                style={{
                    width: props.width, 
                    padding: props.padding, 
                    height: props.height,
                    borderStyle: props.borderStyle,
                    borderWidth: props.borderWidth,
                }}
                variant="soft"
                color="iris"    
                size={"1"}
                onChange={
                    (event) => {
                        setMessage(event.target.value)
                    }
                }
                onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) { // Shift+Enter permite quebra de linha
                    event.preventDefault(); // evita a quebra de linha
                    if(getMessage.trim() && agent) {
                        sendMessage(
                            getMessage, 
                            agent.agent_id, 
                            props.conversation,
                            agent.account_id,
                            agent.acces_token,
                            setMessage,
                            setMessageLoad
                );
            }
        }
    }}
                value={getMessage}
            />
            <Flex justify={"end"} width={props.width}>
                <Button 
                    onClick={() => {
                        sendMessage(
                            getMessage, 
                            agent.agent_id, 
                            props.conversation,
                            agent.account_id,
                            agent.acces_token,
                            setMessage,
                            setMessageLoad
                        )
                    }}
                >
                    {MessageLoad ? (
                        <PaperPlaneIcon/>

                    ) : (<Spinner></Spinner>)}
                    Enviar
                </Button>
            </Flex>
        </Flex>
    )
}

export default ChatCaixa;
