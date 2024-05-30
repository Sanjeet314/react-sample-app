const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const calculateDistance = require("./utility/distanceFormulae");

const PORT = process.env.PORT || 3000;

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
];

app.use(express.static(path.join(__dirname, "../build")));
// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/dataservice/feeds", (req, res) => {
  const { longitude, latitude } = req.query;

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude parameters are required" });
  }
  console.log(longitude, latitude);
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading file" });
    }

    const jsonData = JSON.parse(data);
    const filteredData = jsonData.data.filter((data) => {
      const res = calculateDistance(
        data.latitude,
        data.longitude,
        latitude,
        longitude
      );
      console.log(res);
      return res <= data.distance;
    });
    res.json(filteredData);
  });
});

app.post("/dataservice/user/userdata", (req, res) => {
  try {
    const filePath = path.join(__dirname, "./db.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Add the new userData to the data array
    data.data.push(req.body);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data saved to db.json");
    res.send({ data: { message: "Saved" } });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
