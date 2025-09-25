
---

## 🔹 RF01 – Navegação de Produtos

**Descrição:** O cliente deve poder navegar pelos produtos disponíveis, separados por categorias (ex: proteínas, vitaminas, creatinas).

**Planilha do Requisito**

| RF01                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 8 h             |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 6 PF            |
| **Analista**          | XXXX            |
| **Desenvolvedor**     | XXXXXX          |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                    |
| ------- | ------------------------------------------------------------ |
| TA01.01 | Usuário consegue visualizar lista de produtos por categoria. |
| TA01.02 | Categorias aparecem separadas corretamente.                  |
| TA01.03 | É possível navegar entre diferentes categorias.              |

---

## 🔹 RF02 – Busca de Produtos

**Descrição:** O cliente deve poder buscar produtos por nome ou código de barras.

**Planilha do Requisito**

| RF02                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 6 h             |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 5 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                      |
| ------- | -------------------------------------------------------------- |
| TA02.01 | Usuário consegue buscar produto pelo nome.                     |
| TA02.02 | Usuário consegue buscar produto pelo código de barras.         |
| TA02.03 | Busca retorna mensagem adequada quando produto não encontrado. |

---

## 🔹 RF03 – Visualização de Detalhes

**Descrição:** O sistema deve exibir informações detalhadas do produto (nome, preço, descrição, foto, valor nutricional, disponibilidade em estoque).

**Planilha do Requisito**

| RF03                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Alta            |
| **Estimativa**        | 10 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 7 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                          |
| ------- | -------------------------------------------------- |
| TA03.01 | Tela exibe nome, preço e descrição do produto.     |
| TA03.02 | Tela exibe valor nutricional corretamente.         |
| TA03.03 | Foto do produto é exibida.                         |
| TA03.04 | Disponibilidade em estoque é exibida corretamente. |

---

## 🔹 RF04 – Adicionar e Remover Produtos do Carrinho

**Descrição:** O cliente deve poder adicionar produtos ao carrinho de compras e remover itens antes de finalizar o pedido.

**Planilha do Requisito**

| RF04                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 12 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 8 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                             |
| ------- | ----------------------------------------------------- |
| TA04.01 | Usuário consegue adicionar produto ao carrinho.       |
| TA04.02 | Usuário consegue remover produto do carrinho.         |
| TA04.03 | Sistema atualiza o carrinho após cada adição/remoção. |

---

---

## 🔹 RF05 – Ajuste de Quantidade

**Descrição:** O cliente deve poder ajustar a quantidade de cada produto no carrinho.

**Planilha do Requisito**

| RF05                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 6 h             |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 5 PF            |
| **Analista**          | XXXX            |
| **Desenvolvedor**     | XXXX            |
| **Revisor**           | XXXX            |
| **Testador**          | XXXX            |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                         |
| ------- | ----------------------------------------------------------------- |
| TA05.01 | Usuário consegue aumentar a quantidade de um produto no carrinho. |
| TA05.02 | Usuário consegue reduzir a quantidade de um produto no carrinho.  |
| TA05.03 | Quantidade não pode ser reduzida abaixo de 1.                     |

---

## 🔹 RF06 – Cálculo de Total

**Descrição:** O sistema deve calcular e exibir o valor total do carrinho, incluindo descontos, se aplicável.

**Planilha do Requisito**

| RF06                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Alta            |
| **Estimativa**        | 8 h             |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 6 PF            |
| **Analista**          | XXXX            |
| **Desenvolvedor**     | XXXX            |
| **Revisor**           | XXXX            |
| **Testador**          | XXXX            |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                       |
| ------- | --------------------------------------------------------------- |
| TA06.01 | Sistema exibe valor total corretamente sem desconto.            |
| TA06.02 | Sistema aplica desconto e recalcula o valor total corretamente. |
| TA06.03 | Alteração de quantidade atualiza o valor total automaticamente. |

---

## 🔹 RF07 – Opções de Pagamento

**Descrição:** O sistema deve aceitar pagamentos diretamente na tela, através de integração com cartão de crédito, débito e Pix.

**Planilha do Requisito**

| RF07                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 14 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 9 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                         |
| ------- | ------------------------------------------------- |
| TA07.01 | Usuário consegue pagar com cartão de crédito.     |
| TA07.02 | Usuário consegue pagar com cartão de débito.      |
| TA07.03 | Usuário consegue pagar via Pix.                   |
| TA07.04 | Pagamento rejeitado exibe mensagem de erro clara. |

---

## 🔹 RF08 – Confirmação de Pedido

**Descrição:** O cliente deve receber uma confirmação visual na tela após o pagamento, com o número do pedido.

**Planilha do Requisito**

| RF08                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 6 h             |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 5 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                       |
| ------- | --------------------------------------------------------------- |
| TA08.01 | Após pagamento aprovado, sistema exibe mensagem de confirmação. |
| TA08.02 | Confirmação apresenta número único do pedido.                   |
| TA08.03 | Pedido rejeitado não gera número de confirmação.                |

---

---

## 🔹 RF09 – Impressão de Comprovante

**Descrição:** O sistema deve imprimir um comprovante de compra ou emitir a nota fiscal, se necessário.

**Planilha do Requisito**

| RF09                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Importante      |
| **Estimativa**        | 10 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 6 PF            |
| **Analista**          | Ana             |
| **Desenvolvedor**     | XXXXXX          |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXXX          |

**Testes de Aceitação (TA)**

| Código  | Descrição                                               |
| ------- | ------------------------------------------------------- |
| TA09.01 | Sistema imprime comprovante após pagamento.             |
| TA09.02 | Nota fiscal é emitida corretamente quando solicitada.   |
| TA09.03 | Impressão é recusada se não houver transação concluída. |

---

## 🔹 RF10 – Gerenciamento de Produtos

**Descrição:** O funcionário deve poder cadastrar, editar informações (nome, preço, descrição, estoque, foto) e excluir produtos.

**Planilha do Requisito**

| RF10                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 14 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 9 PF            |
| **Analista**          | Pedro           |
| **Desenvolvedor**     | XXXXXXX         |
| **Revisor**           | XXXXXXX         |
| **Testador**          | XXXXXX          |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                   |
| ------- | ----------------------------------------------------------- |
| TA10.01 | Funcionário cadastra novo produto com sucesso.              |
| TA10.02 | Funcionário edita informações de produto existente.         |
| TA10.03 | Funcionário exclui produto e ele não aparece mais na lista. |
| TA10.04 | Sistema valida campos obrigatórios no cadastro/edição.      |

---

## 🔹 RF11 – Gerenciamento de Estoque

**Descrição:** O funcionário deve atualizar o estoque dos produtos, visualizar estoque atual e definir estoque mínimo para cada produto.

**Planilha do Requisito**

| RF11                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 12 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 8 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXXX          |
| **Revisor**           | XXXXXX          |
| **Testador**          | XXXXXX          |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                 |
| ------- | --------------------------------------------------------- |
| TA11.01 | Funcionário atualiza estoque de um produto.               |
| TA11.02 | Sistema exibe estoque atual corretamente.                 |
| TA11.03 | Funcionário define estoque mínimo e o valor é registrado. |
| TA11.04 | Sistema bloqueia atualização com valores inválidos.       |

---

## 🔹 RF12 – Gerenciamento de Vendas

**Descrição:** O funcionário deve registrar uma venda manualmente para clientes que não usarem o autoatendimento.

**Planilha do Requisito**

| RF12                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Importante      |
| **Estimativa**        | 10 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 7 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                      |
| ------- | -------------------------------------------------------------- |
| TA12.01 | Funcionário registra venda manual com sucesso.                 |
| TA12.02 | Venda manual aparece no relatório de vendas.                   |
| TA12.03 | Sistema rejeita registro de venda com informações incompletas. |

---

---

## 🔹 RF13 – Relatórios de Vendas

**Descrição:** O sistema deve gerar relatórios detalhados de vendas por período (diário, semanal, mensal), por produto mais vendido e por valor total.

**Planilha do Requisito**

| RF13                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 14 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 10 PF           |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                       |
| ------- | --------------------------------------------------------------- |
| TA13.01 | Sistema gera relatório de vendas diário corretamente.           |
| TA13.02 | Sistema gera relatório de vendas semanal corretamente.          |
| TA13.03 | Sistema gera relatório de vendas mensal corretamente.           |
| TA13.04 | Relatório mostra produto mais vendido e valor total das vendas. |

---

## 🔹 RF14 – Relatórios de Estoque

**Descrição:** O sistema deve gerar relatórios de estoque que mostrem os produtos com baixa quantidade e os produtos zerados.

**Planilha do Requisito**

| RF14                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Importante      |
| **Estimativa**        | 12 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 8 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                             |
| ------- | ----------------------------------------------------- |
| TA14.01 | Relatório mostra lista de produtos com estoque baixo. |
| TA14.02 | Relatório mostra produtos com estoque zerado.         |
| TA14.03 | Relatório exporta dados corretamente para PDF/Excel.  |

---

## 🔹 RF15 – Alerta de Estoque Mínimo

**Descrição:** O sistema deve enviar um e-mail de alerta para endereço pré-definido quando estoque atingir o nível mínimo configurado.

**Planilha do Requisito**

| RF15                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 10 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 7 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                  |
| ------- | ---------------------------------------------------------- |
| TA15.01 | Sistema envia e-mail quando produto atinge estoque mínimo. |
| TA15.02 | Alerta é enviado para o endereço correto configurado.      |
| TA15.03 | Produto com estoque acima do mínimo não gera alerta.       |

---

## 🔹 RF16 – Gestão de Usuários

**Descrição:** O sistema deve permitir cadastro de funcionários com diferentes níveis de permissão (ex: apenas relatórios vs. alteração de produtos).

**Planilha do Requisito**

| RF16                  | Valor (exemplo) |
| --------------------- | --------------- |
| **Prioridade**        | Essencial       |
| **Estimativa**        | 14 h            |
| **Tempo Gasto**       | –               |
| **Tamanho Funcional** | 9 PF            |
| **Analista**          | XXXXX           |
| **Desenvolvedor**     | XXXXX           |
| **Revisor**           | XXXXX           |
| **Testador**          | XXXXX           |

**Testes de Aceitação (TA)**

| Código  | Descrição                                                      |
| ------- | -------------------------------------------------------------- |
| TA16.01 | Funcionário com permissão limitada acessa apenas relatórios.   |
| TA16.02 | Funcionário com permissão total consegue alterar produtos.     |
| TA16.03 | Sistema bloqueia tentativas de acesso a funções sem permissão. |

---

