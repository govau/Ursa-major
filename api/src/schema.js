const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
  } =require( "graphql")
const { fetchGCdata } = require('./fetch-gc');
const { files } = require('../gc-config');




  const customers = [
    {id:'1', name:'John Doe', email:'jdoe@gmail.com', age:35},
    {id:'2', name:'Steve Smith', email:'steve@gmail.com', age:25},
    {id:'3', name:'Sara Williams', email:'sara@gmail.com', age:32},
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

const BrowserType = new GraphQLObjectType({
  name: 'Browser',
  fields: () => ({
    agency: {type: GraphQLString},
    reg_domain: {type: GraphQLString},
    device_browser: {type: GraphQLString},
    total_device_browser: {type: GraphQLString},
    total_device_browser_day: {type: GraphQLString},
    posted_timestamp: {type: GraphQLString},
    inc_posted_timestamp: {type: GraphQLString}
  })
})


const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
      customer:{
          type:new GraphQLList(CustomerType),
          resolve(parentValue, args){
                return customers;
          }
      },
      browser: {
        type: new GraphQLList( BrowserType ) ,
        resolve( parentValue, args ){
          return fetchGCdata( files.agency )
            .then( some => some );
        }
      }
  }
});


module.exports =  new GraphQLSchema({
  query: RootQuery
})

