const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');

const ShopifyTaxType = require('./shopifyTaxType');
const stripHtml = require("string-strip-html");

let ShopifyProductType = new GraphQLObjectType({
  name: 'ShopifyProductType',
  fields: () => ({
    name: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.title
      }
    },
    externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
      return obj.id
    }},
    reference: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.id
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
        return null
      }
    },
    manufacturer: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.vendor;
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
      type: GraphQLFloat, resolve: (obj, args, context, info) => {
        return obj.variants[0].weight ? parseFloat(obj.variants[0].weight == "" ? 0 : obj.variants[0].weight) : 0;
      }
    }
  }),
});

module.exports = ShopifyProductType;