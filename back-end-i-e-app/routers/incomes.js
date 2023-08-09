const express = require("express");
const Incomes = require("../models-db/incomes-d.js");

const routerIncomes = express.Router();

// MiddleWare
routerIncomes.use(express.json());

// Get
routerIncomes.get("/", (req, res) => {
    Incomes.find().then((incomes) => {
        res.send(JSON.stringify(incomes));
    })
});

// Get for id
routerIncomes.get("/:id", (req, res) => {
    Incomes.findById(req.params.id).then((income) => {
        res.send(JSON.stringify(income));
    })
});

// Post
routerIncomes.post("/", (req, res) => {
    let { concept, amount } = req.body;
    let newIncome = new Incomes({concept, amount})
    newIncome.save().catch((err) => console.log(err));
    Incomes.find().then((incomes) => {
        console.log(incomes)
        res.send(JSON.stringify(incomes));
    })
    console.log(newIncome);
});

// Put
routerIncomes.put("/:id", async (req, res) => {
    let { concept, amount } = req.body;
    let newIncome = {concept, amount};
    console.log(newIncome);
    console.log(typeof req.params.id);
    await Incomes.findByIdAndUpdate(req.params.id, newIncome).catch((err) => console.log(err));
    Incomes.find().then((incomes) => {
        res.send(JSON.stringify(incomes));
    })
});

// Delete
routerIncomes.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    await Incomes.findByIdAndDelete(req.params.id).catch((err) => console.log(err));
    Incomes.find().then((incomes) => {
        res.send(JSON.stringify(incomes));
    })
});

module.exports = routerIncomes;