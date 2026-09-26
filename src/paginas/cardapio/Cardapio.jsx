import { useState } from 'react'
import Produto from '../../componentes/produto/Produto'
import './cardapio.css'

function Cardapio({
  produtos = [],
  adicionarAoCarrinho,
  favoritos = [],
  alternarFavorito
}) {
  const [busca, setBusca] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('')

  const categorias = [
    ['Todos', '', '🍽️'],
    ['Cuscuz', 'CUSCUZ', '🌽'],
    ['Tapiocas', 'TAPIOCA', '🫓'],
    ['Cafés', 'CAFÉ', '☕'],
    ['Bolos', 'BOLOS', '🍰'],
    ['Bebidas', 'BEBIDAS', '🥤']
  ]

  const produtosFiltrados = produtos.filter(
    (produto) => {
      const texto = `
        ${produto.nome}
        ${produto.categoria}
        ${produto.descricao}
      `.toLowerCase()

      const buscaValida =
        texto.includes(
          busca.toLowerCase()
        )

      const categoriaValida =
        categoriaSelecionada === '' ||
        produto.categoria ===
          categoriaSelecionada

      return buscaValida && categoriaValida
    }
  )

  return (
    <main className="pagina-cardapio">

      <section className="cabecalho-cardapio">

        <h1>🍽️ Cardápio</h1>

        <p>
          Escolha seus sabores favoritos.
        </p>

      </section>

      <section className="pesquisa-cardapio">

        <input
          type="text"
          value={busca}
          onChange={(evento) =>
            setBusca(evento.target.value)
          }
          placeholder="Buscar no cardápio..."
        />

      </section>

      <section className="categorias-cardapio">

        {categorias.map(
          ([nome, valor, icone]) => (

            <button
              type="button"
              key={valor}
              className={
                categoriaSelecionada === valor
                  ? 'categoria-cardapio ativa'
                  : 'categoria-cardapio'
              }
              onClick={() =>
                setCategoriaSelecionada(
                  valor
                )
              }
            >
              <span>{icone}</span>
              <small>{nome}</small>
            </button>

          )
        )}

      </section>

      <section className="produtos-cardapio">

        <div className="titulo-secao-cardapio">

          <div>
            <h2>
              Nossos produtos
            </h2>

            <p>
              {produtosFiltrados.length}{' '}
              produto(s) encontrado(s)
            </p>
          </div>

        </div>

        {produtosFiltrados.length > 0 ? (

          <div className="lista-produtos-cardapio">

            {produtosFiltrados.map(
              (produto) => (

                <Produto
                  key={produto.id}
                  produto={produto}
                  adicionarAoCarrinho={
                    adicionarAoCarrinho
                  }
                  favorito={favoritos.some(
                    (item) =>
                      item.id === produto.id
                  )}
                  alternarFavorito={
                    alternarFavorito
                  }
                />

              )
            )}

          </div>

        ) : (

          <div className="vazio-cardapio">
            <span>🔎</span>

            <h3>
              Nenhum produto encontrado
            </h3>

            <p>
              Tente alterar sua busca.
            </p>
          </div>

        )}

      </section>

    </main>
  )
}

export default Cardapio