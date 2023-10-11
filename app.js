const express = require('express');
const db_usuario = require('./db_usuario');
const cors = require('cors'); // Importe a biblioteca CORS

const app = express();
app.use(express.json())

app.use(cors());

app.get ('/Usuario', (req, res) => {
    db_usuario.all('SELECT * FROM Usuario', (erro, Usuario) => {
        if (erro != null) {
            console.error(erro);
            res.status(500).json({mensagem: 'Erro no Servidor'})
        } else {
            res.json(Usuario)
        }
    });
});

app.delete('/Usuario', (req,res) => {
    const id = req.body.id
    db_usuario.run('delete from Usuario where id = (?) ', [id], (erro) => {
        if (erro != null){
            console.erro(erro);
            res.status(500).json({mensagem: 'Ocorreu um erro no Servidor'})
        } else {
            res.status(201).json({mensagem: 'Usuário Excluído com Sucesso'})
        }
    })
})

app.post('/Usuario', (req, res) => {
    const {id, email, senha} = req.body
    db_usuario.run('insert into Usuario (id, email, senha) values (?,?,?)', [id, email, senha] , (erro) => {
        if (erro != null){
            console.erro(erro);
            res.status(500).json({mensagem: 'Ocorreu um erro no Servidor'})
        } else {
            res.status(201).json({id: id, email: email, senha: senha})
        }
    })
})

app.listen(3030, () => {
    console.log('Servidor Executando em localhost:3030')
})