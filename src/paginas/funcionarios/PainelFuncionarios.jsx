// IMPORTANTE: useState vem do React.
import { useState } from 'react'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import './PainelFuncionarios.css'

function PainelFuncionarios({
  pedidos = [],
  alterarStatusPedido,
  fecharPainel,
}) {
  const navigate = useNavigate()
  const [parametros] = useSearchParams()

  // O setor vem do próprio terminal.
  const setorInformado = parametros.get('setor')

  const setoresPermitidos = [
    'Atendimento',
    'Caixa',
    'Preparo',
  ]

  const setorAtualTerminal = setoresPermitidos.includes(setorInformado)
    ? setorInformado
    : ''

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const [funcionarioLogado, setFuncionarioLogado] = useState(() => {
    try {
      const salvo = localStorage.getItem('raizes_funcionario_logado')
      return salvo ? JSON.parse(salvo) : null
    } catch {
      return null
    }
  })

  const nomeSetor = {
    Atendimento: 'Atendimento / Garçom',
    Caixa: 'Caixa',
    Preparo: 'Preparo / Cozinha',
  }

  const formatarData = (data) => {
    if (!data) return '-'

    try {
      return new Date(data).toLocaleString('pt-BR')
    } catch {
      return data
    }
  }

  const formatarPreco = (valor) => {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const obterFuncionarios = () => {
    try {
      const salvos = localStorage.getItem('raizes_funcionarios')
      return salvos ? JSON.parse(salvos) : []
    } catch {
      return []
    }
  }

  const salvarFuncionarios = (funcionarios) => {
    localStorage.setItem(
      'raizes_funcionarios',
      JSON.stringify(funcionarios)
    )
  }

  const voltarParaInicio = () => {
    if (fecharPainel) {
      fecharPainel()
      return
    }

    navigate('/')
  }

  // Encerra a sessão atual e grava a saída no histórico do funcionário.
  const encerrarSessaoFuncionario = () => {
    if (!funcionarioLogado) return

    const funcionarios = obterFuncionarios()
    const agora = new Date().toISOString()

    const atualizados = funcionarios.map((funcionario) => {
      if (funcionario.id !== funcionarioLogado.id) {
        return funcionario
      }

      const historicoAtual = Array.isArray(funcionario.historicoSetores)
        ? funcionario.historicoSetores
        : []

      let historicoNovo = historicoAtual

      if (
        funcionario.setorAtual &&
        funcionario.inicioSessaoAtual
      ) {
        historicoNovo = [
          ...historicoAtual,
          {
            setor: funcionario.setorAtual,
            entrada: funcionario.inicioSessaoAtual,
            saida: agora,
          },
        ]
      }

      return {
        ...funcionario,
        setorAtual: null,
        inicioSessaoAtual: null,
        historicoSetores: historicoNovo,
      }
    })

    salvarFuncionarios(atualizados)
    localStorage.removeItem('raizes_funcionario_logado')

    setFuncionarioLogado(null)
    setEmail('')
    setSenha('')
    setErro('')
  }

  // Login do funcionário no terminal atual.
  const fazerLogin = (event) => {
    event.preventDefault()
    setErro('')

    if (!setorAtualTerminal) {
      setErro('Este terminal não possui um setor configurado.')
      return
    }

    if (!email.trim()) {
      setErro('Digite o e-mail do funcionário.')
      return
    }

    if (!senha.trim()) {
      setErro('Digite a senha do funcionário.')
      return
    }

    setCarregando(true)

    setTimeout(() => {
      const funcionarios = obterFuncionarios()
      const emailDigitado = email.toLowerCase().trim()

      const funcionario = funcionarios.find(
        (item) =>
          item.email?.toLowerCase().trim() === emailDigitado &&
          item.senha === senha
      )

      if (!funcionario) {
        setErro('E-mail ou senha incorretos.')
        setCarregando(false)
        return
      }

      if (!funcionario.ativo) {
        setErro('Seu acesso está desativado. Procure o gerente.')
        setCarregando(false)
        return
      }

      const agora = new Date().toISOString()

      const atualizados = funcionarios.map((item) => {
        if (item.id !== funcionario.id) {
          return item
        }

        const historicoAtual = Array.isArray(item.historicoSetores)
          ? item.historicoSetores
          : []

        let historicoNovo = historicoAtual

        // Se o mesmo funcionário estava em outro terminal/setor,
        // encerramos automaticamente a sessão anterior.
        if (item.setorAtual && item.inicioSessaoAtual) {
          historicoNovo = [
            ...historicoAtual,
            {
              setor: item.setorAtual,
              entrada: item.inicioSessaoAtual,
              saida: agora,
            },
          ]
        }

        return {
          ...item,
          setorAtual: setorAtualTerminal,
          inicioSessaoAtual: agora,
          historicoSetores: historicoNovo,
        }
      })

      salvarFuncionarios(atualizados)

      const funcionarioDaSessao = {
        ...funcionario,
        setorAtual: setorAtualTerminal,
        inicioSessaoAtual: agora,
      }

      localStorage.setItem(
        'raizes_funcionario_logado',
        JSON.stringify(funcionarioDaSessao)
      )

      setFuncionarioLogado(funcionarioDaSessao)
      setSenha('')
      setCarregando(false)
    }, 400)
  }

  // O funcionário passa a operar o pedido sempre usando o setor
  // do terminal, e não simplesmente o setor cadastrado no funcionário.
  const executarAcaoPedido = (pedido, novoStatus) => {
    if (!funcionarioLogado || !alterarStatusPedido) return

    alterarStatusPedido(pedido.numero, novoStatus, {
      id: funcionarioLogado.id,
      nome: funcionarioLogado.nome,
      cargo: funcionarioLogado.cargo,
      setor: setorAtualTerminal,
    })
  }

  // Pedidos que o setor de Preparo pode receber.
  const pedidosPreparo = pedidos.filter(
    (pedido) =>
      pedido.status === 'Recebido' ||
      pedido.status === 'Em preparo'
  )

  // Pedidos que chegaram ao Atendimento.
  const pedidosAtendimento = pedidos.filter(
    (pedido) => pedido.status === 'Pronto'
  )

  // Pedidos úteis para conferência do Caixa.
  const pedidosCaixa = pedidos.filter(
    (pedido) =>
      pedido.status !== 'Finalizado' &&
      pedido.status !== 'Cancelado'
  )

  const renderItensPedido = (pedido) => (
    <div
      style={{
        display: 'grid',
        gap: '6px',
        marginTop: '12px',
      }}
    >
      {(pedido.itens || []).map((item, index) => (
        <div
          key={`${pedido.numero}-${index}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '8px 10px',
            borderRadius: '10px',
            background: '#f8f5ef',
          }}
        >
          <span>
            {item.quantidade || 1}x {item.nome}
          </span>

          <strong>
            {formatarPreco(
              Number(item.preco || 0) * Number(item.quantidade || 1)
            )}
          </strong>
        </div>
      ))}
    </div>
  )

  if (!setorAtualTerminal) {
    return (
      <main className="pagina-funcionario">
        <section className="card-funcionario-login">
          <div className="icone-funcionario">⚠️</div>

          <span className="subtitulo-funcionario">
            TERMINAL NÃO CONFIGURADO
          </span>

          <h1>Setor não identificado</h1>

          <p className="descricao-funcionario">
            Este computador ainda não foi configurado para um setor de trabalho.
          </p>

          <div className="aviso-terminal-funcionario">
            <strong>Configure o terminal com um setor.</strong>
            <span>Exemplos:</span>
            <code>/funcionario?setor=Caixa</code>
            <code>/funcionario?setor=Atendimento</code>
            <code>/funcionario?setor=Preparo</code>
          </div>

          <button
            className="botao-secundario-funcionario"
            onClick={voltarParaInicio}
          >
            ← Voltar
          </button>
        </section>
      </main>
    )
  }

  if (funcionarioLogado) {
    return (
      <main className="pagina-funcionario">
        <section className="painel-operacional-funcionario">
          <header className="cabecalho-operacional">
            <div>
              <span className="subtitulo-funcionario">
                ÁREA OPERACIONAL
              </span>

              <h1>Olá, {funcionarioLogado.nome}!</h1>

              <p>Você está trabalhando no setor:</p>
            </div>

            <div className="setor-atual-funcionario">
              <span>📍</span>
              <strong>{nomeSetor[setorAtualTerminal]}</strong>
            </div>
          </header>

          <div className="status-operacional-funcionario">
            <div className="indicador-online">🟢</div>
            <div>
              <strong>Você está em atividade</strong>
              <span>
                Entrada: {formatarData(funcionarioLogado.inicioSessaoAtual)}
              </span>
            </div>
          </div>

          {/* =================================================
              PREPARO
          ================================================== */}
          {setorAtualTerminal === 'Preparo' && (
            <div className="conteudo-setor-funcionario">
              <div className="card-setor" style={{ width: '100%' }}>
                <div className="icone-setor">👨‍🍳</div>

                <h2>Pedidos para preparo</h2>

                <p>
                  Os pedidos recebidos aparecem aqui. Inicie o preparo e depois
                  marque o pedido como pronto.
                </p>

                {pedidosPreparo.length === 0 ? (
                  <div className="informacao-login-funcionario" style={{ marginTop: '20px' }}>
                    <strong>🍽️ Nenhum pedido aguardando preparo.</strong>
                    <span>Novos pedidos aparecerão automaticamente nesta tela.</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                    {pedidosPreparo.map((pedido) => (
                      <article
                        key={pedido.numero ?? pedido.id}
                        style={{
                          padding: '18px',
                          border: '1px solid #e8e1d8',
                          borderRadius: '16px',
                          background: '#fff',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div>
                            <strong>Pedido #{pedido.numero}</strong>
                            <div style={{ marginTop: '4px' }}>
                              {pedido.clienteNome || 'Cliente'}
                            </div>
                          </div>

                          <strong>{pedido.status}</strong>
                        </div>

                        <p style={{ margin: '10px 0 0' }}>
                          {pedido.tipoEntrega === 'MESA'
                            ? `🍽️ Mesa ${pedido.mesa || '—'}`
                            : pedido.tipoEntrega === 'RETIRADA'
                              ? '🛍️ Retirada'
                              : '🛵 Entrega'}
                        </p>

                        {pedido.observacao && (
                          <p style={{ margin: '8px 0 0' }}>
                            📝 {pedido.observacao}
                          </p>
                        )}

                        {renderItensPedido(pedido)}

                        <div className="acoes-setor" style={{ marginTop: '16px' }}>
                          {pedido.status === 'Recebido' && (
                            <button
                              onClick={() =>
                                executarAcaoPedido(pedido, 'Em preparo')
                              }
                            >
                              ▶️ Iniciar preparo
                            </button>
                          )}

                          {pedido.status === 'Em preparo' && (
                            <button
                              onClick={() =>
                                executarAcaoPedido(pedido, 'Pronto')
                              }
                            >
                              ✅ Marcar como pronto
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              ATENDIMENTO
          ================================================== */}
          {setorAtualTerminal === 'Atendimento' && (
            <div className="conteudo-setor-funcionario">
              <div className="card-setor" style={{ width: '100%' }}>
                <div className="icone-setor">🍽️</div>

                <h2>Pedidos prontos</h2>

                <p>
                  Aqui aparecem os pedidos liberados pelo setor de Preparo.
                </p>

                {pedidosAtendimento.length === 0 ? (
                  <div className="informacao-login-funcionario" style={{ marginTop: '20px' }}>
                    <strong>🍽️ Nenhum pedido pronto no momento.</strong>
                    <span>Quando a cozinha liberar um pedido, ele aparecerá aqui.</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                    {pedidosAtendimento.map((pedido) => (
                      <article
                        key={pedido.numero ?? pedido.id}
                        style={{
                          padding: '18px',
                          border: '1px solid #e8e1d8',
                          borderRadius: '16px',
                          background: '#fff',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div>
                            <strong>Pedido #{pedido.numero}</strong>
                            <div style={{ marginTop: '4px' }}>
                              {pedido.clienteNome || 'Cliente'}
                            </div>
                          </div>

                          <strong>🟢 Pronto</strong>
                        </div>

                        <p style={{ margin: '10px 0 0' }}>
                          {pedido.tipoEntrega === 'MESA'
                            ? `🍽️ Mesa ${pedido.mesa || '—'}`
                            : pedido.tipoEntrega === 'RETIRADA'
                              ? '🛍️ Retirada'
                              : '🛵 Entrega'}
                        </p>

                        {renderItensPedido(pedido)}

                        <div className="acoes-setor" style={{ marginTop: '16px' }}>
                          <button
                            onClick={() =>
                              executarAcaoPedido(pedido, 'Finalizado')
                            }
                          >
                            ✅ Entregar / finalizar pedido
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              CAIXA
          ================================================== */}
          {setorAtualTerminal === 'Caixa' && (
            <div className="conteudo-setor-funcionario">
              <div className="card-setor" style={{ width: '100%' }}>
                <div className="icone-setor">💰</div>

                <h2>Operação do caixa</h2>

                <p>
                  Consulte os pedidos em andamento e a forma de pagamento.
                </p>

                {pedidosCaixa.length === 0 ? (
                  <div className="informacao-login-funcionario" style={{ marginTop: '20px' }}>
                    <strong>💳 Nenhum pedido em andamento.</strong>
                    <span>Não há pedidos aguardando operação do caixa.</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                    {pedidosCaixa.map((pedido) => (
                      <article
                        key={pedido.numero ?? pedido.id}
                        style={{
                          padding: '18px',
                          border: '1px solid #e8e1d8',
                          borderRadius: '16px',
                          background: '#fff',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <strong>Pedido #{pedido.numero}</strong>
                          <strong>{formatarPreco(pedido.total)}</strong>
                        </div>

                        <p style={{ margin: '10px 0 0' }}>
                          💳 Pagamento: {pedido.formaPagamento || 'Não informado'}
                        </p>

                        <p style={{ margin: '6px 0 0' }}>
                          📦 Status: {pedido.status || 'Recebido'}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="informacoes-operacionais">
            <div>
              <span>Funcionário</span>
              <strong>{funcionarioLogado.nome}</strong>
            </div>

            <div>
              <span>Cargo</span>
              <strong>{funcionarioLogado.cargo}</strong>
            </div>

            <div>
              <span>Filial</span>
              <strong>{funcionarioLogado.filial || 'Não definida'}</strong>
            </div>

            <div>
              <span>Setor</span>
              <strong>{nomeSetor[setorAtualTerminal]}</strong>
            </div>
          </div>

          <div className="acoes-operacionais">
            <button
              className="botao-sair-funcionario"
              onClick={encerrarSessaoFuncionario}
            >
              🚪 Encerrar expediente
            </button>

            <button
              className="botao-secundario-funcionario"
              onClick={voltarParaInicio}
            >
              ← Sair da área
            </button>
          </div>
        </section>
      </main>
    )
  }

  // Tela de login.
  return (
    <main className="pagina-funcionario">
      <section className="card-funcionario-login">
        <div className="icone-funcionario">👤</div>

        <span className="subtitulo-funcionario">
          ÁREA OPERACIONAL
        </span>

        <h1>Acesso do funcionário</h1>

        <p className="descricao-funcionario">
          Informe seus dados para iniciar sua atividade neste terminal.
        </p>

        <div className="terminal-identificacao">
          <span>📍 Terminal</span>
          <strong>{nomeSetor[setorAtualTerminal]}</strong>
        </div>

        <form onSubmit={fazerLogin} className="formulario-funcionario">
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="username"
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </label>

          {erro && (
            <div className="erro-funcionario">
              ⚠️ {erro}
            </div>
          )}

          <button
            type="submit"
            className="botao-entrar-funcionario"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar no setor'}
          </button>
        </form>

        <div className="informacao-login-funcionario">
          <strong>Como funciona?</strong>
          <span>Use seu próprio e-mail e senha.</span>
          <span>O setor é definido pelo terminal.</span>
          <span>Sua entrada ficará registrada no sistema.</span>
        </div>

        <button
          className="botao-secundario-funcionario"
          onClick={voltarParaInicio}
        >
          ← Voltar
        </button>
      </section>
    </main>
  )
}

export default PainelFuncionarios