

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
        linkManifestacao,
        pdfBase64,
        nomeArquivo
    } = req.body;

        if (
            !emailServidor ||
            !linkManifestacao ||
            !pdfBase64 ||
            !nomeArquivo
        ) {
            return res.status(400).json({
                erro: "Dados obrigatórios não informados."
            });
        }
       

        // 1. Confirmação para o servidor
        await enviarEmail({
            from: remetente,
            to: [emailServidor],
            subject: "Solicitação registrada — Licença para Capacitação",
            html: `
                <h2>Comprovante de preenchimento</h2>

    <p>
        Sua solicitação de Licença para Capacitação foi registrada
        por meio do formulário eletrônico disponibilizado pela DGP.
    </p>

    <p>
        O PDF anexo contém os dados informados no formulário
        e é encaminhado exclusivamente para sua
        <strong>conferência e registro</strong>.
    </p>

    <p>
        <strong>
            Este documento não deve ser utilizado para abertura do processo.
        </strong>
    </p>

    <h3>Próxima etapa: manifestação da chefia imediata</h3>

    <p>
        Encaminhe o link abaixo à sua chefia imediata para que ela
        registre sua manifestação sobre a solicitação:
    </p>

    <p>
        <a href="${linkManifestacao}">
            Acessar formulário para manifestação da chefia
        </a>
    </p>

    <p>
        <strong>
            O link é individual e está relacionado à sua solicitação.
        </strong>
    </p>

    <p>
        Após o registro da manifestação da chefia, o documento final
        será encaminhado automaticamente à unidade de gestão de pessoas
        responsável pela continuidade do procedimento.
        Você receberá uma cópia para ciência.
    </p>

    <p>
        <strong>Atenção:</strong> o recebimento desta mensagem não
        representa a concessão da Licença para Capacitação.
        O afastamento somente poderá ocorrer após a conclusão dos
        procedimentos administrativos e a publicação do respectivo
        ato de concessão.
    </p>

    <hr>

    <p>
        <strong>
            Esta é uma mensagem automática. Não responda a este e-mail.
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
            mensagem: "E-mail enviado com sucesso."
        });

    } catch (erro) {
        console.error("Erro em enviar-requerimento:", erro);

        return res.status(500).json({
            erro: "Não foi possível realizar o envio do e-mail."
        });
    }
}