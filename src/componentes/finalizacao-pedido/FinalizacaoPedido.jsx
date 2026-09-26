import './FinalizacaoPedido.css'

function FinalizacaoPedido({
  pedido,
  voltarParaInicio
}) {

  // Se por algum motivo não existir pedido,
  // não tentamos acessar os dados.
  if (!pedido) {
    return null
  }

  function formatarPreco(valor) {
    return Number(valor || 0)
      .toFixed(2)
      .replace('.', ',')
  }

  function formatarTipoEntrega() {
    if (pedido.tipoEntrega === 'MESA') {
      return `Mesa ${pedido.mesa || '—'}`
    }

    if (pedido.tipoEntrega === 'RETIRADA') {
      return 'Retirada'
    }

    return 'Entrega'
  }

  function formatarPagamento() {
    if (pedido.formaPagamento === 'PIX') {
      return 'PIX'
    }

    if (pedido.formaPagamento === 'CARTAO') {
      return 'Cartão'
    }

    if (pedido.formaPagamento === 'DINHEIRO') {
      return 'Dinheiro'
    }

    return pedido.formaPagamento || '—'
  }

  return (
    <div className="fundo-finalizacao">

      <div className="painel-finalizacao">

        {/* Ícone de sucesso */}
        <div className="icone-sucesso">
          ✓
        </div>


        {/* Título */}
        <h1>
          Pedido realizado!
        </h1>


        <p className="mensagem-sucesso">
          Seu pedido foi recebido com sucesso.
        </p>


        {/* Número do pedido */}
        <div className="numero-pedido">

          <span>
            Número do pedido
          </span>

          <strong>
            #{pedido.numero}
          </strong>

        </div>


        {/* Informações do pedido */}
        <div className="informacoes-pedido">

          {/* Cliente */}
          <div>

            <span>
              Cliente
            </span>

            <strong>
              {pedido.clienteNome || 'Cliente'}
            </strong>

          </div>


          {/* Tipo de entrega */}
          <div>

            <span>
              Tipo
            </span>

            <strong>
              {formatarTipoEntrega()}
            </strong>

          </div>


          {/* Forma de pagamento */}
          <div>

            <span>
              Pagamento
            </span>

            <strong>
              {formatarPagamento()}
            </strong>

          </div>


          {/* Total */}
          <div className="total-pedido">

            <span>
              Total
            </span>

            <strong>
              R$ {formatarPreco(pedido.total)}
            </strong>

          </div>

        </div>


        {/* Status inicial */}
        <div className="status-pedido">

          <span>
            🕐
          </span>

          <div>

            <strong>
              Pedido recebido
            </strong>

            <p>
              Estamos preparando tudo para você.
            </p>

          </div>

        </div>


        {/* Botão */}
        <button
          type="button"
          className="botao-voltar-inicio"
          onClick={voltarParaInicio}
        >
          Voltar para o início
        </button>

      </div>

    </div>
  )
}

export default FinalizacaoPedido