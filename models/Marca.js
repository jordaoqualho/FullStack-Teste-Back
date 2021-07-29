const mongoose = require("mongoose");

const MarcaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Marca", MarcaSchema);
