const express = require("express");
const { Router } = express;

const app = express();

const router = Router();

app.use("/static", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productos = [
  {
    title: "title1",
    price: 123,
    thumbnail: "http://placehold.it/400x400",
    id: 1,
    timestamp: 0,
    description: "...",
    stock: 10,
  },
  {
    title: "title2",
    price: 5,
    thumbnail: "http://placehold.it/400x400",
    id: 2,
    timestamp: 0,
    description: "...",
    stock: 10,
  },
  {
    title: "title3",
    price: 250,
    thumbnail: "http://placehold.it/400x400",
    id: 3,
    timestamp: 0,
    description: "...",
    stock: 10,
  },
];

const carritos = [];

// Productos disponibles

router.get("/productos", (req, res) => {
  res.send(productos);
});

router.get("/productos/:id", (req, res) => {
  productos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      res.send(e);
      console.log(e);
    }
  });
});

router.post("/productos", (req, res) => {
  console.log(req.body);
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  nuevoProducto.timestamp = Date(Date.now());
  productos.push(nuevoProducto);
  res.send("post ok");
});

router.put("/productos/:id", (req, res) => {
  productos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      console.log(req);
      console.log(req.body.price);
      console.log(req.body.title);
      console.log(req.body.thumbnail);

      e.title = req.body.title;
      e.price = req.body.price;
      e.thumbnail = req.body.thumbnail;
      e.stock = req.body.stock;
      e.description = req.body.description;
      res.send(e);
      console.log(e);
    }
  });
});

router.delete("/productos/:id", (req, res) => {
  productos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      const ind = productos.indexOf(e);
      productos.splice(ind, 1);
    }
  });
  res.send(productos);
});

// Carritos

router.get("/carrito", (req, res) => {
  res.send(carritos);
});

router.post("/carrito", (req, res) => {
  const nuevoCarrito = { productos: [] };
  nuevoCarrito.id = carritos.length + 1;
  nuevoCarrito.timestamp = Date(Date.now());
  carritos.push(nuevoCarrito);
  res.send("post ok");
});

router.delete("/carrito/:id", (req, res) => {
  carritos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      const ind = carritos.indexOf(e);
      carritos.splice(ind, 1);
    }
  });
  res.send(carritos);
});

router.get("/carrito/:id/productos", (req, res) => {
  carritos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      res.send(e.productos);
      console.log(e);
    }
  });
});

router.post("/carrito/:id/productos/:idprod", (req, res) => {
  carritos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      productos.map((ep) => {
        if (ep.id === parseInt(req.params.idprod)) {
          const nuevoProducto = ep;
          e.productos.push(nuevoProducto);
          res.send(e);
        }
      });
    }
  });
});

router.delete("/carrito/:id/productos/:idprod", (req, res) => {
  carritos.map((e) => {
    if (e.id === parseInt(req.params.id)) {
      console.log(e.productos);
      e.productos.map((ep) => {
        if (ep.id === parseInt(req.params.idprod)) {
          const ind = e.productos.indexOf(ep);
          e.productos.splice(ind, 1);
          res.send(carritos);
        }
      });
      
    }
  });
});

app.use("/api", router);

app.listen(8080);
