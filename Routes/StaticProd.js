import { Router } from "express";
import ProductManager from "../Controllers/ProductManager.js";
const productos = new ProductManager("../Data/Productos.json");

const staticProd = Router();

//vista home productos
staticProd.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prods = await productos.getProducts(limit);
  res.render("home", { productos: prods });
});
export default staticProd;
