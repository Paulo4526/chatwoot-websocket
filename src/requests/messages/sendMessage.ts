export const sendMessage = async (
    message: string,
    user_id: number,
    conversation_id: number,
    account_id: number,
    acess_token: string,
    setMessage: (setValue: string) => void,
    setMessageLoad: (load: boolean) => void
) => {
    setMessageLoad(false)
    setMessage("")
    const res = await fetch('https://maxn8n.moobz.com.br/webhook/7663a32f-424e-4d52-b258-4cf16e2a014c', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ message, user_id, conversation_id, account_id, acess_token })
    });

    if (res.status == 200){
        console.log("Menssagem enviada com sucesso!")
        setMessageLoad(true)
    }else{
        setMessageLoad(true)
        alert("Erro ao Enviar a menssagem!")
    }
}