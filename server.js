require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

// express app
const app = express();

// middleware
app.use(
  cors({
    origin: ["https://workout-buddy-frontend-sepia.vercel.app"],
    method: ["POST", "GET"],
    credential: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/resource", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to db
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to DB");

    //   listen to request
    app.listen(process.env.PORT, () => {
      console.log("App is listening on PORT:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
