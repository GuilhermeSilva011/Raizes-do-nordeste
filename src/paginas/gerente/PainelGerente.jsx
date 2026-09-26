import { useState } from 'react';
import './PainelGerente.css';

function PainelGerente({
  pedidos,
  produtos,
  atualizarProdutos,
  alterarStatusPedido,
  sairGerente,
}) {
  const [abaAtiva, setAbaAtiva] = useState('dashboard');

  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    categoria: 'CUSCUZ',
    preco: '',
    descricao: '',
    imagem: '',
  });

  const [filiais, setFiliais] = useState(() => {
    try {
      const salvas = localStorage.getItem('raizes_filiais');
      return salvas
        ? JSON.parse(salvas)
        : [
            {
              id: 1,
              nome: 'Raízes do Nordeste - Matriz',
              cidade: 'São Paulo',
              estado: 'SP',
              ativa: true,
            },
          ];
    } catch {
      return [
        {
          id: 1,
          nome: 'Raízes do Nordeste - Matriz',
          cidade: 'São Paulo',
          estado: 'SP',
          ativa: true,
        },
      ];
    }
  });

  const [funcionarios, setFuncionarios] = useState(() => {
    try {
      const salvos = localStorage.getItem('raizes_funcionarios');
      return salvos ? JSON.parse(salvos) : [];
    } catch {
      return [];
    }
  });

  const [novaFilial, setNovaFilial] = useState({
    nome: '',
    cidade: '',
    estado: '',
  });

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: 'Atendente',
    setor: 'Atendimento',
    filial: '',
  });

  const [mensagem, setMensagem] = useState('');

  const salvarFiliais = (lista) => {
    setFiliais(lista);
    localStorage.setItem('raizes_filiais', JSON.stringify(lista));
  };

  const salvarFuncionarios = (lista) => {
    setFuncionarios(lista);
    localStorage.setItem('raizes_funcionarios', JSON.stringify(lista));
  };

  const mostrarMensagem = (texto) => {
    setMensagem(texto);

    setTimeout(() => {
      setMensagem('');
    }, 3000);
  };

  /*
   * ==========================================================
   * PRODUTOS
   * ==========================================================
   */

  const abrirNovoProduto = () => {
    setProdutoEditando(null);

    setNovoProduto({
      nome: '',
      categoria: 'CUSCUZ',
      preco: '',
      descricao: '',
      imagem: '',
    });
  };

  const editarProduto = (produto) => {
    setProdutoEditando(produto.id);

    setNovoProduto({
      nome: produto.nome || '',
      categoria: produto.categoria || 'CUSCUZ',
      preco: produto.preco || '',
      descricao: produto.descricao || '',
      imagem: produto.imagem || '',
    });

    setAbaAtiva('produtos');
  };

  const salvarProduto = () => {
    if (!novoProduto.nome.trim()) {
      mostrarMensagem('Digite o nome do produto.');
      return;
    }

    if (!novoProduto.preco) {
      mostrarMensagem('Digite o preço do produto.');
      return;
    }

    if (produtoEditando) {
      const produtosAtualizados = produtos.map((produto) =>
        produto.id === produtoEditando
          ? {
              ...produto,
              ...novoProduto,
              preco: Number(novoProduto.preco),
            }
          : produto
      );

      atualizarProdutos(produtosAtualizados);
      mostrarMensagem('Produto atualizado com sucesso!');
    } else {
      const produtoCriado = {
        id: Date.now(),
        nome: novoProduto.nome,
        categoria: novoProduto.categoria,
        preco: Number(novoProduto.preco),
        descricao: novoProduto.descricao,
        imagem: novoProduto.imagem,
      };

      atualizarProdutos([...produtos, produtoCriado]);
      mostrarMensagem('Produto cadastrado com sucesso!');
    }

    setProdutoEditando(null);

    setNovoProduto({
      nome: '',
      categoria: 'CUSCUZ',
      preco: '',
      descricao: '',
      imagem: '',
    });
  };

  const excluirProduto = (id) => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este produto?'
    );

    if (!confirmar) {
      return;
    }

    const produtosAtualizados = produtos.filter(
      (produto) => produto.id !== id
    );

    atualizarProdutos(produtosAtualizados);

    mostrarMensagem('Produto excluído com sucesso!');
  };

  /*
   * ==========================================================
   * PEDIDOS
   * ==========================================================
   */

  // O gerente acompanha o fluxo, mas não opera o preparo/atendimento.
  // A única alteração administrativa mantida aqui é o cancelamento.
  const cancelarPedido = (pedido) => {
    const confirmar = window.confirm(
      `Deseja cancelar o pedido #${pedido.numero}?`
    );

    if (!confirmar) {
      return;
    }

    alterarStatusPedido(
      pedido.numero,
      'Cancelado',
      {
        id: null,
        nome: 'Gerente',
        cargo: 'Gerente',
        setor: 'Gerência',
      }
    );

    mostrarMensagem(
      `Pedido #${pedido.numero} cancelado.`
    );
  };

  const pedidosPendentes = pedidos.filter(
    (pedido) =>
      pedido.status !== 'Finalizado' &&
      pedido.status !== 'Cancelado'
  );

  const pedidosFinalizados = pedidos.filter(
    (pedido) => pedido.status === 'Finalizado'
  );

  const pedidosCancelados = pedidos.filter(
    (pedido) => pedido.status === 'Cancelado'
  );

  /*
   * ==========================================================
   * FILIAIS
   * ==========================================================
   */

  const cadastrarFilial = () => {
    if (!novaFilial.nome.trim()) {
      mostrarMensagem('Digite o nome da filial.');
      return;
    }

    if (!novaFilial.cidade.trim()) {
      mostrarMensagem('Digite a cidade da filial.');
      return;
    }

    if (!novaFilial.estado.trim()) {
      mostrarMensagem('Digite o estado da filial.');
      return;
    }

    const filial = {
      id: Date.now(),
      nome: novaFilial.nome,
      cidade: novaFilial.cidade,
      estado: novaFilial.estado.toUpperCase(),
      ativa: true,
    };

    salvarFiliais([...filiais, filial]);

    setNovaFilial({
      nome: '',
      cidade: '',
      estado: '',
    });

    mostrarMensagem('Filial cadastrada com sucesso!');
  };

  const alterarStatusFilial = (id) => {
    const atualizadas = filiais.map((filial) =>
      filial.id === id
        ? {
            ...filial,
            ativa: !filial.ativa,
          }
        : filial
    );

    salvarFiliais(atualizadas);
  };

  /*
   * ==========================================================
   * FUNCIONÁRIOS
   * ==========================================================
   */

  const cadastrarFuncionario = () => {
    if (!novoFuncionario.nome.trim()) {
      mostrarMensagem('Digite o nome do funcionário.');
      return;
    }

    if (!novoFuncionario.email.trim()) {
      mostrarMensagem('Digite o e-mail do funcionário.');
      return;
    }

    if (!novoFuncionario.senha.trim()) {
      mostrarMensagem('Digite uma senha para o funcionário.');
      return;
    }

    if (novoFuncionario.senha.trim().length < 4) {
      mostrarMensagem('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    if (!novoFuncionario.setor) {
      mostrarMensagem('Selecione o setor do funcionário.');
      return;
    }

    if (!novoFuncionario.filial) {
      mostrarMensagem('Selecione a filial do funcionário.');
      return;
    }

    const emailJaCadastrado = funcionarios.some(
      (funcionario) =>
        funcionario.email?.toLowerCase().trim() ===
        novoFuncionario.email.toLowerCase().trim()
    );

    if (emailJaCadastrado) {
      mostrarMensagem('Já existe um funcionário com este e-mail.');
      return;
    }

    const funcionario = {
      id: Date.now(),
      nome: novoFuncionario.nome.trim(),
      email: novoFuncionario.email.toLowerCase().trim(),
      senha: novoFuncionario.senha,
      cargo: novoFuncionario.cargo,
      setor: novoFuncionario.setor,
      filial: novoFuncionario.filial,
      ativo: true,

      // Controle operacional do funcionário.
      // Estes campos serão usados pelo login operacional
      // e pelo controle de entrada e saída por setor.
      setorAtual: null,
      inicioSessaoAtual: null,
      historicoSetores: [],
    };

    salvarFuncionarios([...funcionarios, funcionario]);

    setNovoFuncionario({
      nome: '',
      email: '',
      senha: '',
      cargo: 'Atendente',
      setor: 'Atendimento',
      filial: '',
    });

    mostrarMensagem('Funcionário cadastrado com sucesso!');
  };

  const alterarStatusFuncionario = (id) => {
    const atualizados = funcionarios.map((funcionario) =>
      funcionario.id === id
        ? {
            ...funcionario,
            ativo: !funcionario.ativo,
          }
        : funcionario
    );

    salvarFuncionarios(atualizados);
  };

  /*
   * ==========================================================
   * FUNÇÕES AUXILIARES
   * ==========================================================
   */

  const formatarPreco = (preco) => {
    return Number(preco || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatarData = (data) => {
    if (!data) {
      return '-';
    }

    try {
      return new Date(data).toLocaleString('pt-BR');
    } catch {
      return data;
    }
  };

  const quantidadeTotal = pedidos.reduce(
    (total, pedido) => total + (pedido.itens?.length || 0),
    0
  );

  return (
    <div className="painel-gerente">

      {/* =====================================================
          CABEÇALHO
      ====================================================== */}

      <header className="cabecalho-gerente">
        <div>
          <span className="subtitulo-gerente">
            ÁREA ADMINISTRATIVA
          </span>

          <h1>
            Painel do Gerente
          </h1>

          <p>
            Gerencie produtos, pedidos, filiais e funcionários.
          </p>
        </div>

        <button
          className="botao-sair-gerente"
          onClick={sairGerente}
        >
          🚪 Sair
        </button>
      </header>

      {/* =====================================================
          MENSAGEM
      ====================================================== */}

      {mensagem && (
        <div className="mensagem-gerente">
          {mensagem}
        </div>
      )}

      {/* =====================================================
          MENU
      ====================================================== */}

      <nav className="menu-gerente">

        <button
          className={abaAtiva === 'dashboard' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('dashboard')}
        >
          📊 Dashboard
        </button>

        <button
          className={abaAtiva === 'pedidos' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('pedidos')}
        >
          🧾 Pedidos
        </button>

        <button
          className={abaAtiva === 'produtos' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('produtos')}
        >
          🍽️ Produtos
        </button>

        <button
          className={abaAtiva === 'filiais' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('filiais')}
        >
          🏪 Filiais
        </button>

        <button
          className={abaAtiva === 'funcionarios' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('funcionarios')}
        >
          👥 Funcionários
        </button>

      </nav>

      <main className="conteudo-gerente">

        {/* ===================================================
            DASHBOARD
        ==================================================== */}

        {abaAtiva === 'dashboard' && (
          <section>

            <div className="titulo-secao-gerente">
              <h2>Visão geral</h2>

              <p>
                Acompanhe o funcionamento do estabelecimento.
              </p>
            </div>

            <div className="cards-dashboard">

              <div className="card-dashboard">
                <span>🧾</span>

                <strong>
                  {pedidos.length}
                </strong>

                <p>
                  Total de pedidos
                </p>
              </div>

              <div className="card-dashboard">
                <span>⏳</span>

                <strong>
                  {pedidosPendentes.length}
                </strong>

                <p>
                  Pedidos em andamento
                </p>
              </div>

              <div className="card-dashboard">
                <span>✅</span>

                <strong>
                  {pedidosFinalizados.length}
                </strong>

                <p>
                  Pedidos finalizados
                </p>
              </div>

              <div className="card-dashboard">
                <span>❌</span>

                <strong>
                  {pedidosCancelados.length}
                </strong>

                <p>
                  Pedidos cancelados
                </p>
              </div>

              <div className="card-dashboard">
                <span>🍽️</span>

                <strong>
                  {produtos.length}
                </strong>

                <p>
                  Produtos cadastrados
                </p>
              </div>

              <div className="card-dashboard">
                <span>🏪</span>

                <strong>
                  {filiais.length}
                </strong>

                <p>
                  Filiais
                </p>
              </div>

              <div className="card-dashboard">
                <span>👥</span>

                <strong>
                  {funcionarios.length}
                </strong>

                <p>
                  Funcionários
                </p>
              </div>

              <div className="card-dashboard">
                <span>📦</span>

                <strong>
                  {quantidadeTotal}
                </strong>

                <p>
                  Itens vendidos
                </p>
              </div>

            </div>

            <div className="resumo-pedidos-gerente">

              <div className="cabecalho-resumo">
                <div>
                  <h3>
                    Pedidos recentes
                  </h3>

                  <p>
                    Últimos pedidos realizados.
                  </p>
                </div>

                <button
                  onClick={() => setAbaAtiva('pedidos')}
                >
                  Ver todos
                </button>
              </div>

              {pedidos.length === 0 ? (
                <div className="estado-vazio-gerente">
                  <span>🧾</span>
                  <p>Nenhum pedido realizado ainda.</p>
                </div>
              ) : (
                <div className="lista-pedidos-gerente">

                  {pedidos
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((pedido) => (
                      <div
                        className="item-pedido-gerente"
                        key={pedido.numero ?? pedido.id}
                      >

                        <div>
                          <strong>
                            Pedido #{pedido.numero}
                          </strong>

                          <span>
                            {pedido.clienteNome ||
                              pedido.clienteEmail ||
                              'Cliente'}
                          </span>
                        </div>

                        <div>
                          <strong>
                            {formatarPreco(pedido.total)}
                          </strong>

                          <span>
                            {pedido.status}
                          </span>
                        </div>

                      </div>
                    ))}

                </div>
              )}

            </div>

          </section>
        )}

        {/* ===================================================
            PEDIDOS
        ==================================================== */}

        {abaAtiva === 'pedidos' && (
          <section>

            <div className="titulo-secao-gerente">

              <h2>
                Gerenciamento de pedidos
              </h2>

              <p>
                Acompanhe o andamento dos pedidos e a equipe responsável por cada etapa.
              </p>

            </div>

            {pedidos.length === 0 ? (
              <div className="estado-vazio-gerente">
                <span>🧾</span>

                <h3>
                  Nenhum pedido
                </h3>

                <p>
                  Os pedidos realizados pelos clientes aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="lista-completa-pedidos">

                {pedidos
                  .slice()
                  .reverse()
                  .map((pedido) => (

                    <article
                      className="card-pedido-gerente"
                      key={pedido.numero ?? pedido.id}
                    >

                      <div className="cabecalho-pedido-gerente">

                        <div>
                          <span className="numero-pedido">
                            Pedido #{pedido.numero}
                          </span>

                          <h3>
                            {pedido.clienteNome ||
                              'Cliente'}
                          </h3>

                          {pedido.clienteEmail && (
                            <small>
                              {pedido.clienteEmail}
                            </small>
                          )}

                          {pedido.data && (
                            <small>
                              {formatarData(pedido.data)}
                            </small>
                          )}
                        </div>

                        <div className="valor-pedido-gerente">
                          <strong>
                            {formatarPreco(pedido.total)}
                          </strong>
                        </div>

                      </div>

                      <div className="itens-pedido-gerente">

                        <h4>
                          Itens do pedido
                        </h4>

                        {pedido.itens?.map((item, index) => (
                          <div
                            className="item-produto-pedido"
                            key={`${pedido.numero}-${index}`}
                          >

                            <span>
                              {item.quantidade || 1}x
                            </span>

                            <strong>
                              {item.nome}
                            </strong>

                            <span>
                              {formatarPreco(
                                (item.preco || 0) *
                                  (item.quantidade || 1)
                              )}
                            </span>

                          </div>
                        ))}

                      </div>

                      <div className="acoes-pedido-gerente">

                        <div
                          style={{
                            display: 'grid',
                            gap: '8px',
                          }}
                        >
                          <strong>
                            Status atual: {pedido.status || 'Recebido'}
                          </strong>

                          <span>
                            📍 Setor atual: {pedido.setorAtual || '—'}
                          </span>

                          <span>
                            👤 Responsável: {
                              pedido.funcionarioAtual?.nome ||
                              'Aguardando funcionário'
                            }
                          </span>

                          <small>
                            🕐 Última atualização: {
                              formatarData(
                                pedido.ultimaAtualizacao || pedido.data
                              )
                            }
                          </small>
                        </div>

                        {Array.isArray(pedido.historicoStatus) &&
                          pedido.historicoStatus.length > 0 && (
                            <details style={{ marginTop: '14px' }}>
                              <summary
                                style={{
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                }}
                              >
                                📋 Ver histórico do pedido
                              </summary>

                              <div
                                style={{
                                  display: 'grid',
                                  gap: '8px',
                                  marginTop: '10px',
                                }}
                              >
                                {pedido.historicoStatus.map((historico, index) => (
                                  <div
                                    key={`${pedido.numero}-historico-${index}`}
                                    style={{
                                      padding: '10px',
                                      borderRadius: '10px',
                                      background: '#f8f5ef',
                                    }}
                                  >
                                    <strong>
                                      {historico.status}
                                    </strong>

                                    <div>
                                      📍 {historico.setor || '—'}
                                    </div>

                                    <div>
                                      👤 {historico.funcionarioNome || 'Sistema'}
                                    </div>

                                    <small>
                                      🕐 {formatarData(historico.dataHora)}
                                    </small>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}

                        {
                          pedido.status !== 'Finalizado' &&
                          pedido.status !== 'Cancelado' && (
                            <button
                              type="button"
                              onClick={() => cancelarPedido(pedido)}
                              style={{ marginTop: '14px' }}
                            >
                              ❌ Cancelar pedido
                            </button>
                          )
                        }

                      </div>

                    </article>

                  ))}

              </div>
            )}

          </section>
        )}

        {/* ===================================================
            PRODUTOS
        ==================================================== */}

        {abaAtiva === 'produtos' && (
          <section>

            <div className="titulo-secao-gerente">

              <div>
                <h2>
                  Produtos
                </h2>

                <p>
                  Cadastre e altere os produtos do cardápio.
                </p>
              </div>

              <button
                className="botao-principal-gerente"
                onClick={abrirNovoProduto}
              >
                ➕ Novo produto
              </button>

            </div>

            <div className="formulario-produto-gerente">

              <h3>
                {produtoEditando
                  ? 'Editar produto'
                  : 'Cadastrar produto'}
              </h3>

              <div className="grade-formulario-gerente">

                <label>
                  Nome

                  <input
                    type="text"
                    value={novoProduto.nome}
                    onChange={(event) =>
                      setNovoProduto({
                        ...novoProduto,
                        nome: event.target.value,
                      })
                    }
                    placeholder="Nome do produto"
                  />
                </label>

                <label>
                  Categoria

                  <select
                    value={novoProduto.categoria}
                    onChange={(event) =>
                      setNovoProduto({
                        ...novoProduto,
                        categoria: event.target.value,
                      })
                    }
                  >

                    <option value="CUSCUZ">
                      Cuscuz
                    </option>

                    <option value="TAPIOCA">
                      Tapioca
                    </option>

                    <option value="CAFÉ">
                      Café
                    </option>

                    <option value="BOLOS">
                      Bolos
                    </option>

                    <option value="BEBIDAS">
                      Bebidas
                    </option>

                  </select>

                </label>

                <label>
                  Preço

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={novoProduto.preco}
                    onChange={(event) =>
                      setNovoProduto({
                        ...novoProduto,
                        preco: event.target.value,
                      })
                    }
                    placeholder="0,00"
                  />
                </label>

                <label>
                  Imagem

                  <input
                    type="text"
                    value={novoProduto.imagem}
                    onChange={(event) =>
                      setNovoProduto({
                        ...novoProduto,
                        imagem: event.target.value,
                      })
                    }
                    placeholder="URL ou caminho da imagem"
                  />
                </label>

              </div>

              <label className="campo-largo-gerente">
                Descrição

                <textarea
                  value={novoProduto.descricao}
                  onChange={(event) =>
                    setNovoProduto({
                      ...novoProduto,
                      descricao: event.target.value,
                    })
                  }
                  placeholder="Descrição do produto"
                  rows="3"
                />
              </label>

              <div className="acoes-formulario-gerente">

                <button
                  className="botao-principal-gerente"
                  onClick={salvarProduto}
                >
                  {produtoEditando
                    ? '💾 Salvar alterações'
                    : '➕ Cadastrar produto'}
                </button>

                {produtoEditando && (
                  <button
                    className="botao-secundario-gerente"
                    onClick={abrirNovoProduto}
                  >
                    Cancelar edição
                  </button>
                )}

              </div>

            </div>

            <div className="lista-produtos-gerente">

              {produtos.map((produto) => (

                <article
                  className="card-produto-gerente"
                  key={produto.id}
                >

                  <div className="imagem-produto-gerente">

                    {produto.imagem ? (
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                      />
                    ) : (
                      <span>🍽️</span>
                    )}

                  </div>

                  <div className="informacoes-produto-gerente">

                    <span className="categoria-produto-gerente">
                      {produto.categoria}
                    </span>

                    <h3>
                      {produto.nome}
                    </h3>

                    <p>
                      {produto.descricao ||
                        'Sem descrição cadastrada.'}
                    </p>

                    <strong>
                      {formatarPreco(produto.preco)}
                    </strong>

                  </div>

                  <div className="acoes-produto-gerente">

                    <button
                      onClick={() =>
                        editarProduto(produto)
                      }
                    >
                      ✏️ Editar
                    </button>

                    <button
                      className="botao-excluir-gerente"
                      onClick={() =>
                        excluirProduto(produto.id)
                      }
                    >
                      🗑️ Excluir
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>
        )}

        {/* ===================================================
            FILIAIS
        ==================================================== */}

        {abaAtiva === 'filiais' && (
          <section>

            <div className="titulo-secao-gerente">

              <h2>
                Filiais
              </h2>

              <p>
                Gerencie as unidades do Raízes do Nordeste.
              </p>

            </div>

            <div className="formulario-produto-gerente">

              <h3>
                Cadastrar nova filial
              </h3>

              <div className="grade-formulario-gerente">

                <label>
                  Nome da filial

                  <input
                    type="text"
                    value={novaFilial.nome}
                    onChange={(event) =>
                      setNovaFilial({
                        ...novaFilial,
                        nome: event.target.value,
                      })
                    }
                    placeholder="Ex.: Raízes do Nordeste - Centro"
                  />
                </label>

                <label>
                  Cidade

                  <input
                    type="text"
                    value={novaFilial.cidade}
                    onChange={(event) =>
                      setNovaFilial({
                        ...novaFilial,
                        cidade: event.target.value,
                      })
                    }
                    placeholder="Cidade"
                  />
                </label>

                <label>
                  Estado

                  <input
                    type="text"
                    maxLength="2"
                    value={novaFilial.estado}
                    onChange={(event) =>
                      setNovaFilial({
                        ...novaFilial,
                        estado: event.target.value.toUpperCase(),
                      })
                    }
                    placeholder="SP"
                  />
                </label>

              </div>

              <button
                className="botao-principal-gerente"
                onClick={cadastrarFilial}
              >
                ➕ Cadastrar filial
              </button>

            </div>

            <div className="lista-filiais-gerente">

              {filiais.map((filial) => (

                <article
                  className="card-filial-gerente"
                  key={filial.id}
                >

                  <div>
                    <span>
                      🏪
                    </span>

                    <div>
                      <h3>
                        {filial.nome}
                      </h3>

                      <p>
                        {filial.cidade} - {filial.estado}
                      </p>
                    </div>
                  </div>

                  <div>

                    <span
                      className={
                        filial.ativa
                          ? 'status-ativo'
                          : 'status-inativo'
                      }
                    >
                      {filial.ativa
                        ? 'Ativa'
                        : 'Inativa'}
                    </span>

                    <button
                      onClick={() =>
                        alterarStatusFilial(
                          filial.id
                        )
                      }
                    >
                      {filial.ativa
                        ? 'Desativar'
                        : 'Ativar'}
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>
        )}

        {/* ===================================================
            FUNCIONÁRIOS
        ==================================================== */}

        {abaAtiva === 'funcionarios' && (
          <section>

            <div className="titulo-secao-gerente">

              <h2>
                Funcionários
              </h2>

              <p>
                Gerencie os funcionários das filiais.
              </p>

            </div>

            <div className="formulario-produto-gerente">

              <h3>
                Cadastrar funcionário
              </h3>

              <div className="grade-formulario-gerente">

                <label>
                  Nome

                  <input
                    type="text"
                    value={novoFuncionario.nome}
                    onChange={(event) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        nome: event.target.value,
                      })
                    }
                    placeholder="Nome completo"
                  />
                </label>

                <label>
                  E-mail

                  <input
                    type="email"
                    value={novoFuncionario.email}
                    onChange={(event) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        email: event.target.value,
                      })
                    }
                    placeholder="email@exemplo.com"
                  />
                </label>

                <label>
                  Senha de acesso

                  <input
                    type="password"
                    value={novoFuncionario.senha}
                    onChange={(event) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        senha: event.target.value,
                      })
                    }
                    placeholder="Mínimo de 4 caracteres"
                    autoComplete="new-password"
                  />
                </label>

                <label>
                  Cargo

                  <select
                    value={novoFuncionario.cargo}
                    onChange={(event) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        cargo: event.target.value,
                      })
                    }
                  >

                    <option value="Atendente">
                      Atendente
                    </option>

                    <option value="Cozinheiro">
                      Cozinheiro
                    </option>

                    <option value="Caixa">
                      Caixa
                    </option>

                  </select>

                </label>

                <label>
                  Setor de trabalho

                  <select
                    value={novoFuncionario.setor}
                    onChange={(event) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        setor: event.target.value,
                      })
                    }
                  >
                    <option value="Atendimento">
                      Atendimento / Garçom
                    </option>

                    <option value="Caixa">
                      Caixa
                    </option>

                    <option value="Preparo">
                      Preparo / Cozinha
                    </option>
                  </select>
                </label>

                <label>
                  Filial

                  <select
                    value={novoFuncionario.filial}
                    onChange={(event) =>
                      setNovoFuncionario({
                        ...novoFuncionario,
                        filial: event.target.value,
                      })
                    }
                  >

                    <option value="">
                      Selecione uma filial
                    </option>

                    {filiais
                      .filter((filial) => filial.ativa)
                      .map((filial) => (
                        <option
                          key={filial.id}
                          value={filial.nome}
                        >
                          {filial.nome}
                        </option>
                      ))}

                  </select>

                </label>

              </div>

              <button
                className="botao-principal-gerente"
                onClick={cadastrarFuncionario}
              >
                ➕ Cadastrar funcionário
              </button>

            </div>

            <div className="lista-funcionarios-gerente">

              {funcionarios.length === 0 ? (
                <div className="estado-vazio-gerente">
                  <span>👥</span>

                  <h3>
                    Nenhum funcionário cadastrado
                  </h3>

                  <p>
                    Cadastre os funcionários usando o formulário acima.
                  </p>
                </div>
              ) : (
                funcionarios.map((funcionario) => (

                  <article
                    className="card-funcionario-gerente"
                    key={funcionario.id}
                  >

                    <div className="avatar-funcionario-gerente">
                      👤
                    </div>

                    <div className="informacoes-funcionario-gerente">

                      <h3>
                        {funcionario.nome}
                      </h3>

                      <p>
                        {funcionario.email}
                      </p>

                      <span>
                        {funcionario.cargo}
                      </span>

                      <small>
                        📍 Setor: {funcionario.setor || 'Não definido'}
                      </small>

                      {funcionario.setorAtual && (
                        <small>
                          🟢 Em atividade: {funcionario.setorAtual}
                        </small>
                      )}

                      {funcionario.filial && (
                        <small>
                          🏪 {funcionario.filial}
                        </small>
                      )}

                    </div>

                    <div className="acoes-funcionario-gerente">

                      <span
                        className={
                          funcionario.ativo
                            ? 'status-ativo'
                            : 'status-inativo'
                        }
                      >
                        {funcionario.ativo
                          ? 'Ativo'
                          : 'Inativo'}
                      </span>

                      <button
                        onClick={() =>
                          alterarStatusFuncionario(
                            funcionario.id
                          )
                        }
                      >
                        {funcionario.ativo
                          ? 'Desativar'
                          : 'Ativar'}
                      </button>

                    </div>

                  </article>

                ))
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default PainelGerente;