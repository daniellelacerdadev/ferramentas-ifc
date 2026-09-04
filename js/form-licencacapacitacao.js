//== DATAS E QUINQUÊNIOS ==//

const dataIngresso = document.getElementById("data-sp");
const quinquenio = document.getElementById("quinquenio");
const dataCargo = document.getElementById("data-cargo");
const mensagemEstagioProbatorio = document.getElementById(
    "mensagemestagioprobatorio"
);

function calcularQuinquenio() {
    if (!dataIngresso.value) {
        quinquenio.textContent = "";
        return;
    }


    const [ano, mes, dia] = dataIngresso.value.split("-").map(Number);
    const ingresso = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    // Calcula quantos anos completos já foram cumpridos
    let anosCompletos = hoje.getFullYear() - ingresso.getFullYear();

    const aniversario = new Date(
        hoje.getFullYear(),
        ingresso.getMonth(),
        ingresso.getDate()
    );

    if (hoje < aniversario) {
        anosCompletos--;
    }

    // Calcula quantos quinquênios completos existem
    const quantidadeQuinquenios = Math.floor(anosCompletos / 5);

    if (quantidadeQuinquenios < 1) {
        quinquenio.innerHTML = `
            <p class="mensagem-alerta">
                Ainda não há quinquênio concluído com base na data de ingresso informada.
            </p>
        `;
        return;
    }

    // Início do último quinquênio já concluído
    const inicioQuinquenio = new Date(
        ingresso.getFullYear() + (quantidadeQuinquenios - 1) * 5,
        ingresso.getMonth(),
        ingresso.getDate()
    );

    // Final do quinquênio concluído
    const fimQuinquenio = new Date(
        ingresso.getFullYear() + quantidadeQuinquenios * 5,
        ingresso.getMonth(),
        ingresso.getDate() - 1
    );

   
    // Formata as datas para dd/mm/aaaa
    const formatarData = (data) => {
        return data.toLocaleDateString("pt-BR");
    };

    quinquenio.innerHTML = `
        <p class="mensagem-ok">
            <strong>Quinquênio concluído:</strong>
            ${formatarData(inicioQuinquenio)} a ${formatarData(fimQuinquenio)}.
        </p>

        <p class="mensagem-alerta">
            Atenção: este cálculo é apresentado apenas para fins informativos.
            Caso existam ocorrências funcionais que possam alterar a contagem do
            quinquênio, consulte a CGP ou o setor responsável pelas concessões
            para conferência.
        </p>
    `;
}

//== VALIDAÇÃO DO ESTÁGIO PROBATÓRIO ==//

function validarEstagioProbatorio() {

    const datas = [
        {
            campo: dataIngresso,
            descricao: "data de ingresso no serviço público"
        },
        {
            campo: dataCargo,
            descricao: "data de ingresso no cargo atual"
        }
    ];

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const datasComMenosDeTresAnos = [];

    datas.forEach(({ campo, descricao }) => {

        if (!campo.value) {
            return;
        }

        const [ano, mes, dia] = campo.value.split("-").map(Number);

        const dataInicio = new Date(
            ano,
            mes - 1,
            dia
        );

        const dataTresAnos = new Date(dataInicio);

        dataTresAnos.setFullYear(
            dataTresAnos.getFullYear() + 3
        );

        if (hoje < dataTresAnos) {
            datasComMenosDeTresAnos.push(descricao);
        }
    });

    if (datasComMenosDeTresAnos.length > 0) {

        mensagemEstagioProbatorio.innerHTML = `
            <p class="mensagem-alerta">
                <strong>Atenção:</strong> com base na(s)
                ${datasComMenosDeTresAnos.join(" e ")}
                informada(s), ainda não foram completados
                3 anos de efetivo exercício.
                Verifique a situação do estágio probatório antes de prosseguir
                com a solicitação.
            </p>
        `;

        return;
    }

    mensagemEstagioProbatorio.innerHTML = "";
}


dataIngresso.addEventListener("change", calcularQuinquenio);
dataIngresso.addEventListener(
    "change",
    validarEstagioProbatorio
);

dataCargo.addEventListener(
    "change",
    validarEstagioProbatorio
);


//== LICENÇA ANTERIOR E SALDO DO QUINQUÊNIO ==//

const licencaSim = document.getElementById("licenca-sim");
const licencaNao = document.getElementById("licenca-nao");
const dadosLicencaAnterior = document.getElementById("dadoslicencaanterior");
const mensagemLicencaAnterior = document.getElementById("mensagemlicencaanterior");
const mensagemSaldo = document.getElementById("mensagemsaldo");
const mensagemIntersticio = document.getElementById("mensagemintersticio");


function mostrarDadosLicencaAnterior() {

    dadosLicencaAnterior.innerHTML = `
        <div class="campo">
            <label for="dias-licenca-anterior">
                Se sim, informe a quantidade de dias já usufruídos neste quinquênio:
            </label>

            <select id="dias-licenca-anterior" name="dias-licenca-anterior" required>
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
                    Informe a quantidade efetivamente usufruída:
                </label>

                <input
                    type="number"
                    id="dias-anterior-outro"
                    name="dias-anterior-outro"
                    min="1"
                    max="89"
                    step="1"
                    inputmode="numeric">

                <p class="orientacao-outro">
                 Utilize esta opção somente quando a quantidade de dias
                 efetivamente usufruída for diferente dos períodos acima,
                em razão de interrupção de Licença para Capacitação.
                </p>
            </div>
        </div>

        <div>
            <label for="data-ultima-licenca">
                Data de conclusão da última licença:
            </label>

            <input type="date" id="data-ultima-licenca" name="data-ultima-licenca" class="campo-data"
                required
            >
        </div>
    `;

    mensagemLicencaAnterior.innerHTML = "";

    const diasAnterior = document.getElementById("dias-licenca-anterior");

    diasAnterior.addEventListener("change", function () {

    const campoOutroAnterior = document.getElementById(
        "campo-dias-anterior-outro"
    );

    const diasAnteriorOutro = document.getElementById(
        "dias-anterior-outro"
    );

    const outroSelecionado = diasAnterior.value === "outro";

    campoOutroAnterior.hidden = !outroSelecionado;
    diasAnteriorOutro.required = outroSelecionado;

    if (!outroSelecionado) {
        diasAnteriorOutro.value = "";
    }

    validarSaldoLicenca();
    atualizarEstadoFormulario();
    });


    const diasAnteriorOutro = document.getElementById(
    "dias-anterior-outro"
    );

    diasAnteriorOutro.addEventListener("input", function () {

    validarSaldoLicenca();
    atualizarEstadoFormulario();

});

    const dataUltimaLicenca = document.getElementById("data-ultima-licenca");

    dataUltimaLicenca.addEventListener("change", validarIntersticio);
}


function esconderDadosLicencaAnterior() {

    dadosLicencaAnterior.innerHTML = "";
    mensagemLicencaAnterior.innerHTML = "";
}

function obterDiasUsufruidos() {

    const diasAnterior = document.getElementById(
        "dias-licenca-anterior"
    );

    if (!diasAnterior || !diasAnterior.value) {
        return null;
    }

    if (diasAnterior.value !== "outro") {
        return Number(diasAnterior.value);
    }

    const diasAnteriorOutro = document.getElementById(
        "dias-anterior-outro"
    );

    if (!diasAnteriorOutro || !diasAnteriorOutro.value) {
        return null;
    }

    const dias = Number(diasAnteriorOutro.value);

    if (
        !Number.isInteger(dias) ||
        dias < 1 ||
        dias > 89
    ) {
        return null;
    }

    return dias;
}

function validarSaldoLicenca() {

    const diasAnterior = document.getElementById("dias-licenca-anterior");

    if (!diasAnterior || !diasAnterior.value) {
        mensagemLicencaAnterior.innerHTML = "";
        return;
    }

    const diasUsufruidos = obterDiasUsufruidos();

    if (!diasUsufruidos) {
    mensagemLicencaAnterior.innerHTML = "";
    return;
}

    // A licença para capacitação possui limite de 90 dias por quinquênio.
    const saldo = 90 - diasUsufruidos;

    mensagemLicencaAnterior.innerHTML = `
        <p class="mensagem-ok">
            Você possui <strong>${saldo} dias</strong> disponíveis neste quinquênio.
        </p>
    `;

    validarQuantidadeAtual();
}

    //== QUANTIDADE DE DIAS SOLICITADA ==//

const campoOutroDias = document.getElementById("campo-outro-dias");
const quantidadeOutro = document.getElementById("quantidade-outro");


function obterDiasSolicitados() {

    const quantidadeSelecionada = document.querySelector(
        'input[name="quantidadeDias"]:checked'
    );

    if (!quantidadeSelecionada) {
        return null;
    }

    // Opções normais: 15, 30, 45, 60, 75 ou 90
    if (quantidadeSelecionada.value !== "outro") {
        return Number(quantidadeSelecionada.value);
    }

    // Opção "Outro"
    if (!quantidadeOutro.value) {
        return null;
    }

    const dias = Number(quantidadeOutro.value);

    if (
        !Number.isInteger(dias) ||
        dias < 1 ||
        dias > 90
    ) {
        return null;
    }

    return dias;
}


function atualizarCampoOutroDias() {

    const quantidadeSelecionada = document.querySelector(
        'input[name="quantidadeDias"]:checked'
    );

    const outroSelecionado =
        quantidadeSelecionada?.value === "outro";

    campoOutroDias.hidden = !outroSelecionado;

    quantidadeOutro.required = outroSelecionado;

    if (!outroSelecionado) {
        quantidadeOutro.value = "";
    }

    atualizarEstadoFormulario();
}



//== VALIDAÇÃO DA QUANTIDADE DA LICENÇA ATUAL ==//

function validarQuantidadeAtual() {

    const diasAnterior = document.getElementById("dias-licenca-anterior");

    const quantidadeAtual = document.querySelector(
        'input[name="quantidadeDias"]:checked'
    );
    

    if (!quantidadeAtual) {
        mensagemSaldo.innerHTML = "";
        return;
    }

    const diasSolicitados = obterDiasSolicitados();

if (!diasSolicitados) {
    mensagemSaldo.innerHTML = "";
    return;
}

if (
    quantidadeAtual.value === "outro" &&
    !document.getElementById("licenca-sim").checked
) {

    mensagemSaldo.innerHTML = `
        <p class="mensagem-erro">
            A opção <strong>Outro</strong> é exclusiva para utilização
            de saldo remanescente decorrente de interrupção de Licença
            para Capacitação anteriormente concedida.
        </p>
    `;

    return;
}

    // Se não houver licença anterior, todo o quinquênio está disponível.
    if (!diasAnterior || !diasAnterior.value) {
        mensagemSaldo.innerHTML = "";
        return;
    }

    const diasUsufruidos = obterDiasUsufruidos();

    if (!diasUsufruidos) {
    mensagemSaldo.innerHTML = "";
    return;
    }

    const saldo = 90 - diasUsufruidos;

    if (diasSolicitados > saldo) {

        mensagemSaldo.innerHTML = `
            <p class="mensagem-erro">
                A quantidade solicitada excede o saldo disponível neste quinquênio.
                Você possui <strong>${saldo} dias</strong> disponíveis.
            </p>
        `;

        return;
    }


    mensagemSaldo.innerHTML = `
        <p class="mensagem-ok">
            A quantidade solicitada está dentro do saldo disponível de
            <strong>${saldo} dias</strong> deste quinquênio.
        </p>
    `;
}


// Verifica a quantidade sempre que o período atual for alterado.

const quantidadeAtualRadios = document.querySelectorAll(
    'input[name="quantidadeDias"]'
);

quantidadeAtualRadios.forEach((radio) => {
    radio.addEventListener("change", atualizarCampoOutroDias);
    radio.addEventListener("change", validarQuantidadeAtual);
    radio.addEventListener("change", calcularDataFim);
    radio.addEventListener("change", validarFgCd);
    radio.addEventListener("change", validarCargaHoraria);
});

quantidadeOutro.addEventListener("input", function () {

    validarQuantidadeAtual();
    calcularDataFim();
    validarFgCd();
    validarCargaHoraria();
    atualizarEstadoFormulario();
});
//== MOSTRA OU ESCONDE OS DADOS DA LICENÇA ANTERIOR ==//

licencaSim.addEventListener("change", mostrarDadosLicencaAnterior);

licencaNao.addEventListener("change", esconderDadosLicencaAnterior);

//== VALIDAÇÃO DO INTERSTÍCIO DE 60 DIAS ==//

function validarIntersticio() {

    const dataUltimaLicenca = document.getElementById("data-ultima-licenca");
    const dataInicio = document.getElementById("data-inicio");

    if (!dataUltimaLicenca || !dataUltimaLicenca.value || !dataInicio.value) {
        mensagemIntersticio.innerHTML = "";
        return;
    }

    const ultimaLicenca = new Date(dataUltimaLicenca.value + "T00:00:00");
    const inicioAtual = new Date(dataInicio.value + "T00:00:00");

    const diferencaMs = inicioAtual - ultimaLicenca;
    const diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

    if (diferencaDias < 60) {

        mensagemIntersticio.innerHTML = `
            <p class="mensagem-erro">
                O intervalo entre o término da última licença e o início da nova licença
                deve ser de, no mínimo, <strong>60 dias</strong>.
                O intervalo informado é de <strong>${diferencaDias} dias</strong>.
            </p>
        `;

        return;
    }

    mensagemIntersticio.innerHTML = `
        <p class="mensagem-ok">
            O intervalo mínimo de 60 dias entre as licenças foi cumprido.
            Intervalo informado: <strong>${diferencaDias} dias</strong>.
        </p>
    `;
}


// Verifica o interstício quando as datas forem preenchidas ou alteradas.

document.getElementById("data-inicio").addEventListener(
    "change",
    validarIntersticio
);

//== DEFINE A DATA MÍNIMA PARA INÍCIO DA LICENÇA ==//

const dataInicio = document.getElementById("data-inicio");

function definirDataMinima() {

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Antecedência mínima de 20 dias.
    const dataMinima = new Date(hoje);
    dataMinima.setDate(dataMinima.getDate() + 20);

    const ano = dataMinima.getFullYear();
    const mes = String(dataMinima.getMonth() + 1).padStart(2, "0");
    const dia = String(dataMinima.getDate()).padStart(2, "0");

    dataInicio.min = `${ano}-${mes}-${dia}`;
}

definirDataMinima();


//== CALCULA AUTOMATICAMENTE A DATA FINAL DA LICENÇA ==//

function calcularDataFim() {

    const dataFim =
        document.getElementById("data-fim");

    const quantidadeAtual =
        document.querySelector(
            'input[name="quantidadeDias"]:checked'
        );

    if (!dataInicio.value || !quantidadeAtual) {
        dataFim.value = "";
        return;
    }

    // Evita cálculo enquanto a data ainda está sendo digitada
    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
            dataInicio.value
        )
    ) {
        dataFim.value = "";
        return;
    }

    const dias = obterDiasSolicitados();

    if (!dias) {
        dataFim.value = "";
        return;
    }

    const [ano, mes, dia] =
        dataInicio.value
            .split("-")
            .map(Number);

    const inicio =
        new Date(
            ano,
            mes - 1,
            dia
        );

    // Confirma que a data informada realmente existe
    if (
        inicio.getFullYear() !== ano ||
        inicio.getMonth() !== mes - 1 ||
        inicio.getDate() !== dia
    ) {
        dataFim.value = "";
        return;
    }

    // O primeiro dia já conta como dia de licença
    inicio.setDate(
        inicio.getDate() + dias - 1
    );

    const anoFim =
        String(
            inicio.getFullYear()
        ).padStart(4, "0");

    const mesFim =
        String(
            inicio.getMonth() + 1
        ).padStart(2, "0");

    const diaFim =
        String(
            inicio.getDate()
        ).padStart(2, "0");

    dataFim.value =
        `${anoFim}-${mesFim}-${diaFim}`;
}

// Atualiza a data final quando a data de início for alterada.

document.getElementById("data-inicio").addEventListener(
    "change",
    calcularDataFim
);
document.getElementById("data-inicio").addEventListener(
    "change",
    validarAntecedencia
);

//== AVISO SOBRE FG E CD ==//

const mensagemFgCd = document.getElementById("mensagemfgcd");

function validarFgCd() {

    const quantidadeAtual = document.querySelector(
        'input[name="quantidadeDias"]:checked'
    );

    if (!quantidadeAtual) {
        mensagemFgCd.innerHTML = "";
        return;
    }

    const diasSolicitados = obterDiasSolicitados();

    if (!diasSolicitados) {
    mensagemFgCd.innerHTML = "";
    return;
    }

    if (diasSolicitados > 30) {

        mensagemFgCd.innerHTML = `
            <p class="mensagem-alerta">
                <strong>Atenção:</strong> para usufruir da licença para capacitação
                por período superior a 30 dias consecutivos, o(a) servidor(a)
                deverá solicitar a exoneração ou dispensa de cargo em comissão
                ou função de confiança, a contar da data de início da licença.
            </p>
        `;

        return;
    }

    mensagemFgCd.innerHTML = "";
}

//== VALIDAÇÃO DA ANTECEDÊNCIA MÍNIMA ==//

const mensagemAntecedencia = document.getElementById(
    "mensagemantecedencia"
);

function validarAntecedencia() {

    const dataInicio = document.getElementById("data-inicio");

    if (!dataInicio.value) {
        return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const inicio = new Date(dataInicio.value + "T00:00:00");

    const diferencaMs = inicio - hoje;
    const diferencaDias = Math.floor(
        diferencaMs / (1000 * 60 * 60 * 24)
    );

    if (diferencaDias < 0) {

        mensagemAntecedencia.innerHTML = `
            <p class="mensagem-erro">
                A data de início da licença não pode ser anterior à data atual.
                Informe uma data futura.
            </p>
        `;

        return;
    }

    if (diferencaDias < 20) {

        mensagemAntecedencia.innerHTML = `
            <p class="mensagem-erro">
                A data de início da licença deve ser informada com antecedência
                mínima de <strong>20 dias</strong>.
                A data selecionada possui apenas
                <strong>${diferencaDias} dias</strong> de antecedência.
            </p>
        `;

        return;
    }

    mensagemAntecedencia.innerHTML = `
        <p class="mensagem-ok">
            A data de início da licença atende à antecedência mínima de
            <strong>20 dias</strong>.
        </p>
    `;
}

//== VALIDAÇÃO DA CARGA HORÁRIA ==//

const cargaHoraria = document.getElementById("carga");
const mensagemCargaHoraria = document.getElementById("mensagemcargahoraria");

function validarCargaHoraria() {

    const quantidadeAtual = document.querySelector(
        'input[name="quantidadeDias"]:checked'
    );

    if (!cargaHoraria.value || !quantidadeAtual) {
        mensagemCargaHoraria.innerHTML = "";
        return;
    }

    const horas = Number(cargaHoraria.value);
    const dias = obterDiasSolicitados();

    if (!dias) {
    mensagemCargaHoraria.innerHTML = "";
    return;
    }

    const horasSemanais = (horas / dias) * 7;

    if (horasSemanais <= 30) {

        mensagemCargaHoraria.innerHTML = `
            <p class="mensagem-erro">
                A carga horária informada não atende ao mínimo de
                <strong>30 horas semanais</strong> para o período de licença
                selecionado.
                A carga horária corresponde a aproximadamente
                <strong>${horasSemanais.toFixed(1)} horas semanais</strong>.
            </p>
        `;

        return;
    }

    mensagemCargaHoraria.innerHTML = `
        <p class="mensagem-ok">
            A carga horária informada corresponde a aproximadamente
            <strong>${horasSemanais.toFixed(1)} horas semanais</strong>
            para o período de licença selecionado.
        </p>
    `;
}

cargaHoraria.addEventListener("input", validarCargaHoraria);

//== VALIDAÇÃO DO ÔNUS ==//

const onusLimitado = document.getElementById("onus-limitado");
const onusOutroOrgao = document.getElementById("onus-outro-orgao");

const mensagemOnusLim = document.getElementById("mensagemonuslim");
const mensagemOnusOrgaoDif = document.getElementById("mensagemonusorgaodif");


function validarOnus() {

    // Limpa as mensagens anteriores
    mensagemOnusLim.innerHTML = "";
    mensagemOnusOrgaoDif.innerHTML = "";

    if (onusLimitado.checked) {

        mensagemOnusLim.innerHTML = `
            <p class="mensagem-alerta">
                <strong>Ônus limitado:</strong> Estou ciente de que, para usufruir da Licença para Capacitação por período <strong> superior a trinta dias consecutivos</strong>, não farei jus às gratificações e adicionais
               vinculados à atividade ou ao local de trabalho que não integrem a estrutura remuneratória básica do meu cargo efetivo (ex.: auxílio-transporte, adicional de insalubridade/periculosidade).
            </p>
        `;

    }

    if (onusOutroOrgao.checked) {

        mensagemOnusOrgaoDif.innerHTML = `
            
            <div class="campo">
                <label for="nome-orgao">
                    Nome do órgão:
                </label>

                <input type="text" name="nome-orgao" id="nome-orgao" required>
            </div>

            <div class="linha">
                <p> Assinale os custos que serão pagos pelo órgão:</p>

                <div class="acoes-onus">
                    <label>
                        <input type="checkbox" name="custos-onus" value="diarias">
                        Diárias
                    </label>

                    <label>
                        <input type="checkbox" name="custos-onus" value="passagens">
                    Passagens
                    </label>

                    <label>
                        <input type="checkbox" name="custos-onus" value="inscricao">
                    Taxa de inscrição
                    </label>

                    <label>
                        <input type="checkbox" name="custos-onus" value="outros">
                    Outros
                    </label>
                </div>
            </div>

            <p class="mensagem-alerta">
                Declaro ciência de que os custos relacionados à inscrição, deslocamento,
                hospedagem e realização da ação de desenvolvimento serão de minha
                responsabilidade, não gerando custos para o Instituto Federal Catarinense,
                salvo quando houver previsão de disponibilidade orçamentária.
            </p>
        `;
    }
}


// Verifica a opção de ônus selecionada

onusLimitado.addEventListener("change", validarOnus);
onusOutroOrgao.addEventListener("change", validarOnus);

//== VALIDAÇÃO GERAL DO FORMULÁRIO ==//

const formulario = document.querySelector("form");

const validacoes = document.querySelectorAll(
    'input[name="validacao"]'
);

const botaoEnvio = document.getElementById("envio");

const botaoLinkChefia = document.getElementById(
    "gerar-link-chefia"
);

const mensagemSucesso = document.getElementById(
    "mensagem-sucesso"
);


// ----------------------------------------------------------
// Verifica se todos os compromissos foram marcados
// ----------------------------------------------------------

function compromissosValidos() {

    return [...validacoes].every(
        (checkbox) => checkbox.checked
    );
}


// ----------------------------------------------------------
// Verifica se o formulário está completamente preenchido
// ----------------------------------------------------------

function formularioEstaValido() {

    return (
        formulario.checkValidity() &&
        compromissosValidos()
    );
}

// ----------------------------------------------------------
// Mostra os campos obrigatórios que ainda precisam ser preenchidos
// ----------------------------------------------------------

function mostrarCamposPendentes() {

    const mensagemErros = document.getElementById("mensagem-erros");
    const pendencias = [];

    // Campos comuns: texto, e-mail, data, select e textarea
    const camposObrigatorios = formulario.querySelectorAll(
        "input[required], select[required], textarea[required]"
    );

    camposObrigatorios.forEach((campo) => {

        // Radio será tratado separadamente
        if (campo.type === "radio") {
            return;
        }

        if (!campo.checkValidity()) {

            const label = formulario.querySelector(
                `label[for="${campo.id}"]`
            );

           const nomesAmigaveis = {
                nome: "Nome completo",
                cargo: "Cargo",
                matricula: "Matrícula SIAPE",
                cpf: "CPF",
                email: "E-mail institucional",
                lotacao: "Unidade de lotação",
                exercicio: "Unidade de exercício",
                chefia: "Nome da chefia imediata",
                "email-chefia": "E-mail institucional da chefia imediata",
                data: "Data de efetivo exercício no serviço público",
                "data-cargo": "Data de efetivo exercício no cargo atual",
                "data-inicio": "Período da Licença para Capacitação",
                promotora: "Instituição promotora da ação de capacitação",
                "nome-acao": "Nome da ação de capacitação",
                carga: "Carga horária total",
                local: "Cidade/UF/País",
                "manifestacao-servidor": "Manifestação do servidor",
                "quantidade-outro": "Quantidade de dias do saldo remanescente",
                "dias-anterior-outro": "Quantidade de dias efetivamente usufruídos na licença anterior"
    };

    let nomeCampo =
    nomesAmigaveis[campo.name] ||
    nomesAmigaveis[campo.id] ||
    campo.name ||
    "Campo obrigatório";

    pendencias.push(nomeCampo);
        }
    });


    // ------------------------------------------------------
    // Grupos de radio obrigatórios
    // ------------------------------------------------------

    const gruposRadio = [
        {
            name: "licenca-anterior",
            texto: "Informe se já usufruiu de Licença para Capacitação referente ao quinquênio solicitado"
        },
        {
            name: "quantidadeDias",
            texto: "Selecione a quantidade de dias da Licença para Capacitação"
        },
        {
            name: "acao",
            texto: "Selecione o tipo de ação de capacitação"
        },
        {
            name: "onus",
            texto: "Selecione o tipo de ônus da Licença para Capacitação"
        }
    ];

    gruposRadio.forEach((grupo) => {

        const radios = formulario.querySelectorAll(
            `input[name="${grupo.name}"]`
        );

        if (
            radios.length > 0 &&
            !formulario.querySelector(
                `input[name="${grupo.name}"]:checked`
            )
        ) {
            pendencias.push(grupo.texto);
        }
    });


    // ------------------------------------------------------
    // Relevância da ação
    // Pelo menos uma opção deve ser selecionada
    // ------------------------------------------------------

    const relevanciaMarcada = formulario.querySelector(
        'input[name="relevancia"]:checked'
    );

    if (!relevanciaMarcada) {
        pendencias.push(
            "Selecione pelo menos uma opção sobre a relação da ação de capacitação com o PDP, órgão, carreira ou função"
        );
    }


    // ------------------------------------------------------
    // Compromissos da Seção V
    // Todos devem ser marcados
    // ------------------------------------------------------

    if (!compromissosValidos()) {
        pendencias.push(
            "Leia e assinale todos os compromissos da Seção V"
        );
    }


    // Remove eventuais mensagens repetidas
    const pendenciasUnicas = [...new Set(pendencias)];


    // ------------------------------------------------------
    // Se não houver pendências
    // ------------------------------------------------------

    if (pendenciasUnicas.length === 0) {

        mensagemErros.hidden = true;
        mensagemErros.innerHTML = "";

        return true;
    }


    // ------------------------------------------------------
    // Exibe as pendências
    // ------------------------------------------------------

    mensagemErros.innerHTML = `
        <strong>⚠️ Antes de continuar, verifique os campos abaixo:</strong>

        <ul>
            ${pendenciasUnicas
                .map((pendencia) => `<li>${pendencia}</li>`)
                .join("")}
        </ul>
    `;

    mensagemErros.hidden = false;

    mensagemErros.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    return false;
}


// ----------------------------------------------------------
// Atualiza os botões e a mensagem de sucesso
// ----------------------------------------------------------

function atualizarEstadoFormulario() {

    const formularioValido = formularioEstaValido();


    // Mensagem de sucesso
    if (formularioValido) {

        mensagemSucesso.innerHTML = `
            <p>
                 <strong>Formulário preenchido com sucesso!</strong>
                Você pode gerar o PDF do requerimento e o link
                para manifestação da chefia.
            </p>
        `;

        mensagemSucesso.classList.add("visivel");

    } else {

        mensagemSucesso.innerHTML = "";

        mensagemSucesso.classList.remove("visivel");
    }
}


// ----------------------------------------------------------
// STATUS DOS CARDS DAS SEÇÕES
// ----------------------------------------------------------

const secoes = document.querySelectorAll(".sectioncard");

function atualizarCards() {

    secoes.forEach((secao) => {

        const camposObrigatorios = secao.querySelectorAll(
            "input[required], select[required], textarea[required]"
        );

        const camposValidos = [...camposObrigatorios].every(
            (campo) => campo.checkValidity()
        );


        // Seção V:
        // todos os compromissos precisam estar marcados

        const validacoesSecao = secao.querySelectorAll(
            'input[name="validacao"]'
        );

        let secaoVValida = true;

        if (validacoesSecao.length > 0) {

            secaoVValida = [...validacoesSecao].every(
                (checkbox) => checkbox.checked
            );
        }


        // Marca a seção como concluída

        if (camposValidos && secaoVValida) {

            secao.classList.add("concluido");

        } else {

            secao.classList.remove("concluido");
        }
    });
}


// ----------------------------------------------------------
// Atualiza tudo quando o formulário é alterado
// ----------------------------------------------------------

formulario.addEventListener(
    "input",
    function () {

        atualizarCards();
        atualizarEstadoFormulario();
    }
);


formulario.addEventListener(
    "change",
    function () {

        atualizarCards();
        atualizarEstadoFormulario();
    }
);


// ----------------------------------------------------------
// Estado inicial
// ----------------------------------------------------------

atualizarCards();

atualizarEstadoFormulario();

//== GERA LINK PARA MANIFESTAÇÃO DA CHEFIA ==//

async function gerarLinkManifestacao() {

    if (!mostrarCamposPendentes()) {
        return;
    }

    try {

        // Coleta todos os dados preenchidos no formulário
        const dadosFormulario = {};

        const campos = formulario.querySelectorAll(
            "input, select, textarea"
        );

        campos.forEach((campo) => {

            if (!campo.name) {
                return;
            }

            // Radio e checkbox: somente os marcados
            if (
                (campo.type === "radio" || campo.type === "checkbox") &&
                !campo.checked
            ) {
                return;
            }

            dadosFormulario[campo.name] = campo.value;
        });


        // Envia os dados para o backend
        const resposta = await fetch(
            "https://ferramentas-ifc.vercel.app/api/manifestacao",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(dadosFormulario)
            }
        );


        if (!resposta.ok) {
            throw new Error("Não foi possível gerar o link.");
        }


        const resultado = await resposta.json();


        // Monta o link para a página da manifestação
        const linkManifestacao =
            new URL(
                "form-manifestacaochefia.html?token=" + resultado.token,
                window.location.href
            ).href;


        console.log("Token gerado:", resultado.token);
        console.log("Link para manifestação:", linkManifestacao);


       // Mostra o link para a manifestação
mensagemSucesso.innerHTML = `
    <p>
        <strong>Link para manifestação da chefia gerado com sucesso!</strong>
    </p>

    <p>
        <a href="${linkManifestacao}" target="_blank">
            Abrir formulário de manifestação da chefia
        </a>
    </p>

    <button type="button" id="copiar-link-chefia" class="btn-submit">
        Copiar link
    </button>
`;

mensagemSucesso.classList.add("visivel");

// Botão para copiar o link
const botaoCopiarLink = document.getElementById(
    "copiar-link-chefia"
);

botaoCopiarLink.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(linkManifestacao);

        botaoCopiarLink.textContent = "Link copiado!";

    } catch (erro) {

        console.error("Erro ao copiar link:", erro);

        alert("Não foi possível copiar o link automaticamente.");
    }
});


    } catch (erro) {

        console.error("Erro ao gerar link:", erro);

        alert(
            "Não foi possível gerar o link para manifestação da chefia."
        );
    }
}


// Executa a função ao clicar no botão
botaoLinkChefia.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        gerarLinkManifestacao();
    }
);



  