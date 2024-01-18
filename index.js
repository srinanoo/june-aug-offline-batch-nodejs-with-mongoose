const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:['http://127.0.0.1:5173', 'http://localhost:5173', ]
}));

const traineesRoutes = require('./routes/traineeRoutes');
app.use("/api/v1/trainees", traineesRoutes); // http://localhost:5000/api/v1/trainees/

app.use("/*", (req, res) => {
    res.send("Invalid Route for this Trainee Project");
});

app.listen(process.env.PORT, ()=> console.log(`Server is listening on port: ${process.env.PORT} `));