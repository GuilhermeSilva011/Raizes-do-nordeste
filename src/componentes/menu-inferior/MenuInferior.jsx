import { NavLink } from 'react-router-dom'

import './MenuInferior.css'

function MenuInferior() {

  return (
    <nav className="menu-inferior">

      {/* INÍCIO */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `item-menu ${isActive ? 'ativo' : ''}`
        }
      >
        <span>🏠</span>
        <small>Início</small>
      </NavLink>


      {/* CARDÁPIO */}
      <NavLink
        to="/cardapio"
        className={({ isActive }) =>
          `item-menu ${isActive ? 'ativo' : ''}`
        }
      >
        <span>🍽️</span>
        <small>Cardápio</small>
      </NavLink>


      {/* PEDIDOS */}
      <NavLink
        to="/pedidos"
        className={({ isActive }) =>
          `item-menu ${isActive ? 'ativo' : ''}`
        }
      >
        <span>📦</span>
        <small>Pedidos</small>
      </NavLink>


      {/* FIDELIDADE */}
      <NavLink
        to="/fidelidade"
        className={({ isActive }) =>
          `item-menu ${isActive ? 'ativo' : ''}`
        }
      >
        <span>⭐</span>
        <small>Fidelidade</small>
      </NavLink>


      {/* PERFIL */}
      <NavLink
        to="/perfil"
        className={({ isActive }) =>
          `item-menu ${isActive ? 'ativo' : ''}`
        }
      >
        <span>👤</span>
        <small>Perfil</small>
      </NavLink>

    </nav>
  )
}

export default MenuInferior