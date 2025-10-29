    const apiUrl = 'http://localhost:3000/produtos';
    const defaultImage = 'https://via.placeholder.com/150';
    let produtoAtual = null;

    // Cria um card
    function criarCard(item) {
      const card = document.createElement('section');
      card.classList.add('card');

      const imagem = item.imagem ? item.imagem : defaultImage;

      card.innerHTML = `
        <img src="${imagem}" alt="${item.nome}">
        <p><strong>${item.nome}</strong></p>
        <p>R$ ${item.preco}</p>
      `;

      // Abre o modal ao clicar
      card.addEventListener('click', () => mostrarDetalhes(item));

      return card;
    }

    // Carrega os produtos
    async function carregarCards() {
      try {
        const response = await fetch(apiUrl);
        const dados = await response.json();

        const container = document.getElementById('cards-box');
        container.innerHTML = '';

        dados.forEach(item => {
          const card = criarCard(item);
          container.appendChild(card);
        });
      } catch (error) {
        console.error('Erro ao carregar os cartões:', error);
      }
    }

    // Mostra o modal com os detalhes
    function mostrarDetalhes(item) {
      produtoAtual = item; // salva o produto atual para exclusão
      document.getElementById('modal-imagem').src = item.imagem ? item.imagem : defaultImage;
      document.getElementById('modal-nome').textContent = item.nome;
      document.getElementById('modal-preco').textContent = `Preço: R$ ${item.preco}`;
      document.getElementById('modal').style.display = 'flex';
    }

    // Fecha o modal
    function fecharModal() {
      document.getElementById('modal').style.display = 'none';
    }

    document.getElementById('close-modal').addEventListener('click', fecharModal);

    // Fecha clicando fora
    document.getElementById('modal').addEventListener('click', (event) => {
      if (event.target.id === 'modal') fecharModal();
    });

    // Botão de excluir
    document.getElementById('btn-excluir').addEventListener('click', async () => {
      if (!produtoAtual || !produtoAtual.id) return;

      if (confirm(`Tem certeza que deseja excluir "${produtoAtual.nome}"?`)) {
        try {
          const response = await fetch(`${apiUrl}/${produtoAtual.id}`, { method: 'DELETE' });

          if (response.ok) {
            alert('Produto excluído com sucesso!');
            fecharModal();
            carregarCards(); // recarrega os cards
          } else {
            alert('Erro ao excluir o produto.');
          }
        } catch (error) {
          console.error('Erro na exclusão:', error);
        }
      }
    });

    // Botão de alterar (ainda sem ação)
    document.getElementById('btn-editar').addEventListener('click', () => {
      alert('Função de alteração ainda não implementada.');
    });

    window.addEventListener('DOMContentLoaded', carregarCards);