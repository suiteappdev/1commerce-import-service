const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

let ShopifyProductVariationType = new GraphQLObjectType({
  name: 'ShopifyProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      let option = obj.options.find(o => o.name.toLowerCase() === "size");
      const size = option && option.values.some(option => option === obj.option1) ? obj.option1 : null;
      return size
    }},
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.inventory_quantity || 0
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.sku
    }},
    ean13:{ type:GraphQLFloat, resolve:(obj, args, context, info)=>{
      return obj.barcode ? parseFloat(obj.barcode) : 0
    }}
  }),
});

module.exports = ShopifyProductVariationType;
