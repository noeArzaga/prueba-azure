const express = require("express");
const sql = require("mssql");

module.exports = function (getPool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { id } = req.query;
      const result = await pool.request()
        .input("id_proveedor", sql.Int, id || null)
        .execute("sp_ConsultarProveedor");
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
        .execute("sp_InsertarProveedor");
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
        .input("id_proveedor", sql.Int, req.params.id)
        .input("nombre", sql.NVarChar(255), nombre)
        .execute("sp_ActualizarProveedor");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("id_proveedor", sql.Int, req.params.id)
        .execute("sp_EliminarProveedor");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};