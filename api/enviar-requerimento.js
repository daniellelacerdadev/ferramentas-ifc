const emailsCGP = {
    "abelardo-luz": "cgp.abelardoluz@ifc.edu.br",
    "araquari": "cgp.araquari@ifc.edu.br",
    "blumenau": "cgp.blumenau@ifc.edu.br",
    "brusque": "cgp.brusque@ifc.edu.br",
    "camboriu": "cgp.camboriu@ifc.edu.br",
    "concordia": "cgp.concordia@ifc.edu.br",
    "fraiburgo": "cgp.fraiburgo@ifc.edu.br",
    "ibirama": "cgp.ibirama@ifc.edu.br",
    "luzerna": "cgp.luzerna@ifc.edu.br",
    "rio-do-sul": "cgp.riodosul@ifc.edu.br",
    "sao-bento": "cgp.sbs@ifc.edu.br",
    "sao-francisco": "cgp.sfs@ifc.edu.br",
    "santa-rosa": "cgp.srs@ifc.edu.br",
    "sombrio": "cgp.sombrio@ifc.edu.br",
    "videira": "cgp.videira@ifc.edu.br",
    "reitoria": "concessoes@ifc.edu.br"
};

const remetente =
    "Sistema de Ferramentas IFC <nao-responda@concessoes.ifc.edu.br>";

async function enviarEmail(conteudo) {
    const resposta = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(conteudo)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        console.error("Erro do Resend:", resultado);
        throw new Error("Erro no envio do e-mail.");
    }

    return resultado;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido"
        });
    }

    try {
        const {
            emailServidor,
            unidade,
            linkManifestacao
        } = req.body;

        if (!emailServidor || !unidade || !linkManifestacao) {
            return res.status(400).json({
                erro: "Dados obrigatórios não informados."
            });
        }

        const emailCGP = emailsCGP[unidade];

        if (!emailCGP) {
            return res.status(400).json({
                erro: "Não foi possível identificar a unidade responsável."
            });
        }

        // 1. Confirmação para o servidor
        await enviarEmail({
            from: remetente,
            to: [emailServidor],
            subject: "Solicitação registrada — Licença para Capacitação",
            html: `
                <h2>Solicitação registrada</h2>

                <p>
                    Sua solicitação de Licença para Capacitação
                    foi registrada no Sistema de Ferramentas IFC.
                </p>

                <p>
                    O fluxo para obtenção da anuência da chefia imediata
                    foi iniciado.
                </p>

                <p>
                    <strong>Atenção:</strong> esta mensagem não representa
                    a concessão da Licença para Capacitação.
                    O afastamento somente poderá ocorrer após a conclusão
                    dos procedimentos administrativos e a publicação
                    do respectivo ato de concessão.
                </p>

                <hr>

                <p>
                    <strong>Esta é uma mensagem automática.
                    Não responda a este e-mail.</strong>
                </p>
            `
        });

        // 2. Link para CGP / Concessões
        await enviarEmail({
            from: remetente,
            to: [emailCGP],
            subject: "[TESTE DO SISTEMA] Anuência da chefia — Licença para Capacitação",
            html: `
                <h2>Solicitação de Licença para Capacitação</h2>

                 <p>
               <strong>ATENÇÃO: esta mensagem faz parte de um teste
               de desenvolvimento do Sistema de Ferramentas IFC.
               Não há solicitação real associada a este e-mail
               e nenhuma providência é necessária.</strong>
              </p>

                <p>
                    Encaminhe o link abaixo à chefia imediata
                    do servidor para registro da anuência ou não anuência:
                </p>

                <p>
                    <a href="${linkManifestacao}">
                        Acessar formulário para anuência da chefia
                    </a>
                </p>

                <p>
                    O link é individual e está relacionado
                    à solicitação registrada no sistema.
                </p>

                <hr>

                <p>
                    <strong>Esta é uma mensagem automática.
                    Não responda a este e-mail.</strong>
                </p>
            `
        });

        return res.status(200).json({
            sucesso: true,
            mensagem: "E-mails enviados com sucesso."
        });

    } catch (erro) {
        console.error("Erro em enviar-requerimento:", erro);

        return res.status(500).json({
            erro: "Não foi possível realizar o envio dos e-mails."
        });
    }
}