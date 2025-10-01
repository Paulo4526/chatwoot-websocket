import { Flex, Select } from "@radix-ui/themes"
import BotaoAgentAssinatura from "../botaoAtribuicao"
import { Assignee } from "@/requests/assign/assinarMensagens"

const TeamSelect = ({...props}) => {
    const {assignTeam} = Assignee()
    return(
        <Flex gap={"2"}>
            <Select.Root 
                defaultValue="time" 
                onValueChange={(value) => {
                    const selected = props.getTeam.find((team: any) => team.name === value)
                    if (selected) {
                        const object = {
                            "name": `${selected.name}`,
                            "id": `${selected.id}`,
                            "account_id": `${selected.account_id}`
                        }
                        props.setSelectedTeam(object)
                    }else{
                        console.log("")
                    }
                }}
            >
                <Select.Trigger style={{width: "200px"}}/>
                <Select.Content >
                    <Select.Group>
                    <Select.Item value="time" disabled>selecionar Time</Select.Item>
                        {props.getTeam ? (
                            <>
                                {props.getTeam.map((event: any) => (
                                    <Select.Item value={event.name} key={event.id}>{event.name}</Select.Item>
                                ))}
                            </>
                        ) : (null)}
                    
                </Select.Group>
                </Select.Content>
            </Select.Root>

            <BotaoAgentAssinatura 
                content={"Assinar time"} 
                onClick={() => {
                    assignTeam(props.getSelectedTeam.account_id, props.agent.acces_token, props.getSelectedTeam.id, props.conversation)
                }}
            />
        </Flex>
    )
}

export default TeamSelect