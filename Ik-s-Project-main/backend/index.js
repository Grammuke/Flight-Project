const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const FlightsModel = require("./models/flight");

const app = express();

app.use(cors());
app.use(express.json());

const mongoString =
  "mongodb+srv://unekwenchekwube:xbcBJLflXy6VAN2L@cluster0.66reprd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect("mongodb://127.0.0.1:27017/users");
mongoose
  .connect(`${mongoString}/users`)
  .then(() => {
    console.log("--------db connected-----");
  })
  .catch((err) => {
    console.log("----------dberror--------", err);
  });

app.listen(3000, () => {
  console.log("server is running");
});

// Auth

app.post("/user", (req, res) => {
  console.log({
    createBody: req.body,
  });
  const { email } = req.body;
  console.log({
    email,
  });

  UserModel.findOne({
    email,
  })
    .then((user) => {
      console.log({
        user,
      });

      if (!user) {
        UserModel.create(req.body)
          .then((users) => {
            res.json({
              data: users,
              message: "User created sucessfully",
            });
          })
          .catch((err) => {
            res.status(400).json({ message: err.message });
          });
      } else {
        res.status(400).json({
          message: "Email Already exists",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({
    email,
  }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          message: "Authentication successful",
          data: {
            firstName: user.firstName,
            email: user.email,
          },
        });
      } else {
        res.status(400).json({
          message: "Username or password is incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "User does not exist",
      });
    }
  });
});

// FLights
app.post("/flights/create", (req, res) => {
  FlightsModel.create(req.body)
    .then((flights) => {
      res.status(200).json({
        message: "Flight successfully created",
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.patch("/flights/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedFlight = await FlightsModel.findByIdAndUpdate(
      id,
      { $set: updates }, // Only apply passed fields
      { new: true, runValidators: true }
    );

    if (!updatedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/flights/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const flights = await FlightsModel.findByIdAndDelete(id);

    res.status(200).json({
      data: flights,
      message: "Flight successfully deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occurred",
    });
  }
});

app.get("/flights", async (req, res) => {
  const { email } = req.query;
  try {
    const flights = await FlightsModel.find({}).where("email").equals(email);
    res.status(200).json({
      data: flights,
      message: "Flight successfully retrieved",
    });
  } catch (err) {
    res.status(400).json({
      message: "An error occurred",
    });
  }
});
app.get("/", (req, res) => {
  res.send("Hello There");
});
