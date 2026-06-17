const express = require("express");
const sql = require("mssql");

module.exports = function (getPool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { id } = req.query;
      const result = await pool.request()
        .input("id_modelo", sql.Int, id || null)
        .execute("sp_ConsultarModelo");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { nombre } = req.body;
      const result = await pool.request()
        .input("nombre", sql.NVarChar(255), nombre)
        .execute("sp_InsertarModelo");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const { nombre } = req.body;
      const result = await pool.request()
        .input("id_modelo", sql.Int, req.params.id)
        .input("nombre", sql.NVarChar(255), nombre)
        .execute("sp_ActualizarModelo");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("id_modelo", sql.Int, req.params.id)
        .execute("sp_EliminarModelo");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};