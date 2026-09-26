import { useState } from 'react'
import Produto from '../../componentes/produto/Produto'
import './inicio.css'

function Inicio({
  produtos = [],
  adicionarAoCarrinho,
  favoritos = [],
  alternarFavorito
}) {
  const [busca, setBusca] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('')

  const categorias = [
    {
      nome: 'Todos',
      valor: '',
      icone: '🍽️'
    },
    {
      nome: 'Cuscuz',
      valor: 'CUSCUZ',
      icone: '🌽'
    },
    {
      nome: 'Tapiocas',
      valor: 'TAPIOCA',
      icone: '🫓'
    },
    {
      nome: 'Cafés',
      valor: 'CAFÉ',
      icone: '☕'
    },
    {
      nome: 'Bolos',
      valor: 'BOLOS',
      icone: '🍰'
    },
    {
      nome: 'Bebidas',
      valor: 'BEBIDAS',
      icone: '🥤'
    }
  ]

  const produtosFiltrados = produtos.filter(
    (produto) => {
      const texto = `
        ${produto.nome}
        ${produto.categoria}
        ${produto.descricao}
      `.toLowerCase()

      const correspondeBusca =
        texto.includes(
          busca.toLowerCase()
        )

      const correspondeCategoria =
        categoriaSelecionada === '' ||
        produto.categoria ===
          categoriaSelecionada

      return (
        correspondeBusca &&
        correspondeCategoria
      )
    }
  )

  return (
    <main className="conteudo-principal">

      <section className="boas-vindas">

        <h1>
          Sabores que carregam histórias.
        </h1>

        <p>
          Descubra os sabores do Nordeste.
        </p>

      </section>

      <section className="pesquisa">

        <input
          type="text"
          value={busca}
          onChange={(evento) =>
            setBusca(evento.target.value)
          }
          placeholder="Buscar no cardápio..."
          aria-label="Buscar no cardápio"
        />

      </section>

      <section className="categorias">

        <div className="titulo-secao">
          <h2>Categorias</h2>

          <button
            type="button"
            onClick={() =>
              setCategoriaSelecionada('')
            }
          >
            Ver todas
          </button>
        </div>

        <div className="lista-categorias">

          {categorias.map((categoria) => (

            <button
              type="button"
              key={categoria.valor}
              className={`categoria ${
                categoriaSelecionada ===
                categoria.valor
                  ? 'ativa'
                  : ''
              }`}
              onClick={() =>
                setCategoriaSelecionada(
                  categoria.valor
                )
              }
            >

              <span>
                {categoria.icone}
              </span>

              <small>
                {categoria.nome}
              </small>

            </button>

          ))}

        </div>

      </section>

      <section className="produtos">

        <div className="titulo-secao">

          <h2>
            Mais pedidos
          </h2>

          <span>
            {produtosFiltrados.length} produto(s)
          </span>

        </div>

        {produtosFiltrados.length > 0 ? (

          <div className="lista-produtos">

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

          <div className="nenhum-produto">
            <span>🔎</span>
            <h3>
              Nenhum produto encontrado
            </h3>
            <p>
              Tente buscar por outro nome
              ou categoria.
            </p>
          </div>

        )}

      </section>

    </main>
  )
}

export default Inicio