const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const Imagen = require("../models/Imagen");

// Adicionar novo Imagen
router.post("/", multer(multerConfig).single("file"), async (req, res) => {
  const {
    originalname: name,
    size,
    filename: key,
    location: url = "",
  } = req.file;
  try {
    const newImagen = await Imagen.create({
      name,
      size,
      key,
      url,
    });
    res.json(newImagen);
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  const imagens = await Imagen.find();

  return res.json(imagens);
});

router.delete("/", async (req, res) => {
  const imagen = await Imagen.deleteMany();
  return res.send();
});

module.exports = router;
