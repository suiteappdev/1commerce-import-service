const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');

const MagentoTaxType = require('./magentoTaxType');
const stripHtml = require("string-strip-html");

let MagentoProductType = new GraphQLObjectType({
  name: 'MagentoProductType',
  fields: () => ({
    name: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.name
      }
    },
    externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
      return obj.id
    }},
    reference: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.sku
      }
    },
    description: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        const description = obj.custom_attributes.find(attr => attr.attribute_code === 'description')
        return stripHtml(description ? description.value : obj.name)
      }
    },
    descriptionShort: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        const description = obj.custom_attributes.find(attr => attr.attribute_code === 'description')
        return stripHtml(description ? description.value : obj.name)
      }
    },
    active: {
      type: GraphQLBoolean, resolve: (obj, args, context, info) => {
        return obj.status === 1 ? true : false
      }
    },
    tax: {type: MagentoTaxType, resolve: (obj, args, context, info) => {
      return obj.tax;
    }},
    manufacturer: {
      type: GraphQLString, resolve: (obj, args, context, info) => {
        return obj.brand;
      }
    },
    width: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return 0;
      }
    },
    height: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return 0;
      }
    },
    length: {
      type: GraphQLInt, resolve: (obj, args, context, info) => {
        return 0
      }
    },
    weight: {
      type: GraphQLFloat, resolve: (obj, args, context, info) => {
        return obj.weight ? obj.weight/1000 : 0;
      }
    }
  }),
});

module.exports = MagentoProductType;