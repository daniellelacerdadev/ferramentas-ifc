//== DATAS E QUINQUÊNIOS ==//

const dataIngresso = document.getElementById("data-sp");
const quinquenio = document.getElementById("quinquenio");

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

dataIngresso.addEventListener("change", calcularQuinquenio);

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
            </select>
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

    diasAnterior.addEventListener("change", validarSaldoLicenca);

    const dataUltimaLicenca = document.getElementById("data-ultima-licenca");

    dataUltimaLicenca.addEventListener("change", validarIntersticio);
}


function esconderDadosLicencaAnterior() {

    dadosLicencaAnterior.innerHTML = "";
    mensagemLicencaAnterior.innerHTML = "";
}


function validarSaldoLicenca() {

    const diasAnterior = document.getElementById("dias-licenca-anterior");

    if (!diasAnterior || !diasAnterior.value) {
        mensagemLicencaAnterior.innerHTML = "";
        return;
    }

    const diasUsufruidos = Number(diasAnterior.value);

    // A licença para capacitação possui limite de 90 dias por quinquênio.
    const saldo = 90 - diasUsufruidos;

    mensagemLicencaAnterior.innerHTML = `
        <p class="mensagem-ok">
            Você possui <strong>${saldo} dias</strong> disponíveis neste quinquênio.
        </p>
    `;

    validarQuantidadeAtual();
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

    const diasSolicitados = Number(quantidadeAtual.value);

    // Se não houver licença anterior, todo o quinquênio está disponível.
    if (!diasAnterior || !diasAnterior.value) {
        mensagemSaldo.innerHTML = "";
        return;
    }

    const diasUsufruidos = Number(diasAnterior.value);
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
    radio.addEventListener("change", validarQuantidadeAtual);
    radio.addEventListener("change", calcularDataFim);
    radio.addEventListener("change", validarFgCd);
    radio.addEventListener("change", validarCargaHoraria);
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

    const dataFim = document.getElementById("data-fim");

    const quantidadeAtual = document.querySelector(
        'input[name="quantidadeDias"]:checked'
    );

    if (!dataInicio.value || !quantidadeAtual) {
        dataFim.value = "";
        return;
    }

    const dias = Number(quantidadeAtual.value);

    const inicio = new Date(dataInicio.value + "T00:00:00");

    // O dia de início conta como o primeiro dia da licença.
    inicio.setDate(inicio.getDate() + dias - 1);

    const ano = inicio.getFullYear();
    const mes = String(inicio.getMonth() + 1).padStart(2, "0");
    const dia = String(inicio.getDate()).padStart(2, "0");

    dataFim.value = `${ano}-${mes}-${dia}`;
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

    const diasSolicitados = Number(quantidadeAtual.value);

    if (diasSolicitados >= 45) {

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
    const dias = Number(quantidadeAtual.value);

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
// Atualiza os botões e a mensagem de sucesso
// ----------------------------------------------------------

function atualizarEstadoFormulario() {

    const formularioValido = formularioEstaValido();

    // Botões
    botaoEnvio.disabled = !formularioValido;

    botaoLinkChefia.disabled = !formularioValido;


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
