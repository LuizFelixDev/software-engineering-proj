import { openDb } from "../configDB.js";

export async function createTableVendas() {
  try {
    const db = await openDb();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL CHECK (quantidade > 0),
        preco_unitario REAL NOT NULL CHECK (preco_unitario >= 0),
        total REAL NOT NULL CHECK (total >= 0),
        data TEXT NOT NULL,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      )
    `);
  } catch (error) {
    console.error("Erro ao criar tabela de vendas:", error);
    throw new Error("Falha ao criar tabela de vendas");
  }
}

function criarVenda({ produto_id, quantidade, preco_unitario }) {
  const total = quantidade * preco_unitario;
  return {
    produto_id,
    quantidade,
    preco_unitario,
    total,
    data: new Date().toISOString()
  };
}

export async function registrarVenda(req, res) {
  try {
    const { produto_id, quantidade } = req.body;

    if (!produto_id || !quantidade || quantidade <= 0) {
      return res.status(400).json({
        msg: 'Campos "produto_id" e "quantidade" são obrigatórios e válidos.'
      });
    }

    const db = await openDb();
    const produto = await db.get('SELECT * FROM produtos WHERE id = ?', [produto_id]);

    if (!produto) return res.status(404).json({ msg: "Produto não encontrado." });
    if (produto.estoque < quantidade) return res.status(400).json({ msg: "Estoque insuficiente." });

    const venda = criarVenda({ produto_id, quantidade, preco_unitario: produto.preco });

    const result = await db.run(
      'INSERT INTO vendas (produto_id, quantidade, preco_unitario, total, data) VALUES (?, ?, ?, ?, ?)',
      [venda.produto_id, venda.quantidade, venda.preco_unitario, venda.total, venda.data]
    );

    await db.run('UPDATE produtos SET estoque = estoque - ? WHERE id = ?', [quantidade, produto_id]);

    res.status(201).json({ id: result.lastID, ...venda });

  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ msg: "Erro interno ao registrar venda." });
  }
}

export async function listarVendas(req, res) {
  try {
    const { data_inicio, data_fim, produto_id } = req.query;
    let query = `
      SELECT v.*, p.nome AS produto_nome
      FROM vendas v
      JOIN produtos p ON v.produto_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (data_inicio) {
      query += ' AND DATE(v.data) >= DATE(?)';
      params.push(data_inicio);
    }
    if (data_fim) {
      query += ' AND DATE(v.data) <= DATE(?)';
      params.push(data_fim);
    }
    if (produto_id) {
      query += ' AND v.produto_id = ?';
      params.push(produto_id);
    }

    query += ' ORDER BY v.data DESC';

    const db = await openDb();
    const vendas = await db.all(query, params);
    res.json(vendas);

  } catch (error) {
    console.error("Erro ao listar vendas:", error);
    res.status(500).json({ msg: "Erro interno ao listar vendas." });
  }
}

export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const venda = await db.get(
      `SELECT v.*, p.nome AS produto_nome
       FROM vendas v
       JOIN produtos p ON v.produto_id = p.id
       WHERE v.id = ?`,
      [id]
    );

    if (!venda) return res.status(404).json({ msg: "Venda não encontrada." });
    res.json(venda);

  } catch (error) {
    console.error("Erro ao buscar venda:", error);
    res.status(500).json({ msg: "Erro interno ao buscar venda." });
  }
}

export async function atualizarVenda(req, res) {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    if (!quantidade || quantidade <= 0) return res.status(400).json({ msg: "Informe a nova quantidade válida." });

    const db = await openDb();
    const venda = await db.get('SELECT * FROM vendas WHERE id = ?', [id]);
    if (!venda) return res.status(404).json({ msg: "Venda não encontrada." });

    const produto = await db.get('SELECT * FROM produtos WHERE id = ?', [venda.produto_id]);
    if (!produto) return res.status(404).json({ msg: "Produto não encontrado." });

    const diferenca = quantidade - venda.quantidade;
    if (produto.estoque < diferenca) return res.status(400).json({ msg: "Estoque insuficiente para aumentar a quantidade." });

    const novoTotal = quantidade * venda.preco_unitario;

    await db.run('UPDATE vendas SET quantidade = ?, total = ? WHERE id = ?', [quantidade, novoTotal, id]);
    await db.run('UPDATE produtos SET estoque = estoque - ? WHERE id = ?', [diferenca, produto.id]);

    res.json({ msg: "Venda atualizada com sucesso." });

  } catch (error) {
    console.error("Erro ao atualizar venda:", error);
    res.status(500).json({ msg: "Erro interno ao atualizar venda." });
  }
}

export async function removerVenda(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const venda = await db.get('SELECT * FROM vendas WHERE id = ?', [id]);
    if (!venda) return res.status(404).json({ msg: "Venda não encontrada." });

    // Restaurar estoque
    await db.run('UPDATE produtos SET estoque = estoque + ? WHERE id = ?', [venda.quantidade, venda.produto_id]);
    await db.run('DELETE FROM vendas WHERE id = ?', [id]);

    res.json({ msg: "Venda excluída com sucesso." });

  } catch (error) {
    console.error("Erro ao remover venda:", error);
    res.status(500).json({ msg: "Erro interno ao remover venda." });
  }
}

export async function relatorioVendas(req, res) {
  try {
    const db = await openDb();
    const sql = `
      SELECT 
        p.id AS produto_id,
        p.nome AS produto_nome,
        SUM(v.quantidade) AS quantidade_total,
        SUM(v.total) AS receita_total,
        ROUND(AVG(v.preco_unitario), 2) AS preco_medio,
        MAX(v.data) AS ultima_venda
      FROM vendas v
      JOIN produtos p ON v.produto_id = p.id
      GROUP BY p.id, p.nome
      ORDER BY receita_total DESC
    `;

    const detalhes = await db.all(sql);

    const resumoGeral = detalhes.reduce(
      (acc, r) => {
        acc.total_receita += r.receita_total || 0;
        acc.total_itens += r.quantidade_total || 0;
        return acc;
      },
      { total_receita: 0, total_itens: 0 }
    );

    res.json({ resumo: resumoGeral, detalhes });

  } catch (error) {
    console.error("Erro ao gerar relatório de vendas:", error);
    res.status(500).json({ msg: "Erro interno ao gerar relatório de vendas." });
  }
};