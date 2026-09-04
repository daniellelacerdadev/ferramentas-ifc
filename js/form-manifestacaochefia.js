// ==========================================================
// FORMULÁRIO DE MANIFESTAÇÃO DA CHEFIA
// Carrega os dados do requerimento pelo token
// ==========================================================


// ----------------------------------------------------------
// Obtém o token presente na URL
// ----------------------------------------------------------

const parametros = new URLSearchParams(window.location.search);
const token = parametros.get("token");


// ----------------------------------------------------------
// Verifica se existe token
// ----------------------------------------------------------

if (!token) {

    alert("Não foi possível identificar o requerimento.");

    throw new Error("Token não encontrado na URL.");
}


// ----------------------------------------------------------
// Busca os dados do requerimento no backend
// ----------------------------------------------------------

async function carregarRequerimento() {

    try {

        const resposta = await fetch(
            `https://ferramentas-ifc.vercel.app/api/manifestacao?token=${encodeURIComponent(token)}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o requerimento.");
        }

        const resultado = await resposta.json();

        console.log("Dados recebidos:", resultado);

        preencherFormulario(resultado.dados);

    } catch (erro) {

        console.error("Erro ao carregar requerimento:", erro);

        alert(
            "Não foi possível carregar os dados do requerimento. " +
            "Verifique o link e tente novamente."
        );
    }
}


// ----------------------------------------------------------
// Preenche os campos do formulário
// ----------------------------------------------------------

function preencherFormulario(dados) {

    Object.entries(dados).forEach(([nomeCampo, valor]) => {

        const campo = document.querySelector(
            `[name="${nomeCampo}"]`
        );

        if (!campo) {
            return;
        }

        // Radio e checkbox
        if (
            campo.type === "radio" ||
            campo.type === "checkbox"
        ) {

            const opcoes = document.querySelectorAll(
                `[name="${nomeCampo}"]`
            );

            opcoes.forEach((opcao) => {
                opcao.checked = opcao.value === valor;
            });

            return;
        }

        // Select, input e textarea
        campo.value = valor;
    });
    // ----------------------------------------------------------
// CAMPOS ESPECIAIS - LICENÇA ANTERIOR
// ----------------------------------------------------------

if (dados["licenca-anterior"] === "sim") {

    const containerLicencaAnterior =
        document.getElementById("dadoslicencaanterior");

    containerLicencaAnterior.innerHTML = `
        <div class="campo">
            <label for="dias-licenca-anterior">
                Dias já usufruídos neste quinquênio:
            </label>

            <select
                id="dias-licenca-anterior"
                name="dias-licenca-anterior"
                disabled
            >
                <option value="">Selecione</option>
                <option value="15">15 dias</option>
                <option value="30">30 dias</option>
                <option value="45">45 dias</option>
                <option value="60">60 dias</option>
                <option value="75">75 dias</option>
                <option value="90">90 dias</option>
                <option value="outro">Outro</option>
            </select>

            <div id="campo-dias-anterior-outro" hidden>
                <label for="dias-anterior-outro">
                    Quantidade efetivamente usufruída:
                </label>

                <input
                    type="number"
                    id="dias-anterior-outro"
                    name="dias-anterior-outro"
                    readonly
                >
            </div>

            <label for="data-ultima-licenca">
                Data de conclusão da última licença:
            </label>

            <input
                type="date"
                id="data-ultima-licenca"
                name="data-ultima-licenca"
                readonly
            >
        </div>
    `;


    const diasAnterior =
        document.getElementById("dias-licenca-anterior");

    diasAnterior.value =
        dados["dias-licenca-anterior"] || "";


    const dataUltima =
        document.getElementById("data-ultima-licenca");

    dataUltima.value =
        dados["data-ultima-licenca"] || "";


    if (dados["dias-licenca-anterior"] === "outro") {

        const campoOutroAnterior =
            document.getElementById(
                "campo-dias-anterior-outro"
            );

        const diasOutroAnterior =
            document.getElementById(
                "dias-anterior-outro"
            );

        campoOutroAnterior.hidden = false;

        diasOutroAnterior.value =
            dados["dias-anterior-outro"] || "";
    }
}
// ----------------------------------------------------------
// CAMPOS ESPECIAIS - QUANTIDADE ATUAL "OUTRO"
// ----------------------------------------------------------

if (dados["quantidadeDias"] === "outro") {

    const campoOutroDias =
        document.getElementById("campo-outro-dias");

    const quantidadeOutro =
        document.getElementById("quantidade-outro");

    if (campoOutroDias && quantidadeOutro) {

        campoOutroDias.hidden = false;

        quantidadeOutro.value =
            dados["quantidade-outro"] || "";
    }
}
// ----------------------------------------------------------
// REPETE O NOME DA CHEFIA NA SEÇÃO FINAL
// ----------------------------------------------------------

const chefiaManifestacao =
    document.getElementById(
        "chefia-manifestacao"
    );

if (chefiaManifestacao) {
    chefiaManifestacao.value =
        dados.chefia || "";
}
}


// ----------------------------------------------------------
// Inicia o carregamento
// ----------------------------------------------------------

carregarRequerimento();