const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Task.find({ userId: req.user.id }));
});

router.post("/", auth, async (req, res) => {
  res.json(await Task.create({
    userId: req.user.id,
    title: req.body.title
  }));
});

router.put("/:id", auth, async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
