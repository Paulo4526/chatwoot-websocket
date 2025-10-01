import { Flex, Select } from "@radix-ui/themes"
import BotaoAgentAssinatura from "../botaoAtribuicao"
import { Assignee } from "@/requests/assign/assinarMensagens"

const SelectAgent = ({...props}) => {
    const {assignAgent} = Assignee()
    return(
        <Flex gap={"2"}>
            <Select.Root 
                defaultValue="agentes" 
                onValueChange={(value) => {
                    const selected = props.getAgent.find((team: any) => team.name === value)
                    if (selected) {
                        const object = {
                            "account_id" : `${selected.account_id}`,
                            "name": `${selected.name}`,
                            "id": `${selected.id}`
                        }
                        props.setSelectedAgent(object)
                    }else{
                        console.log("")
                    }
                }}
            >
                <Select.Trigger style={{width: "200px"}}/>
                <Select.Content >
                    <Select.Group>
                    <Select.Item value="agentes" disabled>Selecionar Agentes</Select.Item>
                        {props.getAgent ? (
                            <>
                                {props.getAgent.map((event: any) => (
                                    <Select.Item value={event.name} key={event.id}>{event.name}</Select.Item>
                                ))}
                            </>
                        ) : (null)}
                    
                </Select.Group>
                </Select.Content>
            </Select.Root>

            <BotaoAgentAssinatura 
                content={"Selecionar Agente"} 
                onClick={() => {
                    assignAgent(props.getSelectedAgent.account_id, props.agent.acces_token, props.getSelectedAgent.id, props.conversation)

                }}
            />
        </Flex>
    )
}

export default SelectAgent