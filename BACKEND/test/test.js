const request = require("supertest");
const server = require("../index");

describe("CRUD Operations for Coffess =)!!", () => {
    it("Obteniendo un statusCode 200 =)!! de un Arreglo con 1 Objeto mínimo =)!!", async () => {
        const response = await request(server).get("/cafes").send()
        const { body } = await request(server).get("/cafes").send()
        const coffees = body
        const coffee = {"id": 1, "nombre": "Cortado"}     
        const status = response.statusCode
        expect(status).toBe(200)
        expect(coffees).toBeInstanceOf(Array)
        expect(coffees).toContainEqual(coffee)
    })
    it("Obteniendo un 404 =)!! Cuando borramos un un Producto que no Existe =)!!", async () => {

        const jwt = "token"
        const id = new Date()
        const response = await request(server)
            .delete(`/cafes/${id}`)
            .set("Authorization", jwt)
            .send()
        const status = response.statusCode
        expect(status).toBe(404)
    })
    it("Agregando un Nuevo Café =)!!, para Devolver un Código 201 =)!!", async () => {
        const id = Math.floor(Math.random() * 999)
        const coffee = { id, nombre: "New Coffeee =)!!" }
        const response = await request(server).post("/cafes")
            .send(coffee)
        const status = response.statusCode
        expect(status).toBe(201)
    })
    it("Probando Error 400 con PUT, al Actualizar un Café, Enviando un ID diferente al ID dentro del Payload del Café =)!!", async (id = 3) => {
        const coffee = {id: 7, nombre : "Good Coffeee =)!!"}
        const res = await request(server).put(`/cafes/${id}`).send(coffee)
        const status = res.statusCode
        expect(status).toBe(400)
    })
}); 