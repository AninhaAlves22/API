import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js"

//agrupa todas as rotas que iremos receber
const routes = (app)=>{       //app é uma instancia do express recebido em app.js       
    app.route("/").get((req, res)=> res.status(200).send("Curso de Node.js"));
    app.use(express.json(), livros, autores);
};


export default routes;