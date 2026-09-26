import { useNavigate } from 'react-router-dom'

import './Cabecalho.css'


function Cabecalho({
  quantidadeCarrinho = 0,
  abrirCarrinho
}) {

  // Permite navegar para outras páginas
  const navigate = useNavigate()


  // ==================================================
  // VOLTAR PARA A PÁGINA INICIAL
  // ==================================================

  function voltarParaInicio() {

    navigate('/')

  }


  return (

    <header className="cabecalho">

      {/* ==================================================
          LOGO

          Agora o logo inteiro funciona como botão.
          Ao clicar, o usuário sempre volta para a página inicial.
      ================================================== */}

      <button
        type="button"
        className="logo"
        onClick={voltarParaInicio}
        aria-label="Voltar para a página inicial"
      >

        <span>🌵</span>

        <div>

          <strong>Raízes</strong>

          <small>do Nordeste</small>

        </div>

      </button>


      {/* ==================================================
          CARRINHO
      ================================================== */}

      <button
        type="button"
        className="botao-carrinho"
        aria-label="Abrir carrinho"
        onClick={abrirCarrinho}
      >

        🛒

        {quantidadeCarrinho > 0 && (

          <span className="contador-carrinho">

            {quantidadeCarrinho}

          </span>

        )}

      </button>

    </header>

  )
}


export default Cabecalho