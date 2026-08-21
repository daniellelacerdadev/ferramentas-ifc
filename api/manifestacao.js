import crypto from "crypto";

export default function handler(req, res) {

    // Permite a comunicação com o formulário
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Responde à verificação do navegador
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Aceita somente POST
    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido."
        });
    }

    // Recebe os dados enviados pelo formulário
    const dados = req.body;

    // Gera um identificador único
    const token = crypto.randomUUID();

    return res.status(200).json({
        sucesso: true,
        mensagem: "Dados recebidos com sucesso!",
        token: token,
        dadosRecebidos: dados
    });
}