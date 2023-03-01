const userService = require("../services/user.service");


const create = async (req, res) =>{
    try{
        const {name,email,number,city,state,password} = req.body;

    if(!name || !email || !number || !city || !state || !password){
        res.status(400).send({message: "envie todos os campos para o registro!"});
    }
    else{
    const userExist = await userService.findByEmail(email);

    if(userExist){
        res.status(400).send({message: "Email já cadastrado!"});
    }
    else{
    
    try{const user = await userService.createService(req.body)

    if(!user){
        res.status(400).send({message: "Erro ao criar o usuário!"});
        
    }

    res.status(201).send({
        message: "user criado com sucesso!",
        user: {
        id: user._id,
        name,
        email,
        number,
        password
        }
    })} catch(erro){
        res.status(500).send({message: err.message});
    }
}
}} catch(err){
    res.status(500).send({message: err.message});
}
};


const findAll = async (req,res) =>{
    const users = await userService.findAllService();

    if(users.length == 0){
        return res.status(400).send({message: "Não há usuários cadastrados"});
    }
    
    res.send(users);
    
};

const findById = async (req,res) =>{

    const user = req.user;

    res.send(user);
};

const update = async (req,res) =>{
    const {name,email,number,password} = req.body;

    if(!name && !email && !number && !password){
        res.status(400).send({message: "envie pelo menos um campo para a atualização!"});
    }

    const {id,user} = req;


    await userService.updateService(
        id,
        name,
        email,
        number,
        password,
    );
        res.send({message: "Atualização de usuário realizada com sucesso"});
};

module.exports = {create, findAll, findById,update};


 