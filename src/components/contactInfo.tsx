'use client'

import { Flex, Select } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import BotaoAgentAssinatura from "./botaoAtribuicao"
import { Assignee } from "@/requests/assign/assinarMensagens"
import TeamSelect from "./selecionaTime/teamSelect"
import SelectAgent from "./selecionaAgent/agentSelect"

const InformacoesContato = ({...props}) => {
    const {getTeams, getAgent} = Assignee()
    const [getTeam, setTeams] = useState<any[]>([])
    const [getSelectedTeam, setSelectedTeam] = useState<any>({})
    const [getAgents, setAgents] = useState<any[]>([])
    const [getSelectedAgent, setSelectedAgent] = useState<any>({})
    useEffect(() => {
        // Chamada inicial
        getTeams(19, 'JAvR4UCtEizMVJpEMuBiTgTu', setTeams);
        getAgent(19, 'JAvR4UCtEizMVJpEMuBiTgTu', setAgents);
        console.log(getSelectedAgent)

        // Intervalo que roda a cada 5 segundos
        const interval = setInterval(() => {
            getTeams(19, 'JAvR4UCtEizMVJpEMuBiTgTu', setTeams);
            getAgent(19, 'JAvR4UCtEizMVJpEMuBiTgTu', setAgents);
        }, 5000);

        // Limpeza do intervalo ao desmontar
        return () => clearInterval(interval);
    },[getSelectedTeam, getSelectedAgent])


    return(
        <Flex direction={"column"} gap={"3"}>
            <TeamSelect 
                setSelectedTeam={setSelectedTeam} 
                getTeam={getTeam} 
                agent={props.agent} 
                conversation={props.conversation} 
                getSelectedTeam={getSelectedTeam}
            />
            <SelectAgent 
                conversation={props.conversation} 
                agent={props.agent}
                getAgent={getAgents}
                setSelectedAgent={setSelectedAgent}
                getSelectedAgent={getSelectedAgent}
            />
        </Flex>
    )
}

export default InformacoesContato