import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("test router get function works...")
});

router.post("/test", (req, res) => {
  console.log("test router post function works...")
});

router.put("/test", (req, res) => {
  console.log("test router put function works...")
});

router.delete("/test", (req, res) => {
  console.log("test router delete function works...")
});

export default router;