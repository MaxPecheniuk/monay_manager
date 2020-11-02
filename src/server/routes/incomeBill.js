import { IncomeBill } from '../database/models/incomeBill';
const Joi = require('@hapi/joi');

const incomeBill = [
  {
    method: 'GET',
    path: '/data/income',
    handler: () => {
      return IncomeBill.find();
    }
  },
  {
    method: 'POST',
    path: '/data/income',
    handler: (request) => {

      let data = new IncomeBill(request.payload);
      return data.save();
    },
    options: {
      validate: {
        payload: {
          provider: Joi.string().min(1),
          product: Joi.array().items(
            Joi.object({
              name: Joi.string().min(1),
              count: Joi.number().integer().positive().less(99),
              price: Joi.number().positive().precision(2)
            })
          ),
          totalPrice: Joi.number().positive().precision(2),
          img: Joi.string(),
          date: Joi.date().timestamp()
        }
      }
    }
  },

];

module.exports = incomeBill;