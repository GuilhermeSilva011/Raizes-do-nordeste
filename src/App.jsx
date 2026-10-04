import { useEffect, useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom'

import './App.css'

import Cabecalho from './componentes/cabecalho/Cabecalho'
import MenuInferior from './componentes/menu-inferior/MenuInferior'
import Carrinho from './componentes/carrinho/Carrinho'
import Checkout from './componentes/checkout/Checkout'
import FinalizacaoPedido from './componentes/finalizacao-pedido/FinalizacaoPedido'

import Inicio from './paginas/inicio/Inicio'
import Cardapio from './paginas/cardapio/Cardapio'
import Pedidos from './paginas/pedidos/Pedidos'
import Perfil from './paginas/perfil/Perfil'
import Favoritos from './paginas/favoritos/Favoritos'
import Fidelidade from './paginas/fidelidade/Fidelidade'
import Endereco from './paginas/endereco/Endereco'

import Login from './paginas/autenticacao/Login'
import Cadastro from './paginas/autenticacao/Cadastro'

import LoginGerente from './paginas/gerente/LoginGerente'
import PainelGerente from './paginas/gerente/PainelGerente'

import PainelFuncionarios from './paginas/funcionarios/PainelFuncionarios.jsx'

import produtosIniciais from './dados/produtos'

function App() {
  const navigate = useNavigate()
  const localizacao = useLocation()

  const estaNaAreaFuncionario =
    localizacao.pathname === '/funcionario'

  const estaNaAreaGerente =
    localizacao.pathname === '/gerente' ||
    localizacao.pathname === '/login-gerente'

  const estaNaAutenticacaoCliente =
    localizacao.pathname === '/login' ||
    localizacao.pathname === '/cadastro'

  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo =
        localStorage.getItem('raizes_usuario_logado')

      return salvo
        ? JSON.parse(salvo)
        : null
    } catch {
      return null
    }
  })

  const [produtos, setProdutos] = useState(() => {
    try {
      const salvos =
        localStorage.getItem('raizes_produtos')

      return salvos
        ? JSON.parse(salvos)
        : produtosIniciais
    } catch {
      return produtosIniciais
    }
  })

  const [carrinho, setCarrinho] = useState(() => {
    try {
      const salvo =
        localStorage.getItem('raizes_carrinho')

      return salvo
        ? JSON.parse(salvo)
        : []
    } catch {
      return []
    }
  })

  const [carrinhoAberto, setCarrinhoAberto] =
    useState(false)

  const [pedidos, setPedidos] = useState(() => {
    try {
      const salvos =
        localStorage.getItem('raizes_pedidos')

      return salvos
        ? JSON.parse(salvos)
        : []
    } catch {
      return []
    }
  })

  const [pedidoFinalizado, setPedidoFinalizado] =
    useState(null)

  const [favoritos, setFavoritos] = useState(() => {
    try {
      const salvos =
        localStorage.getItem('raizes_favoritos')

      return salvos
        ? JSON.parse(salvos)
        : []
    } catch {
      return []
    }
  })

  const [endereco, setEndereco] = useState(() => {
    try {
      const salvo =
        localStorage.getItem('raizes_endereco')

      return salvo
        ? JSON.parse(salvo)
        : null
    } catch {
      return null
    }
  })

  const [gerente, setGerente] = useState(() => {
    try {
      const salvo =
        localStorage.getItem('raizes_gerente_logado')

      return salvo
        ? JSON.parse(salvo)
        : null
    } catch {
      return null
    }
  })

  const filiaisPadrao = [
    {
      id: 1,
      nome: 'Raízes do Nordeste - Matriz',
      cidade: 'Centro',
      estado: '',
      ativa: true
    }
  ]

  const [filiais, setFiliais] = useState(() => {
    try {
      const salvas =
        localStorage.getItem('raizes_filiais')

      const lista = salvas
        ? JSON.parse(salvas)
        : []

      return Array.isArray(lista) &&
        lista.length > 0
        ? lista
        : filiaisPadrao
    } catch {
      return filiaisPadrao
    }
  })

  const [filialAtualId, setFilialAtualId] =
    useState(() => {
      try {
        const salva =
          localStorage.getItem(
            'raizes_filial_atual'
          )

        return salva
          ? JSON.parse(salva)
          : null
      } catch {
        return null
      }
    })

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(
        'raizes_usuario_logado',
        JSON.stringify(usuario)
      )
    } else {
      localStorage.removeItem(
        'raizes_usuario_logado'
      )
    }
  }, [usuario])

  useEffect(() => {
    localStorage.setItem(
      'raizes_produtos',
      JSON.stringify(produtos)
    )
  }, [produtos])

  useEffect(() => {
    localStorage.setItem(
      'raizes_carrinho',
      JSON.stringify(carrinho)
    )
  }, [carrinho])

  useEffect(() => {
    localStorage.setItem(
      'raizes_pedidos',
      JSON.stringify(pedidos)
    )
  }, [pedidos])

  useEffect(() => {
    localStorage.setItem(
      'raizes_favoritos',
      JSON.stringify(favoritos)
    )
  }, [favoritos])

  useEffect(() => {
    if (endereco) {
      localStorage.setItem(
        'raizes_endereco',
        JSON.stringify(endereco)
      )
    } else {
      localStorage.removeItem(
        'raizes_endereco'
      )
    }
  }, [endereco])

  useEffect(() => {
    if (gerente) {
      localStorage.setItem(
        'raizes_gerente_logado',
        JSON.stringify(gerente)
      )
    } else {
      localStorage.removeItem(
        'raizes_gerente_logado'
      )
    }
  }, [gerente])

  // Atualiza as filiais quando o gerente altera
  // alguma unidade e o usuário troca de página.
  useEffect(() => {
    function atualizarFiliaisSalvas() {
      try {
        const salvas =
          localStorage.getItem('raizes_filiais')

        if (!salvas) {
          return
        }

        const lista = JSON.parse(salvas)

        if (
          Array.isArray(lista) &&
          lista.length > 0
        ) {
          setFiliais(lista)
        }
      } catch {
        // Mantém os dados atuais.
      }
    }

    const temporizador =
      window.setTimeout(
        atualizarFiliaisSalvas,
        0
      )

    return () => {
      window.clearTimeout(temporizador)
    }
  }, [localizacao.pathname])

  // Garante que o cliente sempre tenha
  // uma filial ativa selecionada.
  useEffect(() => {
    function garantirFilialValida() {
      const filiaisAtivas =
        filiais.filter(
          (filial) =>
            filial.ativa !== false
        )

      if (filiaisAtivas.length === 0) {
        return
      }

      const filialExiste =
        filiaisAtivas.some(
          (filial) =>
            String(filial.id) ===
            String(filialAtualId)
        )

      if (filialExiste) {
        return
      }

      const primeiraFilial =
        filiaisAtivas[0]

      setFilialAtualId(
        primeiraFilial.id
      )

      localStorage.setItem(
        'raizes_filial_atual',
        JSON.stringify(
          primeiraFilial.id
        )
      )
    }

    const temporizador =
      window.setTimeout(
        garantirFilialValida,
        0
      )

    return () => {
      window.clearTimeout(
        temporizador
      )
    }
  }, [
    filiais,
    filialAtualId
  ])

  const filialAtual =
    filiais.find(
      (filial) =>
        String(filial.id) ===
          String(filialAtualId) &&
        filial.ativa !== false
    ) || null

  function definirFilialAtual(idFilial) {
    if (carrinho.length > 0) {
      alert(
        'Esvazie o carrinho antes de trocar de unidade.'
      )

      return
    }

    const filialSelecionada =
      filiais.find(
        (filial) =>
          String(filial.id) ===
          String(idFilial)
      )

    if (
      !filialSelecionada ||
      filialSelecionada.ativa === false
    ) {
      return
    }

    setFilialAtualId(
      filialSelecionada.id
    )

    localStorage.setItem(
      'raizes_filial_atual',
      JSON.stringify(
        filialSelecionada.id
      )
    )
  }

  function adicionarAoCarrinho(
    produtoSelecionado
  ) {
    setCarrinho(
      (carrinhoAtual) => {
        const produtoExistente =
          carrinhoAtual.find(
            (produto) =>
              produto.id ===
              produtoSelecionado.id
          )

        if (produtoExistente) {
          return carrinhoAtual.map(
            (produto) =>
              produto.id ===
              produtoSelecionado.id
                ? {
                    ...produto,
                    quantidade:
                      Number(
                        produto.quantidade || 0
                      ) + 1
                  }
                : produto
          )
        }

        return [
          ...carrinhoAtual,
          {
            ...produtoSelecionado,
            quantidade: 1
          }
        ]
      }
    )
  }

  function aumentarQuantidade(idProduto) {
    setCarrinho(
      (carrinhoAtual) =>
        carrinhoAtual.map(
          (produto) =>
            produto.id === idProduto
              ? {
                  ...produto,
                  quantidade:
                    Number(
                      produto.quantidade || 0
                    ) + 1
                }
              : produto
        )
    )
  }

  function diminuirQuantidade(idProduto) {
    setCarrinho(
      (carrinhoAtual) =>
        carrinhoAtual
          .map(
            (produto) =>
              produto.id === idProduto
                ? {
                    ...produto,
                    quantidade:
                      Number(
                        produto.quantidade || 0
                      ) - 1
                  }
                : produto
          )
          .filter(
            (produto) =>
              Number(
                produto.quantidade || 0
              ) > 0
          )
    )
  }

  function removerProduto(idProduto) {
    setCarrinho(
      (carrinhoAtual) =>
        carrinhoAtual.filter(
          (produto) =>
            produto.id !== idProduto
        )
    )
  }

  function abrirCarrinho() {
    setCarrinhoAberto(true)
  }

  function fecharCarrinho() {
    setCarrinhoAberto(false)
  }

  const quantidadeTotalCarrinho =
    carrinho.reduce(
      (total, produto) =>
        total +
        Number(
          produto.quantidade || 0
        ),
      0
    )

  const valorTotalCarrinho =
    carrinho.reduce(
      (total, produto) =>
        total +
        Number(
          produto.preco || 0
        ) *
          Number(
            produto.quantidade || 0
          ),
      0
    )

  function alternarFavorito(produto) {
    if (!usuario) {
      alert(
        'Entre na sua conta para salvar produtos favoritos.'
      )

      navigate('/login')
      return
    }

    setFavoritos(
      (favoritosAtuais) => {
        const existe =
          favoritosAtuais.some(
            (item) =>
              item.id === produto.id
          )

        if (existe) {
          return favoritosAtuais.filter(
            (item) =>
              item.id !== produto.id
          )
        }

        return [
          ...favoritosAtuais,
          produto
        ]
      }
    )
  }

  function removerFavorito(idProduto) {
    setFavoritos(
      (favoritosAtuais) =>
        favoritosAtuais.filter(
          (produto) =>
            produto.id !== idProduto
        )
    )
  }

  function finalizarCompra() {
    if (carrinho.length === 0) {
      return
    }

    if (!usuario) {
      setCarrinhoAberto(false)

      alert(
        'Entre na sua conta para finalizar o pedido.'
      )

      navigate('/login')
      return
    }

    if (!filialAtual) {
      alert(
        'Selecione uma unidade antes de finalizar o pedido.'
      )

      return
    }

    setCarrinhoAberto(false)
    navigate('/checkout')
  }

  function salvarEnderecoNoCheckout(
    dadosEndereco
  ) {
    if (!usuario) {
      navigate('/login')
      return
    }

    setEndereco(dadosEndereco)
  }

  function finalizarPedido(
    dadosPedido = {}
  ) {
    if (!usuario) {
      navigate('/login')
      return
    }

    if (carrinho.length === 0) {
      return
    }

    const filialDoPedido =
      filiais.find(
        (filial) =>
          String(filial.id) ===
            String(filialAtualId) &&
          filial.ativa !== false
      )

    if (!filialDoPedido) {
      alert(
        'Selecione uma unidade antes de finalizar o pedido.'
      )

      return
    }

    const maiorNumero =
      pedidos.reduce(
        (maior, pedido) =>
          Math.max(
            maior,
            Number(
              pedido.numero
            ) || 0
          ),
        1000
      )

    const agora =
      new Date().toISOString()

    const novoPedido = {
      numero: maiorNumero + 1,

      filialId:
        filialDoPedido.id,

      filialNome:
        filialDoPedido.nome ||
        'Unidade',

      filial:
        filialDoPedido.nome ||
        'Unidade',

      clienteNome:
        dadosPedido.clienteNome ||
        dadosPedido.nome ||
        usuario.nome ||
        'Cliente',

      clienteEmail:
        usuario.email || '',

      clienteId:
        usuario.id || null,

      telefone:
        dadosPedido.telefone ||
        usuario.telefone ||
        '',

      tipoEntrega:
        dadosPedido.tipoEntrega ||
        'MESA',

      mesa:
        dadosPedido.mesa || '',

      endereco:
        dadosPedido.endereco ||
        endereco ||
        null,

      formaPagamento:
        dadosPedido.formaPagamento ||
        'PIX',

      observacao:
        dadosPedido.observacao || '',

      itens:
        carrinho.map(
          (produto) => ({
            ...produto,

            imagem:
              produto.imagem ||
              produto.icone ||
              '🍽️',

            quantidade:
              Number(
                produto.quantidade
              ) || 1
          })
        ),

      total:
        valorTotalCarrinho,

      status: 'Recebido',

      setorAtual: 'Preparo',

      funcionarioAtual: null,

      ultimaAtualizacao:
        agora,

      historicoStatus: [
        {
          status: 'Recebido',
          setor: 'Preparo',
          funcionarioId: null,
          funcionarioNome: null,
          cargo: null,
          dataHora: agora
        }
      ],

      data:
        new Date().toLocaleString(
          'pt-BR'
        ),

      criadoEm: agora
    }

    const novosPedidos = [
      novoPedido,
      ...pedidos
    ]

    setPedidos(novosPedidos)

    localStorage.setItem(
      'raizes_pedidos',
      JSON.stringify(novosPedidos)
    )

    setPedidoFinalizado(
      novoPedido
    )

    setCarrinho([])

    localStorage.removeItem(
      'raizes_carrinho'
    )

    navigate('/finalizacao')
  }

  function voltarParaInicio() {
    setPedidoFinalizado(null)
    navigate('/')
  }

  function alterarStatusPedido(
    numeroPedido,
    novoStatus,
    funcionario = null
  ) {
    const dataHora =
      new Date().toISOString()

    setPedidos(
      (pedidosAtuais) =>
        pedidosAtuais.map(
          (pedido) => {
            if (
              String(pedido.numero) !==
              String(numeroPedido)
            ) {
              return pedido
            }

            let setorAtual =
              pedido.setorAtual ||
              'Preparo'

            if (
              novoStatus ===
              'Recebido'
            ) {
              setorAtual = 'Preparo'
            }

            if (
              novoStatus ===
              'Em preparo'
            ) {
              setorAtual = 'Preparo'
            }

            if (
              novoStatus === 'Pronto'
            ) {
              setorAtual =
                'Atendimento'
            }

            if (
              novoStatus ===
                'Finalizado' ||
              novoStatus ===
                'Cancelado'
            ) {
              setorAtual = null
            }

            let funcionarioAtual =
              pedido.funcionarioAtual ||
              null

            if (
              novoStatus ===
                'Em preparo' &&
              funcionario
            ) {
              funcionarioAtual = {
                id:
                  funcionario.id ||
                  null,

                nome:
                  funcionario.nome ||
                  'Funcionário',

                cargo:
                  funcionario.cargo ||
                  '',

                setor:
                  funcionario.setor ||
                  'Preparo'
              }
            }

            if (
              novoStatus === 'Pronto' ||
              novoStatus ===
                'Finalizado' ||
              novoStatus ===
                'Cancelado'
            ) {
              funcionarioAtual = null
            }

            const novoHistorico = {
              status: novoStatus,

              setor:
                funcionario?.setor ||
                setorAtual ||
                null,

              funcionarioId:
                funcionario?.id ||
                null,

              funcionarioNome:
                funcionario?.nome ||
                null,

              cargo:
                funcionario?.cargo ||
                null,

              dataHora
            }

            return {
              ...pedido,

              status:
                novoStatus,

              setorAtual,

              funcionarioAtual,

              ultimaAtualizacao:
                dataHora,

              historicoStatus: [
                ...(
                  pedido.historicoStatus ||
                  []
                ),
                novoHistorico
              ]
            }
          }
        )
    )
  }

  function atualizarPedidos(
    novosPedidos
  ) {
    if (
      !Array.isArray(
        novosPedidos
      )
    ) {
      return
    }

    setPedidos(
      novosPedidos
    )

    localStorage.setItem(
      'raizes_pedidos',
      JSON.stringify(
        novosPedidos
      )
    )
  }

  function atualizarProdutos(
    novosProdutos
  ) {
    if (
      !Array.isArray(
        novosProdutos
      )
    ) {
      return
    }

    setProdutos(
      novosProdutos
    )

    localStorage.setItem(
      'raizes_produtos',
      JSON.stringify(
        novosProdutos
      )
    )
  }

  function entrar(
    usuarioEncontrado
  ) {
    setUsuario(
      usuarioEncontrado
    )

    navigate('/')
  }

  function cadastrar(
    novoUsuario
  ) {
    setUsuario(
      novoUsuario
    )

    navigate('/')
  }

  function sair() {
    setUsuario(null)
    navigate('/')
  }

  function entrarGerente(
    gerenteEncontrado
  ) {
    setGerente(
      gerenteEncontrado
    )

    navigate('/gerente')
  }

  function sairGerente() {
    setGerente(null)
    navigate('/login-gerente')
  }

  function salvarEndereco(
    dadosEndereco
  ) {
    if (!usuario) {
      navigate('/login')
      return
    }

    setEndereco(
      dadosEndereco
    )

    navigate('/perfil')
  }

  const pedidosDoUsuario =
    usuario
      ? pedidos.filter(
          (pedido) =>
            pedido.clienteEmail ===
            usuario.email
        )
      : []

  const pontosFidelidade =
    pedidosDoUsuario.reduce(
      (total, pedido) => {
        if (
          pedido.status ===
          'Finalizado'
        ) {
          return (
            total +
            Math.floor(
              Number(
                pedido.total || 0
              )
            )
          )
        }

        return total
      },
      0
    )

  const favoritosValidos =
    favoritos
      .map(
        (favorito) =>
          produtos.find(
            (produto) =>
              produto.id ===
              favorito.id
          ) || favorito
      )
      .filter(Boolean)

  const filiaisAtivas =
    filiais.filter(
      (filial) =>
        filial.ativa !== false
    )

  return (
    <div className="aplicativo">

      {!estaNaAreaFuncionario &&
        !estaNaAreaGerente && (
          <Cabecalho
            quantidadeCarrinho={
              quantidadeTotalCarrinho
            }
            abrirCarrinho={
              abrirCarrinho
            }
          />
        )}

      {!estaNaAreaFuncionario &&
        !estaNaAreaGerente &&
        !estaNaAutenticacaoCliente && (
          <section
            style={{
              width:
                'calc(100% - 32px)',
              maxWidth: '1100px',
              margin:
                '14px auto 0',
              padding:
                '12px 14px',
              border:
                '1px solid #eee8df',
              borderRadius:
                '14px',
              background:
                '#ffffff',
              display: 'flex',
              alignItems:
                'center',
              justifyContent:
                'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              boxSizing:
                'border-box'
            }}
          >
            <div>
              <strong
                style={{
                  display:
                    'block',
                  fontSize:
                    '14px'
                }}
              >
                📍 Unidade selecionada
              </strong>

              <small
                style={{
                  color: '#777'
                }}
              >
                Escolha em qual loja
                você está comprando.
              </small>
            </div>

            {filiaisAtivas.length >
            0 ? (
              <select
                value={
                  filialAtualId ??
                  ''
                }
                onChange={(
                  evento
                ) =>
                  definirFilialAtual(
                    evento.target
                      .value
                  )
                }
                aria-label="Selecionar unidade"
                style={{
                  minWidth:
                    '220px',
                  maxWidth:
                    '100%',
                  padding:
                    '10px 12px',
                  border:
                    '1px solid #ddd3c8',
                  borderRadius:
                    '10px',
                  background:
                    '#fff',
                  fontSize:
                    '14px',
                  color:
                    '#29231f',
                  cursor:
                    'pointer'
                }}
              >
                {filiaisAtivas.map(
                  (filial) => (
                    <option
                      key={
                        filial.id
                      }
                      value={
                        filial.id
                      }
                    >
                      {filial.nome}

                      {filial.cidade
                        ? ` — ${filial.cidade}`
                        : ''}
                    </option>
                  )
                )}
              </select>
            ) : (
              <strong>
                Nenhuma unidade
                disponível
              </strong>
            )}
          </section>
        )}

      <Routes>
        <Route
          path="/"
          element={
            <Inicio
              produtos={
                produtos
              }
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
              favoritos={
                favoritosValidos
              }
              alternarFavorito={
                alternarFavorito
              }
            />
          }
        />

        <Route
          path="/cardapio"
          element={
            <Cardapio
              produtos={
                produtos
              }
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
              favoritos={
                favoritosValidos
              }
              alternarFavorito={
                alternarFavorito
              }
            />
          }
        />

        <Route
          path="/pedidos"
          element={
            <Pedidos
              usuario={
                usuario
              }
              pedidos={
                pedidosDoUsuario
              }
            />
          }
        />

        <Route
          path="/perfil"
          element={
            <Perfil
              usuario={
                usuario
              }
              sair={sair}
            />
          }
        />

        <Route
          path="/favoritos"
          element={
            <Favoritos
              usuario={
                usuario
              }
              favoritos={
                favoritosValidos
              }
              removerFavorito={
                removerFavorito
              }
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
            />
          }
        />

        <Route
          path="/fidelidade"
          element={
            <Fidelidade
              usuario={
                usuario
              }
              pontos={
                pontosFidelidade
              }
              pedidos={
                pedidosDoUsuario
              }
            />
          }
        />

        <Route
          path="/endereco"
          element={
            <Endereco
              usuario={
                usuario
              }
              endereco={
                endereco
              }
              salvarEndereco={
                salvarEndereco
              }
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              entrar={
                entrar
              }
            />
          }
        />

        <Route
          path="/cadastro"
          element={
            <Cadastro
              cadastrar={
                cadastrar
              }
            />
          }
        />

        <Route
          path="/checkout"
          element={
            usuario &&
            carrinho.length > 0
              ? (
                <Checkout
                  carrinho={
                    carrinho
                  }
                  enderecoSalvo={
                    endereco
                  }
                  salvarEnderecoCheckout={
                    salvarEnderecoNoCheckout
                  }
                  filialAtual={
                    filialAtual
                  }
                  fecharCheckout={() =>
                    navigate(
                      '/cardapio'
                    )
                  }
                  finalizarPedido={
                    finalizarPedido
                  }
                />
              )
              : (
                <Navigate
                  to="/"
                  replace
                />
              )
          }
        />

        <Route
          path="/finalizacao"
          element={
            pedidoFinalizado
              ? (
                <FinalizacaoPedido
                  pedido={
                    pedidoFinalizado
                  }
                  voltarParaInicio={
                    voltarParaInicio
                  }
                />
              )
              : (
                <Navigate
                  to="/pedidos"
                  replace
                />
              )
          }
        />

        <Route
          path="/login-gerente"
          element={
            <LoginGerente
              onEntrar={
                entrarGerente
              }
            />
          }
        />

        <Route
          path="/gerente"
          element={
            gerente
              ? (
                <PainelGerente
                  pedidos={
                    pedidos
                  }
                  atualizarPedidos={
                    atualizarPedidos
                  }
                  produtos={
                    produtos
                  }
                  atualizarProdutos={
                    atualizarProdutos
                  }
                  alterarStatusPedido={
                    alterarStatusPedido
                  }
                  sairGerente={
                    sairGerente
                  }
                />
              )
              : (
                <Navigate
                  to="/login-gerente"
                  replace
                />
              )
          }
        />

        <Route
          path="/funcionario"
          element={
            <PainelFuncionarios
              pedidos={
                pedidos
              }
              alterarStatusPedido={
                alterarStatusPedido
              }
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>

      {!estaNaAreaFuncionario &&
        !estaNaAreaGerente && (
          <MenuInferior />
        )}

      {!estaNaAreaFuncionario &&
        !estaNaAreaGerente &&
        carrinhoAberto && (
          <Carrinho
            carrinho={
              carrinho
            }
            fecharCarrinho={
              fecharCarrinho
            }
            aumentarQuantidade={
              aumentarQuantidade
            }
            diminuirQuantidade={
              diminuirQuantidade
            }
            removerProduto={
              removerProduto
            }
            finalizarCompra={
              finalizarCompra
            }
          />
        )}

    </div>
  )
}

export default App