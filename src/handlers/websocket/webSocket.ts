export const getConnection = () => {
    
    const connection = (
        url: string, 
        pubsub: string, 
        account_id: string,
        user_id: string,
        conversation_id: string,
        setConnectionStatus: (connection: string) => void,
        setmessage: (updater: (prev: any[]) => any[]) => void
    ) => {
        const connection = new WebSocket(url);

        connection.onopen = () => {
            setConnectionStatus("Conectado");

            // Início Incrição nos canais
            const canais = [
                {
                    channel: "ConversationChannel",
                    pubsub_token: pubsub,
                    account_id: account_id,
                },
                {
                    channel: "RoomChannel",
                    pubsub_token: pubsub,
                    account_id: account_id,
                    user_id: user_id,
                }
            ];

            canais.forEach((canal, index) => {
                setTimeout(() => {
                    const subscribeMessage = {
                        command: "subscribe",
                        identifier: JSON.stringify(canal),
                    };

                    connection.send(JSON.stringify(subscribeMessage));
                }, index * 1000);
            });
        // Fim Incrição nos canais
        };

        connection.onmessage = (event) => {
            // Início Recebimento de mensagens
            
            try {
                const data = JSON.parse(event.data);
                const getMessage = data.message;

                if(getMessage?.data){
                    if(getMessage?.data?.status === 'read'){
                        console.log("Mensagem lida pelo cliente!");

                    }else if(getMessage?.data?.attachments){
                        getMessage?.data?.attachments.forEach((event: any) => {
                            console.log(event)
                        })

                    }else if(getMessage?.data?.content){
                        console.log(getMessage.data.content)
                        const conversation = getMessage.data.conversation;
                        const id_conversation = getMessage.data.conversation_id;

                        if (String(conversation.assignee_id) === user_id && String(id_conversation) === conversation_id) {
                            const content = getMessage.data;
                            console.log(content);
                            setmessage(prev => [...prev, { ...content }]);
                        }
                    }
                }
            } catch (err) {
                console.error("Erro ao processar mensagem WebSocket:", err);
                console.error("Dados que causaram erro:", event.data);
            }


            // Fim Recebimento de mensagens
        };


        connection.onerror = (error: any) => {
            console.error("❌ Erro na conexão:", error);
            setConnectionStatus("Erro na conexão");
        };

        connection.onclose = (event: any) => {
            console.warn("🔌 Conexão encerrada:", event);
            setConnectionStatus("Conexão encerrada");
        };
        return () => {
            connection.close();
        };
    }

    return({connection})
}