import { users } from './users';
import { dailyReports } from './dailyReports';
import { providers } from './providers';
import { incomeBills } from './incomeBills';
import { retail } from './retail';
import { products } from './products';

const { merge } = require('lodash');

const resolvers = merge(
  users,
  dailyReports,
  providers,
  incomeBills,
  retail,
  products

);
export default resolvers;
