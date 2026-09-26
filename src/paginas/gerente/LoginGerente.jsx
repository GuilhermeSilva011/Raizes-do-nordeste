import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginGerente.css';

function LoginGerente({ onEntrar }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const fazerLogin = (event) => {
    event.preventDefault();

    setErro('');

    if (!email.trim() || !senha.trim()) {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    setCarregando(true);

    /*
     * Login provisório para desenvolvimento.
     *
     * Depois podemos trocar isso por um sistema real
     * de autenticação e banco de dados.
     */

    setTimeout(() => {
      const emailCorreto = 'gerente@raizes.com';
      const senhaCorreta = '123456';

      if (
        email.toLowerCase().trim() === emailCorreto &&
        senha === senhaCorreta
      ) {
        const gerente = {
          nome: 'Gerente',
          email: emailCorreto,
          cargo: 'Gerente',
        };

        onEntrar(gerente);

        navigate('/gerente');
      } else {
        setErro(
          'E-mail ou senha incorretos.'
        );
      }

      setCarregando(false);
    }, 400);
  };

  return (
    <main className="pagina-login-gerente">

      <section className="card-login-gerente">

        <button
          className="botao-voltar-login"
          onClick={() => navigate('/')}
        >
          ← Voltar
        </button>

        <div className="icone-login-gerente">
          🔐
        </div>

        <span className="subtitulo-login-gerente">
          ÁREA ADMINISTRATIVA
        </span>

        <h1>
          Login do Gerente
        </h1>

        <p className="descricao-login-gerente">
          Entre para acessar o painel administrativo.
        </p>

        <form onSubmit={fazerLogin}>

          <label>
            E-mail

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="gerente@raizes.com"
              autoComplete="username"
            />
          </label>

          <label>
            Senha

            <input
              type="password"
              value={senha}
              onChange={(event) =>
                setSenha(event.target.value)
              }
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </label>

          {erro && (
            <div className="erro-login-gerente">
              ⚠️ {erro}
            </div>
          )}

          <button
            type="submit"
            className="botao-login-gerente"
            disabled={carregando}
          >
            {carregando
              ? 'Entrando...'
              : 'Entrar no painel'}
          </button>

        </form>

        <div className="credenciais-demo-gerente">

          <strong>
            Acesso de teste
          </strong>

          <span>
            E-mail: gerente@raizes.com
          </span>

          <span>
            Senha: 123456
          </span>

        </div>

      </section>

    </main>
  );
}

export default LoginGerente;