const app = require("./app");
const { connectDB } = require("./DB.config/connectDB");
const router = require("./router");
require("dotenv").config();
const cors = require("cors");

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});
app.use(
  cors({
    origin: [process.env.CLIENT_side_port],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
  })
);
app.use("/api/v1", router);

app.use((error, req, res, text) => {
  const message = error.message ? error.message : "Server Error Occured";
  const status = error.status ? error.status : 500;
  res.status(status).json({ success: false, message });
});

const port = process.env.PORT;
app.listen(port, async () => {
  console.log(`server Running at http://localhost:${port}`);
  await connectDB();
});
