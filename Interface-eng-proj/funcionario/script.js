/* ===========================
   Painel Admin - Vênus Suplementos
   CRUD Completo com Fetch API
   =========================== */

const apiUrl = 'http://localhost:3000/produtos';
let produtos = [];
let produtoSelecionado = null;

/* ---------- Utils ---------- */
const formatarMoeda = (valor) =>
  `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;

function mostrarMensagem(msg, tipo = 'info') {
  const div = document.createElement('div');
  div.className = `alert ${tipo}`;
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

/* ---------- Inicialização ---------- */
document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  configurarEventos();
});

/* ---------- CRUD ---------- */
async function carregarProdutos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    produtos = await response.json();
    renderizarProdutos(produtos);
  } catch (error) {
    console.error(error);
    mostrarMensagem('Erro ao conectar com o servidor.', 'erro');
  }
}

function renderizarProdutos(lista) {
  const tbody = document.querySelector('#tabela-produtos tbody');
  tbody.innerHTML = '';

  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  lista.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${formatarMoeda(p.preco)}</td>
      <td>${p.estoque}</td>
      <td>${p.estoqueMinimo ?? '-'}</td>
      <td>
        <button class="btn-secundario editar" data-id="${p.id}">Editar</button>
        <button class="btn-secundario excluir" data-id="${p.id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.editar').forEach((btn) => {
    btn.addEventListener('click', () => abrirModalEdicao(btn.dataset.id));
  });
  document.querySelectorAll('.excluir').forEach((btn) => {
    btn.addEventListener('click', () => excluirProduto(btn.dataset.id));
  });
}

async function criarProduto(produto) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error('Erro ao criar produto');
}

async function atualizarProduto(produto) {
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error('Erro ao atualizar produto');
}

async function excluirProduto(id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    mostrarMensagem('Erro ao excluir produto.', 'erro');
    return;
  }
  produtos = produtos.filter((p) => p.id != id);
  renderizarProdutos(produtos);
  mostrarMensagem('Produto excluído com sucesso.', 'sucesso');
}

/* ---------- Modal ---------- */
function abrirModalEdicao(id = null) {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  const titulo = document.getElementById('modal-titulo');

  if (id) {
    produtoSelecionado = produtos.find((p) => p.id == id);
    titulo.textContent = 'Editar Produto';
    preencherCampos(produtoSelecionado);
  } else {
    produtoSelecionado = null;
    titulo.textContent = 'Novo Produto';
    limparCampos();
  }
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

function preencherCampos(produto) {
  document.getElementById('nome').value = produto.nome;
  document.getElementById('preco').value = produto.preco;
  document.getElementById('estoque').value = produto.estoque;
  document.getElementById('estoqueMinimo').value = produto.estoqueMinimo ?? '';
  document.getElementById('imagem').value = produto.imagem ?? '';
}

function limparCampos() {
  document.getElementById('form-produto').reset();
}

/* ---------- Eventos ---------- */
function configurarEventos() {
  document.getElementById('btn-novo').addEventListener('click', () => abrirModalEdicao());
  document.querySelectorAll('.fechar-modal').forEach((b) => b.addEventListener('click', fecharModal));

  document.getElementById('salvar-produto').addEventListener('click', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const estoque = parseInt(document.getElementById('estoque').value);
    const estoqueMinimo = parseInt(document.getElementById('estoqueMinimo').value) || 0;
    const imagem = document.getElementById('imagem').value.trim();

    if (!nome || isNaN(preco) || isNaN(estoque)) {
      mostrarMensagem('Preencha todos os campos obrigatórios.', 'erro');
      return;
    }

    const produto = { nome, preco, estoque, estoqueMinimo, imagem };

    try {
      if (produtoSelecionado) {
        produto.id = produtoSelecionado.id;
        await atualizarProduto(produto);
        mostrarMensagem('Produto atualizado com sucesso!', 'sucesso');
      } else {
        await criarProduto(produto);
        mostrarMensagem('Produto criado com sucesso!', 'sucesso');
      }

      fecharModal();
      await carregarProdutos();
    } catch (error) {
      console.error(error);
      mostrarMensagem('Erro ao salvar produto.', 'erro');
    }
  });

  document.getElementById('filtro').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = produtos.filter((p) =>
      p.nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(filtrados);
  });

  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') fecharModal();
  });
}
