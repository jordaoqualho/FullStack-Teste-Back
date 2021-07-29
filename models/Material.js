const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    descricao: {
      type: String,
      required: true,
      unique: true,
    },
    thumb: {
      type: String,
      required: false,
    },
    marca: {
      type: String,
      required: true,
    },
    ativo: {
      type: String,
      required: true,
    },
    dataInativacao: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materiai", MaterialSchema);
