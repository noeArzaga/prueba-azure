const express = require("express");
const sql = require("mssql");

module.exports = function (getPool) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { id } = req.query;
      const result = await pool.request()
        .input("id_parte", sql.Int, id || null)
        .execute("sp_ConsultarParte");
      res.json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const pool = await getPool();
      const { tipoRefaCat_id, proveedor_id, unidad_id, nombre, descripcion, num_parte, img_path, costo, precio, existencias } = req.body;
      const result = await pool.request()
        .input("tipoRefaCat_id", sql.Int, tipoRefaCat_id)
        .input("proveedor_id", sql.Int, proveedor_id)
        .input("unidad_id", sql.Int, unidad_id)
        .input("nombre", sql.NVarChar(255), nombre)
        .input("descripcion", sql.NVarChar(255), descripcion || null)
        .input("num_parte", sql.NVarChar(255), num_parte)
        .input("img_path", sql.NVarChar(255), img_path || null)
        .input("costo", sql.Decimal(10, 2), costo)
        .input("precio", sql.Decimal(10, 2), precio)
        .input("existencias", sql.Int, existencias || 0)
        .execute("sp_InsertarParte");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const { tipoRefaCat_id, proveedor_id, unidad_id, nombre, descripcion, num_parte, img_path, costo, precio, existencias } = req.body;
      const result = await pool.request()
        .input("id_parte", sql.Int, req.params.id)
        .input("tipoRefaCat_id", sql.Int, tipoRefaCat_id)
        .input("proveedor_id", sql.Int, proveedor_id)
        .input("unidad_id", sql.Int, unidad_id)
        .input("nombre", sql.NVarChar(255), nombre)
        .input("descripcion", sql.NVarChar(255), descripcion || null)
        .input("num_parte", sql.NVarChar(255), num_parte)
        .input("img_path", sql.NVarChar(255), img_path || null)
        .input("costo", sql.Decimal(10, 2), costo)
        .input("precio", sql.Decimal(10, 2), precio)
        .input("existencias", sql.Int, existencias)
        .execute("sp_ActualizarParte");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input("id_parte", sql.Int, req.params.id)
        .execute("sp_EliminarParte");
      res.json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};