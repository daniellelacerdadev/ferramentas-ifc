export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido"
        });
    }

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                erro: "E-mail não informado"
            });
        }

        const resposta = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "Sistema de Ferramentas IFC <nao-responda@concessoes.ifc.edu.br>",
                to: [email],
                subject: "Teste de envio — Sistema de Ferramentas IFC",
                html: `
                    <h2>Teste realizado com sucesso 🎉</h2>

                    <p>
                        Este e-mail foi enviado pelo
                        <strong>Sistema de Ferramentas IFC de Auxílio aos Servidores</strong>.
                    </p>

                    <p>
                        Se você recebeu esta mensagem, a integração
                        <strong>Vercel + Resend</strong> está funcionando.
                    </p>

                    <p>
                        Este é apenas um teste. Nenhuma ação é necessária.
                    </p>
                `
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            console.error("Erro do Resend:", dados);

            return res.status(resposta.status).json({
                erro: "Erro ao enviar e-mail",
                detalhes: dados
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: "E-mail enviado com sucesso",
            id: dados.id
        });

    } catch (erro) {
        console.error("Erro no envio:", erro);

        return res.status(500).json({
            erro: "Erro interno ao enviar e-mail"
        });
    }
}