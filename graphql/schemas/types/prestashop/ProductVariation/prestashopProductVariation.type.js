const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

let PrestashopProductVariationType = new GraphQLObjectType({
  name: 'PrestashopProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      // let before_tax_price=obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0;
      // let tax_rate=obj.tax.rate ? parseInt(obj.tax.rate == "" ? 0 : obj.tax.rate) : 0;
      // let full_price=(before_tax_price * (1 + ((tax_rate)/100)));
      // full_price=Math.ceil(full_price/1000)*1000;
      // return full_price;
      return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0;
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.talla;
      
    }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return  obj.quantity;
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.reference ? obj.reference.trim() : "";
    }},
    skuId: { type:GraphQLString, resolve: async(obj, args, context, info)=>{
      return obj.id;
    }}
  }),
});

module.exports = PrestashopProductVariationType;
