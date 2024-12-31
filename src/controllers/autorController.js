import { autor } from "../models/Autor.js"

class AutorController {
    //metodo para listar todos os autores
    static async listarAutores (req, res){
        try{
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch ( erro ){
            res.status(500).json({ message: `${erro.message} - falha na requisição` })
        }
    };

     //listar autor por ID
     static async listarAutorPorId (req, res){
        try{
            const id = req.params.id; //salva o id recebido atraves da requisição
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch ( erro ){
            res.status(500).json({ message: `${erro.message} - falha na requisição do autor` })
        }
    };

    //método para adicionar autor
    static async cadastraAutor(req,res){
        try{
            const novoAutor = await autor.create(req.body); //autor é do modelo. create() é um metodo do mongoose. express traz a req
            res.status(201).json({message: "criado com sucesso", autor: novoAutor}); //criamos um obj, message e autor são propriedades do obj
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar autor` }); //catch nos permite acessar o erro
        }
    };

    //atualizar autor 
    static async atualizarAutor (req, res){
        try{
            const id = req.params.id; //salva o id recebido atraves da requisição
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado" });
        } catch ( erro ){
            res.status(500).json({ message: `${erro.message} - falha na atulização do autor` })
        }
    };

    //deleta autor 
    static async deletarAutor (req, res){
        try{
            const id = req.params.id; //salva o id recebido atraves da requisição
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor deletado com sucesso" });
        } catch ( erro ){
            res.status(500).json({ message: `${erro.message} - falha na exclusão do autor` })
        }
    };
};

export default AutorController;