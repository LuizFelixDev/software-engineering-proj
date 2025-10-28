import { openDb } from "../configDB.js"

export async function createTable() {
    openDb().then(db =>{
        db.exec('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, imagem TEXT, descricao TEXT, marca TEXT, categoria TEXT, quantidade TEXT, preco FLOAT, estoque INTEGER, estoqueM INTEGER)')
    })
}

export async function selectProdutos(req,res) {
    return openDb().then(db =>{
        return db.all('SELECT * FROM produtos')
        .then(produtos=> res.json(produtos))
    });
}

export async function selectProduto(req,res) {
    let id = req.body.id;
    return openDb().then(db =>{
        return db.get('SELECT * FROM produtos WHERE id=?', [id])
        .then(produto => res.json(produto));
    });
}

export async function insertProduto(req, res) {
    let produto = req.body;
    openDb().then(db =>{
        db.run('INSERT INTO produtos (nome, imagem, descricao, marca, categoria, quantidade, preco, estoque, estoqueM) VALUES (?,?,?,?,?,?,?,?,?)', [produto.nome, produto.imagem, produto.descricao, produto.marca, produto.categoria, produto.quantidade, produto.preco, produto.estoque, produto.estoqueM]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updateProduto(req, res) {
    let produto = req.body;
    if (produto && !produto.id) {
        res.json({
            "statusCode": "400",
            "msg": "Você precisa informar o id"
        });
        return;
    }
    openDb().then(db =>{
        db.run('UPDATE produtos SET nome=?, imagem=?, descricao=?, marca=?, categoria=?, quantidade=?, preco=?, estoque=?, estoqueM=? WHERE id=?', 
        [produto.nome, produto.imagem, produto.descricao, produto.marca, produto.categoria, produto.quantidade, produto.preco, produto.estoque, produto.estoqueM, produto.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deleteProduto(req, res) {
    let produto = req.body;
    let id = produto.id;
    openDb().then(db =>{
        db.run('DELETE FROM produtos WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}