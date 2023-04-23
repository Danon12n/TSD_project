require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const fs = require("fs");
const http = require("http");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
    try {
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}!\n`);
        });
    } catch (e) {
        console.log(e);
    }
};

//server starting here
start();
