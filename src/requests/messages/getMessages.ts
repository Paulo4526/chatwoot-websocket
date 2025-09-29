const RequestMessage = () => {

const getAgentMessage = async (
    account_id: number,
    acess_token: string,
    team_id: number,
    setMessage: (setValue: (prev: any[]) => any[]) => void
) => {
        const res = await fetch(
            "https://maxn8n.moobz.com.br/webhook/c21d6da0-b991-4553-bf8d-76c8412c619c",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account_id, acess_token, team_id }),
            }
        );

        if (res.status === 200) {
            const data = await res.json();
            const payload = data.payloads;
            const newMessages: Record<string, any>[] = [];
            payload.forEach((event: any) => {
                const meta = event.meta;
                const message = event.messages[0];

                const object: any = {
                    content: message.content,
                    sender_type: message.sender_type,
                    conversation_id: message.conversation_id,
                    updated_at: message.updated_at,
                    name: meta.sender.name,
                    telefone: meta.sender?.phone_number,
                    message_id: message.id,
                    assignee_id: message.conversation?.assignee_id
                };

                newMessages.push(object);
            });

            setMessage(prev => {
            let updated = [...prev];

            // 1️⃣ Remove mensagens que existem no state mas não vieram na requisição
            updated = updated.filter(prevMsg =>
                newMessages.some(newMsg => newMsg.conversation_id === prevMsg.conversation_id)
            );

            // 2️⃣ Adiciona ou atualiza mensagens
            newMessages.forEach(newMsg => {
                const index = updated.findIndex(
                    msg => msg.conversation_id === newMsg.conversation_id
                );

                if (index === -1) {
                    // Adiciona novo item
                    updated.push(newMsg);
                } else if (updated[index].message_id !== newMsg.message_id) {
                    // Atualiza item existente se o message_id for diferente
                    updated[index] = newMsg;
                }
                // se message_id for igual, mantém como está
            });

            return updated;
        });
        } else {
            alert("Erro ao enviar a mensagem!");
        }
    };


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
            // console.log("Menssagem enviada com sucesso!")
            const data = await res.json()
            const payload = data.payloads
            const newMessages: Record<string, any>[] = [];
            payload.forEach((event: any) => {
                const meta = event.meta;
                const message = event.messages[0];

                const object: any = {
                    content: message.content,
                    sender_type: message.sender_type,
                    conversation_id: message.conversation_id,
                    updated_at: message.updated_at,
                    name: meta.sender.name,
                    telefone: meta.sender?.phone_number,
                    message_id: message.id,
                    assignee_id: message.conversation?.assignee_id
                };

                newMessages.push(object);
            });

            console.log(newMessages)

            setMessage(prev => {
            let updated = [...prev];

            // 1️⃣ Remove mensagens que existem no state mas não vieram na requisição
            updated = updated.filter(prevMsg =>
                newMessages.some(newMsg => newMsg.conversation_id === prevMsg.conversation_id)
            );

            // 2️⃣ Adiciona ou atualiza mensagens
            newMessages.forEach(newMsg => {
                const index = updated.findIndex(
                    msg => msg.conversation_id === newMsg.conversation_id
                );

                if (index === -1) {
                    // Adiciona novo item
                    updated.push(newMsg);
                } else if (updated[index].message_id !== newMsg.message_id) {
                    // Atualiza item existente se o message_id for diferente
                    updated[index] = newMsg;
                }
                // se message_id for igual, mantém como está
            });

            return updated;
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

            // console.log(newMessages)
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


    return({getAgentMessage, getTeamMessage, getUserMessages})
}

export default RequestMessage