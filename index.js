const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const materialRoute = require("./routes/material");
const marcaRoute = require("./routes/marca");
const imagenRoute = require("./routes/imagen");

// Acesso das informações do arquivo .env
dotenv.config();

// Configurando o cors para permitir acesso na porta 8080 na mesma origem
app.use(cors({ origin: "*", credentials: true }));

// Iniciando a coneção com o MongoDB
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(console.log("Conectado com MongoDB"))
  .catch((err) => console.log(err));

// End-points para utilização da API
app.use("/material", materialRoute);
app.use("/marca", marcaRoute);
app.use("/imagen", imagenRoute);

app.listen(PORT, () => {
  console.log("Backend está rodando na porta " + PORT + "!");
});
