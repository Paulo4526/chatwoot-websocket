import { useContext } from "react"
import { GetUserProvider } from "./agentProvider"

export const GetAgentContext = () => { 
    return useContext(GetUserProvider)
}
