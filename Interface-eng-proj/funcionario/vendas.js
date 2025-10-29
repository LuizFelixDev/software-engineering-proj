/* ===========================
   Painel Admin - Vênus Suplementos
   CRUD de Vendas com Fetch API
   =========================== */

   const apiUrlVendas = 'http://localhost:3000/vendas';
   const apiUrlProdutos = 'http://localhost:3000/produtos'; // Necessário para listar produtos no modal de registro manual
   let vendas = [];
   let produtos = []; // Para popular o select de registro
   let vendaSelecionada = null;
   
   /* ---------- Utils ---------- */
   // Reutilização de funções de formatação de moeda e mensagens
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
     carregarProdutosParaSelect(); // Carrega produtos para o modal de registro
     carregarVendas();
     configurarEventos();
   });
   
   /* ---------- CRUD Vendas ---------- */
   
   // Busca a lista de produtos para popular o dropdown no modal de registro de venda
   async function carregarProdutosParaSelect() {
       try {
           const response = await fetch(apiUrlProdutos);
           if (!response.ok) throw new Error('Erro ao buscar produtos');
           produtos = await response.json();
           
           const select = document.getElementById('produto_id');
           select.innerHTML = '<option value="">Selecione um Produto</option>';
           produtos.forEach(p => {
               const option = document.createElement('option');
               option.value = p.id;
               // Exibe o estoque para que o funcionário possa verificar
               option.textContent = `${p.nome} (Estoque: ${p.estoque})`;
               select.appendChild(option);
           });
   
       } catch (error) {
           console.error("Erro ao carregar produtos:", error);
           // Exibe mensagem de erro no dropdown se falhar
           document.getElementById('produto_id').innerHTML = '<option value="">Erro ao carregar produtos</option>';
       }
   }
   
   // READ: Lista todas as vendas (GET /vendas)
   async function carregarVendas() {
     try {
       const response = await fetch(apiUrlVendas);
       if (!response.ok) throw new Error('Erro ao buscar vendas');
       
       // O endpoint /relatorios/vendas retorna { resumo, detalhes }. 
       // O endpoint /vendas retorna apenas a lista. Vamos usar /vendas.
       // O controller de Vendas está configurado para /vendas.
       const data = await response.json();
       vendas = data; 
       
       renderizarVendas(vendas);
     } catch (error) {
       console.error(error);
       mostrarMensagem('Erro ao conectar com o servidor para listar vendas.', 'erro');
     }
   }
   
   function renderizarVendas(lista) {
     const tbody = document.querySelector('#tabela-vendas tbody');
     tbody.innerHTML = '';
   
     if (lista.length === 0) {
       tbody.innerHTML = `<tr><td colspan="7">Nenhuma venda registrada.</td></tr>`;
       return;
     }
   
     lista.forEach((v) => {
       const tr = document.createElement('tr');
       
       // Formata a data para um padrão mais legível
       const dataFormatada = new Date(v.data).toLocaleString('pt-BR', {
         day: '2-digit', month: '2-digit', year: 'numeric',
         hour: '2-digit', minute: '2-digit'
       });
   
       tr.innerHTML = `
         <td>${v.id}</td>
         <td>${v.produto_nome || 'Produto Removido'}</td>
         <td>${v.quantidade}</td>
         <td>${formatarMoeda(v.preco_unitario)}</td>
         <td>${formatarMoeda(v.total)}</td>
         <td>${dataFormatada}</td>
         <td>
           <button class="btn-secundario editar" data-id="${v.id}">Editar Qtd</button>
           <button class="btn-secundario excluir" data-id="${v.id}">Cancelar Venda</button>
         </td>
       `;
       tbody.appendChild(tr);
     });
   
     document.querySelectorAll('.editar').forEach((btn) => {
       btn.addEventListener('click', () => abrirModalEdicao(btn.dataset.id));
     });
     document.querySelectorAll('.excluir').forEach((btn) => {
       btn.addEventListener('click', () => excluirVenda(btn.dataset.id));
     });
   }
   
   // CREATE: Registra uma nova venda (POST /vendas)
   async function registrarVenda(dadosVenda) {
     // Espera: { produto_id, quantidade }
     const response = await fetch(apiUrlVendas, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(dadosVenda),
     });
     
     if (!response.ok) {
         // Tenta ler a mensagem de erro da API
         const errorData = await response.json().catch(() => ({ msg: 'Erro desconhecido ao registrar venda.' }));
         throw new Error(errorData.msg || 'Erro ao registrar venda.');
     }
   }
   
   // UPDATE: Atualiza a quantidade de uma venda (PUT /vendas/:id)
   async function atualizarVenda(id, quantidade) {
     // Espera: { quantidade } no body
     const response = await fetch(`${apiUrlVendas}/${id}`, {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ quantidade }),
     });
   
     if (!response.ok) {
       const errorData = await response.json().catch(() => ({ msg: 'Erro desconhecido ao atualizar venda.' }));
       throw new Error(errorData.msg || 'Erro ao atualizar venda.');
     }
   }
   
   // DELETE: Remove/Cancela uma venda (DELETE /vendas/:id)
   async function excluirVenda(id) {
     if (!confirm('Deseja realmente CANCELAR esta venda? O estoque correspondente será restaurado (reverso do RF12).')) return;
     
     try {
         const response = await fetch(`${apiUrlVendas}/${id}`, { method: 'DELETE' });
         if (!response.ok) {
             const errorData = await response.json().catch(() => ({ msg: 'Erro desconhecido ao cancelar venda.' }));
             throw new Error(errorData.msg || 'Erro ao cancelar venda.');
         }
         
         vendas = vendas.filter((v) => v.id != id);
         renderizarVendas(vendas);
         mostrarMensagem('Venda cancelada e estoque restaurado com sucesso.', 'sucesso');
     } catch (error) {
         console.error(error);
         mostrarMensagem(error.message, 'erro');
     }
   }
   
   /* ---------- Modal Vendas ---------- */
   function abrirModalEdicao(id = null) {
     const modal = document.getElementById('modal');
     const titulo = document.getElementById('modal-titulo');
     const labelProdutoId = document.getElementById('label-produto-id');
     const labelProdutoNome = document.getElementById('label-produto-nome');
     
     modal.style.display = 'flex';
   
     if (id) {
       // Modo Edição
       vendaSelecionada = vendas.find((v) => v.id == id);
       titulo.textContent = `Editar Quantidade da Venda #${vendaSelecionada.id}`;
       
       // Esconde o seletor de produto (impossível alterar o produto de uma venda)
       labelProdutoId.style.display = 'none';
       // Mostra o nome do produto para contexto
       labelProdutoNome.style.display = 'flex';
       document.getElementById('produto_nome_display').value = vendaSelecionada.produto_nome;
   
       // Preenche apenas a quantidade para edição (PUT /vendas/:id)
       document.getElementById('quantidade').value = vendaSelecionada.quantidade;
     } else {
       // Modo Registro
       vendaSelecionada = null;
       titulo.textContent = 'Registrar Nova Venda Manualmente';
   
       // Exibe o seletor de produto para registro (POST /vendas)
       labelProdutoId.style.display = 'flex';
       labelProdutoNome.style.display = 'none';
       
       limparCamposModal();
     }
   }
   
   function fecharModal() {
     document.getElementById('modal').style.display = 'none';
   }
   
   function limparCamposModal() {
     document.getElementById('form-venda').reset();
   }
   
   /* ---------- Eventos ---------- */
   function configurarEventos() {
     // Botão "Registrar Venda"
     document.getElementById('btn-novo').addEventListener('click', () => abrirModalEdicao());
     
     // Botão "Fechar Modal"
     document.querySelectorAll('.fechar-modal').forEach((b) => b.addEventListener('click', fecharModal));
   
     // Submissão do formulário de Venda
     document.getElementById('salvar-venda').addEventListener('click', async (e) => {
       e.preventDefault();
   
       const quantidade = parseInt(document.getElementById('quantidade').value);
       
       if (isNaN(quantidade) || quantidade <= 0) {
           mostrarMensagem('A quantidade deve ser um número inteiro positivo.', 'erro');
           return;
       }
   
       try {
         if (vendaSelecionada) {
           // Lógica de Atualização (PUT)
           await atualizarVenda(vendaSelecionada.id, quantidade);
           mostrarMensagem('Venda atualizada com sucesso!', 'sucesso');
           
         } else {
           // Lógica de Registro (POST)
           const produtoId = document.getElementById('produto_id').value;
           if (!produtoId) {
                mostrarMensagem('Selecione um produto para registrar a venda.', 'erro');
                return;
           }
   
           const dadosVenda = {
               produto_id: parseInt(produtoId), 
               quantidade: quantidade
           };
   
           await registrarVenda(dadosVenda);
           mostrarMensagem('Venda registrada com sucesso!', 'sucesso');
         }
   
         fecharModal();
         await carregarVendas();
       } catch (error) {
         console.error(error);
         mostrarMensagem(error.message || 'Erro ao salvar venda.', 'erro');
       }
     });
   
     // Filtro de Vendas por Nome do Produto
     document.getElementById('filtro').addEventListener('input', (e) => {
       const termo = e.target.value.toLowerCase();
       const filtrados = vendas.filter((v) =>
         (v.produto_nome || '').toLowerCase().includes(termo)
       );
       renderizarVendas(filtrados);
     });
     
     // Fechar modal ao clicar fora
     document.getElementById('modal').addEventListener('click', (e) => {
       if (e.target.id === 'modal') fecharModal();
     });
   }