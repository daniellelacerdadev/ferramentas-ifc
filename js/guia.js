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
    Carga semanal
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

   "info-22": {
    titulo: `
    <img src="../../assets/22.png" class="number" alt="22">
     Faltou preencher algum campo?
  `,
    texto: `
      <p>
      Ao clicar em <strong>“Enviar solicitação”</strong>, caso ainda existam informações obrigatórias não preenchidas, o formulário apresentará uma lista dos campos que precisam ser verificados.
      </p>
      <p>
      Corrija os itens indicados e tente realizar o envio novamente.
      </p>
    `
  },

   "info-23": {
    titulo: `
    <img src="../../assets/23.png" class="number" alt="23">
     Formulário completamente preenchido
  `,
    texto: `
      <p>
      Quando todos os campos e compromissos obrigatórios estiverem preenchidos corretamente, será exibida a mensagem <strong>“Formulário preenchido com sucesso!”</strong>.
      </p>
      <p>
      Antes de enviar, confira especialmente seu e-mail institucional e sua unidade de exercício, pois essas informações serão utilizadas no fluxo eletrônico da solicitação.
      </p>
      <p>
      Após a conferência, clique em “Enviar solicitação”.
      </p>
    `
  },

   "info-24": {
    titulo: `
    <img src="../../assets/24.png" class="number" alt="24">
     Envio concluído
  `,
    texto: `
      <p>
      Aguarde a confirmação <strong>“Solicitação enviada com sucesso!” </strong>.
      </p>
      <p>
      O sistema enviará ao seu e-mail institucional um <strong> comprovante de preenchimento e o link individual para registro da manifestação da chefia imediata. Não gerar, imprimir ou salvar documentos diretamente pela página do formulário. </strong>.
      </p>
      <p>
      <strong>Encaminhe o link recebido à sua chefia imediata </strong>.
      </p>
      <p>
      O comprovante recebido neste momento destina-se à sua conferência e registro e <strong> não deve ser utilizado para abertura do processo </strong>.
    `
  },

   "info-25": {
    titulo: `
    <img src="../../assets/25.png" class="number" alt="25">
     Após o envio
  `,
    texto: `
      <p>
      Após clicar em <strong>“Enviar solicitação” </strong> e receber a confirmação do envio, acompanhe seu e-mail institucional.
      </p>
      <p>
      O sistema enviará automaticamente as informações necessárias para a próxima etapa. 
      </p>
    `
  },

   "info-26": {
    titulo: `
    <img src="../../assets/26.png" class="number" alt="26">
     E-mail recebido
  `,
    texto: `
      <p>
      Você receberá em seu e-mail institucional:
      </p>
      <ul>
        <li>um PDF para conferência e registro;</li>
        <li>um link individual para registro da manifestação da chefia imediata.</li>
      </ul>
      <p>
      O PDF recebido nesta etapa é apenas um comprovante de preenchimento e não deve ser utilizado para abertura do processo.
      </p>
    `
  },

   "info-27": {
    titulo: `
    <img src="../../assets/27.png" class="number" alt="27">
     Link da chefia
  `,
    texto: `
      <p>
      Encaminhe à sua <strong> chefia imediata </strong> o link individual recebido por e-mail.
      </p>
      <p>
      O link dará acesso à página destinada exclusivamente ao registro da manifestação da chefia sobre a solicitação.
      </p>
      <p>
      <strong>Não encaminhe o PDF no lugar do link.</strong>
      </p>
    `
  },

   "info-28": {
    titulo: `
    <img src="../../assets/28.png" class="number" alt="28">
     Modelo de e-mail com o link da chefia
  `,
    texto: `
      <p>
      O e-mail que você deve receber com o comprovante do requerimento e o link para a chefia virá neste modelo acima.
      </p>
      <p>
      Ao acessar o link, a chefia será direcionada à página de Manifestação da Chefia Imediata.
      </p>
      <p>
      Nessa página estarão disponíveis os dados e as informações preenchidas pelo servidor, para conferência, além dos campos destinados à manifestação da chefia.
      </p>    
    `
  },

   "info-29": {
    titulo: `
    <img src="../../assets/29.png" class="number" alt="29">
     Dados do servidor
  `,
    texto: `
      <p>
      Os dados do requerimento são carregados automaticamente e apresentados à chefia somente para consulta, não podendo ser alterados nessa etapa.
      </p>
      <p>
      A chefia deverá conferir as informações e preencher apenas os campos destinados à sua manifestação.
      </p>
    `
  },

   "info-30": {
    titulo: `
    <img src="../../assets/30.png" class="number" alt="30">
     De acordo
  `,
    texto: `
      <p>
      Se estiver de acordo com a solicitação apresentada, a chefia deverá selecionar <strong> “De acordo com a solicitação” </strong>.
      </p>
      <p>
      A manifestação favorável permitirá o prosseguimento do fluxo após o envio, sem a necessidade de escrever qualquer manifestação.
      </p>
    `
  },
   "info-31": {
    titulo: `
    <img src="../../assets/31.png" class="number" alt="31">
    Não estou de acordo
  `,
    texto: `
      <p>
      Caso não concorde com a solicitação, a chefia deverá selecionar <strong> “Não estou de acordo com a solicitação” </strong>.
      </p>
      <p>
      Nessa situação, será necessário informar a <strong> justificativa da não concordância antes do envio </strong>.
      </p>
    `
  },

   "info-32": {
    titulo: `
    <img src="../../assets/32.png" class="number" alt="32">
    Observações
  `,
    texto: `
      <p>
      Este campo poderá ser utilizado pela chefia para registrar informações complementares sobre sua manifestação.
      </p>
      <p>
      Quando a manifestação for favorável, o preenchimento é opcional. Em caso de não concordância, <strong> a justificativa é obrigatória </strong>.
      </p>
    `
  },

   "info-33": {
    titulo: `
    <img src="../../assets/33.png" class="number" alt="33">
    Identificação
  `,
    texto: `
      <p>
      Informe o nome da pessoa que está registrando a manifestação como chefia imediata.
      </p>
      <p>
      O nome deve ser preenchido por quem efetivamente estiver respondendo à solicitação, inclusive quando a manifestação for realizada por chefia substituta.
      </p>
      <p>
      A data será preenchida automaticamente pelo sistema.
      </p>
    `
  },

   "info-34": {
    titulo: `
    <img src="../../assets/34.png" class="number" alt="34">
    Enviar manifestação
  `,
    texto: `
      <p>
      Após conferir as informações e preencher os campos obrigatórios, clique em <strong>“Enviar” </strong>.
      </p>
      <p>
      <strong> Não imprima nem utilize a opção do navegador para salvar esta página em PDF.</strong>
      </p>
      <p>
      O documento final será gerado automaticamente pelo sistema após o envio da manifestação e encaminhado aos destinatários previstos no fluxo.
      </p>
    `
  },

   "info-35": {
    titulo: `
    <img src="../../assets/35.png" class="number" alt="35">
     Não concordância
  `,
    texto: `
      <p>
      Ao selecionar <strong> “Não estou de acordo com a solicitação” </strong>, informe no campo de observações o motivo da não concordância.
      </p>
      <p>
      A solicitação somente poderá ser enviada após o preenchimento da justificativa.
      </p>
    `
  },

  "info-36": {
    titulo: `
    <img src="../../assets/36.png" class="number" alt="36">
     Erro ao tentar enviar
  `,
    texto: `
      <p>
      Caso a chefia tente realizar o envio sem informar a justificativa da não concordância, o sistema apresentará uma mensagem indicando o campo pendente.
      </p>
      <p>
      Preencha a justificativa e clique novamente em “Enviar”.
      </p>
    `
  },

  "info-37": {
    titulo: `
    <img src="../../assets/37.png" class="number" alt="37">
     Não concordância
  `,
    texto: `
      <p>
      Quando a chefia selecionar <strong>“Não estou de acordo com a solicitação” </strong>, o documento final registrará a manifestação e a respectiva justificativa.
      </p>
      <p>
      Nesse caso, a solicitação não terá prosseguimento, não sendo necessário ao servidor encaminhar os demais documentos previstos para continuidade do procedimento.
      </p>
    `
  },

   "info-38": {
    titulo: `
    <img src="../../assets/38.png" class="number" alt="38">
     Quando houver anuência
  `,
    texto: `
      <p>
      Quando a chefia selecionar<strong> “De acordo com a solicitação” </strong>, o sistema gerará automaticamente o documento final contendo o requerimento e a manifestação da chefia.
      </p>
      <p>
      O documento será encaminhado à unidade de Gestão de Pessoas responsável pela continuidade do procedimento, com cópia ao servidor.
      </p>
       <p>
      A anuência da chefia não corresponde à autorização da Licença para Capacitação. O servidor deverá cumprir as etapas seguintes e aguardar a publicação da Portaria de Autorização.
      </p>
    `
  },

   "info-39": {
    titulo: `
    <img src="../../assets/39.png" class="number" alt="39">
    Comprovante da ação
  `,
    texto: `
      <p>
      Após a anuência da chefia, ainda existem providências que deverão ser cumpridas antes do início da Licença para Capacitação.
      </p>
     <ol>
     <li>Encaminhe o comprovante da ação de desenvolvimento à unidade responsável, conforme informado no formulário.</li>
     <p>
     O documento apresentado dependerá do tipo de ação. Poderá ser, por exemplo, comprovante de inscrição ou matrícula, documento da instituição promotora, atestado de matrícula ou declaração do orientador da pós graduação, termo de compromisso ou outro documento correspondente à ação informada.
     </p>
     <p>
     <strong>Atenção:</strong>quando a inscrição antecipada iniciar imediatamente a ação ou interferir no período registrado no certificado, utilize a documentação disponível para comprovação da ação e realize a inscrição no momento adequado.
     <li>Aguarde o recebimento do Guia e do Parecer. Leia atentamente as orientações encaminhadas e responda ao e-mail declarando sua ciência.</li>
     <li>Aguarde a publicação da Portaria de Autorização. A Licença para Capacitação somente poderá ser iniciada após a conclusão do procedimento e a respectiva publicação.</li>
     </ol>
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

document.querySelectorAll(".btn-sumario").forEach((botao) => {
  botao.addEventListener("click", () => {

    const destino = Number(botao.dataset.slideDestino);

    $("#carousel-instrucoes").carousel(destino);

    document
      .querySelector("#carousel-instrucoes")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  });
});