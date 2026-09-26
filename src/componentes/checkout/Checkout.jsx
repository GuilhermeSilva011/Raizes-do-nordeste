import { useState } from 'react'
import './Checkout.css'


function Checkout({
  carrinho = [],
  fecharCheckout,
  finalizarPedido
}) {

  // ========================================
  // DADOS DO CLIENTE
  // ========================================

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')


  // ========================================
  // TIPO DO PEDIDO
  // ========================================

  const [tipoEntrega, setTipoEntrega] =
    useState('MESA')

  const [mesa, setMesa] = useState('')

  const [endereco, setEndereco] =
    useState('')


  // ========================================
  // PAGAMENTO
  // ========================================

  const [formaPagamento, setFormaPagamento] =
    useState('PIX')


  // ========================================
  // OBSERVAÇÃO
  // ========================================

  const [observacao, setObservacao] =
    useState('')


  // ========================================
  // QUANTIDADE DE PRODUTOS
  // ========================================

  const quantidadeProdutos =
    carrinho.reduce(
      (total, produto) =>
        total +
        Number(produto.quantidade || 0),
      0
    )


  // ========================================
  // VALOR TOTAL
  // ========================================

  const valorTotal =
    carrinho.reduce(
      (total, produto) =>
        total +
        Number(produto.preco || 0) *
          Number(produto.quantidade || 0),
      0
    )


  // ========================================
  // FORMATAR PREÇO
  // ========================================

  function formatarPreco(valor) {
    return Number(valor || 0)
      .toFixed(2)
      .replace('.', ',')
  }


  // ========================================
  // ENVIAR PEDIDO
  // ========================================

  function enviarPedido(evento) {
    evento.preventDefault()


    // ----------------------------------------
    // Verifica se o carrinho está vazio
    // ----------------------------------------

    if (carrinho.length === 0) {
      alert(
        'Seu carrinho está vazio.'
      )

      return
    }


    // ----------------------------------------
    // Verifica nome
    // ----------------------------------------

    if (!nome.trim()) {
      alert(
        'Digite seu nome.'
      )

      return
    }


    // ----------------------------------------
    // Verifica mesa
    // ----------------------------------------

    if (
      tipoEntrega === 'MESA' &&
      !mesa.trim()
    ) {
      alert(
        'Informe o número da mesa.'
      )

      return
    }


    // ----------------------------------------
    // Verifica endereço
    // ----------------------------------------

    if (
      tipoEntrega === 'ENTREGA' &&
      !endereco.trim()
    ) {
      alert(
        'Informe o endereço de entrega.'
      )

      return
    }


    // ========================================
    // MONTA OS DADOS DO PEDIDO
    // ========================================

    const dadosPedido = {

      // Data e horário
      data:
        new Date().toLocaleString(
          'pt-BR'
        ),


      // Cliente
      nome:
        nome.trim(),

      telefone:
        telefone.trim(),


      // Tipo do pedido
      tipoEntrega,


      // Local
      mesa:
        tipoEntrega === 'MESA'
          ? mesa.trim()
          : '',

      endereco:
        tipoEntrega === 'ENTREGA'
          ? endereco.trim()
          : '',


      // Pagamento
      formaPagamento,


      // Observação
      observacao:
        observacao.trim(),


      // Produtos
      produtos:
        carrinho.map((produto) => ({
          id:
            produto.id,

          nome:
            produto.nome,

          preco:
            Number(produto.preco || 0),

          quantidade:
            Number(produto.quantidade || 0),

          subtotal:
            Number(produto.preco || 0) *
            Number(produto.quantidade || 0)
        })),


      // Valores
      quantidadeProdutos,

      valorTotal
    }


    // ========================================
    // ENVIA O PEDIDO PARA O APP
    // ========================================

    finalizarPedido(
      dadosPedido
    )
  }


  // ========================================
  // FECHAR CHECKOUT
  // ========================================

  function fecharFormulario() {
    fecharCheckout()
  }


  // ========================================
  // TELA
  // ========================================

  return (

    <div className="fundo-checkout">

      <div className="painel-checkout">

        {/* ========================================
            CABEÇALHO
        ======================================== */}

        <header className="cabecalho-checkout">

          <div className="titulo-checkout">

            <span className="icone-checkout">
              🧾
            </span>

            <div>

              <h2>
                Finalizar pedido
              </h2>

              <p>
                Confira seus dados antes de confirmar.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="botao-fechar-checkout"
            onClick={
              fecharFormulario
            }
            aria-label="Fechar checkout"
          >
            ✕
          </button>

        </header>


        {/* ========================================
            FORMULÁRIO
        ======================================== */}

        <form
          className="conteudo-checkout"
          onSubmit={
            enviarPedido
          }
        >

          {/* ========================================
              DADOS DO CLIENTE
          ======================================== */}

          <section className="secao-checkout">

            <h3>
              👤 Seus dados
            </h3>


            <label>

              Nome

              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(evento) =>
                  setNome(
                    evento.target.value
                  )
                }
                autoComplete="name"
              />

            </label>


            <label>

              Telefone

              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(evento) =>
                  setTelefone(
                    evento.target.value
                  )
                }
                autoComplete="tel"
              />

            </label>

          </section>


          {/* ========================================
              TIPO DO PEDIDO
          ======================================== */}

          <section className="secao-checkout">

            <h3>
              📍 Onde você deseja receber?
            </h3>


            <div className="opcoes-tipo">

              {/* MESA */}

              <button
                type="button"
                className={
                  tipoEntrega === 'MESA'
                    ? 'opcao-tipo selecionada'
                    : 'opcao-tipo'
                }
                onClick={() =>
                  setTipoEntrega(
                    'MESA'
                  )
                }
              >

                <span className="icone-opcao">
                  🍽️
                </span>

                <span>
                  Mesa
                </span>

              </button>


              {/* RETIRADA */}

              <button
                type="button"
                className={
                  tipoEntrega === 'RETIRADA'
                    ? 'opcao-tipo selecionada'
                    : 'opcao-tipo'
                }
                onClick={() =>
                  setTipoEntrega(
                    'RETIRADA'
                  )
                }
              >

                <span className="icone-opcao">
                  🛍️
                </span>

                <span>
                  Retirada
                </span>

              </button>


              {/* ENTREGA */}

              <button
                type="button"
                className={
                  tipoEntrega === 'ENTREGA'
                    ? 'opcao-tipo selecionada'
                    : 'opcao-tipo'
                }
                onClick={() =>
                  setTipoEntrega(
                    'ENTREGA'
                  )
                }
              >

                <span className="icone-opcao">
                  🛵
                </span>

                <span>
                  Entrega
                </span>

              </button>

            </div>


            {/* ========================================
                NÚMERO DA MESA
            ======================================== */}

            {tipoEntrega === 'MESA' && (

              <label>

                Número da mesa

                <input
                  type="text"
                  placeholder="Ex.: 05"
                  value={mesa}
                  onChange={(evento) =>
                    setMesa(
                      evento.target.value
                    )
                  }
                />

              </label>

            )}


            {/* ========================================
                ENDEREÇO
            ======================================== */}

            {tipoEntrega === 'ENTREGA' && (

              <label>

                Endereço

                <textarea
                  placeholder="Digite seu endereço completo"
                  value={endereco}
                  onChange={(evento) =>
                    setEndereco(
                      evento.target.value
                    )
                  }
                  rows="4"
                />

              </label>

            )}

          </section>


          {/* ========================================
              PAGAMENTO
          ======================================== */}

          <section className="secao-checkout">

            <h3>
              💳 Forma de pagamento
            </h3>


            <div className="opcoes-pagamento">

              {/* PIX */}

              <button
                type="button"
                className={
                  formaPagamento === 'PIX'
                    ? 'opcao-pagamento selecionada'
                    : 'opcao-pagamento'
                }
                onClick={() =>
                  setFormaPagamento(
                    'PIX'
                  )
                }
              >

                <span>
                  📱
                </span>

                <strong>
                  PIX
                </strong>

              </button>


              {/* CARTÃO */}

              <button
                type="button"
                className={
                  formaPagamento === 'CARTAO'
                    ? 'opcao-pagamento selecionada'
                    : 'opcao-pagamento'
                }
                onClick={() =>
                  setFormaPagamento(
                    'CARTAO'
                  )
                }
              >

                <span>
                  💳
                </span>

                <strong>
                  Cartão
                </strong>

              </button>


              {/* DINHEIRO */}

              <button
                type="button"
                className={
                  formaPagamento === 'DINHEIRO'
                    ? 'opcao-pagamento selecionada'
                    : 'opcao-pagamento'
                }
                onClick={() =>
                  setFormaPagamento(
                    'DINHEIRO'
                  )
                }
              >

                <span>
                  💵
                </span>

                <strong>
                  Dinheiro
                </strong>

              </button>

            </div>

          </section>


          {/* ========================================
              OBSERVAÇÃO
          ======================================== */}

          <section className="secao-checkout">

            <h3>
              📝 Observação
            </h3>


            <textarea
              className="campo-observacao"
              placeholder="Alguma observação para o pedido?"
              value={observacao}
              onChange={(evento) =>
                setObservacao(
                  evento.target.value
                )
              }
              rows="4"
            />

          </section>


          {/* ========================================
              RESUMO DO PEDIDO
          ======================================== */}

          <section className="resumo-checkout">

            <div className="linha-resumo">

              <span>
                Produtos
              </span>

              <strong>
                {quantidadeProdutos} item(ns)
              </strong>

            </div>


            <div className="linha-resumo">

              <span>
                Tipo
              </span>

              <strong>

                {tipoEntrega === 'MESA' &&
                  `Mesa ${mesa || '—'}`}

                {tipoEntrega === 'RETIRADA' &&
                  'Retirada'}

                {tipoEntrega === 'ENTREGA' &&
                  'Entrega'}

              </strong>

            </div>


            <div className="linha-resumo">

              <span>
                Pagamento
              </span>

              <strong>

                {formaPagamento === 'PIX' &&
                  'PIX'}

                {formaPagamento === 'CARTAO' &&
                  'Cartão'}

                {formaPagamento === 'DINHEIRO' &&
                  'Dinheiro'}

              </strong>

            </div>


            <div className="total-checkout">

              <span>
                Total
              </span>

              <strong>
                R$ {formatarPreco(
                  valorTotal
                )}
              </strong>

            </div>

          </section>


          {/* ========================================
              BOTÃO CONFIRMAR
          ======================================== */}

          <button
            className="botao-confirmar-pedido"
            type="submit"
          >

            <span>
              ✓
            </span>

            Confirmar pedido

          </button>

        </form>

      </div>

    </div>
  )
}


export default Checkout