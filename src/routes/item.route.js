const route = require("express").Router();
const itemController = require("../controllers/item.controller");
const authMiddleware = require("../middleware/auth.middlieware");
const upload = require("../middleware/img.middleware")


route.post("/",authMiddleware,upload.single("file"),itemController.create);

route.get("/",itemController.findAll);

route.get("/top", itemController.topItem);

route.get("/seach",itemController.seachByNome);

route.get("/category",itemController.filtCategoria);

route.get("/type",itemController.filtTipo);

route.get("/byUser",authMiddleware,itemController.byUser)

route.get("/:id",itemController.findById);

route.patch("/:id",authMiddleware,upload.single("file"),itemController.update);

route.delete("/:id",authMiddleware,itemController.erase);

module.exports = route;