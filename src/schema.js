const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
}  = require('graphql');

const config = require('./config');

const axios = require('axios');

// HardCoded data
// const customers = [
//     {id: '1', name: 'John Doe', email: 'james@gmail.com', age: 35},
//     {id: '2', name: 'hamid osouli', email: 'hamid@gmail.com', age: 24},
//     {id: '3', name: 'steve williams', email: 'steve@gmail.com', age: 15}
// ];

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
                // hardCoded
                // return customers.find((customer) => customer.id === args.id);
                // axios
                return axios.get(`${config.url}/${args.id}`).then((response) => response.data);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                // hardCoded
                // return customers;
                //axios
                return axios.get(config.url).then((response) => response.data);
            }
        }
}
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args){
                return axios.post(config.url, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then((response) => response.data);
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete(`${config.url}/${args.id}`).then((response) => response.data);
            }
        },
        editCustomer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parentValue, args){
                return axios.patch(`${config.url}/${args.id}`, args).then((response) => response.data);
            }
        },


    }
});

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation
});