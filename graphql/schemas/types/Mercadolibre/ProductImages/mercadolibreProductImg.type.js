const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const MercadolibreImageType = require('./mercadolibreImage.type');
let MercadolibreProductImgType = new GraphQLObjectType({
  name: 'MercadolibreProductImgType',
  fields: () => ({
    externalId: { type: GraphQLString, resolve: (obj, args, context, info) => {
      return obj.id
    }},
    images:{ type: new GraphQLList(MercadolibreImageType), resolve:(obj, args, context, info)=>{      
      return obj.pictures
    }},
  }),
});

module.exports = MercadolibreProductImgType;
