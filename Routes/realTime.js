import { Router } from "express";
import ProductManager from "../Controllers/ProductManager.js";
const productos = new ProductManager("../Data/Productos.json");

const realTime = Router();

//vista realtime
realTime.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prods = await productos.getProducts(limit);
  res.render("realTimeProducts", { productos: prods });
});

export default realTime;
