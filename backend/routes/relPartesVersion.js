const express = require("express");
const sql = require("mssql");

module.exports = function (getPool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { id } = req.query;
      const result = await pool.request()
        .input("id_relPartesVersion", sql.Int, id || null)
        .execute("sp_ConsultarRelPartesVersion");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { version_id, parte_id } = req.body;
      const result = await pool.request()
        .input("version_id", sql.Int, version_id)
        .input("parte_id", sql.Int, parte_id)
        .execute("sp_InsertarRelPartesVersion");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const { version_id } = req.body;
      const result = await pool.request()
        .input("id_relPartesVersion", sql.Int, req.params.id)
        .input("version_id", sql.Int, version_id)
        .execute("sp_ActualizarRelPartesVersion");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("id_relPartesVersion", sql.Int, req.params.id)
        .execute("sp_EliminarRelPartesVersion");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};