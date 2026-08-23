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
}


// ----------------------------------------------------------
// Inicia o carregamento
// ----------------------------------------------------------

carregarRequerimento();