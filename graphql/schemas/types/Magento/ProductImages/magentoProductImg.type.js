const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const MagentoImageType = require('./magentoImage.type');
let MagentoProductImgType = new GraphQLObjectType({
  name: 'MagentoProductImgType',
  fields: () => ({
    reference: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.sku
    }},
    images:{ type: new GraphQLList(MagentoImageType), resolve:(obj, args, context, info)=>{      
      return obj.images
    }},
  }),
});

module.exports = MagentoProductImgType;
