import express from "express";
import { houses } from "Houses";

const app = express();
const port = 3000;

// Todas las casas
app.get("/houses", (req, res) => {
  res.json(houses);
});

// Casas por tipo: venta o renta
app.get("/houses/:type", (req, res) => {
  const { type } = req.params;
  const filtered = houses.filter(h => h.type === type);
  res.json(filtered);
});

// Rango de precios
app.get("/houses/price/:min/:max", (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);
  const filtered = houses.filter(h => h.price >= min && h.price <= max);
  res.json(filtered);
});

// Detalle de casa por id
app.get("/house/:id", (req, res) => {
  const id = Number(req.params.id);
  const house = houses.find(h => h.id === id);
  if (house) {
    res.json(house);
  } else {
    res.status(404).json({ message: "Casa no encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
