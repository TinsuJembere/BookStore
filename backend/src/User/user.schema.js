const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      book: { type: Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, default: 1 },
    }
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User; 