// Lista de produtos disponíveis no cardápio

const produtos = [
  {
    id: 1,
    nome: 'Cuscuz Nordestino',
    categoria: 'CUSCUZ',
    descricao: 'Cuscuz recheado com carne de sol e queijo coalho.',
    preco: 18.90,
    imagem: '🌽'
  },

  {
    id: 2,
    nome: 'Tapioca de Carne de Sol',
    categoria: 'TAPIOCA',
    descricao: 'Tapioca recheada com carne de sol e queijo coalho.',
    preco: 15.90,
    imagem: '🫓'
  },

  {
    id: 3,
    nome: 'Café Nordestino',
    categoria: 'CAFÉ',
    descricao: 'Café passado na hora acompanhado de delícias nordestinas.',
    preco: 8.50,
    imagem: '☕'
  },

  {
    id: 4,
    nome: 'Bolo de Macaxeira',
    categoria: 'BOLOS',
    descricao: 'Bolo tradicional nordestino feito com macaxeira.',
    preco: 10.90,
    imagem: '🍰'
  }
]

// Exporta a lista para ser utilizada em outras partes do sistema
export default produtos