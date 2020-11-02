import gql from 'graphql-tag';

export const typeDefs = gql`

    type DailyReport {
        _id: ID!
        date: Int
        cash: Int
        sold: [NameCount]
        storage: [NameCount]
    }

    type IncomeBill {
        _id: ID!
        provider: String
        product: [BillProduct]
        totalPrice: Int
        img: String
        date: Int

    }

    type Product {
        _id: ID!
        name: String
        provider: String
        price: Float
        count: Int
    }

    type Provider {
        _id: ID!
        name: String
        contact: Int
    }

    type Retail {
        _id: ID!
        sales: [ProductsRetail]
        status: Boolean
        salesDay: Float
    }

    type User {
        _id: ID!
        name: String
        password: String
        role: String
    }

    type BillProduct {
        _id: ID!
        name: String
        count: Int
        price: Int
    }

    type NameCount {
        _id: ID!
        name: String
        count: Int
    }

    type ProductsRetail {
        products: [ItemsForRetail]
        totalPrice: Float
        date: Int
    }

    type ItemsForRetail {
        name: String
        count: Int
        price: Float
    }

    type OutcomeBills{
        provider: String,
        returnedProducts: [BillProduct],
        totalPrice: Int,
        img: String,
        date: Int

    }

    type Query {
        users: [User]
        retail(date: String): [Retail]
        providers: [Provider]
        products: [Product]
        incomeBills: [IncomeBill]
        outcomeBills: [OutcomeBills]
        dailyReports: [DailyReport]
        salesByDay: [ItemsForRetail]
    }
`;
