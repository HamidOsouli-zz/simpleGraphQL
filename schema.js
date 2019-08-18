const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
}  = require('graphql');

// HardCoded data
const customers = [
    {id: '1', name: 'John Doe', email: 'james@gmail.com', age: 35},
    {id: '2', name: 'hamid osouli', email: 'hamid@gmail.com', age: 24},
    {id: '3', name: 'steve williams', email: 'steve@gmail.com', age: 15}
];

// Customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});
// Root Query
const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
                args: {
                    id: {type: GraphQLString},
            },
            resolve(parentValue, args){
                return customers.find((customer) => customer.id === args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
}
});

module.exports = new GraphQLSchema({
    query: rootQuery
});