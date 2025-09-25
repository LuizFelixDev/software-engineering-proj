# Requisitos Funcionais
## RF1: Navegação de Produtos:
 O cliente deve poder navegar pelos produtos disponíveis. É possível separar os produtos por categorias (ex: proteínas, vitaminas, creatinas, etc.).
## RF2: Busca de Produtos: 
O cliente deve poder buscar produtos por nome ou código de barras.
## RF3: Visualização de Detalhes:
 O sistema deve exibir informações detalhadas do produto, como nome, preço, descrição, foto, valor nutricional e a disponibilidade em estoque.
## RF4: Adicionar e Remover Produtos do Carrinho:
 O cliente deve poder adicionar produtos ao carrinho de compras e remover itens antes de finalizar o pedido.
## RF5: Ajuste de Quantidade:
 O cliente deve poder ajustar a quantidade de cada produto no carrinho.
## RF6: Cálculo de Total:
 O sistema deve calcular e exibir o valor total do carrinho, incluindo descontos, se aplicável.
## RF7: Opções de Pagamento:
 O sistema deve aceitar pagamentos diretamente na tela, através de integração com meios de pagamento (ex: cartão de crédito, débito, Pix).
## RF8: Confirmação de Pedido:
 O cliente deve receber uma confirmação visual na tela após o pagamento, com o número do pedido.
## RF9: Impressão de Comprovante:
 O sistema deve imprimir um comprovante de compra ou emitir a nota fiscal, se necessário.
Módulo de Gestão (Interface do Funcionário)
## RF10: Gerenciamento de Produtos:
 O funcionário deve poder cadastrar novos produtos, editar informações (nome, preço, descrição, estoque, foto) e excluir produtos.
## RF11: Gerenciamento de Estoque: 
O funcionário deve poder atualizar o estoque dos produtos e visualizar o estoque atual. O sistema deve permitir a definição de um estoque mínimo para cada produto.
## RF12: Gerenciamento de Vendas: 
O funcionário deve poder registrar uma venda manualmente, caso necessário, para clientes que não usarem o autoatendimento.
## ## RF13: Relatórios de Vendas: 
O sistema deve gerar relatórios detalhados de vendas por período (diário, semanal, mensal), por produto mais vendido e por valor total.
## RF14: Relatórios de Estoque: 
O sistema deve gerar relatórios de estoque que mostrem os produtos com baixa quantidade e os produtos com estoque zerado.
## RF15: Alerta de Estoque Mínimo: 
O sistema deve enviar um e-mail de alerta para um endereço pré-definido quando o estoque de um produto atingir o nível mínimo configurado.
## RF16: Gestão de Usuários:
O sistema deve permitir o cadastro de funcionários, com diferentes níveis de permissão (ex: apenas visualização de relatórios vs. permissão para alterar produtos).

# Requisitos Não Funcionais (propostos):

## RNF01 – Segurança:
O sistema deve armazenar senhas de usuários de forma segura.
Deve haver controle de sessão e autenticação por login/senha. 
## RNF02 – Desempenho e Tempo de Resposta:
O sistema deve responder a ações do usuário em até 2 segundos.
As buscas e operações de CRUD devem ser realizadas em no máximo 1 segundo.
## RNF03 – Usabilidade e Acessibilidade:
A interface deve ser intuitiva, permitindo fácil uso mesmo no modo de autoatendimento.
Deve ter design responsivo para acesso tanto no interface de touch quanto em computador .
## RNF04 – Qualidade dos Relatórios:
Os relatórios devem ser gerados para visualização no próprio sistema e ter a possibilidade de gerar um PDF.
## RNF05 – Manutenibilidade:
O sistema deve ser desenvolvido com arquitetura modular para facilitar manutenção e futuras melhorias (ex: inclusão posterior de controle de estoque - atualmente dispensado).
## RNF06 – Portabilidade e Multiplataforma:
O sistema deve funcionar nos principais navegadores e sistemas operacionais (Windows, Android, etc.) conforme.
## RNF07 – Disponibilidade:
O sistema deve estar disponível de sexta a sábado, com estabilidade e sem interrupções durante esse período.
## RNF08 – Confiabilidade nos pagamentos:
As integrações de pagamento (Pix, cartão, dinheiro) devem ser realizadas com validação adequada, evitando falhas ou cobranças duplicadas.
## RNF09 – Escalabilidade de usuários:
O sistema deve suportar múltiplos usuários simultaneamente com separação clara de dados e sessões.
