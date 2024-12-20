import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import livro from "./models/Livro.js";


const conexao = await conectaNaDataBase();

conexao.on("error", (error)=>{
    console.error("Erro de conexão", error);
});

conexao.once("open", ()=>{
    console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).send("Curso de Node.js");
});

app.get("/livros/:id",(req,res)=>{
    const index = buscaLivro(req.params.id) //param é um parametro da rota, que é o que está apos os :
    res.status(200).json(livros[index])
});

// app.post("/livros",(req,res)=>{
//     livros.push(req.body);
//     res.status(201).send("Livro cadastrado com sucesso");
// });

app.put("/livros/:id",(req,res)=>{
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo; //pega a informação do body para modificar o objeto
    res.status(200).json(livros);
});

app.delete("/livros/:id",(req,res)=>{
    const index = buscaLivro(req.params.id);
    livros.splice(index,1) //apaga o livro no indice passado e apenas 1 item
    res.status(200).send("Livro removido com sucesso")
});

export default app;


