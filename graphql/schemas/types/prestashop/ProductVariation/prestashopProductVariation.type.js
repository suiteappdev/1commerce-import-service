const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

let PrestashopProductVariationType = new GraphQLObjectType({
  name: 'PrestashopProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.talla;
      
    }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return  obj.quantity;
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.reference ? obj.reference.trim() : "";
    }}
  }),
});

module.exports = PrestashopProductVariationType;
