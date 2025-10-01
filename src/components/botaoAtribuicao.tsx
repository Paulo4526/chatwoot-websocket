'use client'

import { Button } from "@radix-ui/themes"

const BotaoAgentAssinatura = ({...props}) => {
    return (
        <>
            <Button onClick={props.onClick}>{props.content}</Button>
        </>
    )
}

export default BotaoAgentAssinatura