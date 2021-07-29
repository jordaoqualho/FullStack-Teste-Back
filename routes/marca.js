const router = require("express").Router();
const Marca = require("../models/Marca");

// Adiciona novo Marca
router.post("/", async (req, res) => {
  try {
    const newMarca = new Marca({
      nome: req.body.nome,
    });
    const marca = await newMarca.save();
    res.status(200).json(marca);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retorna todas marcas
router.get("/", async (req, res) => {
  try {
    let marcas = await Marca.find();
    res.status(200).json(marcas);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deleta todas as marcas
router.delete("/deletar-todas", async (req, res) => {
  try {
    await Marca.deleteMany();
    res.status(200).json("Todos marcas deletados!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
