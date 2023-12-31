const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const traineesRoutes = require('./routes/traineeRoutes');
app.use("/api/v1/trainees", traineesRoutes); // http://localhost:5000/api/v1/trainees/

app.listen(process.env.PORT, ()=> console.log(`Server is listening on port: ${process.env.PORT} `));