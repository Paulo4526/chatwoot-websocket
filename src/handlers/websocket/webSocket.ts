export const getConnection = () => {
    
    const connection = (
        url: string, 
        pubsub: 
        string, 
        account_id: number,
        user_id: number,
        setConnectionStatus: (connection: string) => void,
        onMessage: (messageData: { [key: string]: any }, source: string) => void
    ) => {
        const connection = new WebSocket(url);
        const seen = new Set<string>();

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
                // Extrair payload padronizado (sem fallback por type)
                // Considera formatos comuns do ActionCable: message.data, message, ou data direto
                const payload = (data && (
                    (data.message && (data.message.data ?? data.message)) ??
                    data.data
                )) as any;

                // Início Processamento de mensagens
                if (payload) {
                    const messageData = Array.isArray(payload) ? payload[0] : payload;
                    const key = typeof (messageData?.content) === 'string' ? messageData.content : JSON.stringify(messageData);
                    if (!seen.has(key)) {
                        seen.add(key);
                        onMessage(messageData, "message_type");
                    }
                }
            // Fim Processamento de mensagens

            } catch (err) {
                console.error("❌ Erro ao processar mensagem WebSocket:", err);
                console.error("📄 Dados que causaram erro:", event.data);
            }
        // Fim Recebimento de mensagens
        };

        connection.onerror = (error) => {
            console.error("❌ Erro na conexão:", error);
            setConnectionStatus("Erro na conexão");
        };

        connection.onclose = (event) => {
            console.warn("🔌 Conexão encerrada:", event);
            setConnectionStatus("Conexão encerrada");
        };
        return () => {
            connection.close();
        };
    }

    const onMessage = (
        messageData: { [key: string]: any }, 
        source: string,
        processedRef: { current: Set<string> },
        setmessage: (updater: (prev: any[]) => any[]) => void
    ) => {
        const content = messageData?.content;
        const msgType = messageData?.type;
        if (!content || (typeof content === 'string' && content.trim().length === 0)) return;
        if ((typeof content === 'string' && content.trim().toLowerCase() === 'ping') || msgType === 'ping') return;

        const scopeKey = (messageData?.conversation_id ?? messageData?.room_id ?? messageData?.chat_id ?? messageData?.id ?? '').toString();
        const contentKey = typeof content === 'string' ? content.trim() : JSON.stringify(content);
        const id = `${scopeKey}|${contentKey}`;
        if (processedRef.current.has(id)) return;
        processedRef.current.add(id);
        setmessage(prev => [...prev, { ...messageData, _messageId: id, _source: source }]);
    };

    return({connection, onMessage})
}
