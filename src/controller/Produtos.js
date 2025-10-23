import { openDb } from "../configDB.js"

export async function createTable() {
    openDb().then(db =>{
        db.exec('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, nome TEXT, imagem TEXT, descricao TEXT, marca TEXT, categoria TEXT, quantidade TEXT, preco FLOAT, estoque INTEGER, estoqueM INTEGER)')
    })
}

export async function insertProduto(produtos) {
    openDb().then(db =>{
        db.run('INSERT INTO produtos (nome, imagem, descricao, marca, categoria, quantidade, preco, estoque, estoqueM) VALUES (?,?,?,?,?,?,?,?,?)', [produtos.nome, produtos.imagem, produtos.descricao, produtos.marca, produtos.categoria, produtos.quantidade, produtos.preco, produtos.estoque, produtos.estoqueM]);
    });
}

export async function updateProduto(produtos) {
    openDb().then(db =>{
        db.run('UPDATE produtos SET nome=?, imagem=?, descricao=?, marca=?, categoria=?, quantidade=?, preco=?, estoque=?, estoqueM=? WHERE id=?', 
        [produtos.nome, produtos.imagem, produtos.descricao, produtos.marca, produtos.categoria, produtos.quantidade, produtos.preco, produtos.estoque, produtos.estoqueM, produtos.id]);
    });
}

export async function selectProdutos() {
    return openDb().then(db =>{
        return db.all('SELECT * FROM produtos')
        .then(res=>res)
    });
}

export async function selectProduto(id) {
    return openDb().then(db =>{
        return db.get('SELECT * FROM produtos WHERE id=?', [id])
        .then(res=>res)
    });
}

export async function deleteProduto(id) {
    return openDb().then(db =>{
        return db.run('DELETE FROM produtos WHERE id=?', [id])
        .then(res=>res)
    });
}
