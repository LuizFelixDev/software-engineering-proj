const apiUrl = 'http://localhost:3000/produtos';
const defaultImage = 'https://via.placeholder.com/150';

// ==========================
// Carregar todos os produtos
// ==========================
async function carregarCards() {
  try {
    const response = await fetch(apiUrl);
    const produtos = await response.json();

    const container = document.getElementById('cards-box');
    container.innerHTML = '';

    produtos.forEach((item) => {
      const card = criarCard(item);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar os cartões:', error);
  }
}

// ==========================
// Criar card dinamicamente
// ==========================
function criarCard(item) {
  const card = document.createElement('section');
  card.classList.add('card');
  card.dataset.id = item.id; // ✅ guarda o ID do produto

  const imagem = item.imagem ? item.imagem : defaultImage;

  card.innerHTML = `
    <img src="${imagem}" alt="${item.nome}">
    <p><strong>${item.nome}</strong></p>
    <p>R$ ${item.preco}</p>
  `;

  card.addEventListener('click', () => mostrarDetalhes(item));
  return card;
}

// ==========================
// Modal de Detalhes
// ==========================
function mostrarDetalhes(item) {
  document.getElementById('modal-imagem').src = item.imagem ? item.imagem : defaultImage;
  document.getElementById('modal-nome').textContent = item.nome;
  document.getElementById('modal-preco').textContent = `Preço: R$ ${item.preco}`;

  const botoes = document.getElementById('modal-botoes');
  botoes.innerHTML = `
    <button id="btn-alterar">Alterar</button>
    <button id="btn-excluir">Excluir</button>
  `;

  document.getElementById('btn-excluir').addEventListener('click', () => excluirProduto(item.id));
  document.getElementById('btn-alterar').addEventListener('click', () => abrirFormularioEdicao(item));

  document.getElementById('modal').style.display = 'flex';
}

// ==========================
// Excluir produto
// ==========================
async function excluirProduto(id) {
  const confirmacao = confirm('Tem certeza que deseja excluir este produto?');
  if (!confirmacao) return;

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Produto excluído com sucesso!');
      fecharModal();
      carregarCards();
    } else {
      alert('Erro ao excluir produto.');
    }
  } catch (error) {
    console.error('Erro ao excluir:', error);
  }
}

// ==========================
// Abrir formulário de edição
// ==========================
function abrirFormularioEdicao(item) {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modal-editar').style.display = 'flex';

  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-nome').value = item.nome;
  document.getElementById('edit-descricao').value = item.descricao || '';
  document.getElementById('edit-marca').value = item.marca || '';
  document.getElementById('edit-categoria').value = item.categoria || '';
  document.getElementById('edit-quantidade').value = item.quantidade || 0;
  document.getElementById('edit-preco').value = item.preco || 0;
  document.getElementById('edit-estoque').value = item.estoque || 0;
  document.getElementById('edit-estoqueM').value = item.estoqueM || 0;
}

// ==========================
// Atualizar produto (PUT)
// ==========================
document.getElementById('form-editar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const produtoAtualizado = {
    id: Number(document.getElementById('edit-id').value),
    nome: document.getElementById('edit-nome').value,
    descricao: document.getElementById('edit-descricao').value,
    marca: document.getElementById('edit-marca').value,
    categoria: document.getElementById('edit-categoria').value,
    quantidade: Number(document.getElementById('edit-quantidade').value),
    preco: Number(document.getElementById('edit-preco').value),
    estoque: Number(document.getElementById('edit-estoque').value),
    estoqueM: Number(document.getElementById('edit-estoqueM').value),
  };

  console.log('Enviando produto atualizado:', produtoAtualizado);

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtoAtualizado),
    });

    if (response.ok) {
      alert('Produto atualizado com sucesso!');
      fecharModalEditar();
      carregarCards();
    } else {
      alert('Erro ao atualizar o produto.');
      console.log(await response.text());
    }
  } catch (error) {
    console.error('Erro ao atualizar:', error);
  }
});

// ==========================
// Fechar modais
// ==========================
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

function fecharModalEditar() {
  document.getElementById('modal-editar').style.display = 'none';
}

document.getElementById('close-modal').addEventListener('click', fecharModal);
document.getElementById('close-editar').addEventListener('click', fecharModalEditar);

document.getElementById('modal').addEventListener('click', (event) => {
  if (event.target.id === 'modal') fecharModal();
});

document.getElementById('modal-editar').addEventListener('click', (event) => {
  if (event.target.id === 'modal-editar') fecharModalEditar();
});

window.addEventListener('DOMContentLoaded', carregarCards);
