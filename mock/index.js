const express = require("express");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.get("/", (req, res) => {
  const users = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  }));
  res.json(users);
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  });
});

module.exports = router;
