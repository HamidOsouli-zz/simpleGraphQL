const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQList,
    GraphQLNonNull
}  = require('graphql');



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
    customer: {
        type: CustomerType
    }
});

module.exports = new GraphQLSchema({

});