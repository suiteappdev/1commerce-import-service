const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let MercadolibreProductVariationType = new GraphQLObjectType({
  name: 'MercadolibreProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.price || 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      const size = obj.attribute_combinations.find(attr => attr.id === 'SIZE');
      return size ? size.value_name : 'único';
    }},
    quantity:{ type:GraphQLInt, resolve: (obj, args, context, info)=>{
      return obj.available_quantity
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id || ''
    }},
    ean13:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return '0'
    }}
  }),
});

module.exports = MercadolibreProductVariationType;
