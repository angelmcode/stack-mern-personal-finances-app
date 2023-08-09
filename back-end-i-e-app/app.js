const express = require("express");
const app = express();
const { mongoose } = require("./config-db.js")
// const cors = require("cors");

// app.use(cors());

// MiddleWare
app.use(express.json());

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", ["GET,POST,PUT,PATCH,DELETE"]);
    res.append("Access-Control-Allow-Headers", ["Content-Type"]);
    next();
})

// Routers
const routerExpenses = require("./routers/expenses.js");
app.use("/api/db-incomes-expenses-app/expenses", routerExpenses);

const routerIncomes = require("./routers/incomes.js");
app.use("/api/db-incomes-expenses-app/incomes", routerIncomes);

// app.get("/", (req, res) => {
//     res.send("my server");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listened on Port: ${PORT}`);
});