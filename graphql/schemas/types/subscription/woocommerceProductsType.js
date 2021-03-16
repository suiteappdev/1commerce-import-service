const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} = require('graphql');

const WoocommerceProductsTyPe = new GraphQLObjectType({  
  name: "WoocommerceProductsTyPe",
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLID) },
    key: { type: new GraphQLNonNull(GraphQLString) },
    channel: { type: new GraphQLNonNull(GraphQLString) },
    separate_product_by_color : {type: GraphQLBoolean}
  })
})

module.exports = { WoocommerceProductsTyPe };
