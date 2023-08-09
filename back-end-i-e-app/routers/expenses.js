const express = require("express");
const Expenses = require("../models-db/expenses-d.js");

const routerExpenses = express.Router();

// MiddleWare
routerExpenses.use(express.json());

// Get
routerExpenses.get("/", (req, res) => {
    Expenses.find().then((expenses) => {
        res.send(JSON.stringify(expenses));
    })
});

// Get for id
routerExpenses.get("/:id", (req, res) => {
    Expenses.findById(req.params.id).then((expense) => {
        res.send(JSON.stringify(expense));
    })
});

// Post
routerExpenses.post("/", (req, res) => {
    let { concept, amount } = req.body;
    let newExpense = new Expenses({concept, amount})
    newExpense.save().catch((err) => console.log(err));
    Expenses.find().then((expenses) => {
        console.log(expenses)
        res.send(JSON.stringify(expenses));
    })
    console.log(newExpense);
});

// Put
routerExpenses.put("/:id", async (req, res) => {
    let { concept, amount } = req.body;
    let newExpense = {concept, amount};
    console.log(newExpense);
    console.log(typeof req.params.id);
    await Expenses.findByIdAndUpdate(req.params.id, newExpense).catch((err) => console.log(err));
    Expenses.find().then((expenses) => {
        res.send(JSON.stringify(expenses));
    })
});

// Delete
routerExpenses.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    await Expenses.findByIdAndDelete(req.params.id).catch((err) => console.log(err));
    Expenses.find().then((expenses) => {
        res.send(JSON.stringify(expenses));
    })
});

module.exports = routerExpenses;