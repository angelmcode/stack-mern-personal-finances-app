const mongoose = require("mongoose");

const { Schema } = mongoose;

const incomesSchema = new Schema({
    concept: { type: String, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model("Incomes", incomesSchema);