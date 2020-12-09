const { pubsub }  = require('../../../../../services/pubsub.service') ;
const { ORDER_CREATED }  = require('../subscriptions/events');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat
  } = require('graphql');

const OrderType = new GraphQLObjectType({  
    name: "OrderType",    
    fields: () => ({    
      oc_referencia: { type: new GraphQLNonNull(GraphQLID) },        
      co: { type: new GraphQLNonNull(GraphQLString)},        
      estado: { type: new GraphQLNonNull(GraphQLFloat) },        
      fecha: { type: new GraphQLNonNull(GraphQLString) },        
      numDoc: { type: new GraphQLNonNull(GraphQLString) },        
      tipoDoc: { type: new GraphQLNonNull(GraphQLString) }, 
    })
})

const Mutation = new GraphQLObjectType({  
    name: "Mutation",  
    fields: {    
      addOrder: {      
        type:OrderType ,      
        args: {        
          oc_referencia: { type: new GraphQLNonNull(GraphQLID) },        
          co: { type: new GraphQLNonNull(GraphQLString)},        
          estado: { type: new GraphQLNonNull(GraphQLFloat) },        
          fecha: { type: new GraphQLNonNull(GraphQLString) },        
          numDoc: { type: new GraphQLNonNull(GraphQLString) },        
          tipoDoc: { type: new GraphQLNonNull(GraphQLString) },        
        },      
        async resolve(_, args, { db }) {
            let order = new db.Order(args);

             order.save((e, doc)=>{
               if(e) console.log(e);
                pubsub.publish(ORDER_CREATED, { OrderCreated: doc });
             });

            return args;
        }    
      }  
    }
})

module.exports = { Mutation,  OrderType };