import crypto from "crypto";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

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

    try {

        // Recebe os dados enviados pelo formulário
        const dados = req.body;

        // Gera um identificador único
        const token = crypto.randomUUID();

        // Salva o token e os dados no banco
        await sql`
            INSERT INTO manifestacoes (token, dados)
            VALUES (${token}, ${JSON.stringify(dados)})
        `;

        // Retorna o token para o formulário
        return res.status(200).json({
            sucesso: true,
            mensagem: "Dados recebidos e salvos com sucesso!",
            token: token
        });

    } catch (erro) {

        console.error("Erro ao salvar manifestação:", erro);

        return res.status(500).json({
            sucesso: false,
            erro: "Não foi possível salvar os dados."
        });
    }
}