const RequestMessage = () => {

    const getMessage = async (
        account_id: number,
        acess_token: string,
        team_id: number,
        setMessage: (setValue: (prev: any[]) => any[]) => void
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/c21d6da0-b991-4553-bf8d-76c8412c619c', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token, team_id })
        });

        if (res.status == 200){
            console.log("Menssagem enviada com sucesso!")
            const data = await res.json()
            const payload = data.payloads
            console.log(data)
            const newMessages: Record<string, any>[] = [];
            payload.map((event: any) => {

                
                // console.log("messages: ", event.messages)
                const message = event.messages[0]
                const object: any = {
                    "content": `${message.content}`,
                    "sender_type": `${message.sender_type}`,
                    "conversation_id" : `${message.conversation_id}`,
                    "updated_at": `${message.updated_at}`,
                    // "telefone": `${message.sender.phone_number}`
                }

                newMessages.push(object);
            })

            setMessage(prev => {
            // remove mensagens antigas que não estão na nova resposta
            const filtered = prev.filter(msg =>
                newMessages.some(newMsg => newMsg.conversation_id === msg.conversation_id)
            );

            // adiciona mensagens novas que ainda não estavam no state
            newMessages.forEach(newMsg => {

                const exists = filtered.find(msg => msg.conversation_id === newMsg.conversation_id);
                if (!exists) filtered.push(newMsg);

            });

            return filtered;
        });


        }else{
            alert("Erro ao Enviar a menssagem!")
        }
    }

    const getTeamMessage = async (
        account_id: number,
        acess_token: string,
        team_id: number,
        setMessage: (setValue: (prev: any[]) => any[]) => void
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/d032d307-efcf-4cf1-bf6e-f3c8323d5a45', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token, team_id })
        });

        if (res.status == 200){
            console.log("Menssagem enviada com sucesso!")
            const data = await res.json()
            const payload = data.payloads
            const newMessages: Record<string, any>[] = [];
            payload.map((event: any) => {

                
                // console.log("messages: ", event.messages)
                const message = event.messages[0]
                const object: any = {
                    "content": `${message.content}`,
                    "sender_type": `${message.sender_type}`,
                    "conversation_id" : `${message.conversation_id}`,
                    "updated_at": `${message.updated_at}`,
                    // "telefone": `${message.sender.phone_number}`
                }

                newMessages.push(object);
            })

            setMessage(prev => {
            // remove mensagens antigas que não estão na nova resposta
            const filtered = prev.filter(msg =>
                newMessages.some(newMsg => newMsg.conversation_id === msg.conversation_id)
            );

            // adiciona mensagens novas que ainda não estavam no state
            newMessages.forEach(newMsg => {

                const exists = filtered.find(msg => msg.conversation_id === newMsg.conversation_id);
                if (!exists) filtered.push(newMsg);

            });

            return filtered;
        });


        }else{
            alert("Erro ao Enviar a menssagem!")
        }
    }

    const getUserMessages = async (
        account_id: number,
        acess_token: string,
        conversation_id: number,
        setMessage: (setValue: (prev: any[]) => any[]) => void
    ) => {
        const res = await fetch('https://maxn8n.moobz.com.br/webhook/85943cc0-ac82-4fa0-8975-18436af3c5e7', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ account_id, acess_token, conversation_id })
        });

        if (res.status == 200){
            console.log("Menssagem enviada com sucesso!")
            const data = await res.json()
            const payload = data.payload
            const newMessages: Record<string, any>[] = [];
            payload.map((event: any) => {
                newMessages.push(event);
            })

            console.log(newMessages)
            setMessage(prev => {
            // remove mensagens antigas que não estão na nova resposta
                const filtered = prev.filter(msg =>
                    newMessages.some(newMsg => newMsg.id === msg.id)
                );

                // adiciona mensagens novas que ainda não estavam no state
                newMessages.forEach(newMsg => {

                const exists = filtered.find(msg => msg.id === newMsg.id);
                if (!exists) filtered.push(newMsg);

            });

            return filtered;
        });


        }else{
            alert("Erro ao Enviar a menssagem!")
        }
    }


    return({getMessage, getTeamMessage, getUserMessages})
}

export default RequestMessage