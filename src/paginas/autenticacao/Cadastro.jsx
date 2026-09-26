import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Autenticacao.css'

function Cadastro({ cadastrar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] =
    useState('')

  const [erro, setErro] = useState('')

  function enviarFormulario(evento) {
    evento.preventDefault()

    setErro('')

    if (
      !nome ||
      !email ||
      !telefone ||
      !senha ||
      !confirmarSenha
    ) {
      setErro(
        'Preencha todos os campos.'
      )
      return
    }

    if (senha.length < 6) {
      setErro(
        'A senha precisa ter pelo menos 6 caracteres.'
      )
      return
    }

    if (senha !== confirmarSenha) {
      setErro(
        'As senhas não são iguais.'
      )
      return
    }

    const usuariosSalvos =
      JSON.parse(
        localStorage.getItem('raizes_usuarios')
      ) || []

    const emailJaCadastrado =
      usuariosSalvos.some(
        (usuario) =>
          usuario.email.toLowerCase() ===
          email.toLowerCase()
      )

    if (emailJaCadastrado) {
      setErro(
        'Este e-mail já está cadastrado.'
      )
      return
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      telefone,
      senha
    }

    localStorage.setItem(
      'raizes_usuarios',
      JSON.stringify([
        ...usuariosSalvos,
        novoUsuario
      ])
    )

    cadastrar(novoUsuario)
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
          <h1>Criar minha conta</h1>
          <p>
            Cadastre-se para fazer seus pedidos.
          </p>
        </div>

        {erro && (
          <div className="mensagem-erro">
            ⚠️ {erro}
          </div>
        )}

        <form onSubmit={enviarFormulario}>

          <label>
            Nome completo
          </label>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(evento) =>
              setNome(evento.target.value)
            }
          />

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
            Telefone
          </label>

          <input
            type="tel"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(evento) =>
              setTelefone(evento.target.value)
            }
          />

          <label>
            Senha
          </label>

          <input
            type="password"
            placeholder="Mínimo de 6 caracteres"
            value={senha}
            onChange={(evento) =>
              setSenha(evento.target.value)
            }
          />

          <label>
            Confirmar senha
          </label>

          <input
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmarSenha}
            onChange={(evento) =>
              setConfirmarSenha(
                evento.target.value
              )
            }
          />

          <button
            type="submit"
            className="botao-autenticacao"
          >
            Criar conta
          </button>

        </form>

        <div className="separador-autenticacao">
          <span>ou</span>
        </div>

        <p className="texto-cadastro">
          Já possui uma conta?
        </p>

        <Link
          to="/login"
          className="link-cadastro"
        >
          Entrar na minha conta
        </Link>

      </section>

    </main>
  )
}

export default Cadastro