const Item = require("../models/item");
const item = require("../models/item");

const createService = (body) => item.create(body);

const findAllService = (offset,limit) => item.find().sort({_id:-1}).skip(offset).limit(limit).populate("anunciante");

const contItens = () => item.countDocuments();

const topItemService = () => item.findOne().sort({_id:-1}).populate("anunciante");

const findByIdService = (id) => item.findById(id).populate("anunciante");

const seachByNomeService = (nome) => item.find({
    nome: {$regex: `${nome || ''}`, $options: "i"},
}).sort({_id:-1}).populate("anunciante");

const byUserService = (id) => item.find({anunciante: id}).sort({_id:-1}).populate("anunciante");

const filtCategService = (categoria) => item.find({
    categoria: {$regex: `${categoria || ''}`, $options: "i"},
}).sort({_id:-1}).populate("anunciante");

const filtTipService = (tipo) => item.find({
    tipo: {$regex: `${tipo || ''}`, $options: "i"},
}).sort({_id:-1}).populate("anunciante");

const updateService = (id,nome,categoria,tipo,descricao,valor,foto) => 
item.findOneAndUpdate(
    {_id: id},
    {nome,categoria,tipo,descricao,valor,foto},
    {rawResult: true}
);

const eraseService = (id) => item.findByIdAndDelete({_id:id});

module.exports = {
    createService,
    findAllService,
    findByIdService,
    contItens,
    topItemService,
    seachByNomeService,
    byUserService,
    filtCategService,
    filtTipService,
    updateService,
    eraseService
};