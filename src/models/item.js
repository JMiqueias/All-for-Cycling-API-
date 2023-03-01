const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    categoria:{
        type: String,
        require: true,
    },
    tipo:{
        type: String,
        require: true,
    },
    descricao:{
        type: String,
        require: true,
    },
    valor:{
        type: String,
        require: true,
    },
    anunciante: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    foto : {
        type: String,
        require: true,
    },
    data:{
        type: Date,
        default: Date.now(),
    }

})

const Item = mongoose.model('Item',itemSchema);
module.exports = Item;