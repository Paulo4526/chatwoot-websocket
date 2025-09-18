export const getConnection = () => {
    
    const connection = (
        url: string, 
        pubsub: 
        string, 
        account_id: number,
        user_id: number,
        conversation_id: number,
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
                const getMessage = data.message
                

                // Funçao para verificar se a menssagem contem conteúdo
                if(getMessage?.data?.content){
                        //Contante que atribui o caiminho até o objeto conversacao
                        const conversation = getMessage.data.conversation
                        const id_conversation = getMessage.data.conversation_id 

                        //Condicional que verifica se o status da menssagem foi lido para nao gerar menssagem duplicada
                        if(getMessage?.data?.status === "read"){
                            console.log("Menssagem lida pelo cliente!")
                        }else{
                            //Condicional para agentes normais, onde só poderá ser visto as menssagen nao atribuidas ou atribuidas ao proprio agente
                            if((conversation.assignee_id === user_id) && (id_conversation === conversation_id)){
                                const content = getMessage.data
                                console.log(content)
                                setmessage(prev => [...prev, { ...content}]);
                            }
                        }
                    }

            } catch (err) {
                console.error("❌ Erro ao processar mensagem WebSocket:", err);
                console.error("📄 Dados que causaram erro:", event.data);
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
