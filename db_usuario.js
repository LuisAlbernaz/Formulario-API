const sqlite3 = require ('sqlite3').verbose();
const db_usuario = new sqlite3.Database('./usuario.db')

db_usuario.serialize( () => {
    db_usuario.run(`CREATE TABLE IF NOT EXISTS Usuario (
        id integer primary key,
        email varchar(100),
        senha varchar(100)
    )
    `)
})

module.exports = db_usuario;