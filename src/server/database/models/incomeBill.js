import mongoose, { Schema } from 'mongoose';

const incomeBill = new Schema(
  {
    provider: String,
    product: [
      {
        name: String,
        count: Number,
        price: Number
      }
    ],
    totalPrice: Number,
    img: String,
    date: Number
  },
  {
    versionKey: false
  });
export const IncomeBill = mongoose.model('income_bills', incomeBill);