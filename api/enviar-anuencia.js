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

    const resposta = await fetch(
        "https://api.resend.com/emails",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(conteudo)
        }
    );

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
            pdfBase64,
            nomeArquivo,
            nomeServidor,
            anuencia
        } = req.body;

        if (
            !emailServidor ||
            !unidade ||
            !pdfBase64 ||
            !nomeArquivo ||
            !nomeServidor ||
            !anuencia
        ) {
            return res.status(400).json({
                erro: "Dados obrigatórios não informados."
            });
        }

        const emailCGP = emailsCGP[unidade];

        if (!emailCGP) {
            return res.status(400).json({
                erro:
                    "Não foi possível identificar a unidade responsável."
            });
        }

        const textoAnuencia =
            anuencia === "sim"
                ? "De acordo com a solicitação"
                : "Não está de acordo com a solicitação";

        await enviarEmail({
            from: remetente,

            to: [emailCGP],

            cc: [emailServidor],

            subject:
                "Anuência da chefia — Licença para Capacitação",

            html: `
                <h2>Anuência da chefia — Licença para Capacitação</h2>

                <p>
                    Foi concluído o registro da anuência da chefia
                    referente à solicitação de Licença para Capacitação
                    de <strong>${nomeServidor}</strong>.
                </p>

                <p>
                    <strong>Registro da chefia:</strong>
                    ${textoAnuencia}
                </p>

                <p>
                    O documento completo, contendo os dados da solicitação
                    e o registro da chefia imediata, segue anexo.
                </p>

                <p>
                    À unidade de gestão de pessoas, o documento é
                    encaminhado para continuidade dos procedimentos
                    administrativos.
                </p>

                <p>
                    O servidor recebe esta mensagem em cópia
                    exclusivamente para ciência do registro realizado
                    pela chefia.
                </p>

                <p>
                    <strong>Atenção:</strong>
                    este registro não representa a concessão da
                    Licença para Capacitação. O afastamento somente
                    poderá ocorrer após a conclusão dos procedimentos
                    administrativos e a publicação do respectivo
                    ato de concessão.
                </p>

                <hr>

                <p>
                    <strong>
                        Esta é uma mensagem automática.
                        Não responda a este e-mail.
                    </strong>
                </p>
            `,

            attachments: [
                {
                    filename: nomeArquivo,
                    content: pdfBase64
                }
            ]
        });

        return res.status(200).json({
            sucesso: true,
            mensagem:
                "Documento encaminhado com sucesso."
        });

    } catch (erro) {

        console.error(
            "Erro em enviar-anuencia:",
            erro
        );

        return res.status(500).json({
            erro:
                "Não foi possível encaminhar o documento."
        });
    }
}