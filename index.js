const express = require("express");
const pa11y = require("pa11y");
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv').config()
const path = require('path')

const app = express();
app.use(express.static("./frontend/public"));

app.get("/api/test", async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: "URL is required" });
  } else {
    try {
      const results = await pa11y(req.query.url);
      // Do something with the results
      res.status(200).json(results);
    } catch (error) {
      // Handle the error
      console.log(error);
      res.status(404).send(error.message);
    }
  }
});

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
