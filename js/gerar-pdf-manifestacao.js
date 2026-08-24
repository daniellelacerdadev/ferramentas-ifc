// ==========================================================
// GERADOR DE PDF - DOCUMENTOS ADMINISTRATIVOS
// ==========================================================


// ==========================================================
// FUNÇÕES AUXILIARES PARA CAPTURA DOS DADOS
// ==========================================================

function valorCampo(id) {

    const campo = document.getElementById(id);

    if (!campo) {
        return "";
    }

    return campo.value.trim();
}


function valorRadio(name) {

    const selecionado = document.querySelector(
        `input[name="${name}"]:checked`
    );

    return selecionado ? selecionado.value : "";
}

function textoRadio(name) {

    const selecionado = document.querySelector(
        `input[name="${name}"]:checked`
    );

    if (!selecionado) {
        return "";
    }

    // Primeiro tenta encontrar um label associado pelo atributo "for"
    let label = document.querySelector(
        `label[for="${selecionado.id}"]`
    );

    // Se não encontrar, procura um label que contenha o radio
    if (!label) {
        label = selecionado.closest("label");
    }

    return label
        ? label.textContent.trim()
        : selecionado.value;
}


function textosCheckbox(name) {

    const selecionados = document.querySelectorAll(
        `input[name="${name}"]:checked`
    );

    return Array.from(selecionados).map((checkbox) => {

        const label = document.querySelector(
            `label[for="${checkbox.id}"]`
        );

        return label
            ? label.textContent.trim()
            : checkbox.value;
    });
}

function formatarDataPDF(valor) {

    if (!valor) {
        return "";
    }

    const [ano, mes, dia] = valor.split("-");

    if (!ano || !mes || !dia) {
        return valor;
    }

    return `${dia}/${mes}/${ano}`;
}

// ==========================================================
// GERADOR DO PDF
// ==========================================================

async function gerarPDF() {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });


    // ------------------------------------------------------
    // CONFIGURAÇÕES
    // ------------------------------------------------------

    const larguraPagina = 210;
    const alturaPagina = 297;

    const margem = 18;

    const topoConteudo = 58;
    const limiteInferior = 268;

    const larguraTexto =
        larguraPagina - (margem * 2);


    let y = topoConteudo;


    // ------------------------------------------------------
    // CARREGAMENTO DAS IMAGENS INSTITUCIONAIS
    // ------------------------------------------------------

    function carregarImagem(src) {

        return new Promise((resolve, reject) => {

            const imagem = new Image();

            imagem.onload = () => resolve(imagem);

            imagem.onerror = () =>
                reject(
                    new Error(`Não foi possível carregar: ${src}`)
                );

            imagem.src = src;
        });
    }


    let logoGov = null;
    let logoIfc = null;
    let endereco = null;


    try {

        logoGov = await carregarImagem(
            "../assets/logo_gov.png"
        );

        logoIfc = await carregarImagem(
            "../assets/logo_ifc.png"
        );

    } catch (erro) {

        console.warn(
            "Alguma imagem institucional não pôde ser carregada.",
            erro
        );
    }


    // ======================================================
    // CABEÇALHO
    // ======================================================

   function cabecalho() {

    // Cabeçalho institucional completo
    if (logoGov) {

        pdf.addImage(
            logoGov,
            "PNG",
            55,
            8,
            100,
            25
        );
    }

    // Título do formulário
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(30, 30, 30);

    pdf.text(
        "FORMULÁRIO DE SOLICITAÇÃO DE LICENÇA CAPACITAÇÃO",
        larguraPagina / 2,
        39,
        {
            align: "center"
        }
    );

    // Base normativa
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(30, 30, 30);

    pdf.text(
        "(Lei nº 8.112/90, Decreto nº 9.991/2019 e Resolução CONSUPER nº 35/2025)",
        larguraPagina / 2,
        45,
        {
            align: "center"
        }
    );

    // Linha separadora
    pdf.setDrawColor(41, 110, 56);
    pdf.setLineWidth(0.4);

    pdf.line(
        margem,
        51,
        larguraPagina - margem,
        51
    );
}


    // ======================================================
    // RODAPÉ
    // ======================================================

   function rodape(pagina, totalPaginas) {

    const yRodape = 278;

    // Linha superior
    pdf.setDrawColor(180, 180, 180);
    pdf.setLineWidth(0.25);

    pdf.line(
        margem,
        272,
        larguraPagina - margem,
        272
    );


    // Logo IFC
    if (logoIfc) {

        pdf.addImage(
            logoIfc,
            "PNG",
            margem,
            275,
            25,
            10
        );
    }


    // Endereço institucional
    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(6.5);

    pdf.setTextColor(
        90,
        90,
        90
    );

    pdf.text(
        "Documento gerado eletronicamente pelo Formulário de Solicitação de Licença Capacitação",
        larguraPagina / 2,
        276,
        {
            align: "center"
        }
    );

    pdf.text(
        "Instituto Federal Catarinense – Reitoria",
        larguraPagina / 2,
        280,
        {
            align: "center"
        }
    );

    pdf.text(
        "Rua das Missões, 100 – Ponta Aguda – Blumenau/SC",
        larguraPagina / 2,
        284,
        {
            align: "center"
        }
    );


    // Página
    pdf.setFontSize(7);

    pdf.text(
        `Licença para Capacitação • Página ${pagina} de ${totalPaginas}`,
        larguraPagina / 2,
        288,
        {
            align: "center"
        }
    );
}

    // ======================================================
    // NOVA PÁGINA
    // ======================================================

    function novaPagina() {

        pdf.addPage();

        cabecalho();

        y = topoConteudo;
    }


    // ======================================================
    // VERIFICA ESPAÇO
    // ======================================================

    function verificarEspaco(
        alturaNecessaria = 10
    ) {

        if (
            y + alturaNecessaria >
            limiteInferior
        ) {

            novaPagina();
        }
    }


    // ======================================================
    // TÍTULO DE SEÇÃO
    // ======================================================

    function titulo(texto) {

        verificarEspaco(16);

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(11);

        pdf.setTextColor(
            41,
            110,
            56
        );

        const linhas =
            pdf.splitTextToSize(
                texto,
                larguraTexto
            );

        pdf.text(
            linhas,
            margem,
            y
        );

        y += linhas.length * 5 + 2;


        pdf.setDrawColor(
            41,
            110,
            56
        );

        pdf.setLineWidth(0.3);

        pdf.line(
            margem,
            y,
            larguraPagina - margem,
            y
        );

        y += 6;
    }


    // ======================================================
    // CAMPO SIMPLES
    // ======================================================

    function campo(label, valor) {

    if (!valor) {
        return;
    }

    const labelsLongos = [
        "Nome da (s) ação (ações) de capacitação"
    ];

    const labelLongo = labelsLongos.includes(label);

    // Para títulos longos, coloca o valor abaixo.
    if (labelLongo) {

        verificarEspaco(14);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8.5);
        pdf.setTextColor(60, 60, 60);

        pdf.text(
            `${label}:`,
            margem,
            y
        );

        y += 5;

        pdf.setFont("helvetica", "normal");

        const linhas = pdf.splitTextToSize(
            String(valor),
            larguraTexto
        );

        pdf.text(
            linhas,
            margem,
            y
        );

        y += linhas.length * 4.5 + 4;

        return;
    }


    // Campos normais continuam na mesma linha.

    const larguraValor = larguraTexto - 42;

    const linhas = pdf.splitTextToSize(
        String(valor),
        larguraValor
    );

    const altura = Math.max(
        5,
        linhas.length * 4.5
    );

    verificarEspaco(altura + 4);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.setTextColor(60, 60, 60);

    pdf.text(
        `${label}:`,
        margem,
        y
    );

    pdf.setFont("helvetica", "normal");

    pdf.text(
        linhas,
        margem + 42,
        y
    );

    y += altura + 3.5;
}


    // ======================================================
    // TEXTO GRANDE
    // ======================================================

    function textoGrande(
        label,
        valor
    ) {

        if (!valor) {
            return;
        }


        const linhas =
            pdf.splitTextToSize(
                String(valor),
                larguraTexto
            );


        verificarEspaco(
            linhas.length * 4.5 + 12
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(8.5);

        pdf.setTextColor(
            60,
            60,
            60
        );


        pdf.text(
            label,
            margem,
            y
        );

        y += 5;


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.text(
            linhas,
            margem,
            y
        );


        y +=
            linhas.length * 4.5 +
            6;
    }

    // =====================================================
    //  CAMPOS LADO A LADO
    //=====================================================

        function camposLadoALado(label1, valor1, label2, valor2) {

    verificarEspaco(15);

    const metade = larguraTexto / 2;

    // Campo 1
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.setTextColor(60, 60, 60);

    pdf.text(label1, margem, y);

    pdf.setFont("helvetica", "normal");

    pdf.text(
        valor1,
        margem,
        y + 5
    );

    // Campo 2
    const x2 = margem + metade;

    pdf.setFont("helvetica", "bold");

    pdf.text(label2, x2, y);

    pdf.setFont("helvetica", "normal");

    pdf.text(
        valor2,
        x2,
        y + 5
    );

    y += 12;
}

    // ======================================================
    // CHECKBOX DESENHADA
    // ======================================================

   function checkboxTexto(texto) {

    const tamanhoCaixa = 4;
    const espacamentoTexto = 7;
    const alturaLinha = 4;

    const xCaixa = margem;
    const xTexto = margem + espacamentoTexto;

    // Remove quebras de linha e espaços extras
    // vindos da formatação do HTML.
    const textoLimpo = String(texto)
        .replace(/\s+/g, " ")
        .trim();

    const larguraDisponivel =
        larguraTexto - espacamentoTexto;

    const linhas = pdf.splitTextToSize(
        textoLimpo,
        larguraDisponivel
    );

    const alturaTexto =
        linhas.length * alturaLinha;

    verificarEspaco(
        alturaTexto + 6
    );


    // =========================
    // QUADRADO
    // =========================

    pdf.setDrawColor(70, 70, 70);
    pdf.setLineWidth(0.35);

    pdf.rect(
        xCaixa,
        y - 3,
        tamanhoCaixa,
        tamanhoCaixa
    );


    // =========================
    // CHECK
    // =========================

    pdf.setDrawColor(41, 110, 56);
    pdf.setLineWidth(0.65);

    pdf.line(
        xCaixa + 0.8,
        y - 1.5,
        xCaixa + 1.7,
        y - 0.5
    );

    pdf.line(
        xCaixa + 1.7,
        y - 0.5,
        xCaixa + 3.3,
        y - 2.5
    );


    // =========================
    // TEXTO
    // =========================

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(7.4);

    pdf.setTextColor(
        50,
        50,
        50
    );

    pdf.text(
        linhas,
        xTexto,
        y,
        {
            lineHeightFactor: 1.3
        }
    );


    // =========================
    // ESPAÇO PARA O PRÓXIMO
    // =========================

    y += alturaTexto + 4;
}

    // ======================================================
    // INÍCIO DO DOCUMENTO
    // ======================================================

    cabecalho();


    // ======================================================
    // SEÇÃO I
    // ======================================================

    titulo(
        "I – DADOS PESSOAIS E FUNCIONAIS DO(A) REQUERENTE"
    );


    campo(
        "Nome completo",
        valorCampo("nome")
    );

    campo(
        "Cargo",
        valorCampo("cargo")
    );

    campo(
        "Matrícula SIAPE",
        valorCampo("matricula")
    );

    campo(
        "CPF",
        valorCampo("cpf")
    );

    campo(
        "E-mail institucional",
        valorCampo("email")
    );


    const lotacao =
        document.getElementById("lotacao");


    campo(
        "Unidade de lotação",
        lotacao
            ? lotacao.options[
                lotacao.selectedIndex
              ].text
            : ""
    );

    const exercicio =
        document.getElementById("exercicio");


    campo(
        "Unidade de Exercício",
        exercicio
            ? exercicio.options[
                exercicio.selectedIndex
              ].text
            : ""
    );

    campo(
        "Chefia imediata",
        valorCampo("chefia")
    );

    campo(
        "E-mail da chefia",
        valorCampo("email-chefia")
    );


   camposLadoALado(
    "Data de efetivo exercício no serviço público",
    formatarDataPDF(valorCampo("data-sp")),
    "Data de efetivo exercício no cargo atual",
    formatarDataPDF(valorCampo("data-cargo"))
    );


    // ======================================================
    // QUINQUÊNIO
    // ======================================================

    const textoQuinquenio =
        document
            .getElementById("quinquenio")
            ?.innerText
            .trim();


    if (textoQuinquenio) {

        textoGrande(
          "Quinquênio considerado",
           textoQuinquenio
      );
    }


    // ======================================================
    // SEÇÃO II
    // ======================================================

    titulo(
        "II – DADOS DA(S) AÇÃO(AÇÕES) DE CAPACITAÇÃO"
    );


    campo(
        "Quantidade de dias",
        textoRadio("quantidadeDias")
    );


    campo(
    "Data de início",
    formatarDataPDF(valorCampo("data-inicio"))
    );

    campo(
    "Data de término",
    formatarDataPDF(valorCampo("data-fim"))
    );


    campo(
    "Tipo de ação",
    textoRadio("acao")
    );


    campo(
        "Instituição promotora",
        valorCampo("promotora")
    );


    campo(
        "Nome da (s) ação (ações) de capacitação",
        formatarDataPDF(valorCampo("nome-acao"))
    );


    campo(
        "Carga horária total",
        valorCampo("carga")
            ? valorCampo("carga") + " horas"
            : ""
    );


    campo(
        "Cidade/UF/País",
        valorCampo("local")
    );


    // ======================================================
    // SEÇÃO III
    // ======================================================

    titulo(
        "III – DO ÔNUS PARA A CONCESSÃO DA LICENÇA PARA CAPACITAÇÃO"
    );


    campo(
        "Ônus",
        textoRadio("onus")
    );


    // ======================================================
    // SEÇÃO IV
    // ======================================================

    titulo(
        "IV – MANIFESTAÇÃO DO(A) SERVIDOR(A) INTERESSADO(A)"
    );


    textoGrande(
        "Manifestação do(a) servidor(a)",
        valorCampo("manifestacao-servidor")
    );


    // ======================================================
    // SEÇÃO V
    // ======================================================

    titulo(
        "V – COMPROMISSO DO(A) REQUERENTE"
    );


    const compromissos =
        textosCheckbox("validacao");


    compromissos.forEach(
        (item) => {

            checkboxTexto(item);
        }
    );

    // ======================================================
// SEÇÃO VI
// ======================================================

titulo(
    "VI – MANIFESTAÇÃO DA CHEFIA IMEDIATA"
);


// Manifestação da chefia
const manifestacaoChefia =
    textoRadio("manifestacao");

campo(
    "Manifestação",
    manifestacaoChefia
);


// Observação da chefia
textoGrande(
    "Observações ou justificativa da manifestação da chefia",
    valorCampo("observacao-chefia")
);


// ======================================================
// SEÇÃO VII
// ======================================================

titulo(
    "VII – DADOS DA CHEFIA IMEDIATA DO REQUERENTE"
);

campo(
    "Nome da chefia imediata",
    valorCampo("chefia")
);

campo(
    "Data da manifestação",
    formatarDataPDF(
        valorCampo("data-atual")
    )
);

    // ======================================================
    // RODAPÉS
    // ======================================================

    const paginas =
        pdf.getNumberOfPages();


    for (
        let pagina = 1;
        pagina <= paginas;
        pagina++
    ) {

        pdf.setPage(pagina);

        rodape(
            pagina,
            paginas
        );
    }


    // ======================================================
    // SALVAR
    // ======================================================

    pdf.save(
        `Licenca-Capacitacao-${
            valorCampo("nome") ||
            "requerente"
        }.pdf`
    );
}


// ==========================================================
// ENVIO DO FORMULÁRIO
// ==========================================================

document
    .querySelector("form")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            gerarPDF();
        }
    );

   