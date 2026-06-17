require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

let pool;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log("Conectado a SQL Server");
  }
  return pool;
}

const modelosRoutes = require("./routes/modelos");
const versionesRoutes = require("./routes/versiones");
const tipoRefaCatRoutes = require("./routes/tipoRefaCat");
const proveedoresRoutes = require("./routes/proveedores");
const unidadesCatRoutes = require("./routes/unidadesCat");
const partesRoutes = require("./routes/partes");
const relPartesVersionRoutes = require("./routes/relPartesVersion");

app.use("/api/modelos", modelosRoutes(getPool));
app.use("/api/versiones", versionesRoutes(getPool));
app.use("/api/tipoRefaCat", tipoRefaCatRoutes(getPool));
app.use("/api/proveedores", proveedoresRoutes(getPool));
app.use("/api/unidadesCat", unidadesCatRoutes(getPool));
app.use("/api/partes", partesRoutes(getPool));
app.use("/api/relPartesVersion", relPartesVersionRoutes(getPool));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});