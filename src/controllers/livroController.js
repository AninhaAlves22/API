import livro from "../models/Livro.js"

class LivroController {
    static async listarLivros (req, res){
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    };

    static async cadastraLivro(req,res){
        try{
            const novoLivro = await livro.create(req.body); //livro é do modelo. create() é um metodo do mongoose. express traz a req
            res.status(201).json({message: "criado com sucesso", livro: novoLivro}); //criamos um obj, message e livro são propriedades do obj
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro` }); //catch nos permite acessar o erro
        }
    };

};


export default LivroController;