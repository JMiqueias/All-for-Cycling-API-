const messageService = require('../services/message.service');

const create = async (req, res) =>{
    try{
        const {name,email,content_msg} = req.body;

    if(!name || !email || !content_msg){
        res.status(400).send({menssagem: "envie todos os campos para o registro!"});
    }

    else{
    
    try{const message = await messageService.createService(req.body)

    if(!message){
        res.status(400).send({menssagem: "Erro ao cadastrar a menssagem!"});
        
    }

    res.status(201).send({
        menssagem: "menssagem cadastrada com sucesso!",
        message: {
        id: message._id,
        name,
        email,
        content_msg,
        }
    })} catch(err){
        res.status(500).send({menssagem: err.message});
    }
}} catch(err){
    res.status(500).send({menssagem: err.message});
}
};

module.exports = { create };