const explicacoes = {
 "info-1": {
  titulo: `
    <img src="../../assets/1.png" class="number" alt="1">
    Matrícula SIAPE
  `,
  texto: `
    <p>
      Informe a Matrícula SIAPE com <strong>7 dígitos</strong>.
      Caso sua matrícula possua menos de 7 dígitos, complete com
      <strong>zero(s) à esquerda</strong>.
    </p>

    <p>
      Exemplo: <strong>123456 → 0123456</strong>.
      O formulário não permitirá o envio enquanto a matrícula estiver incompleta.
    </p>
  `
},

  "info-2": {
    titulo: `
    <img src="../../assets/2.png" class="number" alt="2">
    Chefia imediata
  `,
    texto: `
      <p>
        Informe o <strong>nome da chefia imediata titular</strong> e seu
        e-mail institucional.
      </p>
      <p>
        Pode ser utilizado o e-mail institucional do setor/departamento,
        desde que seja recebido diretamente pela chefia.
        Informe <strong>apenas um endereço de e-mail</strong>.
      </p>
    `
  },

  "info-3": {
    titulo: `
    <img src="../../assets/3.png" class="number" alt="3">
    Data de efetivo exerício no Serviço Público
  `,
    texto: `
      <p>
        Informe a data em que entrou em <strong>efetivo exercício no serviço
        público em cargo efetivo</strong>.
        Essa data será utilizada pelo formulário para identificar o
        quinquênio correspondente.
      </p>
    `
  },

  "info-4": {
    titulo: `
    <img src="../../assets/4.png" class="number" alt="4">
    Data de efetivo exercício no cargo atual
  `,
    texto: `
      <p>
        Informe a data em que entrou em efetivo exercício
        <strong>no cargo que ocupa atualmente</strong>.
        O campo deve ser preenchido mesmo quando essa data for igual à
        data de ingresso no serviço público.
      </p>
    `
  },

  "info-5": {
    titulo: `
    <img src="../../assets/5.png" class="number" alt="5">
    Quinquênio concluído
  `,
    texto: `
      <p>
        Após o preenchimento da data de efetivo exercício no serviço público,
        o formulário apresentará automaticamente o
        <strong>último quinquênio concluído</strong>.
      </p>
      <p>
        Confira o período apresentado. O cálculo possui caráter informativo
        e poderá ser conferido pela unidade responsável durante a análise.
      </p>
    `
  },

  "info-6": {
    titulo: `
    <img src="../../assets/6.png" class="number" alt="6">
    Licença anterior
  `,
    texto: `
      <p>
        Informe se já usufruiu de <strong> Licença para Capacitação referente ao quinquênio apresentado pelo formulário.
        </strong>
      </p>
      <p>
        Se não utilizou nenhum período desse quinquênio, selecione “Não”. Se já utilizou, selecione “Sim” para informar os dados da licença anterior.
      </p>
    `
  },

  "info-7": {
    titulo: `
    <img src="../../assets/7.png" class="number" alt="7">
    Dias utilizados
  `,
    texto: `
      <p>
       Ao selecionar “Sim”, informe a quantidade de dias de Licença para Capacitação já usufruídos no mesmo quinquênio.
      </p>
      <p>
        O formulário calculará automaticamente o saldo restante, considerando o limite de 90 dias por quinquênio.
      </p>
    `
  },

  "info-8": {
    titulo: `
    <img src="../../assets/8.png" class="number" alt="8">
    Interstício
  `,
    texto: `
      <p>
       Informe a data de conclusão da última Licença para Capacitação usufruída nesse quinquênio.
      </p>
      <p>
        A partir dessa informação, o formulário verificará automaticamente o cumprimento do intervalo mínimo de 60 dias entre os períodos de Licença para Capacitação.
      </p>
    `
  },

   "info-9": {
    titulo: `
    <img src="../../assets/9.png" class="number" alt="9">
    Período da licença
  `,
    texto: `
      <p>
       Informe a data de início da Licença para Capacitação. A data de término será calculada de acordo com a quantidade de dias solicitada. Confira o período apresentado antes de prosseguir.
      </p>
    `
  },

   "info-10": {
    titulo: `
    <img src="../../assets/10.png" class="number" alt="10">
    Antecedência mínima
  `,
    texto: `
      <p>
       Após informar a data de início, o formulário verificará automaticamente o cumprimento da antecedência mínima exigida para a solicitação. Observe a mensagem apresentada antes de prosseguir.
      </p>
    `
  },

   "info-11": {
    titulo: `
    <img src="../../assets/11.png" class="number" alt="11">
    Opção "Outro"
  `,
    texto: `
      <p>
       A opção <strong>“Outro”</strong> deve ser utilizada somente quando houver <strong> saldo remanescente decorrente da interrupção de uma Licença para Capacitação anteriormente concedida.</strong>
      </p>
      <p>
       Ela poderá aparecer em dois momentos:
      </p>
      <ul>
        <li><strong>Dias já usufruídos: </strong> quando a quantidade efetivamente utilizada antes da interrupção não corresponder aos períodos apresentados nas opções. Informe quantos dias foram efetivamente usufruídos.</li>
        <li><strong>Dias solicitados:</strong> quando o saldo remanescente a ser utilizado não corresponder aos períodos padronizados. Informe a quantidade de dias correspondente ao saldo disponível.
      </ul>
      <p>
      O período informado será conferido durante a análise do requerimento.
      </p>
    `
  },

  "info-12": {
    titulo: `
    <img src="../../assets/12.png" class="number" alt="12">
    Instituição promotora
  `,
    texto: `
      <p>
       Informe o nome da(s) instituição(ões) promotora(s) das ações de desenvolvimento que serão realizadas durante a Licença para Capacitação.
      </p>
      <p>
      Caso realize ações em instituições diferentes, informe todas elas.
      </p>
      <p>
      Para auxiliar na escolha, consulte também a página <a href="../tabela-instituicoespromotoras.html" target="_blank" rel="noopener noreferrer">  Instituições de Capacitação </a> disponível no Sistema de Ferramentas.
      </p>
    `
  },

  "info-13": {
    titulo: `
    <img src="../../assets/13.png" class="number" alt="13">
    Ações de desenvolvimento
  `,
    texto: `
      <p>
       Informe o nome completo de cada ação de desenvolvimento, conforme divulgado pela instituição promotora.
      </p>
      <p>
      Quando houver mais de uma ação, informe-as separadamente e indique a carga horária de cada uma.
      </p>
      <ul>
        <li>Curso A – 40 horas</li>
        <li>Curso B – 25 horas</li>
      </ul>
    `
  },

   "info-14": {
    titulo: `
    <img src="../../assets/14.png" class="number" alt="14">
    Carga horária total
  `,
    texto: `
      <p>
       Informe a soma da carga horária de todas as ações de desenvolvimento que serão realizadas durante o período da licença.
      </p>
      <p>
      Digite somente o número correspondente à carga horária total.
        Exemplo: para 65 horas, informe 65.
      </p>
    `
  },

  "info-15": {
    titulo: `
    <img src="../../assets/15.png" class="number" alt="15">
    Local
  `,
    texto: `
      <p>
      Informe a Cidade/UF/País correspondente ao local de realização da ação.
      </p>
      <p>
      Para ações realizadas a distância, informe o local onde você estará durante a realização da capacitação.
      </p>
    `
  },

   "info-16": {
    titulo: `
    <img src="../../assets/16.png" class="number" alt="16">
    Local
  `,
    texto: `
      <p>
      A partir da carga horária total e do período de licença solicitado, o formulário calculará automaticamente a carga horária semanal aproximada.
      </p>
      <p>
      Confira a mensagem apresentada pelo sistema. A carga horária das ações deverá ser compatível com o período solicitado, completando o mínimo de 30 horas semanais.
      </p>
    `
  },

   "info-17": {
    titulo: `
    <img src="../../assets/17.png" class="number" alt="17">
    Relação da ação
  `,
    texto: `
      <p>
      Assinale pelo menos uma opção que demonstre a relação da ação de desenvolvimento com as necessidades institucionais ou profissionais apresentadas no formulário.
      </p>
      <p>
      É possível selecionar mais de uma opção, quando aplicável.
      </p>

      <p>
      Caso utilize a opção referente ao PDP do IFC, consulte o documento disponibilizado no próprio formulário e verifique se a ação pretendida está prevista ou relacionada às necessidades nele identificadas.
      </p>
    `
  },

  "info-18": {
    titulo: `
    <img src="../../assets/18.png" class="number" alt="18">
     Ônus limitado
  `,
    texto: `
      <p>
      Selecione “Ônus limitado” quando a Licença para Capacitação ocorrer sem custeio da ação pelo IFC, permanecendo o recebimento da remuneração do cargo efetivo.
      </p>
      <p>
      Observe também o aviso apresentado pelo formulário sobre os efeitos financeiros aplicáveis às licenças com período superior a 30 dias consecutivos.
      </p>
    `
  },

   "info-19": {
    titulo: `
    <img src="../../assets/19.png" class="number" alt="19">
     Ônus para outro órgão
  `,
    texto: `
      <p>
      Selecione “Ônus para outro” quando houver custeio da ação de desenvolvimento por outro órgão ou entidade.
      </p>
      <p>
      Informe o nome do órgão responsável e assinale quais despesas serão custeadas, como diárias, passagens, taxa de inscrição ou outros custos.
      </p>
      <p>
      O respectivo comprovante da concessão do auxílio deverá ser apresentado com a documentação da solicitação.
      </p>
    `
  },

   "info-20": {
    titulo: `
    <img src="../../assets/20.png" class="number" alt="20">
     Compromissos
  `,
    texto: `
      <p>
      Leia atentamente cada um dos compromissos apresentados na Seção V e assinale todas as caixas para declarar ciência.
      </p>
      <p>
      Todos os itens são obrigatórios. Enquanto houver algum compromisso não assinalado, o formulário <strong> não permitirá o envio da solicitação.</strong>
      </p>
    `
  },

  "info-21": {
    titulo: `
    <img src="../../assets/21.png" class="number" alt="21">
     Tabela das principais Instituições
  `,
    texto: `
      <p>
      Antes de realizar a inscrição, verifique como funciona a ação escolhida e quais informações constarão no certificado ou documento de conclusão.
      </p>
      <p>
      Quando a inscrição der início imediato à ação, não realize a inscrição antecipadamente se isso fizer com que a ação ou o certificado registre período anterior ao da Licença para Capacitação.
      </p>
      <p>
      Nesses casos, utilize para a solicitação o print da página da ação, contendo as informações necessárias para sua identificação, e realize a inscrição no momento adequado.
      </p>
      <p>
      Quando a instituição permitir inscrição ou matrícula prévia sem início da ação, poderá ser apresentado o respectivo comprovante, conforme as orientações aplicáveis.
      </p>
    `
  },

};


$("#carousel-instrucoes").on("slide.bs.carousel", function () {
  document.querySelectorAll(".caixa-explicacao").forEach((caixa) => {
    caixa.hidden = true;
    caixa.innerHTML = "";
  });

  document.querySelectorAll(".btn-explicacao").forEach((botao) => {
    botao.classList.remove("ativo");
  });
});









document.querySelectorAll(".btn-explicacao").forEach((botao) => {
  botao.addEventListener("click", () => {
    const slide = botao.closest(".carousel-item");
    const caixa = slide.querySelector(".caixa-explicacao");
    const info = explicacoes[botao.dataset.info];

    if (!info || !caixa) return;

    const jaEstaAberta =
      botao.classList.contains("ativo") && !caixa.hidden;

    slide.querySelectorAll(".btn-explicacao").forEach((btn) => {
      btn.classList.remove("ativo");
    });

    if (jaEstaAberta) {
      caixa.hidden = true;
      caixa.innerHTML = "";
      return;
    }

    botao.classList.add("ativo");

    caixa.innerHTML = `
      <h4>${info.titulo}</h4>
      ${info.texto}
    `;

    caixa.hidden = false;
  });
});