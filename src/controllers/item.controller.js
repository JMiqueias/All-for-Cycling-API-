const itemService = require("../services/item.service");
const fs = require("fs");
const path = require("path");
const { off } = require("process");

const create = async (req,res) =>{
    try{
        const {nome,categoria,tipo,descricao,valor} = req.body;

    if(!nome || !categoria || !tipo || !descricao || !valor){
        res.status(400).send({message: "envie todos os campos para o registro!"});
        
    }
    else {
    try{
        const file = req.file
        console.log( path.basename(file.path));

        const img = path.basename(file.path);
        const item = await itemService.createService({
        nome,
        categoria,
        tipo,
        descricao,
        valor,
        anunciante: req.userId,
        foto: img
    })

    if(!item){
        res.status(400).send({message: "Erro ao criar o Item!"});
        
    }

    res.status(201).send({message: "Item criado com sucesso!"})
    } catch(err){
        res.status(500).send({message: err.message});
    }
}
} catch(err){
    res.status(500).send({message: err.message});
}
};

const findAll = async (req,res) =>{
    try{
    let {limit, offset} = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if(!limit){
        limit =5;
    }
    if(!offset){
        offset =0;
    }

    const itens = await itemService.findAllService(offset,limit);
    const total = await itemService.contItens();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous !=null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    if(itens.length == 0){
        return res.status(400).send({message: "Não há itens cadastrados"});
    }
    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        produtos : itens.map(prodItem => {
            return{
            id: prodItem._id,
            nome: prodItem.nome,
            categoria: prodItem.categoria,
            tipo: prodItem.tipo,
            descricao: prodItem.descricao,
            valor:prodItem.valor,
            foto: prodItem.foto,
            userName : prodItem.anunciante.name,
            userNumber : prodItem.anunciante.number,
            userCity : prodItem.anunciante.city,
            userUF: prodItem.anunciante.state
            }
        })
    });
}catch(err){
    res.status(500).send({message: err.message});
}
    
};

const topItem = async (req,res) => {
    try{
    const prodItem = await itemService.topItemService();

    if(!prodItem){
        return res.status(400).send({message: "Não há item registrado!"});
    }
    res.send({
        item : {
        id: prodItem._id,
        nome: prodItem.nome,
        categoria: prodItem.categoria,
        tipo: prodItem.tipo,
        descricao: prodItem.descricao,
        valor:prodItem.valor,
        foto: prodItem.foto,
        userName : prodItem.anunciante.name,
        userNumber : prodItem.anunciante.number,
        userCity : prodItem.anunciante.city,
        userUF: prodItem.anunciante.state
        }
    });
} catch(err){
    res.status(500).send({message: err.message});
}
};

const findById = async(req,res) =>{
    try{
        const {id} = req.params;
        const prodItem = await itemService.findByIdService(id);
        if(!prodItem){
            return res.status(400).send({message: "Não há item registrado!"});
        }
        res.send({
            item : {
            id: prodItem._id,
            nome: prodItem.nome,
            categoria: prodItem.categoria,
            tipo: prodItem.tipo,
            descricao: prodItem.descricao,
            valor:prodItem.valor,
            foto: prodItem.foto,
            userName : prodItem.anunciante.name,
            userNumber : prodItem.anunciante.number,
            userCity : prodItem.anunciante.city,
            userUF: prodItem.anunciante.state
            }
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const seachByNome = async(req,res) =>{
    try{
        const {nome} = req.query;

        const prodItem = await itemService.seachByNomeService(nome);

        if(prodItem.length == 0){
            return res.status(400).send({message: "Não há item registrado com esse nome!"});
        }
        res.send({
            produtos : prodItem.map(prodItem => {
                return{
                id: prodItem._id,
                nome: prodItem.nome,
                categoria: prodItem.categoria,
                descricao: prodItem.descricao,
                tipo: prodItem.tipo,
                valor:prodItem.valor,
                foto: prodItem.foto,
                userName : prodItem.anunciante.name,
                userNumber : prodItem.anunciante.number,
                userCity : prodItem.anunciante.city,
                userUF: prodItem.anunciante.state
                }
    })})

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const byUser = async(req,res) =>{
    try{
        const id = req.userId;
        const prodItem = await itemService.byUserService(id);
        if(prodItem.length == 0){
            return res.status(400).send({message: "Não há item registrado nesse anunciante!"});
        }
        res.send({
            produtos : prodItem.map(prodItem => {
                return{
                id: prodItem._id,
                nome: prodItem.nome,
                categoria: prodItem.categoria,
                descricao: prodItem.descricao,
                tipo: prodItem.tipo,
                valor:prodItem.valor,
                foto: prodItem.foto,
                userName : prodItem.anunciante.name,
                userNumber : prodItem.anunciante.number,
                userCity : prodItem.anunciante.city,
                userUF: prodItem.anunciante.state
                }
    })})

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const filtCategoria = async(req,res) =>{
    try{
        const {categoria} = req.query;
        const prodItem = await itemService.filtCategService(categoria);
        if(prodItem.length == 0){
            return res.status(400).send({message: "Não há item registrado nessa categoria!"});
        }
        res.send({
            produtos : prodItem.map(prodItem => {
                return{
                id: prodItem._id,
                nome: prodItem.nome,
                categoria: prodItem.categoria,
                descricao: prodItem.descricao,
                tipo: prodItem.tipo,
                valor:prodItem.valor,
                foto: prodItem.foto,
                userName : prodItem.anunciante.name,
                userNumber : prodItem.anunciante.number,
                userCity : prodItem.anunciante.city,
                userUF: prodItem.anunciante.state
                }
    })})

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const filtTipo = async(req,res) =>{
    try{
        const {tipo} = req.query;
        const prodItem = await itemService.filtTipService(tipo);
        if(prodItem.length == 0){
            return res.status(400).send({message: "Não há item registrado nesse tipo!"});
        }
        res.send({
            produtos : prodItem.map(prodItem => {
                return{
                id: prodItem._id,
                nome: prodItem.nome,
                categoria: prodItem.categoria,
                tipo: prodItem.tipo,
                descricao: prodItem.descricao,
                valor:prodItem.valor,
                foto: prodItem.foto,
                userName : prodItem.anunciante.name,
                userNumber : prodItem.anunciante.number,
                userCity : prodItem.anunciante.city,
                userUF: prodItem.anunciante.state
                }
    })})

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const update = async(req,res) =>{
    try{
        const {nome,categoria,tipo,descricao,valor} = req.body;
        const id = req.params.id;
        const file = req.file;
        let foto = undefined;
        if(typeof file !== 'undefined'){
            foto = path.basename(file.path);
        }
        
    if(!nome && !categoria && !tipo && !descricao && !valor){
        res.status(400).send({message: "envie pelo menos um campo para atualizar!"});
        
    }
    else {
        const prodItem = await itemService.findByIdService(id);

        if(prodItem.anunciante._id != req.userId){
            res.status(400).send({message: "você não pode atualizar um item que não seja seu!"});
        }
        const oldFoto = prodItem.foto;

        if (typeof foto !== 'undefined' && foto) {
            await itemService.updateService(id, nome, categoria, tipo, descricao, valor, foto);
            await fs.promises.unlink('src/uploads/' + oldFoto);
        } else {
            await itemService.updateService(id, nome, categoria, tipo, descricao, valor);
        }


        res.status(201).send({message: "Item atualizado com sucesso!"})
    }

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const erase = async(req,res) =>{
    try{
        const id = req.params.id;
        const prodItem = await itemService.findByIdService(id);
        const oldFoto = prodItem.foto;

        if(prodItem.anunciante._id != req.userId){
            res.status(400).send({message: "você não pode atualizar um item que não seja seu!"});
        }
        await itemService.eraseService(id);
        await fs.promises.unlink('src/uploads/' + oldFoto);
        res.status(201).send({message: "Item deletado com sucesso!"});

    }catch(err){
        res.status(500).send({message: err.message});
    }
};
module.exports = {
    create,
    findAll,
    topItem,
    findById,
    seachByNome,
    byUser,
    filtCategoria,
    filtTipo,
    update,
    erase
};