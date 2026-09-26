import { useNavigate } from 'react-router-dom'
import './Perfil.css'

function Perfil({ usuario, sair }) {
  const navigate = useNavigate()

  function fazerLogout() {
    sair()
    navigate('/')
  }

  if (!usuario) {
    return (
      <main className="pagina-perfil">

        <section className="perfil-login">

          <div className="icone-perfil">
            👤
          </div>

          <h1>Você ainda não entrou</h1>

          <p>
            Entre na sua conta para acessar seu
            perfil e acompanhar seus pedidos.
          </p>

          <button
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>

          <button
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
    <main className="pagina-perfil">

      <section className="cabecalho-perfil">

        <div className="avatar-perfil">
          {usuario.nome
            ? usuario.nome.charAt(0).toUpperCase()
            : '👤'}
        </div>

        <div>
          <h1>{usuario.nome}</h1>
          <p>{usuario.email}</p>
        </div>

      </section>

      <section className="dados-perfil">

        <h2>Meus dados</h2>

        <div className="campo-perfil">
          <span>👤</span>

          <div>
            <small>Nome</small>
            <strong>{usuario.nome}</strong>
          </div>
        </div>

        <div className="campo-perfil">
          <span>📧</span>

          <div>
            <small>E-mail</small>
            <strong>{usuario.email}</strong>
          </div>
        </div>

        <div className="campo-perfil">
          <span>📱</span>

          <div>
            <small>Telefone</small>
            <strong>
              {usuario.telefone || 'Não informado'}
            </strong>
          </div>
        </div>

      </section>

      <section className="atalhos-perfil">

        <h2>Minha conta</h2>

        <button
          onClick={() => navigate('/pedidos')}
        >
          <span>📦</span>

          <div>
            <strong>Meus pedidos</strong>
            <small>
              Acompanhe seus pedidos
            </small>
          </div>

          <b>›</b>
        </button>

        <button
          onClick={() => navigate('/favoritos')}
        >
          <span>❤️</span>

          <div>
            <strong>Meus favoritos</strong>
            <small>
              Produtos que você salvou
            </small>
          </div>

          <b>›</b>
        </button>

        <button
          onClick={() => navigate('/endereco')}
        >
          <span>📍</span>

          <div>
            <strong>Meu endereço</strong>
            <small>
              Gerencie seu endereço de entrega
            </small>
          </div>

          <b>›</b>
        </button>

        <button
          onClick={() => navigate('/fidelidade')}
        >
          <span>⭐</span>

          <div>
            <strong>Programa de fidelidade</strong>
            <small>
              Veja seus pontos e benefícios
            </small>
          </div>

          <b>›</b>
        </button>

      </section>

      <section className="acoes-perfil">

        <button
          onClick={fazerLogout}
          className="botao-sair"
        >
          🚪 Sair da conta
        </button>

      </section>

    </main>
  )
}

export default Perfil