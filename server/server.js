import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Cargar data desde db.json
const DB_PATH = "./db.json";
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// --- LOGIN ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const { users } = readDB();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ token: user.token });
  } else {
    res.status(401).json({ msg: "Username: admin | Password: 1234" });
  }
});

// --- OBTENER PRODUCTOS ---
app.get("/products", (req, res) => {
  const { products } = readDB();

  // Transformar para que coincida con lo que espera el frontend
  const formatted = products.map((p) => ({
    name: p.name,
    description: p.description || "Delicious product!",
    price: p.price,
    SKU: p.SKU || `SKU-${p.id}`,
    currency: p.currency || "$",
    pictures: p.pictures || ["/assets/card-placeholder.webp"],
  }));

  console.log(formatted);

  res.json(formatted);
});

// --- CREAR PRODUCTO ---
app.post("/addproduct", (req, res) => {
  const db = readDB();
  const newProduct = {
    id: Date.now(),
    ...req.body,
  };

  console.log(newProduct);

  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.listen(PORT, () =>
  console.log(`✅ Mock backend running on http://localhost:${PORT}`)
);
