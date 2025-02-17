import express, { Router, json } from "express";
import { faker } from "@faker-js/faker";
import cookieParser from "cookie-parser";

const router = Router();
const app = express();

app.use(cookieParser());
app.use(json());

const users = [];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.cookie("authToken", user.token, { httpOnly: true });
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const token = faker.datatype.uuid();

  const newUser = { username, password, token };
  users.push(newUser);

  res.cookie("authToken", token, { httpOnly: true });
  res.status(201).send({ message: "User registered successfully" });
});

router.get("/check-auth", (req, res) => {
  const { authToken } = req.cookies;

  if (authToken && users.some(u => u.token === authToken)) {
    res.status(200).send({ message: "Authenticated" });
  } else {
    res.status(401).send({ message: "Not authenticated" });
  }
});

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});