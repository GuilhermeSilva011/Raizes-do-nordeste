import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Endereco.css'

function Endereco({
  usuario,
  endereco,
  salvarEndereco
}) {
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    cep: endereco?.cep || '',
    rua: endereco?.rua || '',
    numero: endereco?.numero || '',
    complemento: endereco?.complemento || '',
    bairro: endereco?.bairro || '',
    cidade: endereco?.cidade || '',
    estado: endereco?.estado || ''
  })

  const [erro, setErro] = useState('')
  const [salvo, setSalvo] = useState(false)

  function alterarCampo(evento) {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })

    setSalvo(false)
  }

  function enviarFormulario(evento) {
    evento.preventDefault()
    setErro('')
    setSalvo(false)

    if (
      !formulario.cep ||
      !formulario.rua ||
      !formulario.numero ||
      !formulario.bairro ||
      !formulario.cidade ||
      !formulario.estado
    ) {
      setErro(
        'Preencha todos os campos obrigatórios.'
      )
      return
    }

    salvarEndereco(formulario)
    setSalvo(true)
  }

  if (!usuario) {
    return (
      <main className="pagina-endereco">

        <section className="endereco-login">

          <div className="icone-endereco">
            📍
          </div>

          <h1>Meu endereço</h1>

          <p>
            Entre na sua conta para cadastrar e gerenciar
            seu endereço de entrega.
          </p>

          <button
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>

          <button
            className="botao-secundario-endereco"
            onClick={() => navigate('/cadastro')}
          >
            Criar conta
          </button>

        </section>

      </main>
    )
  }

  return (
    <main className="pagina-endereco">

      <section className="cabecalho-endereco">

        <span>📍</span>

        <div>
          <h1>Meu endereço</h1>
          <p>
            Cadastre seu endereço para facilitar seus
            próximos pedidos.
          </p>
        </div>

      </section>

      {salvo && (
        <div className="mensagem-sucesso-endereco">
          ✅ Endereço salvo com sucesso!
        </div>
      )}

      {erro && (
        <div className="mensagem-erro-endereco">
          ⚠️ {erro}
        </div>
      )}

      <form
        className="formulario-endereco"
        onSubmit={enviarFormulario}
      >

        <div className="titulo-formulario-endereco">
          <h2>
            {endereco
              ? 'Editar endereço'
              : 'Cadastrar endereço'}
          </h2>

          <p>
            Os campos marcados com * são obrigatórios.
          </p>
        </div>

        <div className="grupo-campo-endereco">
          <label htmlFor="cep">
            CEP *
          </label>

          <input
            id="cep"
            name="cep"
            type="text"
            placeholder="00000-000"
            value={formulario.cep}
            onChange={alterarCampo}
            maxLength="9"
          />
        </div>

        <div className="linha-endereco">

          <div className="grupo-campo-endereco campo-maior">
            <label htmlFor="rua">
              Rua *
            </label>

            <input
              id="rua"
              name="rua"
              type="text"
              placeholder="Nome da rua"
              value={formulario.rua}
              onChange={alterarCampo}
            />
          </div>

          <div className="grupo-campo-endereco campo-numero">
            <label htmlFor="numero">
              Número *
            </label>

            <input
              id="numero"
              name="numero"
              type="text"
              placeholder="123"
              value={formulario.numero}
              onChange={alterarCampo}
            />
          </div>

        </div>

        <div className="grupo-campo-endereco">
          <label htmlFor="complemento">
            Complemento
          </label>

          <input
            id="complemento"
            name="complemento"
            type="text"
            placeholder="Apartamento, bloco, casa..."
            value={formulario.complemento}
            onChange={alterarCampo}
          />
        </div>

        <div className="grupo-campo-endereco">
          <label htmlFor="bairro">
            Bairro *
          </label>

          <input
            id="bairro"
            name="bairro"
            type="text"
            placeholder="Nome do bairro"
            value={formulario.bairro}
            onChange={alterarCampo}
          />
        </div>

        <div className="linha-endereco">

          <div className="grupo-campo-endereco campo-maior">
            <label htmlFor="cidade">
              Cidade *
            </label>

            <input
              id="cidade"
              name="cidade"
              type="text"
              placeholder="Sua cidade"
              value={formulario.cidade}
              onChange={alterarCampo}
            />
          </div>

          <div className="grupo-campo-endereco campo-estado">
            <label htmlFor="estado">
              Estado *
            </label>

            <select
              id="estado"
              name="estado"
              value={formulario.estado}
              onChange={alterarCampo}
            >
              <option value="">
                UF
              </option>

              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>

        </div>

        <div className="acoes-endereco">

          <button
            type="button"
            className="botao-voltar-endereco"
            onClick={() => navigate('/perfil')}
          >
            Voltar
          </button>

          <button
            type="submit"
            className="botao-salvar-endereco"
          >
            💾 Salvar endereço
          </button>

        </div>

      </form>

      {endereco && (
        <section className="resumo-endereco">

          <div className="topo-resumo-endereco">
            <h2>Endereço cadastrado</h2>
            <span>📍</span>
          </div>

          <p>
            {endereco.rua}, {endereco.numero}
            {endereco.complemento
              ? ` - ${endereco.complemento}`
              : ''}
          </p>

          <p>
            {endereco.bairro} - {endereco.cidade}/
            {endereco.estado}
          </p>

          <small>
            CEP: {endereco.cep}
          </small>

        </section>
      )}

    </main>
  )
}

export default Endereco