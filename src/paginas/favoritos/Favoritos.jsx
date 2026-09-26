import { useNavigate } from 'react-router-dom'
import Produto from '../../componentes/produto/Produto'
import './Favoritos.css'

function Favoritos({
  usuario,
  favoritos = [],
  removerFavorito,
  adicionarAoCarrinho
}) {
  const navigate = useNavigate()

  // Se o usuário não estiver logado, mostramos a tela de acesso
  if (!usuario) {
    return (
      <main className="pagina-favoritos">
        <section className="favoritos-login">
          <span>❤️</span>

          <h1>Seus favoritos</h1>

          <p>
            Entre na sua conta para salvar seus produtos favoritos.
          </p>

          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>

          <button
            type="button"
            className="botao-secundario"
            onClick={() => navigate('/cadastro')}
          >
            Criar conta
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="pagina-favoritos">

      <header className="cabecalho-favoritos">
        <h1>❤️ Meus favoritos</h1>

        <p>
          Produtos que você escolheu para guardar.
        </p>
      </header>

      {favoritos.length === 0 ? (
        <section className="favoritos-vazio">

          <span>♡</span>

          <h2>
            Você ainda não tem favoritos.
          </h2>

          <p>
            Toque no coração de um produto para salvá-lo aqui.
          </p>

          <button
            type="button"
            onClick={() => navigate('/cardapio')}
          >
            Ver cardápio
          </button>

        </section>
      ) : (

        <section className="lista-favoritos">

          {favoritos.map((produto) => (

            <article
              className="item-favorito"
              key={produto.id}
            >

              <Produto
                produto={produto}
                adicionarAoCarrinho={adicionarAoCarrinho}
              />

              <button
                type="button"
                className="botao-remover-favorito"
                onClick={() => removerFavorito(produto.id)}
              >
                ❤️ Remover dos favoritos
              </button>

            </article>

          ))}

        </section>

      )}

    </main>
  )
}

export default Favoritos