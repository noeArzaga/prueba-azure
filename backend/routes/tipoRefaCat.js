const express = require("express");
const sql = require("mssql");

module.exports = function (getPool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { id } = req.query;
      const result = await pool.request()
        .input("id_tipoRefaCat", sql.Int, id || null)
        .execute("sp_ConsultarTipoRefaCat");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { nombre, izq, der } = req.body;
      const result = await pool.request()
        .input("nombre", sql.NVarChar(255), nombre)
        .input("izq", sql.Int, izq || null)
        .input("der", sql.Int, der || null)
        .execute("sp_InsertarTipoRefaCat");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const { nombre, izq, der } = req.body;
      const result = await pool.request()
        .input("id_tipoRefaCat", sql.Int, req.params.id)
        .input("nombre", sql.NVarChar(255), nombre)
        .input("izq", sql.Int, izq || null)
        .input("der", sql.Int, der || null)
        .execute("sp_ActualizarTipoRefaCat");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("id_tipoRefaCat", sql.Int, req.params.id)
        .execute("sp_EliminarTipoRefaCat");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};