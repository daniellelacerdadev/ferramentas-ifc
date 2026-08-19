function calcularQuinquenio() {

    const data = document.getElementById("dataIngresso").value;

    if (!data) {
        alert("Informe a data de ingresso.");
        return;
    }

    const ingresso = new Date(data);
    const hoje = new Date();

    let anos = hoje.getFullYear() - ingresso.getFullYear();

    if (
        hoje.getMonth() < ingresso.getMonth() ||
        (hoje.getMonth() === ingresso.getMonth() &&
         hoje.getDate() < ingresso.getDate())
    ) {
        anos--;
    }

    const quinquenios = Math.floor(anos / 5);

    const proximo = new Date(ingresso);

    proximo.setFullYear(
        ingresso.getFullYear() + ((quinquenios + 1) * 5)
    );

    const diferenca = proximo - hoje;

    const dias = Math.ceil(
        diferenca / (1000 * 60 * 60 * 24)
    );

    document.getElementById("resultado").innerHTML = `
        <h4>Resultado</h4>

        <p>
          <strong>Quinquênios completos:</strong>
          ${quinquenios}
        </p>

        <p>
          <strong>Próximo quinquênio:</strong>
          ${proximo.toLocaleDateString('pt-BR')}
        </p>

        <p>
          <strong>Dias restantes:</strong>
          ${dias}
        </p>
    `;
}