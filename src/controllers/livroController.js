import livro from "../models/Livro.js"
import { autor } from "../models/Autor.js"


class LivroController {
    //metodo para listar todos os livros
    static async listarLivros (req, res){
        try{
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch ( erro ){
            res.status(500).json({ message: `${erro.message} - falha na requisição` })
        };
    };
    
    //listar livro por ID
    static async listarLivroPorId (req, res){
        try{
            const id = req.params.id; //salva o id recebido atraves da requisição
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch ( erro ){
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` })
        };
    };
    
    //método para adicionar livro
    static async cadastraLivro(req,res){
        const novoLivro = req.body //salva o corpo da requisição
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor); //salva o objeto autor 
            const livroCompleto = { ...novoLivro, autor:{...autorEncontrado._doc} }; //cria um novo grande objeto com o objeto autor dentro
            const livroCriado = await livro.create(livroCompleto); //cria o livro passando os dados de livroCompleto
            res.status(201).json({message: "criado com sucesso", livro: livroCriado}); //criamos um obj, message e livro são propriedades do obj
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro` }); //catch nos permite acessar o erro
        };
    };

        //atualizar livro 
        static async atualizarLivro (req, res){
            try{
                const id = req.params.id; //salva o id recebido atraves da requisição
                await livro.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: "Livro atualizado" });
            } catch ( erro ){
                res.status(500).json({ message: `${erro.message} - falha na atulização do livro` })
            };
        };

        //deleta livro 
        static async deletarLivro (req, res){
            try{
                const id = req.params.id; //salva o id recebido atraves da requisição
                await livro.findByIdAndDelete(id);
                res.status(200).json({ message: "Livro deletado com sucesso" });
            } catch ( erro ){
                res.status(500).json({ message: `${erro.message} - falha na exclusão do livro` })
            };
        };
        
        //lista livros buscando pelo parametro editora
        static async listarLivroPorEditora ( req,res ){
            const editora = req.query.editora; //armazena o valor de editora capturado na url/requisição 
            try{
                const livroPorEditora = await livro.find({ editora: editora}); //usa métodos do mongoose para encontrar os livros baseados no parametro 'editora'
                res.status(200).json(livroPorEditora); //retorna o status e o obj json
            }catch(erro){
                res.status(500).json({ message: `${erro.message} - falha na busca` });
            };

        };
};


export default LivroController;