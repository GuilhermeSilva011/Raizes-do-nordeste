import './PainelFiliais.css'


function PainelFiliais({
  fecharPainel
}) {

  return (
    <div className="fundo-filiais">

      <div className="painel-filiais">


        <header className="cabecalho-filiais">

          <div>

            <span>
              ADMINISTRAÇÃO
            </span>

            <h2>
              Filiais
            </h2>

          </div>


          <button
            onClick={fecharPainel}
          >
            ✕
          </button>

        </header>


        <div className="lista-filiais">


          <article className="card-filial">

            <div className="icone-filial">
              🏪
            </div>

            <div>

              <h3>
                Matriz
              </h3>

              <p>
                Centro
              </p>

              <span>
                8 funcionários
              </span>

            </div>

            <strong>
              Ativa
            </strong>

          </article>


          <article className="card-filial">

            <div className="icone-filial">
              🏪
            </div>

            <div>

              <h3>
                Filial Centro
              </h3>

              <p>
                Centro
              </p>

              <span>
                5 funcionários
              </span>

            </div>

            <strong>
              Ativa
            </strong>

          </article>


          <article className="card-filial">

            <div className="icone-filial">
              🏪
            </div>

            <div>

              <h3>
                Filial Norte
              </h3>

              <p>
                Zona Norte
              </p>

              <span>
                4 funcionários
              </span>

            </div>

            <strong>
              Ativa
            </strong>

          </article>


        </div>


        <button className="botao-nova-filial">
          + Cadastrar filial
        </button>


      </div>

    </div>
  )
}


export default PainelFiliais