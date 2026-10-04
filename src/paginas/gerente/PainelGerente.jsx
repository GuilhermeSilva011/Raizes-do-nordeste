import { useState } from 'react'
import './PainelGerente.css'

function PainelGerente({
  pedidos = [],
  produtos = [],
  atualizarProdutos,
  alterarStatusPedido,
  sairGerente,
}) {
  /* =========================================================
     CONTROLE DO PAINEL
  ========================================================= */

  const [abaAtiva, setAbaAtiva] =
    useState('dashboard')

  const [mensagem, setMensagem] =
    useState('')

  const [
    filialMonitoradaId,
    setFilialMonitoradaId
  ] = useState(null)

  /* =========================================================
     FILIAIS
  ========================================================= */

  const [filiais, setFiliais] =
    useState(() => {
      try {
        const salvas =
          localStorage.getItem(
            'raizes_filiais'
          )

        if (salvas) {
          const dados =
            JSON.parse(salvas)

          if (Array.isArray(dados)) {
            return dados
          }
        }
      } catch (erro) {
        console.error(
          'Erro ao carregar filiais:',
          erro
        )
      }

      return [
        {
          id: 1,
          nome:
            'Raízes do Nordeste - Matriz',
          cidade: 'Centro',
          estado: '',
          ativa: true,
        },
      ]
    })

  const [novaFilial, setNovaFilial] =
    useState({
      nome: '',
      cidade: '',
      estado: '',
    })

  /* =========================================================
     FUNCIONÁRIOS
  ========================================================= */

  const [
    funcionarios,
    setFuncionarios
  ] = useState(() => {
    try {
      const salvos =
        localStorage.getItem(
          'raizes_funcionarios'
        )

      if (salvos) {
        const dados =
          JSON.parse(salvos)

        if (Array.isArray(dados)) {
          return dados
        }
      }
    } catch (erro) {
      console.error(
        'Erro ao carregar funcionários:',
        erro
      )
    }

    return []
  })

  const [
    novoFuncionario,
    setNovoFuncionario
  ] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: 'Atendente',
    setor: 'Atendimento',
    filial: '',
  })

  /* =========================================================
     PRODUTOS
  ========================================================= */

  const [
    novoProduto,
    setNovoProduto
  ] = useState({
    nome: '',
    categoria: 'CUSCUZ',
    preco: '',
    descricao: '',
    imagem: '',
  })

  /* =========================================================
     MENSAGEM
  ========================================================= */

  function mostrarMensagem(texto) {
    setMensagem(texto)

    window.setTimeout(() => {
      setMensagem('')
    }, 3000)
  }

  /* =========================================================
     SALVAR FILIAIS
  ========================================================= */

  function salvarFiliais(
    novasFiliais
  ) {
    setFiliais(novasFiliais)

    localStorage.setItem(
      'raizes_filiais',
      JSON.stringify(novasFiliais)
    )
  }

  /* =========================================================
     SALVAR FUNCIONÁRIOS
  ========================================================= */

  function salvarFuncionarios(
    novosFuncionarios
  ) {
    setFuncionarios(
      novosFuncionarios
    )

    localStorage.setItem(
      'raizes_funcionarios',
      JSON.stringify(
        novosFuncionarios
      )
    )
  }

  /* =========================================================
     CADASTRAR FILIAL
  ========================================================= */

  function cadastrarFilial() {
    if (!novaFilial.nome.trim()) {
      mostrarMensagem(
        'Digite o nome da filial.'
      )

      return
    }

    if (!novaFilial.cidade.trim()) {
      mostrarMensagem(
        'Digite a cidade da filial.'
      )

      return
    }

    if (!novaFilial.estado.trim()) {
      mostrarMensagem(
        'Digite o estado da filial.'
      )

      return
    }

    const filial = {
      id: Date.now(),

      nome:
        novaFilial.nome.trim(),

      cidade:
        novaFilial.cidade.trim(),

      estado:
        novaFilial.estado
          .trim()
          .toUpperCase(),

      ativa: true,
    }

    salvarFiliais([
      ...filiais,
      filial,
    ])

    setNovaFilial({
      nome: '',
      cidade: '',
      estado: '',
    })

    mostrarMensagem(
      'Filial cadastrada com sucesso!'
    )
  }

  /* =========================================================
     ATIVAR / DESATIVAR FILIAL
  ========================================================= */

  function alterarStatusFilial(id) {
    const atualizadas =
      filiais.map(
        (filial) =>
          String(filial.id) ===
          String(id)
            ? {
                ...filial,
                ativa:
                  !filial.ativa,
              }
            : filial
      )

    salvarFiliais(atualizadas)
  }

  /* =========================================================
     CADASTRAR FUNCIONÁRIO
  ========================================================= */

  function cadastrarFuncionario() {
    if (
      !novoFuncionario.nome.trim()
    ) {
      mostrarMensagem(
        'Digite o nome do funcionário.'
      )

      return
    }

    if (
      !novoFuncionario.email.trim()
    ) {
      mostrarMensagem(
        'Digite o e-mail do funcionário.'
      )

      return
    }

    if (
      !novoFuncionario.senha.trim()
    ) {
      mostrarMensagem(
        'Digite uma senha.'
      )

      return
    }

    if (
      novoFuncionario.senha
        .trim()
        .length < 4
    ) {
      mostrarMensagem(
        'A senha precisa ter pelo menos 4 caracteres.'
      )

      return
    }

    if (!novoFuncionario.filial) {
      mostrarMensagem(
        'Selecione uma filial.'
      )

      return
    }

    const emailExiste =
      funcionarios.some(
        (funcionario) =>
          funcionario.email
            ?.trim()
            .toLowerCase() ===
          novoFuncionario.email
            .trim()
            .toLowerCase()
      )

    if (emailExiste) {
      mostrarMensagem(
        'Já existe um funcionário com este e-mail.'
      )

      return
    }

    const filialSelecionada =
      filiais.find(
        (filial) =>
          String(filial.id) ===
          String(
            novoFuncionario.filial
          )
      )

    const funcionario = {
      id: Date.now(),

      nome:
        novoFuncionario.nome.trim(),

      email:
        novoFuncionario.email
          .trim()
          .toLowerCase(),

      senha:
        novoFuncionario.senha,

      cargo:
        novoFuncionario.cargo,

      setor:
        novoFuncionario.setor,

      filial:
        novoFuncionario.filial,

      filialId:
        filialSelecionada?.id ??
        novoFuncionario.filial,

      filialNome:
        filialSelecionada?.nome ??
        '',

      ativo: true,

      setorAtual: '',
    }

    salvarFuncionarios([
      ...funcionarios,
      funcionario,
    ])

    setNovoFuncionario({
      nome: '',
      email: '',
      senha: '',
      cargo: 'Atendente',
      setor: 'Atendimento',
      filial: '',
    })

    mostrarMensagem(
      'Funcionário cadastrado com sucesso!'
    )
  }

  /* =========================================================
     ATIVAR / DESATIVAR FUNCIONÁRIO
  ========================================================= */

  function alterarStatusFuncionario(
    id
  ) {
    const atualizados =
      funcionarios.map(
        (funcionario) =>
          String(funcionario.id) ===
          String(id)
            ? {
                ...funcionario,
                ativo:
                  !funcionario.ativo,
              }
            : funcionario
      )

    salvarFuncionarios(
      atualizados
    )
  }

  /* =========================================================
     EXCLUIR FUNCIONÁRIO
  ========================================================= */

  function excluirFuncionario(id) {
    const confirmar =
      window.confirm(
        'Deseja excluir este funcionário?'
      )

    if (!confirmar) {
      return
    }

    const atualizados =
      funcionarios.filter(
        (funcionario) =>
          String(funcionario.id) !==
          String(id)
      )

    salvarFuncionarios(
      atualizados
    )

    mostrarMensagem(
      'Funcionário excluído.'
    )
  }

  /* =========================================================
     CADASTRAR PRODUTO
  ========================================================= */

  function cadastrarProduto() {
    if (!novoProduto.nome.trim()) {
      mostrarMensagem(
        'Digite o nome do produto.'
      )

      return
    }

    if (
      !novoProduto.preco ||
      Number(novoProduto.preco) <= 0
    ) {
      mostrarMensagem(
        'Digite um preço válido.'
      )

      return
    }

    const produto = {
      id: Date.now(),

      nome:
        novoProduto.nome.trim(),

      categoria:
        novoProduto.categoria,

      preco:
        Number(
          novoProduto.preco
        ),

      descricao:
        novoProduto.descricao.trim(),

      imagem:
        novoProduto.imagem.trim(),
    }

    if (
      typeof atualizarProdutos ===
      'function'
    ) {
      atualizarProdutos([
        ...produtos,
        produto,
      ])
    }

    setNovoProduto({
      nome: '',
      categoria: 'CUSCUZ',
      preco: '',
      descricao: '',
      imagem: '',
    })

    mostrarMensagem(
      'Produto cadastrado com sucesso!'
    )
  }

  /* =========================================================
     EXCLUIR PRODUTO
  ========================================================= */

  function excluirProduto(id) {
    const confirmar =
      window.confirm(
        'Deseja excluir este produto?'
      )

    if (!confirmar) {
      return
    }

    if (
      typeof atualizarProdutos ===
      'function'
    ) {
      atualizarProdutos(
        produtos.filter(
          (produto) =>
            String(produto.id) !==
            String(id)
        )
      )
    }

    mostrarMensagem(
      'Produto excluído.'
    )
  }

  /* =========================================================
     CANCELAR PEDIDO
  ========================================================= */

  function cancelarPedido(pedido) {
    if (
      pedido.status ===
        'Finalizado' ||
      pedido.status ===
        'Cancelado'
    ) {
      return
    }

    const confirmar =
      window.confirm(
        `Deseja cancelar o pedido #${pedido.numero}?`
      )

    if (!confirmar) {
      return
    }

    if (
      typeof alterarStatusPedido ===
      'function'
    ) {
      alterarStatusPedido(
        pedido.numero,
        'Cancelado',
        {
          id: null,
          nome: 'Gerente',
          cargo: 'Gerente',
          setor: 'Gerência',
        }
      )
    }

    mostrarMensagem(
      `Pedido #${pedido.numero} cancelado.`
    )
  }

  /* =========================================================
     FORMATAÇÕES
  ========================================================= */

  function formatarPreco(valor) {
    return Number(
      valor || 0
    ).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )
  }

  function formatarData(data) {
    if (!data) {
      return '-'
    }

    const dataConvertida =
      new Date(data)

    if (
      Number.isNaN(
        dataConvertida.getTime()
      )
    ) {
      return String(data)
    }

    return dataConvertida
      .toLocaleString('pt-BR')
  }

  /* =========================================================
     RESUMO GERAL
  ========================================================= */

  const pedidosPendentes =
    pedidos.filter(
      (pedido) =>
        pedido.status !==
          'Finalizado' &&
        pedido.status !==
          'Cancelado'
    )

  const pedidosFinalizados =
    pedidos.filter(
      (pedido) =>
        pedido.status ===
        'Finalizado'
    )

  const pedidosCancelados =
    pedidos.filter(
      (pedido) =>
        pedido.status ===
        'Cancelado'
    )

  const faturamentoGeral =
    pedidosFinalizados.reduce(
      (total, pedido) =>
        total +
        Number(
          pedido.total ??
            pedido.valorTotal ??
            0
        ),
      0
    )

  /* =========================================================
     FILIAL MONITORADA
  ========================================================= */

  const filialMonitorada =
    filiais.find(
      (filial) =>
        String(filial.id) ===
        String(filialMonitoradaId)
    ) || null

  /* =========================================================
     VERIFICAR FILIAL DO FUNCIONÁRIO
  ========================================================= */

  function funcionarioPertenceFilial(
    funcionario,
    filial
  ) {
    if (!funcionario || !filial) {
      return false
    }

    const referencias = [
      funcionario.filialId,
      funcionario.filial,
      funcionario.filialNome,
    ]
      .filter(
        (valor) =>
          valor !== undefined &&
          valor !== null
      )
      .map(
        (valor) =>
          String(valor)
            .trim()
            .toLowerCase()
      )

    return (
      referencias.includes(
        String(filial.id)
          .trim()
          .toLowerCase()
      ) ||
      referencias.includes(
        String(filial.nome)
          .trim()
          .toLowerCase()
      )
    )
  }

  /* =========================================================
     VERIFICAR FILIAL DO PEDIDO
  ========================================================= */

  function pedidoPertenceFilial(
    pedido,
    filial
  ) {
    if (!pedido || !filial) {
      return false
    }

    if (
      pedido.filialId !==
        undefined &&
      pedido.filialId !== null
    ) {
      return (
        String(pedido.filialId) ===
        String(filial.id)
      )
    }

    const nomePedido =
      pedido.filialNome ||
      pedido.filial

    if (nomePedido) {
      return (
        String(nomePedido)
          .trim()
          .toLowerCase() ===
        String(filial.nome)
          .trim()
          .toLowerCase()
      )
    }

    if (filiais.length === 1) {
      return (
        String(filial.id) ===
        String(filiais[0].id)
      )
    }

    return false
  }

  /* =========================================================
     DADOS DA FILIAL
  ========================================================= */

  const pedidosDaFilial =
    filialMonitorada
      ? pedidos.filter(
          (pedido) =>
            pedidoPertenceFilial(
              pedido,
              filialMonitorada
            )
        )
      : []

  const funcionariosDaFilial =
    filialMonitorada
      ? funcionarios.filter(
          (funcionario) =>
            funcionarioPertenceFilial(
              funcionario,
              filialMonitorada
            )
        )
      : []

  const funcionariosAtivosDaFilial =
    funcionariosDaFilial.filter(
      (funcionario) =>
        funcionario.ativo !== false
    )

  const funcionariosInativosDaFilial =
    funcionariosDaFilial.filter(
      (funcionario) =>
        funcionario.ativo === false
    )

  const funcionariosEmAtividadeDaFilial =
    funcionariosDaFilial.filter(
      (funcionario) =>
        funcionario.ativo !== false &&
        Boolean(
          funcionario.setorAtual
        )
    )

  const pedidosEmAndamentoDaFilial =
    pedidosDaFilial.filter(
      (pedido) =>
        pedido.status !==
          'Finalizado' &&
        pedido.status !==
          'Cancelado'
    )

  const pedidosFinalizadosDaFilial =
    pedidosDaFilial.filter(
      (pedido) =>
        pedido.status ===
        'Finalizado'
    )

  const pedidosCanceladosDaFilial =
    pedidosDaFilial.filter(
      (pedido) =>
        pedido.status ===
        'Cancelado'
    )

  const faturamentoDaFilial =
    pedidosFinalizadosDaFilial.reduce(
      (total, pedido) =>
        total +
        Number(
          pedido.total ??
            pedido.valorTotal ??
            0
        ),
      0
    )

  const ticketMedioDaFilial =
    pedidosFinalizadosDaFilial.length >
    0
      ? faturamentoDaFilial /
        pedidosFinalizadosDaFilial.length
      : 0

  /* =========================================================
     RANKING DOS PRODUTOS
  ========================================================= */

  const rankingProdutos = (() => {
    if (!filialMonitorada) {
      return []
    }

    const ranking = {}

    pedidosDaFilial
      .filter(
        (pedido) =>
          pedido.status !==
          'Cancelado'
      )
      .forEach((pedido) => {
        const itens =
          pedido.itens ||
          pedido.produtos ||
          pedido.carrinho ||
          []

        if (!Array.isArray(itens)) {
          return
        }

        itens.forEach((item) => {
          const produto =
            item.produto || item

          const id =
            produto.id ??
            item.produtoId ??
            produto.nome ??
            item.nome ??
            'produto'

          const nome =
            produto.nome ||
            item.nome ||
            'Produto'

          const quantidade =
            Number(
              item.quantidade ??
                produto.quantidade ??
                1
            )

          const preco =
            Number(
              item.preco ??
                produto.preco ??
                0
            )

          const imagem =
            produto.imagem ||
            item.imagem ||
            ''

          const chave =
            String(id)

          if (!ranking[chave]) {
            ranking[chave] = {
              id,
              nome,
              quantidade: 0,
              faturamento: 0,
              imagem,
            }
          }

          ranking[chave].quantidade +=
            quantidade

          ranking[chave].faturamento +=
            preco * quantidade
        })
      })

    return Object.values(
      ranking
    ).sort(
      (
        produtoA,
        produtoB
      ) =>
        produtoB.quantidade -
        produtoA.quantidade
    )
  })()

  const produtoMaisPedido =
    rankingProdutos.length > 0
      ? rankingProdutos[0]
      : null

  const topProdutos =
    rankingProdutos.slice(0, 5)

  /* =========================================================
     PEDIDOS RECENTES
  ========================================================= */

  const pedidosRecentesDaFilial =
    [...pedidosDaFilial]
      .sort((a, b) => {
        const dataA =
          new Date(
            a.criadoEm ||
              a.dataPedido ||
              a.data ||
              0
          ).getTime()

        const dataB =
          new Date(
            b.criadoEm ||
              b.dataPedido ||
              b.data ||
              0
          ).getTime()

        return dataB - dataA
      })
      .slice(0, 8)

  /* =========================================================
     CONTADORES
  ========================================================= */

  function quantidadePedidosFilial(
    filial
  ) {
    return pedidos.filter(
      (pedido) =>
        pedidoPertenceFilial(
          pedido,
          filial
        )
    ).length
  }

  function quantidadeFuncionariosFilial(
    filial
  ) {
    return funcionarios.filter(
      (funcionario) =>
        funcionarioPertenceFilial(
          funcionario,
          filial
        )
    ).length
  }

  /* =========================================================
     MENU
  ========================================================= */

  const itensMenu = [
    {
      id: 'dashboard',
      icone: '📊',
      texto: 'Dashboard',
    },
    {
      id: 'pedidos',
      icone: '🧾',
      texto: 'Pedidos',
    },
    {
      id: 'produtos',
      icone: '🍽️',
      texto: 'Produtos',
    },
    {
      id: 'filiais',
      icone: '🏪',
      texto: 'Filiais',
    },
    {
      id: 'funcionarios',
      icone: '👥',
      texto: 'Funcionários',
    },
  ]

  /* =========================================================
     RENDERIZAÇÃO
  ========================================================= */

  return (
    <div className="pagina-gerente">

      {/* =====================================================
          MENU LATERAL
      ====================================================== */}

      <aside className="menu-gerente">

        <div className="marca-gerente">
          <span className="icone-marca-gerente">
            🌵
          </span>

          <div>
            <strong>
              Raízes
            </strong>

            <small>
              do Nordeste
            </small>
          </div>
        </div>

        <div className="identificacao-gerente">
          <span>
            PAINEL ADMINISTRATIVO
          </span>

          <strong>
            Gerente
          </strong>
        </div>

        <nav className="navegacao-gerente">
          {itensMenu.map(
            (item) => (
              <button
                key={item.id}
                type="button"
                className={
                  abaAtiva === item.id
                    ? 'ativo'
                    : ''
                }
                onClick={() => {
                  setAbaAtiva(
                    item.id
                  )

                  if (
                    item.id !==
                    'filiais'
                  ) {
                    setFilialMonitoradaId(
                      null
                    )
                  }
                }}
              >
                <span>
                  {item.icone}
                </span>

                {item.texto}
              </button>
            )
          )}
        </nav>

        <button
          type="button"
          className="botao-sair-gerente"
          onClick={sairGerente}
        >
          🚪 Sair
        </button>

      </aside>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}

      <main className="conteudo-gerente">

        {mensagem && (
          <div className="mensagem-gerente">
            {mensagem}
          </div>
        )}

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        {abaAtiva ===
          'dashboard' && (
          <section>

            <div className="titulo-secao-gerente">
              <div>
                <span className="etiqueta-secao">
                  VISÃO GERAL
                </span>

                <h2>
                  Dashboard
                </h2>

                <p>
                  Acompanhe os principais
                  números do Raízes do
                  Nordeste.
                </p>
              </div>
            </div>

            <div className="cards-dashboard">

              <div className="card-dashboard">
                <span>
                  🧾
                </span>

                <strong>
                  {pedidos.length}
                </strong>

                <p>
                  Pedidos
                </p>
              </div>

              <div className="card-dashboard">
                <span>
                  ⏳
                </span>

                <strong>
                  {
                    pedidosPendentes.length
                  }
                </strong>

                <p>
                  Em andamento
                </p>
              </div>

              <div className="card-dashboard">
                <span>
                  ✅
                </span>

                <strong>
                  {
                    pedidosFinalizados.length
                  }
                </strong>

                <p>
                  Finalizados
                </p>
              </div>

              <div className="card-dashboard">
                <span>
                  ❌
                </span>

                <strong>
                  {
                    pedidosCancelados.length
                  }
                </strong>

                <p>
                  Cancelados
                </p>
              </div>

              <div className="card-dashboard">
                <span>
                  💰
                </span>

                <strong>
                  {formatarPreco(
                    faturamentoGeral
                  )}
                </strong>

                <p>
                  Faturamento
                </p>
              </div>

              <div className="card-dashboard">
                <span>
                  🏪
                </span>

                <strong>
                  {filiais.length}
                </strong>

                <p>
                  Filiais
                </p>
              </div>

              <div className="card-dashboard">
                <span>
                  👥
                </span>

                <strong>
                  {
                    funcionarios.length
                  }
                </strong>

                <p>
                  Funcionários
                </p>
              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            PEDIDOS
        =================================================== */}

        {abaAtiva ===
          'pedidos' && (
          <section>

            <div className="titulo-secao-gerente">

              <div>
                <span className="etiqueta-secao">
                  ACOMPANHAMENTO
                </span>

                <h2>
                  Pedidos
                </h2>

                <p>
                  Acompanhe os pedidos
                  realizados.
                </p>
              </div>

              <div className="indicador-pedidos">
                <strong>
                  {pedidos.length}
                </strong>

                <span>
                  pedidos
                </span>
              </div>

            </div>

            <div className="lista-completa-pedidos">

              {pedidos.length ===
              0 ? (
                <div className="estado-vazio-gerente">

                  <span>
                    🧾
                  </span>

                  <h3>
                    Nenhum pedido
                  </h3>

                  <p>
                    Os pedidos aparecerão
                    aqui.
                  </p>

                </div>
              ) : (
                pedidos.map(
                  (pedido) => (
                    <article
                      className="pedido-gerente"
                      key={
                        pedido.id ||
                        pedido.numero
                      }
                    >

                      <div className="cabecalho-pedido-gerente">

                        <div>

                          <span className="numero-pedido">
                            PEDIDO #
                            {pedido.numero}
                          </span>

                          <h3>
                            {pedido
                              .cliente
                              ?.nome ||
                              pedido.nomeCliente ||
                              pedido.clienteNome ||
                              'Cliente'}
                          </h3>

                          <small>
                            🏪{' '}
                            {pedido.filialNome ||
                              pedido.filial ||
                              'Filial não informada'}
                          </small>

                          <small>
                            {formatarData(
                              pedido.criadoEm ||
                                pedido.dataPedido ||
                                pedido.data
                            )}
                          </small>

                        </div>

                        <strong className="valor-pedido-gerente">
                          {formatarPreco(
                            pedido.total ??
                              pedido.valorTotal
                          )}
                        </strong>

                      </div>

                      <div className="acoes-pedido-gerente">

                        <strong>
                          {pedido.status ||
                            'Recebido'}
                        </strong>

                        {pedido.setorAtual && (
                          <span>
                            📍{' '}
                            {
                              pedido.setorAtual
                            }
                          </span>
                        )}

                        {pedido
                          .funcionarioAtual
                          ?.nome && (
                          <small>
                            👤{' '}
                            {
                              pedido
                                .funcionarioAtual
                                .nome
                            }
                          </small>
                        )}

                        {pedido.status !==
                          'Finalizado' &&
                          pedido.status !==
                            'Cancelado' && (
                            <button
                              type="button"
                              onClick={() =>
                                cancelarPedido(
                                  pedido
                                )
                              }
                            >
                              Cancelar
                            </button>
                          )}

                      </div>

                    </article>
                  )
                )
              )}

            </div>

          </section>
        )}

        {/* ===================================================
            PRODUTOS
        =================================================== */}

        {abaAtiva ===
          'produtos' && (
          <section>

            <div className="titulo-secao-gerente">

              <div>
                <span className="etiqueta-secao">
                  CARDÁPIO
                </span>

                <h2>
                  Produtos
                </h2>

                <p>
                  Gerencie os produtos do
                  cardápio.
                </p>
              </div>

            </div>

            <div className="formulario-produto-gerente">

              <h3>
                Cadastrar produto
              </h3>

              <div className="grade-formulario-gerente">

                <label>
                  Nome

                  <input
                    type="text"
                    value={
                      novoProduto.nome
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoProduto({
                        ...novoProduto,
                        nome:
                          evento.target
                            .value,
                      })
                    }
                  />
                </label>

                <label>
                  Categoria

                  <select
                    value={
                      novoProduto.categoria
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoProduto({
                        ...novoProduto,
                        categoria:
                          evento.target
                            .value,
                      })
                    }
                  >
                    <option value="CUSCUZ">
                      Cuscuz
                    </option>

                    <option value="TAPIOCA">
                      Tapioca
                    </option>

                    <option value="CAFÉ">
                      Café
                    </option>

                    <option value="BOLOS">
                      Bolos
                    </option>

                    <option value="BEBIDAS">
                      Bebidas
                    </option>
                  </select>
                </label>

                <label>
                  Preço

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      novoProduto.preco
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoProduto({
                        ...novoProduto,
                        preco:
                          evento.target
                            .value,
                      })
                    }
                  />
                </label>

                <label>
                  Imagem

                  <input
                    type="text"
                    value={
                      novoProduto.imagem
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoProduto({
                        ...novoProduto,
                        imagem:
                          evento.target
                            .value,
                      })
                    }
                    placeholder="URL da imagem"
                  />
                </label>

              </div>

              <label className="campo-descricao-gerente">
                Descrição

                <textarea
                  value={
                    novoProduto.descricao
                  }
                  onChange={(
                    evento
                  ) =>
                    setNovoProduto({
                      ...novoProduto,
                      descricao:
                        evento.target
                          .value,
                    })
                  }
                />
              </label>

              <button
                type="button"
                className="botao-principal-gerente"
                onClick={
                  cadastrarProduto
                }
              >
                ➕ Cadastrar produto
              </button>

            </div>

            <div className="lista-produtos-gerente">

              {produtos.length === 0 ? (
                <div className="estado-vazio-gerente">

                  <span>
                    🍽️
                  </span>

                  <h3>
                    Nenhum produto
                  </h3>

                  <p>
                    Cadastre o primeiro
                    produto do cardápio.
                  </p>

                </div>
              ) : (
                produtos.map(
                  (produto) => (
                    <article
                      className="card-produto-gerente"
                      key={
                        produto.id
                      }
                    >

                      {produto.imagem ? (
                        <img
                          src={
                            produto.imagem
                          }
                          alt={
                            produto.nome
                          }
                        />
                      ) : (
                        <div className="imagem-produto-vazia">
                          🍽️
                        </div>
                      )}

                      <div>

                        <span>
                          {
                            produto.categoria
                          }
                        </span>

                        <h3>
                          {produto.nome}
                        </h3>

                        <p>
                          {
                            produto.descricao
                          }
                        </p>

                        <strong>
                          {formatarPreco(
                            produto.preco
                          )}
                        </strong>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          excluirProduto(
                            produto.id
                          )
                        }
                      >
                        🗑️ Excluir
                      </button>

                    </article>
                  )
                )
              )}

            </div>

          </section>
        )}

        {/* ===================================================
            FILIAIS
        =================================================== */}

        {abaAtiva ===
          'filiais' &&
          !filialMonitorada && (
            <section>

              <div className="titulo-secao-gerente">

                <div>

                  <span className="etiqueta-secao">
                    UNIDADES
                  </span>

                  <h2>
                    Filiais
                  </h2>

                  <p>
                    Cadastre e monitore
                    cada unidade do Raízes
                    do Nordeste.
                  </p>

                </div>

                <div className="indicador-pedidos">

                  <strong>
                    {filiais.length}
                  </strong>

                  <span>
                    unidades
                  </span>

                </div>

              </div>

              <div className="formulario-produto-gerente">

                <h3>
                  Cadastrar nova filial
                </h3>

                <div className="grade-formulario-gerente">

                  <label>
                    Nome da filial

                    <input
                      type="text"
                      value={
                        novaFilial.nome
                      }
                      onChange={(
                        evento
                      ) =>
                        setNovaFilial({
                          ...novaFilial,
                          nome:
                            evento.target
                              .value,
                        })
                      }
                      placeholder="Ex.: Raízes do Nordeste - Centro"
                    />
                  </label>

                  <label>
                    Cidade

                    <input
                      type="text"
                      value={
                        novaFilial.cidade
                      }
                      onChange={(
                        evento
                      ) =>
                        setNovaFilial({
                          ...novaFilial,
                          cidade:
                            evento.target
                              .value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Estado

                    <input
                      type="text"
                      maxLength="2"
                      value={
                        novaFilial.estado
                      }
                      onChange={(
                        evento
                      ) =>
                        setNovaFilial({
                          ...novaFilial,
                          estado:
                            evento.target
                              .value
                              .toUpperCase(),
                        })
                      }
                    />
                  </label>

                </div>

                <button
                  type="button"
                  className="botao-principal-gerente"
                  onClick={
                    cadastrarFilial
                  }
                >
                  ➕ Cadastrar filial
                </button>

              </div>

              <div className="lista-filiais-gerente">

                {filiais.map(
                  (filial) => (
                    <article
                      className="card-filial-gerente"
                      key={
                        filial.id
                      }
                    >

                      <div className="icone-filial-gerente">
                        🏪
                      </div>

                      <div className="informacoes-filial-gerente">

                        <span>
                          FILIAL
                        </span>

                        <h3>
                          {
                            filial.nome
                          }
                        </h3>

                        <p>
                          📍{' '}
                          {
                            filial.cidade
                          }

                          {filial.estado
                            ? ` - ${filial.estado}`
                            : ''}
                        </p>

                        <small>
                          🧾{' '}
                          {quantidadePedidosFilial(
                            filial
                          )}{' '}
                          pedido(s)
                          {' • '}
                          👥{' '}
                          {quantidadeFuncionariosFilial(
                            filial
                          )}{' '}
                          funcionário(s)
                        </small>

                      </div>

                      <div className="acoes-filial-gerente">

                        <span
                          className={
                            filial.ativa
                              ? 'status-ativo'
                              : 'status-inativo'
                          }
                        >
                          {filial.ativa
                            ? '● Ativa'
                            : '● Inativa'}
                        </span>

                        <button
                          type="button"
                          className="botao-monitorar-filial"
                          onClick={() =>
                            setFilialMonitoradaId(
                              filial.id
                            )
                          }
                        >
                          📊 Monitorar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            alterarStatusFilial(
                              filial.id
                            )
                          }
                        >
                          {filial.ativa
                            ? 'Desativar'
                            : 'Ativar'}
                        </button>

                      </div>

                    </article>
                  )
                )}

              </div>

            </section>
          )}

        {/* ===================================================
            MONITORAMENTO DA FILIAL
        =================================================== */}

        {abaAtiva ===
          'filiais' &&
          filialMonitorada && (
            <section className="monitoramento-filial">

              <div className="topo-monitoramento-filial">

                <button
                  type="button"
                  className="botao-voltar-filiais"
                  onClick={() =>
                    setFilialMonitoradaId(
                      null
                    )
                  }
                >
                  ← Voltar para filiais
                </button>

                <div className="cabecalho-monitoramento-filial">

                  <div className="icone-monitoramento-filial">
                    🏪
                  </div>

                  <div>

                    <span>
                      MONITORAMENTO DA
                      UNIDADE
                    </span>

                    <h2>
                      {
                        filialMonitorada.nome
                      }
                    </h2>

                    <p>
                      📍{' '}
                      {
                        filialMonitorada.cidade
                      }

                      {filialMonitorada.estado
                        ? ` - ${filialMonitorada.estado}`
                        : ''}
                    </p>

                  </div>

                  <span
                    className={
                      filialMonitorada.ativa
                        ? 'status-ativo'
                        : 'status-inativo'
                    }
                  >
                    {filialMonitorada.ativa
                      ? '● Unidade ativa'
                      : '● Unidade inativa'}
                  </span>

                </div>

              </div>

              <div className="cards-dashboard cards-monitoramento-filial">

                <div className="card-dashboard">
                  <span>
                    🧾
                  </span>

                  <strong>
                    {
                      pedidosDaFilial.length
                    }
                  </strong>

                  <p>
                    Total de pedidos
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    ⏳
                  </span>

                  <strong>
                    {
                      pedidosEmAndamentoDaFilial.length
                    }
                  </strong>

                  <p>
                    Em andamento
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    ✅
                  </span>

                  <strong>
                    {
                      pedidosFinalizadosDaFilial.length
                    }
                  </strong>

                  <p>
                    Finalizados
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    ❌
                  </span>

                  <strong>
                    {
                      pedidosCanceladosDaFilial.length
                    }
                  </strong>

                  <p>
                    Cancelados
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    💰
                  </span>

                  <strong>
                    {formatarPreco(
                      faturamentoDaFilial
                    )}
                  </strong>

                  <p>
                    Faturamento
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    🎫
                  </span>

                  <strong>
                    {formatarPreco(
                      ticketMedioDaFilial
                    )}
                  </strong>

                  <p>
                    Ticket médio
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    👥
                  </span>

                  <strong>
                    {
                      funcionariosDaFilial.length
                    }
                  </strong>

                  <p>
                    Funcionários
                  </p>
                </div>

                <div className="card-dashboard">
                  <span>
                    🟢
                  </span>

                  <strong>
                    {
                      funcionariosAtivosDaFilial.length
                    }
                  </strong>

                  <p>
                    Funcionários ativos
                  </p>
                </div>

              </div>

              <div className="grade-monitoramento-filial">

                <article className="bloco-monitoramento-filial destaque-produto-filial">

                  <div className="titulo-bloco-monitoramento">

                    <div>
                      <span>
                        DESTAQUE
                      </span>

                      <h3>
                        🏆 Produto mais
                        pedido
                      </h3>
                    </div>

                  </div>

                  {produtoMaisPedido ? (
                    <div className="produto-campeao-filial">

                      <div className="icone-produto-campeao">

                        {produtoMaisPedido.imagem ? (
                          <img
                            src={
                              produtoMaisPedido.imagem
                            }
                            alt={
                              produtoMaisPedido.nome
                            }
                          />
                        ) : (
                          <span>
                            🍽️
                          </span>
                        )}

                      </div>

                      <div>

                        <span className="etiqueta-campeao">
                          MAIS VENDIDO
                        </span>

                        <h3>
                          {
                            produtoMaisPedido.nome
                          }
                        </h3>

                        <strong>
                          {
                            produtoMaisPedido.quantidade
                          }{' '}
                          unidade(s)
                        </strong>

                        <p>
                          Receita estimada:{' '}
                          {formatarPreco(
                            produtoMaisPedido.faturamento
                          )}
                        </p>

                      </div>

                    </div>
                  ) : (
                    <div className="estado-vazio-monitoramento">

                      <span>
                        🍽️
                      </span>

                      <p>
                        Ainda não há
                        produtos vendidos
                        nesta unidade.
                      </p>

                    </div>
                  )}

                </article>

                <article className="bloco-monitoramento-filial">

                  <div className="titulo-bloco-monitoramento">

                    <div>

                      <span>
                        RANKING
                      </span>

                      <h3>
                        🔥 Produtos mais
                        pedidos
                      </h3>

                    </div>

                  </div>

                  {topProdutos.length >
                  0 ? (
                    <div className="ranking-produtos-filial">

                      {topProdutos.map(
                        (
                          produto,
                          indice
                        ) => (
                          <div
                            className="item-ranking-produto"
                            key={
                              produto.id ||
                              produto.nome
                            }
                          >

                            <strong className="posicao-ranking">
                              {
                                indice +
                                1
                              }
                              º
                            </strong>

                            <div>

                              <h4>
                                {
                                  produto.nome
                                }
                              </h4>

                              <small>
                                {formatarPreco(
                                  produto.faturamento
                                )}{' '}
                                em vendas
                              </small>

                            </div>

                            <span>
                              {
                                produto.quantidade
                              }{' '}
                              un.
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="estado-vazio-monitoramento">

                      <p>
                        Sem vendas para
                        gerar o ranking.
                      </p>

                    </div>
                  )}

                </article>

              </div>

              <article className="bloco-monitoramento-filial">

                <div className="titulo-bloco-monitoramento">

                  <div>

                    <span>
                      EQUIPE DA UNIDADE
                    </span>

                    <h3>
                      👥 Funcionários
                      cadastrados
                    </h3>

                  </div>

                  <div className="resumo-equipe-filial">

                    <span>
                      🟢{' '}
                      {
                        funcionariosAtivosDaFilial.length
                      }{' '}
                      ativos
                    </span>

                    <span>
                      🔴{' '}
                      {
                        funcionariosInativosDaFilial.length
                      }{' '}
                      inativos
                    </span>

                    <span>
                      🟠{' '}
                      {
                        funcionariosEmAtividadeDaFilial.length
                      }{' '}
                      em atividade
                    </span>

                  </div>

                </div>

                {funcionariosDaFilial.length ===
                0 ? (
                  <div className="estado-vazio-monitoramento">

                    <span>
                      👥
                    </span>

                    <h4>
                      Nenhum funcionário
                      cadastrado
                    </h4>

                    <p>
                      Cadastre funcionários
                      e vincule-os a esta
                      filial.
                    </p>

                  </div>
                ) : (
                  <div className="grade-funcionarios-monitoramento">

                    {funcionariosDaFilial.map(
                      (
                        funcionario
                      ) => (
                        <div
                          className="funcionario-monitoramento"
                          key={
                            funcionario.id
                          }
                        >

                          <div className="avatar-funcionario-monitoramento">
                            👤
                          </div>

                          <div className="dados-funcionario-monitoramento">

                            <span>
                              {funcionario.ativo !==
                              false
                                ? '● ATIVO'
                                : '● INATIVO'}
                            </span>

                            <h4>
                              {
                                funcionario.nome
                              }
                            </h4>

                            <p>
                              ✉️{' '}
                              {
                                funcionario.email
                              }
                            </p>

                            <p>
                              💼{' '}
                              {funcionario.cargo ||
                                'Funcionário'}
                            </p>

                            <p>
                              📍{' '}
                              {funcionario.setorAtual ||
                                funcionario.setor ||
                                'Sem setor'}
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

              </article>

              <article className="bloco-monitoramento-filial">

                <div className="titulo-bloco-monitoramento">

                  <div>

                    <span>
                      MOVIMENTAÇÃO
                    </span>

                    <h3>
                      🧾 Pedidos recentes
                    </h3>

                  </div>

                  <strong>
                    {
                      pedidosDaFilial.length
                    }{' '}
                    pedido(s)
                  </strong>

                </div>

                {pedidosRecentesDaFilial.length ===
                0 ? (
                  <div className="estado-vazio-monitoramento">

                    <span>
                      🧾
                    </span>

                    <h4>
                      Nenhum pedido nesta
                      filial
                    </h4>

                  </div>
                ) : (
                  <div className="lista-pedidos-monitoramento">

                    {pedidosRecentesDaFilial.map(
                      (pedido) => (
                        <div
                          className="pedido-monitoramento"
                          key={
                            pedido.id ||
                            pedido.numero
                          }
                        >

                          <div>

                            <span>
                              PEDIDO #
                              {
                                pedido.numero
                              }
                            </span>

                            <h4>
                              {pedido
                                .cliente
                                ?.nome ||
                                pedido.nomeCliente ||
                                pedido.clienteNome ||
                                'Cliente'}
                            </h4>

                            <small>
                              {formatarData(
                                pedido.criadoEm ||
                                  pedido.dataPedido ||
                                  pedido.data
                              )}
                            </small>

                          </div>

                          <div className="dados-pedido-monitoramento">

                            <strong>
                              {formatarPreco(
                                pedido.total ??
                                  pedido.valorTotal
                              )}
                            </strong>

                            <span>
                              {pedido.status ||
                                'Recebido'}
                            </span>

                            {pedido
                              .funcionarioAtual
                              ?.nome && (
                              <small>
                                👤{' '}
                                {
                                  pedido
                                    .funcionarioAtual
                                    .nome
                                }
                              </small>
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

              </article>

            </section>
          )}

        {/* ===================================================
            FUNCIONÁRIOS
        =================================================== */}

        {abaAtiva ===
          'funcionarios' && (
          <section>

            <div className="titulo-secao-gerente">

              <div>

                <span className="etiqueta-secao">
                  EQUIPE
                </span>

                <h2>
                  Funcionários
                </h2>

                <p>
                  Gerencie os funcionários
                  das filiais.
                </p>

              </div>

              <div className="indicador-pedidos">

                <strong>
                  {
                    funcionarios.length
                  }
                </strong>

                <span>
                  cadastrados
                </span>

              </div>

            </div>

            <div className="formulario-produto-gerente">

              <h3>
                Cadastrar funcionário
              </h3>

              <div className="grade-formulario-gerente">

                <label>
                  Nome

                  <input
                    type="text"
                    value={
                      novoFuncionario.nome
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        nome:
                          evento.target
                            .value,
                      })
                    }
                  />
                </label>

                <label>
                  E-mail

                  <input
                    type="email"
                    value={
                      novoFuncionario.email
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        email:
                          evento.target
                            .value,
                      })
                    }
                  />
                </label>

                <label>
                  Senha

                  <input
                    type="password"
                    value={
                      novoFuncionario.senha
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        senha:
                          evento.target
                            .value,
                      })
                    }
                  />
                </label>

                <label>
                  Cargo

                  <select
                    value={
                      novoFuncionario.cargo
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        cargo:
                          evento.target
                            .value,
                      })
                    }
                  >
                    <option>
                      Atendente
                    </option>

                    <option>
                      Caixa
                    </option>

                    <option>
                      Cozinheiro
                    </option>

                    <option>
                      Auxiliar
                    </option>

                    <option>
                      Supervisor
                    </option>
                  </select>
                </label>

                <label>
                  Setor

                  <select
                    value={
                      novoFuncionario.setor
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        setor:
                          evento.target
                            .value,
                      })
                    }
                  >
                    <option value="Atendimento">
                      Atendimento
                    </option>

                    <option value="Caixa">
                      Caixa
                    </option>

                    <option value="Preparo">
                      Preparo
                    </option>

                    <option value="Entrega">
                      Entrega
                    </option>
                  </select>
                </label>

                <label>
                  Filial

                  <select
                    value={
                      novoFuncionario.filial
                    }
                    onChange={(
                      evento
                    ) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        filial:
                          evento.target
                            .value,
                      })
                    }
                  >
                    <option value="">
                      Selecione
                    </option>

                    {filiais.map(
                      (filial) => (
                        <option
                          key={
                            filial.id
                          }
                          value={
                            filial.id
                          }
                        >
                          {
                            filial.nome
                          }
                        </option>
                      )
                    )}

                  </select>

                </label>

              </div>

              <button
                type="button"
                className="botao-principal-gerente"
                onClick={
                  cadastrarFuncionario
                }
              >
                ➕ Cadastrar funcionário
              </button>

            </div>

            <div className="lista-funcionarios-gerente">

              {funcionarios.length ===
              0 ? (
                <div className="estado-vazio-gerente">

                  <span>
                    👥
                  </span>

                  <h3>
                    Nenhum funcionário
                  </h3>

                  <p>
                    Cadastre o primeiro
                    funcionário.
                  </p>

                </div>
              ) : (
                funcionarios.map(
                  (funcionario) => {
                    const filial =
                      filiais.find(
                        (item) =>
                          String(
                            item.id
                          ) ===
                            String(
                              funcionario.filialId ??
                                funcionario.filial
                            ) ||
                          item.nome ===
                            funcionario.filialNome ||
                          item.nome ===
                            funcionario.filial
                      )

                    return (
                      <article
                        className="card-funcionario-gerente"
                        key={
                          funcionario.id
                        }
                      >

                        <div className="avatar-funcionario-gerente">
                          👤
                        </div>

                        <div className="informacoes-funcionario-gerente">

                          <span>
                            {funcionario.ativo !==
                            false
                              ? 'ATIVO'
                              : 'INATIVO'}
                          </span>

                          <h3>
                            {
                              funcionario.nome
                            }
                          </h3>

                          <p>
                            ✉️{' '}
                            {
                              funcionario.email
                            }
                          </p>

                          <p>
                            💼{' '}
                            {funcionario.cargo ||
                              '-'}
                          </p>

                          <p>
                            📍{' '}
                            {funcionario.setor ||
                              '-'}
                          </p>

                          <p>
                            🏪{' '}
                            {filial?.nome ||
                              funcionario.filialNome ||
                              funcionario.filial ||
                              '-'}
                          </p>

                        </div>

                        <div className="acoes-funcionario-gerente">

                          <button
                            type="button"
                            onClick={() =>
                              alterarStatusFuncionario(
                                funcionario.id
                              )
                            }
                          >
                            {funcionario.ativo !==
                            false
                              ? 'Desativar'
                              : 'Ativar'}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              excluirFuncionario(
                                funcionario.id
                              )
                            }
                          >
                            🗑️ Excluir
                          </button>

                        </div>

                      </article>
                    )
                  }
                )
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  )
}

export default PainelGerente