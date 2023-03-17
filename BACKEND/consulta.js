const { Pool } = require('pg')
const format = require('pg-format')
const bcrypt = require('bcryptjs')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "desafiolatam279",
    database: "ecommerce",
    allowExitOnIdle: true
})

const getProducts = async () => {
    const query = " select * from productos"
    const { rows: productos } = await pool.query(query)
    return productos
}

const getProduct = async (id) => {
    const query = " select * from productos where id = $1"
    const value = [id]
    const { rows: productos } = await pool.query(query, value)
    return productos
}

const addProduct = async ({ nombre, descripcion, precio, cantidad, precio_oferta, img_url }) => {
    const query = "insert into productos values( DEFAULT, $1,$2,$3,$4,$5,$6)"
    const values = [nombre, descripcion, precio, cantidad, precio, precio_oferta, img_url]
    const result = await pool.query(query, values)
}

const registerUser = async (user) => {
    let { email, password, rol, lenguage } = user
    const encriptedPassword = bcrypt.hashSync(password)
    password = encriptedPassword
    const values = [email, encriptedPassword, rol, lenguage]
    const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
    await pool.query(query, values)
}

const checkCredentials = async (email, password) => {
    const values = [email]
    const query = "SELECT * FROM usuarios WHERE email = $1"    
    const { rows: [usuario], rowCount } = await pool.query(query, values)
    const { password: encriptedPassword } = usuario   
    const correctPassword = bcrypt.compareSync(password, encriptedPassword)    
     if (!correctPassword || !rowCount)
        throw { code: 401, message: "Email or Password Incorrect =)!!" }
}

const reportQuery = async (req, res, next) => {
    const par = req.params
    const url = req.url
    console.log(`
    Hoy ${new Date()}
    Hemos Recibido una Consulta en la Ruta ${url}
    con los Parámetros:
    `, par)
    next()
}
module.exports = { getProducts, addProduct, getProduct }