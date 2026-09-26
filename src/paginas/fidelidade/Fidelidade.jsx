import { useNavigate } from 'react-router-dom'
import './Fidelidade.css'

function Fidelidade({
  usuario,
  pontos,
  pedidos
}) {
  const navigate = useNavigate()

  const proximoNivel = 500
  const pontosAtual = Math.max(
    0,
    Number(pontos) || 0
  )

  const progresso = Math.min(
    (pontosAtual / proximoNivel) * 100,
    100
  )

  const pontosRestantes = Math.max(
    proximoNivel - pontosAtual,
    0
  )

  const pedidosFinalizados = pedidos.filter(
    (pedido) => pedido.status === 'Finalizado'
  )

  if (!usuario) {
    return (
      <main className="pagina-fidelidade">

        <section className="fidelidade-login">

          <div className="icone-fidelidade">
            ⭐
          </div>

          <h1>Programa de Fidelidade</h1>

          <p>
            Entre na sua conta para acompanhar seus pontos
            e benefícios.
          </p>

          <button
            onClick={() => navigate('/login')}
          >
            Entrar na minha conta
          </button>

          <button
            className="botao-secundario-fidelidade"
            onClick={() => navigate('/cadastro')}
          >
            Criar conta
          </button>

        </section>

      </main>
    )
  }

  return (
    <main className="pagina-fidelidade">

      <section className="cabecalho-fidelidade">

        <div>
          <span>⭐</span>

          <h1>Programa de Fidelidade</h1>

          <p>
            Quanto mais você pede, mais você ganha!
          </p>
        </div>

      </section>

      <section className="card-pontos">

        <div className="pontos-principal">

          <span className="icone-pontos">
            ⭐
          </span>

          <div>
            <small>Seus pontos</small>

            <strong>
              {pontosAtual}
            </strong>

            <span>pontos</span>
          </div>

        </div>

        <div className="progresso-fidelidade">

          <div className="topo-progresso">
            <span>
              Próximo nível
            </span>

            <strong>
              {pontosAtual} / {proximoNivel}
            </strong>
          </div>

          <div className="barra-progresso">
            <div
              className="preenchimento-progresso"
              style={{
                width: `${progresso}%`
              }}
            />
          </div>

          {pontosRestantes > 0 ? (
            <p>
              Faltam{' '}
              <strong>
                {pontosRestantes} pontos
              </strong>{' '}
              para alcançar 500 pontos.
            </p>
          ) : (
            <p className="mensagem-nivel-concluido">
              🎉 Você alcançou 500 pontos!
            </p>
          )}

        </div>

      </section>

      <section className="beneficios-fidelidade">

        <h2>
          Como funciona?
        </h2>

        <div className="lista-beneficios">

          <article className="beneficio">

            <span>🛒</span>

            <div>
              <h3>
                Faça seus pedidos
              </h3>

              <p>
                Cada pedido finalizado ajuda você a
                acumular pontos.
              </p>
            </div>

          </article>

          <article className="beneficio">

            <span>⭐</span>

            <div>
              <h3>
                Ganhe pontos
              </h3>

              <p>
                Você ganha 1 ponto para cada R$ 1,00 em
                pedidos finalizados.
              </p>
            </div>

          </article>

          <article className="beneficio">

            <span>🎁</span>

            <div>
              <h3>
                Aproveite benefícios
              </h3>

              <p>
                Acumule pontos e desbloqueie benefícios
                especiais.
              </p>
            </div>

          </article>

        </div>

      </section>

      <section className="historico-fidelidade">

        <div className="titulo-historico">
          <div>
            <h2>
              Histórico
            </h2>

            <p>
              Seus pedidos finalizados.
            </p>
          </div>

          <strong>
            {pedidosFinalizados.length}{' '}
            {pedidosFinalizados.length === 1
              ? 'pedido'
              : 'pedidos'}
          </strong>
        </div>

        {pedidosFinalizados.length === 0 ? (
          <div className="historico-vazio">

            <span>⭐</span>

            <h3>
              Ainda não há pontos acumulados.
            </h3>

            <p>
              Faça seu primeiro pedido e comece a
              acumular pontos!
            </p>

            <button
              onClick={() => navigate('/cardapio')}
            >
              Ver cardápio
            </button>

          </div>
        ) : (
          <div className="lista-historico-fidelidade">

            {[...pedidosFinalizados]
              .reverse()
              .map((pedido) => {

                const pontosPedido =
                  Math.floor(
                    Number(pedido.total || 0)
                  )

                return (
                  <article
                    className="item-historico-fidelidade"
                    key={pedido.numero}
                  >

                    <div className="icone-historico">
                      ⭐
                    </div>

                    <div className="informacoes-historico">

                      <strong>
                        Pedido #{pedido.numero}
                      </strong>

                      <small>
                        {pedido.data}
                      </small>

                    </div>

                    <div className="pontos-ganhos">
                      +{pontosPedido}
                    </div>

                  </article>
                )
              })}

          </div>
        )}

      </section>

    </main>
  )
}

export default Fidelidade