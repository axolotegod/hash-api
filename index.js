const express = require("express");
const multer = require("multer");
const crypto = require("crypto");

const app = express();
const upload = multer();

app.post("/generate-hash", upload.single("file"), (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    const hash = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    res.json({
      hash: hash,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: "Error generating hash" });
  }
});

app.get("/", (req, res) => {
  res.send("Hash API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
