const Message = require('../models/Message')
const createService = (body) => Message.create(body);

module.exports = {createService};