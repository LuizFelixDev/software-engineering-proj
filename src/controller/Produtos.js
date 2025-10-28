import { openDb } from "../configDB.js"

export async function createTable() {
    try {
        const db = await openDb();
        await db.exec('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, imagem TEXT, descricao TEXT, marca TEXT, categoria TEXT, quantidade TEXT, preco FLOAT, estoque INTEGER, estoqueM INTEGER)');
    } catch (error) {
        console.error("Erro ao criar tabela de produtos:", error);
    }
}

export async function selectProdutos(req, res) {
    try {
        const db = await openDb();
        const produtos = await db.all('SELECT * FROM produtos');
        res.json(produtos);
    } catch (error) {
        console.error("Erro ao selecionar produtos:", error);
        res.status(500).json({
            "statusCode": 500,
            "msg": "Erro ao buscar produtos no banco de dados."
        });
    }
}

export async function selectProduto(req, res) {
    let id = req.body.id;
    if (!id) {
        res.status(400).json({
            "statusCode": 400,
            "msg": "Você precisa informar o id do produto."
        });
        return;
    }
    try {
        const db = await openDb();
        const produto = await db.get('SELECT * FROM produtos WHERE id=?', [id]);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({
                "statusCode": 404,
                "msg": "Produto não encontrado."
            });
        }
    } catch (error) {
        console.error(`Erro ao selecionar produto com ID ${id}:`, error);
        res.status(500).json({
            "statusCode": 500,
            "msg": "Erro ao buscar produto no banco de dados."
        });
    }
}

export async function insertProduto(req, res) {
    let produto = req.body;
    
    if (!produto || Object.keys(produto).length === 0) {
        res.status(400).json({
            "statusCode": 400,
            "msg": "O corpo da requisição está vazio ou inválido."
        });
        return;
    }

    try {
        const db = await openDb();
        const result = await db.run('INSERT INTO produtos (nome, imagem, descricao, marca, categoria, quantidade, preco, estoque, estoqueM) VALUES (?,?,?,?,?,?,?,?,?)', 
        [produto.nome, produto.imagem, produto.descricao, produto.marca, produto.categoria, produto.quantidade, produto.preco, produto.estoque, produto.estoqueM]);
        
        res.status(201).json({
            "statusCode": 201,
            "msg": "Produto inserido com sucesso!",
            "id": result.lastID
        });
    } catch (error) {
        console.error("Erro ao inserir produto:", error);
        res.status(500).json({
            "statusCode": 500,
            "msg": "Erro ao inserir produto no banco de dados."
        });
    }
}

export async function updateProduto(req, res) {
    let produto = req.body;
    if (!produto || !produto.id) {
        res.status(400).json({
            "statusCode": 400,
            "msg": "Você precisa informar o id e os dados para atualização."
        });
        return;
    }

    try {
        const db = await openDb();
        const result = await db.run('UPDATE produtos SET nome=?, imagem=?, descricao=?, marca=?, categoria=?, quantidade=?, preco=?, estoque=?, estoqueM=? WHERE id=?', 
        [produto.nome, produto.imagem, produto.descricao, produto.marca, produto.categoria, produto.quantidade, produto.preco, produto.estoque, produto.estoqueM, produto.id]);
        
        if (result.changes > 0) {
            res.status(200).json({
                "statusCode": 200,
                "msg": "Produto atualizado com sucesso!"
            });
        } else {
            res.status(404).json({
                "statusCode": 404,
                "msg": "Produto não encontrado para atualização."
            });
        }
    } catch (error) {
        console.error(`Erro ao atualizar produto com ID ${produto.id}:`, error);
        res.status(500).json({
            "statusCode": 500,
            "msg": "Erro ao atualizar produto no banco de dados."
        });
    }
}

export async function deleteProduto(req, res) {
    let produto = req.body;
    let id = produto.id;
    if (!id) {
        res.status(400).json({
            "statusCode": 400,
            "msg": "Você precisa informar o id para exclusão."
        });
        return;
    }

    try {
        const db = await openDb();
        const result = await db.run('DELETE FROM produtos WHERE id=?', [id]);
        
        if (result.changes > 0) {
             res.status(200).json({
                "statusCode": 200,
                "msg": "Produto excluído com sucesso!"
            });
        } else {
            res.status(404).json({
                "statusCode": 404,
                "msg": "Produto não encontrado para exclusão."
            });
        }
    } catch (error) {
        console.error(`Erro ao deletar produto com ID ${id}:`, error);
        res.status(500).json({
            "statusCode": 500,
            "msg": "Erro ao deletar produto no banco de dados."
        });
    }
}