import { openDb } from "../configDB.js";

export async function createTable() {
  try {
    const db = await openDb();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        imagem TEXT,
        descricao TEXT,
        marca TEXT,
        categoria TEXT,
        quantidade TEXT,
        preco REAL,
        estoque INTEGER,
        estoqueM INTEGER
      )
    `);
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
    throw new Error("Falha ao inicializar o banco de dados");
  }
}

function validarProduto(produto, isUpdate = false) {
  const erros = [];

  if (!isUpdate && (!produto.nome || typeof produto.nome !== "string")) {
    erros.push("Campo 'nome' é obrigatório e deve ser texto.");
  }
  if (!isUpdate && (produto.preco === undefined || produto.preco === null)) {
    erros.push("Campo 'preco' é obrigatório.");
  }
  if (produto.preco !== undefined && (isNaN(produto.preco) || produto.preco < 0)) {
    erros.push("Campo 'preco' deve ser um número maior ou igual a 0.");
  }
  if (produto.estoque !== undefined && (!Number.isInteger(produto.estoque) || produto.estoque < 0)) {
    erros.push("Campo 'estoque' deve ser um número inteiro maior ou igual a 0.");
  }
  if (produto.estoqueM !== undefined && (!Number.isInteger(produto.estoqueM) || produto.estoqueM < 0)) {
    erros.push("Campo 'estoqueM' deve ser um número inteiro maior ou igual a 0.");
  }

  return erros;
}


export async function selectProdutos(req, res) {
  try {
    const db = await openDb();
    const produtos = await db.all('SELECT * FROM produtos');
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ msg: "Erro interno ao buscar produtos" });
  }
}

export async function selectProduto(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const produto = await db.get('SELECT * FROM produtos WHERE id = ?', [id]);

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ msg: "Erro interno ao buscar produto" });
  }
}

export async function insertProduto(req, res) {
  try {
    const produto = req.body;
    const erros = validarProduto(produto);

    if (erros.length > 0) {
      return res.status(400).json({ msg: "Dados inválidos", erros });
    }

    const db = await openDb();
    await db.run(
      `INSERT INTO produtos 
      (nome, imagem, descricao, marca, categoria, quantidade, preco, estoque, estoqueM)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        produto.nome,
        produto.imagem || null,
        produto.descricao || null,
        produto.marca || null,
        produto.categoria || null,
        produto.quantidade || null,
        produto.preco,
        produto.estoque ?? 0,
        produto.estoqueM ?? 0
      ]
    );

    res.status(201).json({ msg: "Produto inserido com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir produto:", error);
    res.status(500).json({ msg: "Erro interno ao inserir produto" });
  }
}

export async function updateProduto(req, res) {
  try {
    const produto = req.body;

    if (!produto?.id) {
      return res.status(400).json({ msg: "Você precisa informar o id" });
    }

    const erros = validarProduto(produto, true);
    if (erros.length > 0) {
      return res.status(400).json({ msg: "Dados inválidos", erros });
    }

    const db = await openDb();
    const result = await db.run(
      `UPDATE produtos 
       SET nome=?, imagem=?, descricao=?, marca=?, categoria=?, quantidade=?, preco=?, estoque=?, estoqueM=? 
       WHERE id=?`,
      [
        produto.nome,
        produto.imagem,
        produto.descricao,
        produto.marca,
        produto.categoria,
        produto.quantidade,
        produto.preco,
        produto.estoque,
        produto.estoqueM,
        produto.id
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.json({ msg: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ msg: "Erro interno ao atualizar produto" });
  }
}

export async function deleteProduto(req, res) {
  try {
    const { id } = req.params;
    const db = await openDb();
    const result = await db.run('DELETE FROM produtos WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.json({ msg: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ msg: "Erro interno ao excluir produto" });
  }
}

export async function relatorioEstoque(req, res) {
  try {
    const db = await openDb();

    const sql = `
      SELECT 
        id,
        nome,
        categoria,
        marca,
        descricao,
        preco,
        estoque
      FROM produtos
      ORDER BY estoque ASC
    `;

    const produtos = await db.all(sql);

    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ msg: "Nenhum produto encontrado no estoque." });
    }

    const totalProdutos = produtos.length;
    const totalEstoque = produtos.reduce((acc, p) => acc + (p.estoque || 0), 0);
    const valorTotal = produtos.reduce((acc, p) => acc + (p.estoque * p.preco || 0), 0);

    res.json({
      resumo: {
        total_produtos: totalProdutos,
        total_estoque: totalEstoque,
        valor_total_estoque: valorTotal.toFixed(2)
      },
      detalhes: produtos
    });
  } catch (error) {
    console.error("Erro ao gerar relatório de estoque:", error);
    res.status(500).json({ msg: "Erro interno ao gerar relatório de estoque." });
  }
}
