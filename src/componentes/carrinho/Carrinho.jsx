import './Carrinho.css'

function Carrinho({
  carrinho = [],
  fecharCarrinho,
  aumentarQuantidade,
  diminuirQuantidade,
  removerProduto,
  finalizarCompra
}) {

  // ==================================================
  // QUANTIDADE TOTAL DE PRODUTOS
  // ==================================================

  const quantidadeTotal = carrinho.reduce(
    (total, produto) => {
      return (
        total +
        Number(produto.quantidade || 0)
      )
    },
    0
  )


  // ==================================================
  // VALOR TOTAL DO CARRINHO
  // ==================================================

  const valorTotal = carrinho.reduce(
    (total, produto) => {

      const preco = Number(
        produto.preco || 0
      )

      const quantidade = Number(
        produto.quantidade || 0
      )

      return total + (preco * quantidade)
    },
    0
  )


  // ==================================================
  // FORMATAR PREÇO
  // ==================================================

  function formatarPreco(valor) {
    return Number(valor || 0)
      .toFixed(2)
      .replace('.', ',')
  }


  // ==================================================
  // IDENTIFICADOR DA VERSÃO ATUAL DO CARRINHO
  // ==================================================
  //
  // Ele muda quando:
  // - aumenta a quantidade;
  // - diminui a quantidade;
  // - remove um produto.
  //
  // Isso ajuda a garantir que a área visual do carrinho
  // acompanhe exatamente o estado atual recebido.
  // ==================================================

  const identificadorCarrinho = carrinho
    .map((produto) => (
      `${produto.id}-${produto.quantidade}`
    ))
    .join('|')


  return (

    <div
      className="fundo-carrinho"
      onMouseDown={(evento) => {

        if (
          evento.target ===
          evento.currentTarget
        ) {
          fecharCarrinho()
        }

      }}
    >

      <aside
        className="painel-carrinho"
        key={identificadorCarrinho}
      >

        {/* ==================================================
            CABEÇALHO
        ================================================== */}

        <div className="cabecalho-carrinho">

          <div>

            <h2>
              Meu carrinho
            </h2>

            <p>
              {quantidadeTotal === 0
                ? 'Seu carrinho está vazio'
                : `${quantidadeTotal} item(ns)`
              }
            </p>

          </div>


          <button
            type="button"
            className="botao-fechar"
            onClick={fecharCarrinho}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>

        </div>


        {/* ==================================================
            LISTA DE PRODUTOS
        ================================================== */}

        <div className="lista-carrinho">

          {carrinho.length === 0 ? (

            <div className="carrinho-vazio">

              <span>
                🛒
              </span>

              <h3>
                Seu carrinho está vazio
              </h3>

              <p>
                Escolha alguns produtos
                deliciosos para continuar.
              </p>

            </div>

          ) : (

            carrinho.map((produto) => (

              <article
                className="item-carrinho"
                key={produto.id}
              >

                {/* IMAGEM */}

                <div className="imagem-carrinho">

                  {produto.imagem ||
                    produto.icone ||
                    '🍽️'}

                </div>


                {/* INFORMAÇÕES */}

                <div className="informacoes-carrinho">

                  <h3>
                    {produto.nome}
                  </h3>

                  <strong>
                    R$ {formatarPreco(produto.preco)}
                  </strong>


                  {/* QUANTIDADE */}

                  <div className="controle-quantidade">

                    <button
                      type="button"
                      onClick={() =>
                        diminuirQuantidade(
                          produto.id
                        )
                      }
                      aria-label={
                        `Diminuir quantidade de ${produto.nome}`
                      }
                    >
                      −
                    </button>


                    <span>
                      {Number(
                        produto.quantidade || 0
                      )}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        aumentarQuantidade(
                          produto.id
                        )
                      }
                      aria-label={
                        `Aumentar quantidade de ${produto.nome}`
                      }
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* REMOVER */}

                <button
                  type="button"
                  className="botao-remover"
                  onClick={() =>
                    removerProduto(
                      produto.id
                    )
                  }
                  aria-label={
                    `Remover ${produto.nome}`
                  }
                >
                  🗑️
                </button>

              </article>

            ))

          )}

        </div>


        {/* ==================================================
            RODAPÉ
        ================================================== */}

        {carrinho.length > 0 && (

          <div className="rodape-carrinho">

            <div className="linha-total">

              <span>
                Total
              </span>

              <strong>
                R$ {formatarPreco(valorTotal)}
              </strong>

            </div>


            <button
              type="button"
              className="botao-finalizar"
              onClick={finalizarCompra}
            >
              Finalizar pedido
            </button>

          </div>

        )}

      </aside>

    </div>

  )
}

export default Carrinho