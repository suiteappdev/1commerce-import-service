const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const moment = require('moment');
const WoocommerceDiscountType =  require('../Product/wooCommerceDiscountType');

let WooCommerceProductVariationType = new GraphQLObjectType({
  name: 'WooCommerceProductVariationType',
  fields: () => ({
    price:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
    }},
    talla:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      if(( obj.attributes &&  obj.attributes.length > 0 )){
        let attrs = obj.attributes;
        let size = attrs.filter(o=>(o.name.toLowerCase() === 'talla' || o.name.toLowerCase() === 'tamaño' || o.name.toLowerCase() === 'size'));

        if(size.length > 0)
          return size[0].option;
        else
          return 'única';
      }else{
        return obj.talla || 'única';
      }
    }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.stock_quantity || 0
    }},
    reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.sku
    }},
    discount: {type: new GraphQLList(WoocommerceDiscountType),resolve:(obj, args, context, info)=>{
      let disc = [];
      
      if (obj.date_on_sale_from && obj.date_on_sale_to) {
        disc = [{
          name: obj.name || null,
          from: moment(obj.date_on_sale_from).format('YYYY/MM/DD'),
          to: moment(obj.date_on_sale_to).format('YYYY/MM/DD'),
          type: 'C',
          value: parseInt(obj.regular_price) - parseInt(obj.sale_price)
        }]
      }

      return disc
    }},
  }),
});

module.exports = WooCommerceProductVariationType;
