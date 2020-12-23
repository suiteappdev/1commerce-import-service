const {
  GraphQLObjectType
} = require('graphql');

const WooCommerceProductType = require('../../wooCommerce/Product/wooCommerceProduct.type');
const WooCommerceProductVariationType = require('../../wooCommerce/ProductVariations/wooCommerceProductVariation.type');
const WooCommerceProductImageType = require('../../wooCommerce/ProductImages/WooCommerceProductImage.type');

let  WooCommerceProductIdType = new GraphQLObjectType({
  name: 'WooCommerceProductIdType',
  fields: () => ({
    product: {type: WooCommerceProductType, resolve: (obj, args, context, info) => {
      return obj;
    }}
  }),
});

module.exports = WooCommerceProductIdType;