const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const moment = require('moment');
const WoocommerceProductVariationType = require('./woocommerceProductVariation.type');
const WoocommerceDiscountType = require('./woocommerceDiscount.type');
const { getVariationsProduct } = require('../../../../../controllers/WooCommerce.controller');

let WoocommerceProductVType = new GraphQLObjectType({
  name: 'WoocommerceProductVType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id;
    }},
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.sku
    }},
    discount: {type: new GraphQLList(WoocommerceDiscountType), resolve: async (obj, args, context, info)=>{
      let disc = [];
      if (obj.date_on_sale_from && obj.date_on_sale_to) {
        disc = [{
          name: obj.name,
          from: moment(obj.date_on_sale_from).format('YYYY/MM/DD'),
          to: moment(obj.date_on_sale_to).format('YYYY/MM/DD'),
          type: 'C',
          value: parseInt(obj.regular_price) - parseInt(obj.sale_price)
        }]
      } else if (obj.sale_price && parseInt(obj.sale_price) !== 0 && obj.sale_price !== obj.regular_price) {
        disc = [{
          name: obj.name || null,
          from: moment().format('YYYY/MM/DD HH:mm:ss'),
          to: moment().add(7, 'days').format('YYYY/MM/DD HH:mm:ss'),
          type: 'C',
          value: parseInt(obj.regular_price) - parseInt(obj.sale_price),
        }]
      }
      return disc
    }},
    variations:{ type:new GraphQLList(WoocommerceProductVariationType), resolve: async(obj, args, context, info)=>{      
      if (!obj.variations || obj.variations.length === 0) {
        let variations = await getVariationsProduct(context.req, obj);
        if (variations.length === 0) {
          let price = obj.regular_price ? parseInt(obj.regular_price == "" ? 0 : obj.regular_price) :  parseInt(obj.price);
          return [{
            sku: obj.sku,
            ean13: obj.ean13 || '0',
            price: price,
            talla: 'única',
            stock_quantity: obj.stock_quantity || 0
          }]
        } else {
          return variations
        }
      }
      return obj.variations
    }},
  }),
});

module.exports = WoocommerceProductVType;
