const router = require("express").Router();
const Marca = require("../models/Marca");

// Adicionar novo Marca
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

//GET TODOS PRODUTOS
router.get("/", async (req, res) => {
  try {
    let marcas = await Marca.find();
    if (req.query.descricao) {
      marcas = await Marca.find({
        descricao: { $regex: req.query.descricao, $options: "i" },
      });
    }
    res.status(200).json(marcas);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETA TODOS PRODUTOS
router.delete("/deletar-todos", async (req, res) => {
  try {
    await Marca.deleteMany();
    res.status(200).json("Todos marcas deletados!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUTO BY ID
router.get("/:id", async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.id);

    res.status(200).json(marca);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUTO BY ID
router.put("/:id", async (req, res) => {
  try {
    const updatedMarca = await Marca.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMarca);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUTO BY ID
router.delete("/:id", async (req, res) => {
  try {
    await Marca.findByIdAndDelete(req.params.id);
    res.status(200).json("Marca deletado com sucesso!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
