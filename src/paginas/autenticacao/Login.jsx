import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Autenticacao.css'

function Login({ entrar }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function enviarFormulario(evento) {
    evento.preventDefault()

    setErro('')

    if (!email || !senha) {
      setErro('Preencha seu e-mail e sua senha.')
      return
    }

    const usuariosSalvos =
      JSON.parse(
        localStorage.getItem('raizes_usuarios')
      ) || []

    const usuarioEncontrado =
      usuariosSalvos.find(
        (usuario) =>
          usuario.email.toLowerCase() ===
            email.toLowerCase() &&
          usuario.senha === senha
      )

    if (!usuarioEncontrado) {
      setErro('E-mail ou senha incorretos.')
      return
    }

    entrar(usuarioEncontrado)
  }

  return (
    <main className="pagina-autenticacao">

      <section className="card-autenticacao">

        <div className="logo-autenticacao">
          <span>🌵</span>
          <strong>Raízes</strong>
          <small>do Nordeste</small>
        </div>

        <div className="titulo-autenticacao">
          <h1>Bem-vindo de volta!</h1>
          <p>
            Entre na sua conta para continuar.
          </p>
        </div>

        {erro && (
          <div className="mensagem-erro">
            ⚠️ {erro}
          </div>
        )}

        <form onSubmit={enviarFormulario}>

          <label>
            E-mail
          </label>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(evento) =>
              setEmail(evento.target.value)
            }
          />

          <label>
            Senha
          </label>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(evento) =>
              setSenha(evento.target.value)
            }
          />

          <button
            type="submit"
            className="botao-autenticacao"
          >
            Entrar
          </button>

        </form>

        <div className="separador-autenticacao">
          <span>ou</span>
        </div>

        <p className="texto-cadastro">
          Ainda não possui uma conta?
        </p>

        <Link
          to="/cadastro"
          className="link-cadastro"
        >
          Criar minha conta
        </Link>

      </section>

    </main>
  )
}

export default Login