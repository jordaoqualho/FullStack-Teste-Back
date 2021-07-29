const router = require("express").Router();
const Material = require("../models/Material");

// Adiciona novo Material
router.post("/", async (req, res) => {
  try {
    const newMaterial = new Material({
      descricao: req.body.descricao,
      thumb: req.body.thumb,
      marca: req.body.marca,
      ativo: req.body.ativo,
      dataInativacao: req.body.dataInativacao,
    });
    const material = await newMaterial.save();
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retorna todos os materiais ou busca pela query ?descricao=
router.get("/", async (req, res) => {
  try {
    let materiais = await Material.find();
    if (req.query.descricao) {
      materiais = await Material.find({
        descricao: { $regex: req.query.descricao, $options: "i" },
      });
    }
    res.status(200).json(materiais);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deleta todos os materiais
router.delete("/deletar-todos", async (req, res) => {
  try {
    await Material.deleteMany();
    res.status(200).json("Todos materiais deletados!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retorna o material com o id do parametro
router.get("/:id", async (req, res) => {
  try {
    let material = await Material.findById(req.params.id);

    res.status(200).json(material);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edita o material com o id do parametro
router.put("/:id", async (req, res) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMaterial);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete o material com o id do parametro
router.delete("/:id", async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.status(200).json("Material deletado com sucesso!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
