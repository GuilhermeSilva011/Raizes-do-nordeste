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


  // ==================================================
  // IDENTIFICAÇÃO DA ÁREA DO FUNCIONÁRIO
  // ==================================================

  const estaNaAreaFuncionario =
    localizacao.pathname === '/funcionario'


  // ==================================================
  // USUÁRIO
  // ==================================================

  const [usuario, setUsuario] = useState(() => {

    try {

      const salvo = localStorage.getItem(
        'raizes_usuario_logado'
      )

      return salvo
        ? JSON.parse(salvo)
        : null

    } catch {

      return null

    }

  })


  // ==================================================
  // PRODUTOS
  // ==================================================

  const [produtos, setProdutos] = useState(() => {

    try {

      const salvos = localStorage.getItem(
        'raizes_produtos'
      )

      return salvos
        ? JSON.parse(salvos)
        : produtosIniciais

    } catch {

      return produtosIniciais

    }

  })


  // ==================================================
  // CARRINHO
  // ==================================================

  const [carrinho, setCarrinho] = useState(() => {

    try {

      const salvo = localStorage.getItem(
        'raizes_carrinho'
      )

      return salvo
        ? JSON.parse(salvo)
        : []

    } catch {

      return []

    }

  })


  const [carrinhoAberto, setCarrinhoAberto] =
    useState(false)


  // ==================================================
  // PEDIDOS
  // ==================================================

  const [pedidos, setPedidos] = useState(() => {

    try {

      const salvos = localStorage.getItem(
        'raizes_pedidos'
      )

      return salvos
        ? JSON.parse(salvos)
        : []

    } catch {

      return []

    }

  })


  // ==================================================
  // PEDIDO RECÉM FINALIZADO
  // ==================================================

  const [pedidoFinalizado, setPedidoFinalizado] =
    useState(null)


  // ==================================================
  // FAVORITOS
  // ==================================================

  const [favoritos, setFavoritos] = useState(() => {

    try {

      const salvos = localStorage.getItem(
        'raizes_favoritos'
      )

      return salvos
        ? JSON.parse(salvos)
        : []

    } catch {

      return []

    }

  })


  // ==================================================
  // ENDEREÇO
  // ==================================================

  const [endereco, setEndereco] = useState(() => {

    try {

      const salvo = localStorage.getItem(
        'raizes_endereco'
      )

      return salvo
        ? JSON.parse(salvo)
        : null

    } catch {

      return null

    }

  })


  // ==================================================
  // GERENTE
  // ==================================================

  const [gerente, setGerente] = useState(() => {

    try {

      const salvo = localStorage.getItem(
        'raizes_gerente_logado'
      )

      return salvo
        ? JSON.parse(salvo)
        : null

    } catch {

      return null

    }

  })


  // ==================================================
  // SALVAR USUÁRIO
  // ==================================================

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


  // ==================================================
  // SALVAR PRODUTOS
  // ==================================================

  useEffect(() => {

    localStorage.setItem(
      'raizes_produtos',
      JSON.stringify(produtos)
    )

  }, [produtos])


  // ==================================================
  // SALVAR CARRINHO
  // ==================================================

  useEffect(() => {

    localStorage.setItem(
      'raizes_carrinho',
      JSON.stringify(carrinho)
    )

  }, [carrinho])


  // ==================================================
  // SALVAR PEDIDOS
  // ==================================================

  useEffect(() => {

    localStorage.setItem(
      'raizes_pedidos',
      JSON.stringify(pedidos)
    )

  }, [pedidos])


  // ==================================================
  // SALVAR FAVORITOS
  // ==================================================

  useEffect(() => {

    localStorage.setItem(
      'raizes_favoritos',
      JSON.stringify(favoritos)
    )

  }, [favoritos])


  // ==================================================
  // SALVAR ENDEREÇO
  // ==================================================

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


  // ==================================================
  // SALVAR GERENTE
  // ==================================================

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


  // ==================================================
  // ADICIONAR AO CARRINHO
  // ==================================================

  function adicionarAoCarrinho(produtoSelecionado) {

    setCarrinho((carrinhoAtual) => {

      const produtoExistente =
        carrinhoAtual.find(
          (produto) =>
            produto.id === produtoSelecionado.id
        )


      if (produtoExistente) {

        return carrinhoAtual.map(
          (produto) =>

            produto.id === produtoSelecionado.id

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

    })

  }


  // ==================================================
  // AUMENTAR QUANTIDADE
  // ==================================================

  function aumentarQuantidade(idProduto) {

    setCarrinho((carrinhoAtual) =>

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


  // ==================================================
  // DIMINUIR QUANTIDADE
  // ==================================================

  function diminuirQuantidade(idProduto) {

    setCarrinho((carrinhoAtual) =>

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


  // ==================================================
  // REMOVER PRODUTO
  // ==================================================

  function removerProduto(idProduto) {

    setCarrinho((carrinhoAtual) =>

      carrinhoAtual.filter(
        (produto) =>
          produto.id !== idProduto
      )

    )

  }


  // ==================================================
  // ABRIR CARRINHO
  // ==================================================

  function abrirCarrinho() {

    setCarrinhoAberto(true)

  }


  // ==================================================
  // FECHAR CARRINHO
  // ==================================================

  function fecharCarrinho() {

    setCarrinhoAberto(false)

  }


  // ==================================================
  // QUANTIDADE TOTAL DO CARRINHO
  // ==================================================

  const quantidadeTotalCarrinho =
    carrinho.reduce(
      (total, produto) =>
        total +
        Number(
          produto.quantidade || 0
        ),
      0
    )


  // ==================================================
  // VALOR TOTAL DO CARRINHO
  // ==================================================

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


  // ==================================================
  // FAVORITOS
  // ==================================================

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


  // ==================================================
  // REMOVER FAVORITO
  // ==================================================

  function removerFavorito(idProduto) {

    setFavoritos(
      (favoritosAtuais) =>

        favoritosAtuais.filter(
          (produto) =>
            produto.id !== idProduto
        )

    )

  }


  // ==================================================
  // IR PARA O CHECKOUT
  // ==================================================

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


    setCarrinhoAberto(false)

    navigate('/checkout')

  }


  // ==================================================
  // FINALIZAR PEDIDO
  // ==================================================

  function finalizarPedido(dadosPedido) {

    if (!usuario) {

      navigate('/login')

      return

    }


    if (carrinho.length === 0) {

      return

    }


    // Descobre o próximo número do pedido.
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


    // Cria o pedido completo.
    const novoPedido = {

      numero:
        maiorNumero + 1,

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
        dadosPedido.mesa ||
        '',

      endereco:
        dadosPedido.endereco ||
        endereco ||
        null,

      formaPagamento:
        dadosPedido.formaPagamento ||
        'PIX',

      observacao:
        dadosPedido.observacao ||
        '',

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

      status:
        'Recebido',

      // O pedido começa aguardando o setor de Preparo.
      setorAtual:
        'Preparo',

      funcionarioAtual:
        null,

      ultimaAtualizacao:
        new Date().toISOString(),

      historicoStatus:
        [
          {
            status: 'Recebido',
            setor: 'Preparo',
            funcionarioId: null,
            funcionarioNome: null,
            cargo: null,
            dataHora: new Date().toISOString()
          }
        ],

      data:
        new Date().toLocaleString('pt-BR')
    }


    // Salva o pedido.
    setPedidos(
      (pedidosAtuais) => [
        ...pedidosAtuais,
        novoPedido
      ]
    )


    // Guarda o pedido para a tela de confirmação.
    setPedidoFinalizado(novoPedido)


    // Limpa o carrinho.
    setCarrinho([])

    setCarrinhoAberto(false)


    // Vai para a tela de finalização.
    navigate('/finalizacao')

  }


  // ==================================================
  // VOLTAR APÓS FINALIZAÇÃO
  // ==================================================

  function voltarParaInicio() {

    setPedidoFinalizado(null)

    navigate('/')

  }


  // ==================================================
  // ALTERAR STATUS DO PEDIDO
  // ==================================================

  function alterarStatusPedido(
    identificador,
    novoStatus,
    funcionario = null
  ) {

    const dataHora = new Date().toISOString()

    setPedidos(
      (pedidosAtuais) =>

        pedidosAtuais.map(
          (pedido) => {

            const ehPedidoSelecionado =
              pedido.numero === identificador ||
              pedido.id === identificador

            if (!ehPedidoSelecionado) {
              return pedido
            }

            const statusAtual =
              pedido.status || 'Recebido'

            // Quando a alteração é feita por um funcionário,
            // o sistema confere se o setor pode executar a ação.
            if (funcionario) {

              const podeAlterar =
                (
                  funcionario.setor === 'Preparo' &&
                  (
                    (statusAtual === 'Recebido' &&
                      novoStatus === 'Em preparo') ||
                    (statusAtual === 'Em preparo' &&
                      novoStatus === 'Pronto')
                  )
                ) ||
                (
                  funcionario.setor === 'Atendimento' &&
                  statusAtual === 'Pronto' &&
                  novoStatus === 'Finalizado'
                )

              if (!podeAlterar) {
                return pedido
              }

            }

            let setorAtual =
              pedido.setorAtual || null

            if (novoStatus === 'Recebido' ||
                novoStatus === 'Em preparo') {
              setorAtual = 'Preparo'
            }

            if (novoStatus === 'Pronto') {
              setorAtual = 'Atendimento'
            }

            if (novoStatus === 'Finalizado' ||
                novoStatus === 'Cancelado') {
              setorAtual = null
            }

            // Só existe funcionário atual enquanto o pedido está
            // efetivamente sendo trabalhado por um setor.
            // O histórico guarda quem concluiu a etapa anterior.
            let funcionarioAtual = pedido.funcionarioAtual || null

            if (novoStatus === 'Em preparo' && funcionario) {
              funcionarioAtual = {
                id: funcionario.id || null,
                nome: funcionario.nome || 'Funcionário',
                cargo: funcionario.cargo || '',
                setor: funcionario.setor || ''
              }
            }

            if (novoStatus === 'Pronto' ||
                novoStatus === 'Finalizado' ||
                novoStatus === 'Cancelado') {
              funcionarioAtual = null
            }

            const novoHistorico = {
              status: novoStatus,
              setor:
                funcionario?.setor ||
                setorAtual ||
                null,
              funcionarioId:
                funcionario?.id || null,
              funcionarioNome:
                funcionario?.nome || null,
              cargo:
                funcionario?.cargo || null,
              dataHora
            }

            return {
              ...pedido,
              status: novoStatus,
              setorAtual,
              funcionarioAtual,
              ultimaAtualizacao: dataHora,
              historicoStatus: [
                ...(pedido.historicoStatus || []),
                novoHistorico
              ]
            }

          }
        )

    )

  }


  // ==================================================
  // ATUALIZAR PRODUTOS
  // ==================================================

  function atualizarProdutos(novosProdutos) {

    setProdutos(novosProdutos)

  }


  // ==================================================
  // LOGIN
  // ==================================================

  function entrar(usuarioEncontrado) {

    setUsuario(usuarioEncontrado)

    navigate('/')

  }


  // ==================================================
  // CADASTRO
  // ==================================================

  function cadastrar(novoUsuario) {

    setUsuario(novoUsuario)

    navigate('/')

  }


  // ==================================================
  // SAIR
  // ==================================================

  function sair() {

    setUsuario(null)

    navigate('/')

  }


  // ==================================================
  // LOGIN DO GERENTE
  // ==================================================

  function entrarGerente(gerenteEncontrado) {

    setGerente(gerenteEncontrado)

    navigate('/gerente')

  }


  // ==================================================
  // SAIR DO GERENTE
  // ==================================================

  function sairGerente() {

    setGerente(null)

    navigate('/login-gerente')

  }


  // ==================================================
  // SALVAR ENDEREÇO
  // ==================================================

  function salvarEndereco(dadosEndereco) {

    if (!usuario) {

      navigate('/login')

      return

    }


    setEndereco(dadosEndereco)

    navigate('/perfil')

  }


  // ==================================================
  // PEDIDOS DO USUÁRIO
  // ==================================================

  const pedidosDoUsuario =
    usuario

      ? pedidos.filter(
          (pedido) =>
            pedido.clienteEmail === usuario.email
        )

      : []


  // ==================================================
  // PONTOS DE FIDELIDADE
  // ==================================================

  const pontosFidelidade =
    pedidosDoUsuario.reduce(
      (total, pedido) => {

        if (
          pedido.status === 'Finalizado'
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


  // ==================================================
  // PRODUTOS FAVORITOS VÁLIDOS
  // ==================================================

  const favoritosValidos =
    favoritos
      .map(
        (favorito) =>

          produtos.find(
            (produto) =>
              produto.id === favorito.id
          ) || favorito
      )
      .filter(Boolean)


  // ==================================================
  // TELA
  // ==================================================

  return (

    <div className="aplicativo">

      {/* ==================================================
          CABEÇALHO DO CLIENTE
          Não aparece na área operacional do funcionário.
      ================================================== */}

      {!estaNaAreaFuncionario && (

        <Cabecalho
          quantidadeCarrinho={
            quantidadeTotalCarrinho
          }

          abrirCarrinho={
            abrirCarrinho
          }
        />

      )}


      <Routes>

        {/* ==========================================
            INÍCIO
        ========================================== */}

        <Route
          path="/"
          element={

            <Inicio
              busca=""
              produtos={produtos}

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


        {/* ==========================================
            CARDÁPIO
        ========================================== */}

        <Route
          path="/cardapio"
          element={

            <Cardapio
              produtos={produtos}

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


        {/* ==========================================
            PEDIDOS
        ========================================== */}

        <Route
          path="/pedidos"
          element={

            <Pedidos
              usuario={usuario}

              pedidos={
                pedidosDoUsuario
              }
            />

          }
        />


        {/* ==========================================
            PERFIL
        ========================================== */}

        <Route
          path="/perfil"
          element={

            <Perfil
              usuario={usuario}
              sair={sair}
            />

          }
        />


        {/* ==========================================
            FAVORITOS
        ========================================== */}

        <Route
          path="/favoritos"
          element={

            <Favoritos
              usuario={usuario}

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


        {/* ==========================================
            FIDELIDADE
        ========================================== */}

        <Route
          path="/fidelidade"
          element={

            <Fidelidade
              usuario={usuario}

              pontos={
                pontosFidelidade
              }

              pedidos={
                pedidosDoUsuario
              }
            />

          }
        />


        {/* ==========================================
            ENDEREÇO
        ========================================== */}

        <Route
          path="/endereco"
          element={

            <Endereco
              usuario={usuario}
              endereco={endereco}

              salvarEndereco={
                salvarEndereco
              }
            />

          }
        />


        {/* ==========================================
            LOGIN
        ========================================== */}

        <Route
          path="/login"
          element={

            <Login
              entrar={entrar}
            />

          }
        />


        {/* ==========================================
            CADASTRO
        ========================================== */}

        <Route
          path="/cadastro"
          element={

            <Cadastro
              cadastrar={cadastrar}
            />

          }
        />


        {/* ==========================================
            CHECKOUT
        ========================================== */}

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

                  fecharCheckout={() =>
                    navigate('/cardapio')
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


        {/* ==========================================
            FINALIZAÇÃO DO PEDIDO
        ========================================== */}

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


        {/* ==========================================
            LOGIN GERENTE
        ========================================== */}

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


        {/* ==========================================
            PAINEL GERENTE
        ========================================== */}

        <Route
          path="/gerente"
          element={

            gerente

              ? (

                <PainelGerente

                  pedidos={
                    pedidos
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


        {/* ==========================================
            ÁREA OPERACIONAL DO FUNCIONÁRIO
        ==========================================

            Exemplos:

            /funcionario?setor=Caixa
            /funcionario?setor=Atendimento
            /funcionario?setor=Preparo

            O PainelFuncionarios identifica
            automaticamente o setor pelo endereço.
        ========================================== */}

        <Route
          path="/funcionario"
          element={

            <PainelFuncionarios
              pedidos={pedidos}
              alterarStatusPedido={alterarStatusPedido}
          />

          }
        />


        {/* ==========================================
            ROTA NÃO EXISTENTE
        ========================================== */}

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


      {/* ==================================================
          MENU INFERIOR DO CLIENTE
          Não aparece na área do funcionário.
      ================================================== */}

      {!estaNaAreaFuncionario && (

        <MenuInferior />

      )}


      {/* ==================================================
          CARRINHO
          Não aparece na área do funcionário.
      ================================================== */}

      {!estaNaAreaFuncionario &&
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