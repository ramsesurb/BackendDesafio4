import ProductManager from "../Controllers/ProductManager.js";
import http from "http";
import { Server } from "socket.io";

const productos = new ProductManager("../Data/Productos.json");

const prods = await productos.getProducts();

export default function configureWebSocketServer(app) {
  const server = http.createServer(app);
  const socketServerIO = new Server(server);
  socketServerIO.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("nuevoProducto", async (producto) => {
      await productos.addProduct(producto);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
    socket.on("quitarProducto", async ({ id }) => {
      await productos.deleteById(id);
      console.log(id);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
  });

  return { server, socketServerIO };
}
