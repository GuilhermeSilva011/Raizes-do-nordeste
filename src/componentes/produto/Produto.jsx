import './Produto.css'

function Produto({
  produto,
  adicionarAoCarrinho,
  favorito = false,
  alternarFavorito
}) {
  function clicarFavorito() {
    if (alternarFavorito) {
      alternarFavorito(produto)
    }
  }

  return (
    <article className="card-produto">

      <div className="imagem-produto">

        <span>
          {produto.imagem ||
            produto.icone ||
            '🍽️'}
        </span>

        {alternarFavorito && (
          <button
            type="button"
            className={`botao-favorito ${
              favorito ? 'favoritado' : ''
            }`}
            onClick={clicarFavorito}
            aria-label={
              favorito
                ? `Remover ${produto.nome} dos favoritos`
                : `Adicionar ${produto.nome} aos favoritos`
            }
          >
            {favorito ? '❤️' : '♡'}
          </button>
        )}

      </div>

      <div className="informacoes-produto">

        <span className="categoria-produto">
          {produto.categoria}
        </span>

        <h3>{produto.nome}</h3>

        <p>{produto.descricao}</p>

        <div className="rodape-produto">

          <strong className="preco-produto">
            R$ {Number(produto.preco)
              .toFixed(2)
              .replace('.', ',')}
          </strong>

          <button
            type="button"
            className="botao-adicionar"
            onClick={() =>
              adicionarAoCarrinho(produto)
            }
          >
            <span>+</span>
            Adicionar
          </button>

        </div>

      </div>

    </article>
  )
}

export default Produto