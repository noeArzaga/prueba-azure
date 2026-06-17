const express = require("express");
const sql = require("mssql");

module.exports = function (getPool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { id } = req.query;
      const result = await pool.request()
        .input("id_version", sql.Int, id || null)
        .execute("sp_ConsultarVersion");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { modelo_id, nombre } = req.body;
      const result = await pool.request()
        .input("modelo_id", sql.Int, modelo_id)
        .input("nombre", sql.NVarChar(255), nombre)
        .execute("sp_InsertarVersion");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const { modelo_id, nombre } = req.body;
      const result = await pool.request()
        .input("id_version", sql.Int, req.params.id)
        .input("modelo_id", sql.Int, modelo_id)
        .input("nombre", sql.NVarChar(255), nombre)
        .execute("sp_ActualizarVersion");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("id_version", sql.Int, req.params.id)
        .execute("sp_EliminarVersion");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};