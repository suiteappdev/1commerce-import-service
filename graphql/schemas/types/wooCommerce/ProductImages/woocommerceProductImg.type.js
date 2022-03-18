const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const WoocommerceImageType = require('./woocommerceImage.type');
let WoocommerceProductImgType = new GraphQLObjectType({
  name: 'WoocommerceProductImgType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve:(obj, args, context, info)=>{
      return obj.id;
    }},
    images:{ type: new GraphQLList(WoocommerceImageType), resolve:(obj, args, context, info)=>{      
      return obj.images
    }},
  }),
});

module.exports = WoocommerceProductImgType;
