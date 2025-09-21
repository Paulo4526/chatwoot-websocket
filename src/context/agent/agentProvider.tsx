'use client'

import { AgentInfo} from "@/model/model-user"
import RequestMessage from "@/requests/requests";
import { createContext, ReactNode, useEffect, useState } from "react";

interface getTrivialDetails{
    agent: AgentInfo | null;
    login: boolean
}

export const GetUserProvider = createContext({} as getTrivialDetails)

export interface GetNode {
    children: ReactNode;
}

export const AgentContextProvider:React.FC<GetNode> = ({children}) => {
    const {agentLogin} = RequestMessage();
    const [agent, setAgent] = useState<AgentInfo | null>(null)
    const [login, setLogin] = useState<boolean>(false)

    useEffect(() => {
        if (!login){
            agentLogin('paulosilvabuenoo@gmail.com', 'Bueninho1!', setAgent, setLogin)
        }
    },[login])

    return(
        <GetUserProvider.Provider value={{agent, login}}>
            {children}            
        </GetUserProvider.Provider>
    )
}