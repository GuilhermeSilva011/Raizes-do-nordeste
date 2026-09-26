import { useNavigate } from 'react-router-dom'
import './Pedidos.css'

function Pedidos({
  usuario,
  pedidos = []
}) {
  const navigate = useNavigate()

  // Formata valores para o padrão brasileiro
  function formatarPreco(valor) {
    return Number(valor || 0)
      .toFixed(2)
      .replace('.', ',')
  }

  // Se o usuário não estiver logado
  if (!usuario) {
    return (
      <main className="pagina-pedidos">
        <section className="pedidos-vazio">
          <span className="icone-pedidos-vazio">
            📦
          </span>

          <h2>
            Meus pedidos
          </h2>

          <p>
            Entre na sua conta para acompanhar seus pedidos.
          </p>

          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>
        </section>
      </main>
    )
  }

  // Se ainda não houver pedidos
  if (pedidos.length === 0) {
    return (
      <main className="pagina-pedidos">
        <section className="pedidos-vazio">
          <span className="icone-pedidos-vazio">
            📦
          </span>

          <h2>
            Você ainda não fez nenhum pedido.
          </h2>

          <p>
            Que tal conhecer nosso cardápio?
          </p>

          <button
            type="button"
            onClick={() => navigate('/cardapio')}
          >
            Ver cardápio
          </button>
        </section>
      </main>
    )
  }

  /*
   * ============================================================
   * ETAPAS DO PEDIDO
   * ============================================================
   *
   * Essas são as etapas fixas que aparecem para o cliente.
   *
   * O texto "Em preparo" é independente do status salvo
   * no pedido. O status serve apenas para descobrir qual
   * etapa está ativa.
   */

  const etapas = [
    {
      id: 'recebido',
      nome: 'Recebido'
    },
    {
      id: 'em-preparo',
      nome: 'Em preparo'
    },
    {
      id: 'pronto',
      nome: 'Pronto'
    },
    {
      id: 'finalizado',
      nome: 'Finalizado'
    }
  ]

  return (
    <main className="pagina-pedidos">

      {/* ======================================================
          CABEÇALHO
      ======================================================= */}

      <header className="cabecalho-pedidos">

        <div className="titulo-pedidos">

          <div className="icone-titulo-pedidos">
            📦
          </div>

          <div>
            <h1>
              Meus pedidos
            </h1>

            <p>
              Acompanhe seus pedidos.
            </p>
          </div>

        </div>

      </header>


      {/* ======================================================
          LISTA DE PEDIDOS
      ======================================================= */}

      <section className="lista-pedidos">

        {[...pedidos]
          .reverse()
          .map((pedido) => {

            /*
             * Descobrimos qual etapa corresponde ao status atual.
             *
             * Exemplo:
             *
             * Recebido   → índice 0
             * Em preparo → índice 1
             * Pronto     → índice 2
             * Finalizado → índice 3
             */

            const indiceStatus =
              etapas.findIndex(
                (etapa) =>
                  etapa.nome === pedido.status
              )

            const cancelado =
              pedido.status === 'Cancelado'

            return (
              <article
                className={`card-pedido ${
                  cancelado ? 'cancelado' : ''
                }`}
                key={pedido.numero}
              >

                {/* ==================================================
                    CABEÇALHO DO PEDIDO
                =================================================== */}

                <div className="cabecalho-card-pedido">

                  <div>

                    <span className="numero-pedido-label">
                      Pedido
                    </span>

                    <strong className="numero-pedido">
                      #{pedido.numero}
                    </strong>

                    <span className="data-pedido">
                      {pedido.data}
                    </span>

                  </div>


                  {/* Status atual */}

                  <span
                    className={`status-pedido ${
                      cancelado ? 'cancelado' : ''
                    }`}
                  >
                    {cancelado
                      ? '❌ Cancelado'
                      : `● ${pedido.status}`}
                  </span>

                </div>


                {/* ==================================================
                    ACOMPANHAMENTO DO PEDIDO
                =================================================== */}

                {!cancelado && (

                  <div className="acompanhamento-pedido">

                    {etapas.map(
                      (etapa, index) => {

                        const etapaConcluida =
                          index <= indiceStatus

                        const etapaAtual =
                          index === indiceStatus

                        return (
                          <div
                            className={`etapa-pedido ${
                              etapaConcluida
                                ? 'concluida'
                                : ''
                            } ${
                              etapaAtual
                                ? 'atual'
                                : ''
                            }`}
                            key={etapa.id}
                          >

                            {/* Círculo */}

                            <div className="circulo-etapa">

                              {index < indiceStatus
                                ? '✓'
                                : index === indiceStatus
                                ? '●'
                                : ''}

                            </div>


                            {/* 
                              Nome da etapa.

                              Usamos uma classe exclusiva
                              para impedir que algum estilo
                              externo corte "Em preparo".
                            */}

                            <strong className="nome-etapa">
                              {etapa.nome}
                            </strong>


                            {/* Linha entre as etapas */}

                            {index <
                              etapas.length - 1 && (

                              <div
                                className={`linha-etapa ${
                                  index < indiceStatus
                                    ? 'concluida'
                                    : ''
                                }`}
                              />

                            )}

                          </div>
                        )
                      }
                    )}

                  </div>

                )}


                {/* ==================================================
                    ITENS DO PEDIDO
                =================================================== */}

                <div className="produtos-do-pedido">

                  <h3>
                    Itens do pedido
                  </h3>


                  {pedido.itens?.map(
                    (item, index) => (

                      <div
                        className="item-pedido"
                        key={`${pedido.numero}-${index}`}
                      >

                        {/* Imagem / emoji */}

                        <span className="imagem-item-pedido">
                          {item.imagem ||
                            item.icone ||
                            '🍽️'}
                        </span>


                        {/* Informações */}

                        <div className="informacoes-item-pedido">

                          <strong>
                            {item.nome}
                          </strong>

                          <span>
                            {item.quantidade}x
                            {' '}
                            R$ {formatarPreco(item.preco)}
                          </span>

                        </div>


                        {/* Subtotal */}

                        <strong>
                          R$ {formatarPreco(
                            Number(item.preco || 0) *
                            Number(item.quantidade || 0)
                          )}
                        </strong>

                      </div>

                    )
                  )}

                </div>


                {/* ==================================================
                    OBSERVAÇÃO
                =================================================== */}

                {pedido.observacao && (

                  <div className="observacao-pedido">

                    <strong>
                      📝 Observação
                    </strong>

                    <p>
                      {pedido.observacao}
                    </p>

                  </div>

                )}


                {/* ==================================================
                    PAGAMENTO
                =================================================== */}

                {pedido.formaPagamento && (

                  <div className="pagamento-pedido">

                    <span>
                      Forma de pagamento
                    </span>

                    <strong>
                      {pedido.formaPagamento}
                    </strong>

                  </div>

                )}


                {/* ==================================================
                    TOTAL
                =================================================== */}

                <div className="total-pedido">

                  <span>
                    Total
                  </span>

                  <strong>
                    R$ {formatarPreco(pedido.total)}
                  </strong>

                </div>

              </article>
            )
          })}

      </section>

    </main>
  )
}

export default Pedidos