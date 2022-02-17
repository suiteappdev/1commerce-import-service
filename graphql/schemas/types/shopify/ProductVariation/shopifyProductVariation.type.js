const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

let ShopifyProductVariationType = new GraphQLObjectType({
  name: 'ShopifyProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.compare_at_price && parseInt(obj.compare_at_price) !== 0 ? obj.compare_at_price : obj.price ? obj.price : 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      let option = obj.options ? obj.options.find(o => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "talla" || o.name.toLowerCase() === 'tamaño') : undefined;
      const size = option && option.values.some(option => option === obj.option1) ? obj.option1 : null;
      return size ? size : 'único'
    }},
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.inventory_quantity && obj.inventory_quantity > 0 ? obj.inventory_quantity : 0
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.sku ? obj.sku : ''
    }},
    ean13:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.barcode ? obj.barcode : '0'
    }}
  }),
});

module.exports = ShopifyProductVariationType;
