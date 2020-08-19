const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const ShopifyCategoryType = require('./shopifyCategoryType');
const ShopifyImageType = require('./shopifyImageType');
const ShopifyProductVariationType = require('./shopifyProductVariationType');
const ShopifyTaxType = require('./shopifyTaxType');
const stripHtml = require("string-strip-html");

const { getVariations, getCategories, getTax, getCategoryByProductId } = require('../../../../controllers/Shopify.controller');

let ShopifyProductType = new GraphQLObjectType({
  name: 'ShopifyProductType',
  fields: () => ({
    name: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.title
      }
    },
    reference: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.variants[0].sku
      }
    },
    description: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return stripHtml(obj.body_html || obj.title)
      }
    },
    descriptionShort: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return stripHtml(obj.body_html || obj.title)
      }
    },
    active: {
      type: GraphQLBoolean, resolve: (obj, args, context, info) => {
        return obj.published_at != '' ? true : false
      }
    },
    price: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return obj.variants[0].price ? parseInt(obj.variants[0].price == "" ? 0 : obj.variants[0].price) : 0
      }
    },
    tax: {
      type: ShopifyTaxType, resolve: (obj, args, context, info) => {
        let credentials = context.req.credentials;
        return getTax(obj.tax_class, credentials);
      }
    },
    manufacturer: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.vendor;
      }
    },
    mainCategory: {
      type: ShopifyCategoryType, resolve: (obj, args, context, info) => {
        let credentials = context.req.credentials;
        return getCategoryByProductId(credentials, obj.variants[0].product_id);
      }
    },
    mainColor: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.variants[0].option2
      }
    },
    gender: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.variants[0].option1
      }
    },
    width: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return obj.dimensions ? parseInt(obj.dimensions.width == "" ? 0 : obj.dimensions.width) : 0;
      }
    },
    height: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return obj.dimensions ? parseInt(obj.dimensions.height == "" ? 0 : obj.dimensions.width) : 0;
      }
    },
    length: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return obj.dimensions ? (obj.dimensions.length.length > 0 ? parseInt(obj.dimensions.length) : 0) : 0
      }
    },
    weight: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return obj.variants[0].weight ? parseInt(obj.variants[0].weight == "" ? 0 : obj.variants[0].weight) : 0;
      }
    },
    categories: {
      type: new GraphQLList(ShopifyCategoryType), resolve: (obj, args, context, info) => {
        let credentials = context.req.credentials;
        return getCategories(credentials);
      }
    },
    images: {
      type: new GraphQLList(ShopifyImageType), resolve: (obj, args, context, info) => {
        return obj.images
      }
    },
    variations: {
      type: new GraphQLList(ShopifyProductVariationType), resolve: (obj, args, context, info) => {
        return obj.variants
      }
    },
  }),
});

module.exports = ShopifyProductType;