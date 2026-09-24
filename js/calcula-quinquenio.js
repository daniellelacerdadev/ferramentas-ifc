// =====================================================
// ELEMENTOS PRINCIPAIS
// =====================================================

const btnCalcularPeriodos =
  document.getElementById("btnCalcularPeriodos");

const periodosCalculados =
  document.getElementById("periodosCalculados");

const blocoOcorrencias =
  document.getElementById("blocoOcorrencias");

const radiosOcorrencias =
  document.querySelectorAll(
    'input[name="possuiOcorrencias"]'
  );

const listaOcorrencias =
  document.getElementById("listaOcorrencias");

const quinquenioOcorrencia =
  document.getElementById("quinquenioOcorrencia");

const checkboxesOcorrencias =
  document.querySelectorAll(".checkbox-ocorrencia");

const btnRecalcular =
  document.getElementById("btnRecalcular");

const resultadoAjustado =
  document.getElementById("resultadoAjustado");

const btnLimparSimulacao =
  document.getElementById("btnLimparSimulacao");


// Saúde própria

const diasSaudePropria =
  document.getElementById("diasSaudePropria");

const resultadoSaudePropria =
  document.getElementById("resultadoSaudePropria");


// Saúde familiar

const diasSaudeFamiliar =
  document.getElementById("diasSaudeFamiliar");

const resultadoSaudeFamiliar =
  document.getElementById("resultadoSaudeFamiliar");

  // Adiciona ocorrências a quinquênios posteriores

  const btnAdicionarOcorrencia =
  document.getElementById("btnAdicionarOcorrencia");

const ocorrenciasAdicionadas =
  document.getElementById("ocorrenciasAdicionadas");

const listaOcorrenciasAdicionadas =
  document.getElementById("listaOcorrenciasAdicionadas");


// Guarda os quinquênios concluídos calculados inicialmente

let quinqueniosCalculados = [];

let ocorrenciasInformadas = [];

let proximoIdOcorrencia = 1;


// =====================================================
// FUNÇÕES AUXILIARES DE DATA
// =====================================================

function adicionarAnos(data, anos) {

  const novaData = new Date(data);

  novaData.setFullYear(
    novaData.getFullYear() + anos
  );

  return novaData;
}


function adicionarDias(data, dias) {

  const novaData = new Date(data);

  novaData.setDate(
    novaData.getDate() + dias
  );

  return novaData;
}


function subtrairUmDia(data) {

  const novaData = new Date(data);

  novaData.setDate(
    novaData.getDate() - 1
  );

  return novaData;
}


function formatarData(data) {

  return data.toLocaleDateString("pt-BR");

}


// =====================================================
// FUNÇÕES AUXILIARES DAS OCORRÊNCIAS
// =====================================================

function valorNumerico(id) {

  const campo =
    document.getElementById(id);

  if (!campo || !campo.value) {
    return 0;
  }

  return Number(campo.value) || 0;
}


function estaMarcado(idCampo) {

  const checkbox =
    document.querySelector(
      `.checkbox-ocorrencia[data-campo="${idCampo}"]`
    );

  return checkbox?.checked || false;
}


// =====================================================
// MOSTRAR / OCULTAR LISTA DE OCORRÊNCIAS
// =====================================================

radiosOcorrencias.forEach((radio) => {

  radio.addEventListener("change", () => {

    if (
      radio.value === "sim" &&
      radio.checked
    ) {

      listaOcorrencias.classList.remove("oculto");

    }


    if (
      radio.value === "nao" &&
      radio.checked
    ) {

      listaOcorrencias.classList.add("oculto");

      quinquenioOcorrencia.value = "";

      btnRecalcular.classList.add("oculto");

      resultadoAjustado.innerHTML = "";

    }

  });

});


// =====================================================
// ABRIR / FECHAR CADA TIPO DE OCORRÊNCIA
// =====================================================

checkboxesOcorrencias.forEach((checkbox) => {

  checkbox.addEventListener("change", () => {

    const idCampo =
      checkbox.dataset.campo;

    const campo =
      document.getElementById(idCampo);


    if (!campo) {
      return;
    }


    if (checkbox.checked) {

      campo.classList.remove("oculto");

    } else {

      campo.classList.add("oculto");

      campo
        .querySelectorAll("input")
        .forEach((input) => {

          input.value = "";

        });


      if (idCampo === "campoSaudePropria") {

        resultadoSaudePropria.innerHTML = "";

      }


      if (idCampo === "campoSaudeFamiliar") {

        resultadoSaudeFamiliar.innerHTML = "";

      }

    }

  });

});


// =====================================================
// SAÚDE PRÓPRIA
// Regra: somente dias que excederem 730
// =====================================================

diasSaudePropria.addEventListener("input", () => {

  const total =
    Number(diasSaudePropria.value) || 0;

  const excedente =
    Math.max(0, total - 730);


  if (!diasSaudePropria.value) {

    resultadoSaudePropria.innerHTML = "";

    return;

  }


  if (excedente === 0) {

    resultadoSaudePropria.innerHTML = `
      <strong>${total} dias informados.</strong>
      Não há dias excedentes ao limite de 730 dias
      para considerar nesta estimativa.
    `;

  } else {

    resultadoSaudePropria.innerHTML = `
      <strong>
        ${total} dias informados − 730 dias =
        ${excedente} dias considerados.
      </strong>
    `;

  }

});


// =====================================================
// SAÚDE FAMILIAR
// Regra: somente dias que excederem 30
// no período de 12 meses já apurado
// =====================================================

diasSaudeFamiliar.addEventListener("input", () => {

  const total =
    Number(diasSaudeFamiliar.value) || 0;

  const excedente =
    Math.max(0, total - 30);


  if (!diasSaudeFamiliar.value) {

    resultadoSaudeFamiliar.innerHTML = "";

    return;

  }


  if (excedente === 0) {

    resultadoSaudeFamiliar.innerHTML = `
      <strong>${total} dias informados.</strong>
      Não há dias excedentes ao limite de 30 dias
      para considerar nesta estimativa.
    `;

  } else {

    resultadoSaudeFamiliar.innerHTML = `
      <strong>
        ${total} dias informados − 30 dias =
        ${excedente} dias considerados.
      </strong>
    `;

  }

});


// =====================================================
// SOMAR DIAS DAS OCORRÊNCIAS
// =====================================================

function calcularDiasOcorrencias() {

  let total = 0;


  // Saúde própria:
  // considera somente o que exceder 730 dias.

  if (estaMarcado("campoSaudePropria")) {

    const dias =
      valorNumerico("diasSaudePropria");

    total +=
      Math.max(0, dias - 730);

  }


  // Saúde familiar:
  // o usuário informa o total apurado no período
  // de 12 meses e a calculadora considera
  // somente o que exceder 30 dias.

  if (estaMarcado("campoSaudeFamiliar")) {

    const dias =
      valorNumerico("diasSaudeFamiliar");

    total +=
      Math.max(0, dias - 30);

  }


  if (estaMarcado("campoInteresses")) {

    total +=
      valorNumerico("diasInteresses");

  }


  if (estaMarcado("campoPolitica")) {

    total +=
      valorNumerico("diasPolitica");

  }


  if (estaMarcado("campoMandato")) {

    total +=
      valorNumerico("diasMandato");

  }


  if (estaMarcado("campoConjuge")) {

    total +=
      valorNumerico("diasConjuge");

  }


  if (estaMarcado("campoFaltas")) {

    total +=
      valorNumerico("diasFaltas");

  }


  if (estaMarcado("campoSuspensao")) {

    total +=
      valorNumerico("diasSuspensao");

  }


  if (estaMarcado("campoOutros")) {

    total +=
      valorNumerico("diasOutros");

  }


  return total;
}

function obterOcorrenciasPreenchidas() {

  const ocorrencias = [];

  // SAÚDE PRÓPRIA
  if (estaMarcado("campoSaudePropria")) {

    const diasInformados =
      valorNumerico("diasSaudePropria");

    const diasConsiderados =
      Math.max(0, diasInformados - 730);

    ocorrencias.push({
      tipo: "saude-propria",
      descricao: "Licença para tratamento da própria saúde",
      diasInformados,
      diasConsiderados
    });
  }


  // SAÚDE FAMILIAR
  if (estaMarcado("campoSaudeFamiliar")) {

    const diasInformados =
      valorNumerico("diasSaudeFamiliar");

    const diasConsiderados =
      Math.max(0, diasInformados - 30);

    ocorrencias.push({
      tipo: "saude-familiar",
      descricao: "Licença por motivo de doença em pessoa da família",
      diasInformados,
      diasConsiderados
    });
  }


  const ocorrenciasComuns = [

    {
      campo: "campoInteresses",
      input: "diasInteresses",
      tipo: "interesses",
      descricao: "Licença para tratar de interesses particulares"
    },

    {
      campo: "campoPolitica",
      input: "diasPolitica",
      tipo: "politica",
      descricao: "Licença para atividade política"
    },

    {
      campo: "campoMandato",
      input: "diasMandato",
      tipo: "mandato",
      descricao: "Licença para desempenho de mandato classista"
    },

    {
      campo: "campoConjuge",
      input: "diasConjuge",
      tipo: "conjuge",
      descricao: "Licença por motivo de afastamento do cônjuge"
    },

    {
      campo: "campoFaltas",
      input: "diasFaltas",
      tipo: "faltas",
      descricao: "Faltas não justificadas"
    },

    {
      campo: "campoSuspensao",
      input: "diasSuspensao",
      tipo: "suspensao",
      descricao: "Suspensão disciplinar"
    },

    {
      campo: "campoOutros",
      input: "diasOutros",
      tipo: "outros",
      descricao: "Outros"
    }

  ];


  ocorrenciasComuns.forEach((item) => {

    if (estaMarcado(item.campo)) {

      const dias =
        valorNumerico(item.input);

      ocorrencias.push({
        tipo: item.tipo,
        descricao: item.descricao,
        diasInformados: dias,
        diasConsiderados: dias
      });
    }

  });


  return ocorrencias;
}

function adicionarOcorrencias() {

  const numeroQuinquenio =
    Number(quinquenioOcorrencia.value);


  if (!numeroQuinquenio) {

    alert(
      "Selecione o quinquênio ao qual pertencem as ocorrências."
    );

    return;
  }


  const novasOcorrencias =
    obterOcorrenciasPreenchidas();


  if (novasOcorrencias.length === 0) {

    alert(
      "Selecione pelo menos uma ocorrência e informe os dados necessários."
    );

    return;
  }


  novasOcorrencias.forEach((ocorrencia) => {

    ocorrenciasInformadas.push({

      id: proximoIdOcorrencia++,

      quinquenio: numeroQuinquenio,

      ...ocorrencia

    });

  });


  renderizarOcorrencias();

  limparCamposOcorrencias();

  btnRecalcular.classList.remove("oculto");
}

function renderizarOcorrencias() {

  if (ocorrenciasInformadas.length === 0) {

    ocorrenciasAdicionadas.classList.add("oculto");

    listaOcorrenciasAdicionadas.innerHTML = "";

    btnRecalcular.classList.add("oculto");

    return;
  }


  ocorrenciasAdicionadas.classList.remove("oculto");


  const ordenadas =
    [...ocorrenciasInformadas].sort(
      (a, b) => a.quinquenio - b.quinquenio
    );


  listaOcorrenciasAdicionadas.innerHTML =
    ordenadas.map((ocorrencia) => `

      <div class="ocorrencia-adicionada">

        <div>

          <strong>
            ${ocorrencia.quinquenio}º quinquênio
          </strong>

          <p>
            ${ocorrencia.descricao}
          </p>

          <small>
            ${ocorrencia.diasInformados} dias informados
            •
            ${ocorrencia.diasConsiderados} dias considerados
          </small>

        </div>

        <button
          type="button"
          class="btn-remover-ocorrencia"
          data-id="${ocorrencia.id}"
        >
          Remover
        </button>

      </div>

    `).join("");


  document
    .querySelectorAll(".btn-remover-ocorrencia")
    .forEach((botao) => {

      botao.addEventListener("click", () => {

        removerOcorrencia(
          Number(botao.dataset.id)
        );

      });

    });
}

function removerOcorrencia(id) {

  ocorrenciasInformadas =
    ocorrenciasInformadas.filter(
      (ocorrencia) =>
        ocorrencia.id !== id
    );


  renderizarOcorrencias();


  // O resultado anterior deixou de ser válido.
  resultadoAjustado.innerHTML = "";
}

function limparCamposOcorrencias() {

  quinquenioOcorrencia.value = "";


  checkboxesOcorrencias.forEach((checkbox) => {

    checkbox.checked = false;

    const campo =
      document.getElementById(
        checkbox.dataset.campo
      );


    if (campo) {

      campo.classList.add("oculto");

      campo
        .querySelectorAll("input")
        .forEach((input) => {

          input.value = "";

        });
    }

  });


  resultadoSaudePropria.innerHTML = "";
  resultadoSaudeFamiliar.innerHTML = "";
}
// =====================================================
// CALCULAR QUINQUÊNIOS SEM OCORRÊNCIAS
// =====================================================

function calcularPeriodos() {

  const valorData =
    document.getElementById("dataIngresso").value;


  if (!valorData) {

    periodosCalculados.innerHTML = `
      <div class="mensagem-erro">
        Informe a data de ingresso no serviço público federal.
      </div>
    `;

    blocoOcorrencias.classList.add("oculto");

    return;
  }


  const ingresso =
    new Date(`${valorData}T12:00:00`);

  const hoje =
    new Date();


  if (ingresso > hoje) {

    periodosCalculados.innerHTML = `
      <div class="mensagem-erro">
        A data de ingresso não pode ser futura.
      </div>
    `;

    blocoOcorrencias.classList.add("oculto");
   

    return;
  }


  // Limpa resultados anteriores

  quinqueniosCalculados = [];

  resultadoAjustado.innerHTML = "";

  btnRecalcular.classList.add("oculto");


  quinquenioOcorrencia.innerHTML = `
    <option value="">
      Selecione o quinquênio
    </option>
  `;


  let numeroQuinquenio = 1;

  let inicio =
    new Date(ingresso);


  let html = `
    <div class="lista-quinquenios">

      <h4>
        Quinquênios identificados
      </h4>

      <p class="observacao-periodos">
        Os períodos abaixo são apresentados inicialmente
        sem considerar eventuais afastamentos ou ocorrências
        que possam alterar a contagem.
      </p>
  `;


  /*
   * Cria os quinquênios sucessivamente
   * até chegar ao período atualmente em andamento.
   */

  while (true) {

    const proximoInicio =
      adicionarAnos(inicio, 5);

    const fim =
      subtrairUmDia(proximoInicio);

    const concluido =
      proximoInicio <= hoje;


    if (concluido) {

      // Guarda o quinquênio concluído.

      quinqueniosCalculados.push({

        numero: numeroQuinquenio,

        inicio:
          new Date(inicio),

        fim:
          new Date(fim)

      });


      // Cria a opção correspondente no select.

      const option =
        document.createElement("option");

      option.value =
        numeroQuinquenio;

      option.textContent =
        `${numeroQuinquenio}º quinquênio — ` +
        `${formatarData(inicio)} a ${formatarData(fim)}`;

      quinquenioOcorrencia.appendChild(option);


      // Cria o cartão visual.

      html += `
        <div class="quinquenio-item concluido">

          <strong>
            ${numeroQuinquenio}º quinquênio
          </strong>

          <span>
            ${formatarData(inicio)}
            a
            ${formatarData(fim)}
          </span>

          <small>
            Quinquênio concluído
          </small>

        </div>
      `;


    } else {

      html += `
        <div class="quinquenio-item andamento">

          <strong>
            ${numeroQuinquenio}º quinquênio
          </strong>

          <span>
            ${formatarData(inicio)}
            a
            ${formatarData(fim)}
          </span>

          <small>
            Quinquênio em andamento
          </small>

        </div>
      `;

      break;
    }


    inicio =
      new Date(proximoInicio);

    numeroQuinquenio++;

  }


  html += `
    </div>
  `;


  periodosCalculados.innerHTML = html;


  /*
   * Somente depois da primeira apuração
   * liberamos a pergunta sobre ocorrências.
   */

  blocoOcorrencias.classList.remove("oculto");
  btnLimparSimulacao.classList.remove("oculto");

}


// =====================================================
// MOSTRAR BOTÃO DE RECÁLCULO
// =====================================================

quinquenioOcorrencia.addEventListener(
  "change",
  () => {

    if (quinquenioOcorrencia.value) {

      btnRecalcular.classList.remove("oculto");

    } else {

      btnRecalcular.classList.add("oculto");

      resultadoAjustado.innerHTML = "";

    }

  }
);


// =====================================================
// RECALCULAR QUINQUÊNIO COM OCORRÊNCIAS
// =====================================================

function recalcularComOcorrencias() {

  if (ocorrenciasInformadas.length === 0) {

    resultadoAjustado.innerHTML = `
      <div class="mensagem-erro">
        Adicione pelo menos uma ocorrência antes de recalcular os quinquênios.
      </div>
    `;

    return;
  }


  /*
   * Agrupa os dias considerados por quinquênio.
   *
   * Exemplo:
   * 4º = 73 dias
   * 6º = 103 dias
   */

  const diasPorQuinquenio = {};


  ocorrenciasInformadas.forEach((ocorrencia) => {

    if (!diasPorQuinquenio[ocorrencia.quinquenio]) {

      diasPorQuinquenio[ocorrencia.quinquenio] = 0;

    }


    diasPorQuinquenio[ocorrencia.quinquenio] +=
      ocorrencia.diasConsiderados;

  });


  /*
   * A reconstrução começa SEMPRE
   * na data original de ingresso.
   */

  const valorData =
    document.getElementById("dataIngresso").value;


  if (!valorData) {
    return;
  }


  const ingresso =
    new Date(`${valorData}T12:00:00`);

  const hoje =
    new Date();


  let numeroQuinquenio = 1;

  let inicio =
    new Date(ingresso);

  let html = `

    <div class="resultado-box">

      <h4>
        Quinquênios recalculados
      </h4>

      <p class="observacao-periodos">
        Os períodos abaixo consideram as ocorrências
        informadas na simulação.
      </p>

  `;


  /*
   * Agora reconstruímos TODA a sequência.
   *
   * O término de cada quinquênio recebe
   * os dias das ocorrências daquele período.
   *
   * O quinquênio seguinte começa no dia
   * imediatamente posterior ao término ajustado.
   */

  while (true) {

    const proximoInicioBase =
      adicionarAnos(inicio, 5);

    const fimBase =
      subtrairUmDia(proximoInicioBase);


    const diasOcorrencias =
      diasPorQuinquenio[numeroQuinquenio] || 0;


    const fimAjustado =
      adicionarDias(
        fimBase,
        diasOcorrencias
      );


    /*
     * Se o quinquênio ajustado ainda não terminou,
     * ele é o quinquênio atualmente em andamento.
     */

    const concluido =
      adicionarDias(fimAjustado, 1) <= hoje;


    const possuiOcorrencia =
      diasOcorrencias > 0;


    html += `

      <div class="
        quinquenio-item
        ${concluido ? "concluido" : "andamento"}
      ">

        <strong>
          ${numeroQuinquenio}º quinquênio
        </strong>

        <span>
          ${formatarData(inicio)}
          a
          ${formatarData(fimAjustado)}
        </span>

    `;


    if (possuiOcorrencia) {

      html += `

        <small>
          Período ajustado por
          ${diasOcorrencias}
          ${diasOcorrencias === 1 ? "dia" : "dias"}
          de ocorrência.
        </small>

      `;

    } else {

      html += `

        <small>
          ${concluido
            ? "Quinquênio concluído"
            : "Quinquênio em andamento"}
        </small>

      `;

    }


    html += `
      </div>
    `;


    if (!concluido) {

      break;

    }


    /*
     * MUITO IMPORTANTE:
     *
     * o próximo quinquênio começa depois
     * do término AJUSTADO do anterior.
     */

    inicio =
      adicionarDias(
        fimAjustado,
        1
      );


    numeroQuinquenio++;

  }


  html += `

      <div class="aviso-final">

        <p>
          <strong>Importante:</strong>
          o resultado apresentado possui caráter orientativo.
          As informações fornecidas e a contagem do quinquênio
          serão conferidas pela unidade de Gestão de Pessoas
          responsável durante a análise do processo.
        </p>

      </div>

    </div>
  `;


  resultadoAjustado.innerHTML = html;
}

function limparSimulacao() {

  // Limpa a data de ingresso
  document.getElementById("dataIngresso").value = "";

  // Limpa os quinquênios calculados
  periodosCalculados.innerHTML = "";
  quinqueniosCalculados = [];

  ocorrenciasInformadas = [];
  proximoIdOcorrencia = 1;

    listaOcorrenciasAdicionadas.innerHTML = "";
    ocorrenciasAdicionadas.classList.add("oculto");

  // Volta a pergunta de ocorrências para "Não"
  const radioNao =
    document.querySelector(
      'input[name="possuiOcorrencias"][value="nao"]'
    );

  if (radioNao) {
    radioNao.checked = true;
  }

  // Oculta a lista de ocorrências
  listaOcorrencias.classList.add("oculto");

  // Limpa o select dos quinquênios
  quinquenioOcorrencia.innerHTML = `
    <option value="">
      Selecione o quinquênio
    </option>
  `;

  // Desmarca todas as ocorrências
  checkboxesOcorrencias.forEach((checkbox) => {

    checkbox.checked = false;

    const campo =
      document.getElementById(
        checkbox.dataset.campo
      );

    if (campo) {

      campo.classList.add("oculto");

      campo
        .querySelectorAll("input")
        .forEach((input) => {
          input.value = "";
        });
    }
  });

  // Limpa resultados específicos de saúde
  resultadoSaudePropria.innerHTML = "";
  resultadoSaudeFamiliar.innerHTML = "";

  // Limpa o resultado final
  resultadoAjustado.innerHTML = "";

  // Esconde botão de recalcular
  btnRecalcular.classList.add("oculto");

  // Esconde o próprio botão de limpar
  btnLimparSimulacao.classList.add("oculto");

  // Volta o cursor para a data
  document
    .getElementById("dataIngresso")
    .focus();
}

// =====================================================
// EVENTOS DOS BOTÕES
// =====================================================

btnCalcularPeriodos.addEventListener(
  "click",
  calcularPeriodos
);

btnAdicionarOcorrencia.addEventListener(
  "click",
  adicionarOcorrencias
);

btnRecalcular.addEventListener(
  "click",
  recalcularComOcorrencias
);

btnLimparSimulacao.addEventListener(
  "click",
  limparSimulacao
);